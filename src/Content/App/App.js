import './App.css';
import MainPage from '../MainPage/MainPage.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';

class App extends Component {
  render(){
    return (
        <MainPage/>
    );
  }
}

export default App;
