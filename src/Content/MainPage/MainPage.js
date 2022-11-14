import React from 'react';
import Body from '../Body/Body.js'
import Header from '../Header/Header.js';
import '../MainPage/MainPage.css'

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <Header></Header>
            <Body></Body>
        </div>
    }
}

export default MainPage;