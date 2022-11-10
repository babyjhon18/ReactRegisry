import React from 'react';
import Body from '../Body/Body.js'
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import '../MainPage/MainPage.css'

//import workPlanImage from '../../images/checkList.png'
//import contractImage from '../../images/contract.png'

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