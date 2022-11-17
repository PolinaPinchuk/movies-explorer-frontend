import React from 'react'
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from '../NavTab/NavTab';

function Main() {
    return (
        <>
            <Promo />
            <NavTab />
            <div name='about-project' /> 
            <AboutProject />
            <div name='techs' />
            <Techs />
            <div name='about-me' />
            <AboutMe />
            <Portfolio />
        </>
    );
}

export default Main;