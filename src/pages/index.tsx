import { Fragment, FunctionComponent, useEffect, useState } from 'react';
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

import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ProposalForm } from '../dto/common.dto';

const Index: FunctionComponent = () => {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const context = useWeb3React();
  const { library, chainId, account, activate, deactivate, active, error } =
    context;

  const [balance, setBalance] = useState<number>(0);
  const [userProposal, setUserProposal] = useState<ProposalForm>({
    content_url: '',
    user_key: '',
    title: '',
    description: '',
  });

  const onClickConnect = (e: React.MouseEvent<HTMLElement>) => {
    activate(injected);
  };

  useEffect(() => {
    if (!!account && !!library) {
      library.getBalance(account).then(value => {
        setBalance(Number(value));
      });
    }
    setUserProposal({ ...userProposal, user_key: account });
  }, [account, library, chainId, active]);

  const [isPopoverOpen, setPopover] = useState(false);
  const customContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'customContextMenuPopover',
  });

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

  const closePopover = () => {
    setPopover(false);
  };

  return (
    <div>
      <EuiHeader>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo href="#">Daily Dao</EuiHeaderLogo>
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
    </div>
  );
};

export default Index;
