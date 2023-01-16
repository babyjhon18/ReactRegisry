import React, { useEffect, useState } from "react";
import '..//RowElement//RowElement.css';
import readyImage from '..//..//images/ready.png';
import notReadyImage from '..//..//images/notReady.png';
import notOurDeliveryImage from '..//..//images/delivery.png';
import ourDeliveryImage from '..//..//images/ourDelivery.png';
import specificationImage from '..//..//images/specificationImage.png';
import settings from '..//..//images/settings.png';
import close from '..//..//images/close.png';
import { useSelector } from "react-redux";

function RowElement(props){  

    const [date, setDateFormat] = useState();
    const [clientName, setClientName] = useState();
    const store = useSelector(state => state.contractReduser)

    var mPopupSpecification = document.getElementById('mpopupBox');
    var dropdown = ""

    useEffect(() =>{
        let formattedDate = props.contract.contractDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        store.contracts.clients.find(element => { 
            if(element.id == props.contract.clientId){
                setClientName(element.name);
            }  
        })
        setDateFormat(formattedDate);
    })

    function specificationClicked(){
        var doc = new DOMParser().parseFromString(props.contract.htmlSpecification, "text/html");
        if(doc.firstChild.textContent != "null"){
            console.log(props.contract.description);
            let specificationDesc = document.getElementById('specificationDesc');
            specificationDesc.textContent = "Спецификация договора " + props.contract.description 
            let bar = document.getElementById('bar');
            bar.classList.add('zindex');
            mPopupSpecification.style.display = "block";
            let specification = document.getElementById('specificationDiv');
            specification.appendChild(doc.firstChild);
        }
    }

    function closeSpecification(){
        mPopupSpecification.style.display = "none"; 
        let specification = document.getElementById('specificationDiv');
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
        let child = specification.lastElementChild; 
        while (child) {
            specification.removeChild(child);
            child = specification.lastElementChild;
        }
    }

    function aboutContractHover(id){
        dropdown = document.getElementById('dropDownMenu' + id);
        dropdown.style.display = "block";
    }

    function closeSpecEvent(){
        closeSpecification();
    }

    window.onclick = function(event) {
        if (event.target == mPopupSpecification) {
            closeSpecification();
        }
    };

    return (
        <div style={{padding: "0px"}}>
            <div className="col-lg-12" id="mainDiv">
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1"
                    style={{minWidth: "30px", maxWidth: "44px"}}
                    onMouseLeave={() => dropdown.style.display = "none"} > 
                    <img  
                        className="click-style" 
                        id="aboutImg" 
                        src={settings}
                        onMouseOver={() => aboutContractHover(props.contract.id)}
                        ></img>
                    <div id={"dropDownMenu" + props.contract.id} className="dropDownMenu">
                        <div className="dropDownMenuItem">Акты
                        </div>
                        <div className="dropDownMenuItem">Готовность
                        </div>
                        <div className="dropDownMenuItem">Платежи
                        </div>
                    </div>
                </div>
                <div title={props.contract.description} className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "300px"}}>
                    {props.contract.description}
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "300px"}}>
                    {clientName}
                </div>
                <div title={props.contract.contractNumber} className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "100px"}}>
                    {props.contract.contractNumber}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "80px",margin: "auto 0px", margintop: "auto", maxWidth: "100px"}}>
                    {date}
                </div>
                <div title={props.contract.amount} className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "100px"}}>
                    {props.contract.amount}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "80px",margin: "auto 0px", maxWidth: "100px"}}>
                    {props.contract.percent}
                </div>
                <div title={props.contract.deadlineCondition} className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "100px",margin: "auto 0px", maxWidth: "150px"}}>
                    {props.contract.deadlineCondition}
                </div>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.signatureMark ? readyImage : notReadyImage} 
                    style={{minWidth: "50px", maxWidth: "50px"}}></img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.readyMark ? readyImage : notReadyImage} 
                    style={{minWidth: "50px", maxWidth: "50px"}}></img>
                <img className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" id="statusImg" 
                    src={props.contract.ourDelivery ? ourDeliveryImage : notOurDeliveryImage} 
                    style={{minWidth: "50px", maxWidth: "50px"}}></img>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{padding: "5px", minWidth: "50px", maxWidth: "50px"}}
                    onClick={() => specificationClicked()}>
                    <img className="click-style" id="specImg" 
                        src={specificationImage}
                        title="Спецификация"
                        >
                    </img>
                </div>
            </div>
            <div id="mpopupBox" class="mPopupSpecification">
                <div className="modal-background ">
                    <div className="specification-description">
                        <div id="specificationDesc"></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                        onClick={() => closeSpecEvent()}
                        ></img>
                    </div>
                    <div id="specificationDiv" className="specification-table"></div>
                </div>
            </div>
        </div>
    )
}

export default RowElement;