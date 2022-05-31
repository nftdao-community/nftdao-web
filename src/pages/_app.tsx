import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui';



function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const EuiApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <EuiProvider colorMode="light">
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  </EuiProvider>
);

export default EuiApp;
