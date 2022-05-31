import { FunctionComponent, useEffect, useState } from 'react';
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '@elastic/eui';

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ProposalForm } from '../dto/common.dto';


const Index: FunctionComponent = () => {
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [balance, setBalance] = useState<number>(0);
  const [userProposal, setUserProposal] = useState<ProposalForm>
    ({ content_url: "", user_key: '', title: '', description: '' })

  useEffect(() => {
    if (!!account && !!library) {
      library.getBalance(account).then((value) => {
        setBalance(Number(value));
      });
    }
    setUserProposal({ ...userProposal, user_key: account })
  }, [account, library, chainId, active]);


  const onClickConnect = (e: React.MouseEvent<HTMLElement>) => { activate(injected) }


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
        </EuiHeaderLinks>
      </EuiHeader>

      <div>
        <div>지갑 주소</div>
        <div>{active ? `당신의 지갑 주소는 :${account}입니다` : "지갑을 연결해주세요."}</div>
        <div>{`잔액: ${balance} ETH`}</div>
      </div>

    </div>
  );
};


export default Index;
