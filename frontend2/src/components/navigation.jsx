import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiDescriptionList,
    EuiPanel,
} from "@elastic/eui";
import { useEffect, useState } from "react";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
    ) {
        return "Please authorize this website to access your Ethereum account.";
    } else {
        return "An unknown error occurred. Check the console for more details.";
    }
}

export const Navigation = (props) => {
    const context = useWeb3React();
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error,
    } = context;
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        if (!!account && !!library) {
            library.getBalance(account).then((value) => {
                console.log(value);
                setBalance(value.toString());
            });
        }
    }, [account, library, chainId, active]);

    const connectWallet = () => {
        activate(injected);
    };

    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        {" "}
                        <span className="sr-only">Toggle navigation</span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top">
                        Daily DAO
                    </a>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#features" className="page-scroll"></a>
                        </li>
                        <li>
                            <a href="#about" className="page-scroll"></a>
                        </li>
                        <li>
                            <a href="#services" className="page-scroll">
                                GOVERNANCE
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" className="page-scroll">
                                COLLECTION
                            </a>
                        </li>
                        <li>
                            <a href="#testimonials" className="page-scroll">
                                PROPOSAL
                            </a>
                        </li>
                        <li>
                            <a href="#team" className="page-scroll">
                                Team
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="page-scroll">
                                Contact
                            </a>
                        </li>
                        {/* <EuiFlexGroup direction={'column'} style={{ width: '20%' }}>
              <EuiFlexItem>
                <EuiButton onClick={() => connectWallet()}>지갑 연결하기</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel hasShadow={false} hasBorder={true}>
                  <EuiDescriptionList listItems={[
                    { title: '지갑 주소', description: active ? "당신의 지갑 주소는 : " + account + " 입니다." : "지갑을 연결해주세요." },
                    { title: "잔액", description: `${balance} ETH` }
                  ]} />
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup> */}
                        <div>
                            {(active || error) && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        deactivate();
                                    }}
                                >
                                    Deactivate
                                </button>
                            )}

                            {!!error && (
                                <h4
                                    style={{
                                        marginTop: "1rem",
                                        marginBottom: "0",
                                    }}
                                >
                                    {getErrorMessage(error)}
                                </h4>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
