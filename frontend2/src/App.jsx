import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
// import Gallery from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import  Testimonials from "./pages/Proposal/index.jsx";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import Connect from "./components/connect";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import React from "react";

import { BrowserRouter, BrowserRouter as Router, Route } from "react-router-dom";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { Browser } from "@elastic/eui/src/services/browser/browser";

function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const App = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div>
                <Navigation />
                
                <Header data={landingPageData.Header} />
                <BrowserRouter>
                <Features data={landingPageData.Features} />
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
                <Gallery data={landingPageData.Gallery} />
                <Testimonials data={landingPageData.Testimonials} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
                    <Route path="/wallet/connect">
                        <Connect />
                    </Route>
                </BrowserRouter>
            </div>
        </Web3ReactProvider>
    );
};

export default App;
