import './App.css';
import MainPage from '../MainPage/MainPage.js'
import React, { Component, useEffect } from 'react';
import {useSelector} from 'react-redux';

function App(){
    const contracts = useSelector(state => state.contractReduser);
    useEffect(()=>{console.log(contracts)},[contracts])
    return (
        <MainPage contract={contracts} />
    );
}

export default App;
