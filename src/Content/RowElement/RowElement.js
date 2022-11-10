import React, { useEffect, useState } from "react";
import '..//RowElement//RowElement.css';
import readyImage from '..//..//images/ready.png';
import notReadyImage from '..//..//images/notReady.png';
import notOurDeliveryImage from '..//..//images/delivery.png';
import ourDeliveryImage from '..//..//images/ourDelivery.png';

function RowElement(props){  
    
    const [date, setDateFormat] = useState();

    const [signature, setSignatureStatus] = useState(notReadyImage);
    const [ready, setReady] = useState(notReadyImage);
    const [ourDelivery, setDelivery] = useState(notOurDeliveryImage);

    useEffect(() =>{
        let formattedDate = props.contract.contractDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
        if(props.contract.signatureMark){
            setSignatureStatus(readyImage)
        }
        if(props.contract.readyMark){
            setReady(readyImage)
        }   
        if(props.contract.ourDelivery){
            setDelivery(ourDeliveryImage)
        }   
    })

    return (
        <div className="col-lg-12" id="mainDiv">
            <div className="col-lg-2">
                {props.contract.description}
            </div>
            <div className="col-lg-1">
                {props.contract.contractNumber}
            </div>
            <div className="col-lg-1">
                {date}
            </div>
            <div className="col-lg-1">
                {props.contract.amount}
            </div>
            <div className="col-lg-1">
                {props.contract.percent}
            </div>
            <div className="col-lg-1">
                {props.contract.deadlineCondition}
            </div>
            <img className="col-lg-1" id="statusImg" src={signature}></img>
            <img className="col-lg-1" id="statusImg" src={ready}></img>
            <img className="col-lg-1" id="statusImg" src={ourDelivery}></img>
        </div>
    )
}

export default RowElement;