import React, { useEffect, useState } from "react";
import '..//RowElement//RowElement.css';
import readyImage from '..//..//images/ready.png';
import notReadyImage from '..//..//images/notReady.png';
import notOurDeliveryImage from '..//..//images/delivery.png';
import ourDeliveryImage from '..//..//images/ourDelivery.png';
import specificationImage from '..//..//images/specificationImage.png';
import settings from '..//..//images/settings.png';

function RowElement(props){  

    const [date, setDateFormat] = useState();

    var mpopup = document.getElementById('mpopupBox');

    useEffect(() =>{
        let formattedDate = props.contract.contractDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    })

    function specificationClicked(){
        mpopup.style.display = "block";
        var specification = document.getElementById('specificationDiv');
        var doc = new DOMParser().parseFromString(props.contract.htmlSpecification, "text/html");
        specification.appendChild(doc.firstChild);
    }

    window.onclick = function(event) {
        if (event.target == mpopup) {
            mpopup.style.display = "none"; 
            var specification = document.getElementById('specificationDiv');
            var child = specification.lastElementChild; 
            while (child) {
                specification.removeChild(child);
                child = specification.lastElementChild;
            }
        }
    };

    return (
        <div>
            <div className="col-lg-12" id="mainDiv">
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2">
                    {props.contract.description}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                    {props.contract.contractNumber}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                    {date}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                    {props.contract.amount}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                    {props.contract.percent}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                    {props.contract.deadlineCondition}
                </div>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.signatureMark ? readyImage : notReadyImage}></img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.readyMark ? readyImage : notReadyImage}></img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.ourDelivery ? ourDeliveryImage : notOurDeliveryImage}></img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={specificationImage}
                    onClick={() => specificationClicked()}>
                </img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" src={settings}></img>
            </div>
            <div id="mpopupBox" class="mpopup">
                <div id="specificationDiv"></div>
            </div>
        </div>
    )
}

export default RowElement;