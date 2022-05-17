import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core'
import { EuiFlexGroup, EuiFlexItem, EuiButton, EuiDescriptionList, EuiPanel } from "@elastic/eui";
import { useEffect, useState } from 'react';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

function Connect() {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        if(!!account && !!library) {
            library.getBalance(account).then(value => {
                console.log(value);
                setBalance(value.toString());
            })
        }
    }, [account, library, chainId, active])

    const connectWallet = () => {
        activate(injected);
    }
    
    return (
        <EuiFlexGroup direction={'column'} style={{ width: '50%' }}>
            <EuiFlexItem>
                <EuiButton onClick={() => connectWallet() }>지갑 연결하기</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiPanel hasShadow={false} hasBorder={true}>
                    <EuiDescriptionList listItems={[
                        { title: '지갑 주소', description: active ? "당신의 지갑 주소는 : " + account + " 입니다." : "지갑을 연결해주세요." },
                        { title: "잔액", description: `${balance} ETH`}
                    ]} />
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    )
}

export default Connect;