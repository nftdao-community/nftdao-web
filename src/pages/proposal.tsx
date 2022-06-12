import { FunctionComponent, useState, useEffect } from 'react';
import { ProposalForm } from '../dto/common.dto';
import axios from 'axios';
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiButton,
  EuiContextMenuPanel,
  EuiPopover,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const Proposal: FunctionComponent = () => {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const context = useWeb3React();
  const { library, chainId, account, activate, deactivate, active, error } =
    context;

  const onClickConnect = (e: React.MouseEvent<HTMLElement>) => {
    activate(injected);
  };
  const [userProposal, setUserProposal] = useState<ProposalForm>({
    content_url: '',
    user_key: '',
    title: '',
    description: '',
  });

  const [balance, setBalance] = useState<number>(0);
  const [isPopoverOpen, setPopover] = useState(false);
  const customContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'customContextMenuPopover',
  });

  useEffect(() => {
    if (!!account && !!library) {
      library.getBalance(account).then(value => {
        setBalance(Number(value));
      });
    }
    setUserProposal({ ...userProposal, user_key: account });
  }, [account, library, chainId, active]);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const button = (
    <EuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      내 지갑
    </EuiButton>
  );
  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    axios
      .post(
        'http://ec2-13-125-139-216.ap-northeast-2.compute.amazonaws.com/proposal',
        userProposal
      )
      .catch(error => console.log(error));

    setUserProposal({
      content_url: '',
      user_key: account,
      title: '',
      description: '',
    });
  };
  const closePopover = () => {
    setPopover(false);
  };

  return (
    <div>
      <EuiHeader>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo href="/">Daily Dao</EuiHeaderLogo>
        </EuiHeaderSectionItem>
        <EuiHeaderLinks>
          <EuiHeaderLink href="/collection">Collection</EuiHeaderLink>
          <EuiHeaderLink href="/proposal">Proposal</EuiHeaderLink>
          <EuiHeaderLink onClick={onClickConnect}>지갑연결하기</EuiHeaderLink>
          <EuiPopover
            id={customContextMenuPopoverId}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            panelPaddingSize="s"
            anchorPosition="downLeft">
            <EuiContextMenuPanel>
              {active
                ? `당신의 지갑 주소는 :${account}입니다`
                : '지갑을 연결해주세요.'}
              <br />
              {`잔액: ${balance} ETH`}
            </EuiContextMenuPanel>
          </EuiPopover>
        </EuiHeaderLinks>
      </EuiHeader>
      <div style={{ margin: '20px' }}>
        <div>Add Content</div>
        <div>지갑주소: {account}</div>
        <input
          placeholder="title"
          value={userProposal.title}
          onChange={e => {
            setUserProposal({ ...userProposal, title: e.target.value });
          }}
        />
        <br></br>
        <input
          placeholder="content_url"
          value={userProposal.content_url}
          onChange={e => {
            setUserProposal({ ...userProposal, content_url: e.target.value });
          }}
        />
        <br></br>
        <input
          placeholder="description"
          value={userProposal.description}
          onChange={e => {
            setUserProposal({ ...userProposal, description: e.target.value });
          }}
        />
        <br></br>
        <button onClick={onSubmit}>submit</button>
      </div>
    </div>
  );
};

export default Proposal;
