import { FunctionComponent, useEffect, useState } from 'react';
import { ProposalForm } from '../dto/common.dto';
import axios from 'axios'
import ProposalElement from '../components/proposalElement/proposalElement';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import {
    EuiHeader, EuiHeaderSectionItem, EuiHeaderLogo, EuiHeaderLinks, EuiHeaderLink,
    EuiButton,
    EuiContextMenuPanel,
    EuiPopover,
    useGeneratedHtmlId,
} from '@elastic/eui';


const Collection: FunctionComponent = () => {
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
    const [proposalList, setProposalList] = useState<ProposalForm[]>([])

    useEffect(() => {
        axios.get('http://ec2-13-125-139-216.ap-northeast-2.compute.amazonaws.com/proposal')
            .then(response => {
                const data = response.data.data
                setProposalList(data);
            })
    }, [])

    useEffect(() => {
        if (!!account && !!library) {
            library.getBalance(account).then((value) => {
                setBalance(Number(value));
            });
        }
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
            onClick={onButtonClick}
        >
            내 지갑
        </EuiButton>
    );

    const closePopover = () => {
        setPopover(false);
    };

    const onClickConnect = (e: React.MouseEvent<HTMLElement>) => { activate(injected) }

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
                        anchorPosition="downLeft"
                    >
                        <EuiContextMenuPanel>
                            {active ? `당신의 지갑 주소는 :${account}입니다` : "지갑을 연결해주세요."}<br />
                            {`잔액: ${balance} ETH`}
                        </EuiContextMenuPanel>
                    </EuiPopover>
                </EuiHeaderLinks>
            </EuiHeader>
            {proposalList.map((element, index) => {
                return (
                    <ProposalElement key={index} description={element.description}
                        content_url={element.content_url}
                        user_key={element.user_key}
                        title={element.title} />
                )
            })}

        </div>

    );
};

export default Collection;
