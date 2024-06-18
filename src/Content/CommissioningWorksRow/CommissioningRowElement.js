import React, { useEffect, useState } from "react";
import './CommissioningRowElement.css';
import attention from '..//..//images/attentionBlackList.png';
import notOurDeliveryImage from '..//..//images/delivery.png';
import ourDeliveryImage from '..//..//images/ourDelivery.png';
import specificationImage from '..//..//images/specificationImage.png';
import settings from '..//..//images/settings.png';
import close from '..//..//images/close.png';
import alarm from '..//..//images/alarm.png';
import { useSelector } from "react-redux";
import ActOfContract from '../ActsOfContract/ActsOfContract';
import ContractsPayments from '../ContractPayments/ContractsPayments';
import SignContract from "../SignContract/SignContract";
import ReadyContract from "../ReadyContract/ReadyContract";
import ManufacturerNotes from "../ManufacturerNotes/ManufacturerNotes"
import * as formulajs from '@formulajs/formulajs'

//0 день - день отгрузки! Считать включая текущий день!
function CommissioningRowElement(props){  

    const [finalDate, setFinalDateFormat] = useState();
    const [clientName, setClientName] = useState(); 
    const [termsOfPaymentName, setTermsOfPaymentName] = useState(); 
    const [daysLeft, setDaysLeft] = useState();
    const [paymentPercent, setPaymentPercent] = useState();
    const store = useSelector(state => state.contractReduser)

    var mPopupSpecification = document.getElementById('mpopupBox')
    var currentContractId = props.contract.contract.id;
    var mPopupActs = "";
    var mPopupPayments = "";
    var mpopupSign = "";
    var mpopupReady = "";
    var dropdown = "";
    var attentionIcon;
    var startDateDeadLineDate = new Date(props.contract.contract.signDate);
    var currentDay = new Date();
    var finalDateDeadLineDate = new Date(props.contract.contract.signDate);
    var finalDateDeadLineDateFormated = new Date(props.contract.contract.signDate);
    var bgNotesColor = props.contract.contract.manufacturingLeadNoteColor;
    const actToClose = "Акты";
    const paymentToClose = "Оплаты"

    useEffect(() =>{
        startDateDeadLineDate.toLocaleDateString('en-US');
        currentDay.setDate(currentDay.getDate() + 1);
        currentDay.toLocaleDateString('en-US');
        if(props.contract.contract.deadLineDayType == "календарных дней"){
            
            finalDateDeadLineDate.setDate(startDateDeadLineDate.getDate() + props.contract.contract.deadLine);

            finalDateDeadLineDateFormated = finalDateDeadLineDate;
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.toJSON();
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.split('T')[0];
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.split('-').reverse().join('.');
            setFinalDateFormat(finalDateDeadLineDateFormated);
            finalDateDeadLineDate.toLocaleDateString('en-US');
            var daysLeftCount = formulajs.DAYS(finalDateDeadLineDate, currentDay)
        }
        else{
            var bankDaysWithRest = props.contract.contract.deadLine % 5;
            var bankDaysNumber = props.contract.contract.deadLine / 5;
            finalDateDeadLineDate.setDate(startDateDeadLineDate.getDate() + ((bankDaysNumber * 7) + (bankDaysWithRest)));
            finalDateDeadLineDate.toLocaleDateString('en-US');

            finalDateDeadLineDateFormated = finalDateDeadLineDate;
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.toJSON();
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.split('T')[0];
            finalDateDeadLineDateFormated = finalDateDeadLineDateFormated.split('-').reverse().join('.');
            setFinalDateFormat(finalDateDeadLineDateFormated);

            var daysLeftCount = formulajs.DAYS(finalDateDeadLineDate, currentDay)
        }
        SetDescriptionColors(daysLeftCount)
        
        let formattedDate = props.contract.contract.contractDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        store.contracts.clients.find(element => { 
            if(element.id == props.contract.contract.clientId){
                setClientName(element.fullName);
            }  
        });
        store.contracts.termsOfPayment.find(element => {
            if(element.id == props.contract.contract.termsOfPaymentId){
                setTermsOfPaymentName(element.name);
            }  
        })
        //setDateFormat(formattedDate);
        if(props.contract.payments.length != 0){
            let wholePayment = 0;
            props.contract.payments.forEach((payment) => {
                wholePayment += parseFloat(payment.paymentSum);
            });
            setPaymentPercent(Math.round(wholePayment / props.contract.contract.amount * 100)); 
        }
        else{
            setPaymentPercent("");
        }
    }, [store])

    function SetDescriptionColors(daysLeftCount){
        var element = document.getElementById('mainDiv' + props.contract.contract.id);
        element.classList.remove("alarmColor");
        element.classList.remove("shouldBeDoneSoon");
        element.classList.remove("alarmAnimation");
        if(store.currentTab != 3){
            if(daysLeftCount == 0){
                setDaysLeft("Отгрузка!")
            }
            if (daysLeftCount > 10){
                setDaysLeft(daysLeftCount)
                element.classList.remove("alarmColor");
                element.classList.remove("shouldBeDoneSoon");
                element.classList.remove("alarmAnimation");
            }
            if(daysLeftCount <= 10){
                setDaysLeft(daysLeftCount)
                element.classList.remove("alarmColor");
                element.classList.add("shouldBeDoneSoon");
                element.classList.remove("alarmAnimation");
            } 
            if(daysLeftCount <= 5){
                setDaysLeft(daysLeftCount)
                element.classList.add("alarmColor");
                element.classList.remove("shouldBeDoneSoon");
                element.classList.remove("alarmAnimation");
            } 
            if(daysLeftCount <= 0 && props.contract.contract.readyMark == false){
                setDaysLeft(daysLeftCount);
                element.classList.add("alarmAnimation");
                element.classList.remove("shouldBeDoneSoon");
                element.classList.remove("alarmColor");
            } 
        }
        else{
            setDaysLeft("Отдан")
        }
    }

    function onNotesClick(id){
        let readyDescription = document.getElementById("notesDescription" + props.contract.contract.id);
        readyDescription.textContent = "Заметки для " + props.contract.contract.description;
        let bar = document.getElementById('bar');
        bar.classList.add('zindex');
        mpopupReady = document.getElementById('mpopupNotes' + id);
        mpopupReady.style.display = "block";
    }


    function onReadyClick(id){
        let readyDescription = document.getElementById("readyDescription" + props.contract.contract.id);
        readyDescription.textContent = "Готовность заказа " + props.contract.contract.description;
        let bar = document.getElementById('bar');
        bar.classList.add('zindex');
        mpopupReady = document.getElementById('mpopupReady' + id);
        mpopupReady.style.display = "block";
    }

    function onSignClicked(id){
        let signDescription = document.getElementById("signDescription" + props.contract.contract.id);
        signDescription.textContent = "Подпись договора " + props.contract.contract.description;
        let bar = document.getElementById('bar');
        bar.classList.add('zindex');
        mpopupSign = document.getElementById('mpopupSign' + id);
        mpopupSign.style.display = "block";
    }

    function specificationClicked(){
        var doc = new DOMParser().parseFromString(props.contract.contract.htmlSpecification, "text/html");
        if(doc.firstChild.textContent != "null" && doc.firstChild.textContent != ""){
            let specificationDesc = document.getElementById('specificationDesc');
            specificationDesc.textContent = "Спецификация договора " + props.contract.contract.description 
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

    function onActClicked(id){
        currentContractId = id;
        let actDescription = document.getElementById("actDescription" + id);
        actDescription.textContent = "Накладные по договору " + props.contract.contract.description;
        let bar = document.getElementById('bar');
        bar.classList.add('zindex');
        mPopupActs = document.getElementById('mpopupActs' + id);
        mPopupActs.style.display = "block";
    }

    function onPaymentClicked(id){
        currentContractId = id;
        let paymentDescription = document.getElementById("paymentDescription" + id);
        paymentDescription.textContent = "Оплаты по договору " + props.contract.contract.description;
        let bar = document.getElementById('bar');
        bar.classList.add('zindex');
        mPopupPayments = document.getElementById('mpopupPayment' + id);
        mPopupPayments.style.display = "block";
    }

    function closeSpecEvent(){
        closeSpecification();
    }

    function closeActs(){
        mPopupActs = document.getElementById('mpopupActs' + currentContractId)
        mPopupActs.style.display = "none"; 
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
    }

    function closePayment(){
        mPopupPayments = document.getElementById('mpopupPayment' + currentContractId)
        mPopupPayments.style.display = "none"; 
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
    }

    function closeSignView(){
        mpopupSign = document.getElementById('mpopupSign' + currentContractId)
        mpopupSign.style.display = "none"; 
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
    }

    function closeReadyView(){
        mpopupReady = document.getElementById('mpopupReady' + currentContractId)
        mpopupReady.style.display = "none"; 
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
    }

    function closeNotesView(){
        mpopupReady = document.getElementById('mpopupNotes' + currentContractId)
        mpopupReady.style.display = "none"; 
        let bar = document.getElementById('bar');
        bar.classList.remove('zindex');
    }

    window.onclick = function(event) {
        if (event.target == mPopupSpecification) {
            closeSpecification();
        }
        else{
            mPopupActs = document.getElementById(event.target.id);
            mPopupPayments = document.getElementById(event.target.id);
            if(mPopupActs.textContent.indexOf(actToClose !== -1)){
            }
            if(mPopupPayments.textContent.indexOf(paymentToClose !== -1)){
            }
        }
    };

    store.blackList.find(element => { 
        if(element.fK_CompanyID == props.contract.contract.clientId){
            attentionIcon = true;
        }    
    }) 

    var documentSpecification = new DOMParser().parseFromString(props.contract.contract.htmlSpecification, "text/html");

    return (
        <div style={{padding: "0px"}}>
            <div className="col-lg-12 mainDiv" id={"mainDiv"+props.contract.contract.id}>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1"
                    style={{minWidth: "30px", maxWidth: "44px", position: "static"}}
                    onMouseLeave={() => dropdown.style.display = "none"} > 
                    <img  
                        className="click-style" 
                        id="aboutImg" 
                        src={settings}
                        onMouseOver={() => aboutContractHover(props.contract.contract.id)}
                        ></img>
                    <div id={"dropDownMenu" + props.contract.contract.id} className="dropDownMenu">
                        <div className="dropDownMenuItem"
                            onClick={() => onActClicked(props.contract.contract.id)}>Акты
                        </div>
                        <div className="dropDownMenuItem"
                            onClick={() => onPaymentClicked(props.contract.contract.id)}>Платежи
                        </div>
                        {
                            store.currentTab == 0 ?
                            <div>
                                <div className="dropDownMenuItem"
                                    onClick={() => onSignClicked(props.contract.contract.id)}>Отметка о подписи
                                </div>
                            </div>
                            : 
                            <div className="dropDownMenuItem"
                                onClick={() => onReadyClick(props.contract.contract.id)}>Отметка о готовности
                            </div> 
                        } 
                        {
                            store.currentTab == 0 ?
                            <div>
                            </div>
                            : 
                            <div className="dropDownMenuItem"
                                onClick={() => onNotesClick(props.contract.contract.id)}>Заметки
                            </div> 
                        }
                    </div>
                </div>
                <div title={props.contract.contract.manufacturingLeadNotes} className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3" 
                    style={{borderRadius: "5px", minWidth: "120px", margin: "auto 0px", maxWidth: "260px", textAlign: "justify",
                        backgroundColor: bgNotesColor}}>
                    {props.contract.contract.manufacturingLeadNotes}
                </div>
                <div title={props.contract.contract.contractNumber} className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "50px", margin: "auto 0px", maxWidth: "80px"}}>
                    {props.contract.contract.contractNumber}
                </div>
                <div title={props.contract.contract.description} className="co2-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "100px", margin: "auto 0px", maxWidth: "250px"}}>
                    {props.contract.contract.description}
                </div>
                <div title={clientName}
                    className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "220px"}}>
                    {clientName} 
                    {
                        attentionIcon ?  
                        <img style={{padding: "2px", margin: "5px 5px", width: "25px", height: "25px" }} src={attention} title="Черный список клиентов!"></img>
                        : <div></div> 
                    }
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{margin: "auto 0px",maxWidth: "150px",minWidth: "140px"}}>
                    { daysLeft != 0 ? daysLeft + " дней(я)" : "Отгрузка!"}
                    { 
                        daysLeft < 0 ? <img title="И так сойдет!" style={{height: "35px", width: "35px"}} src={alarm}></img> : <div></div>
                    }
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{margin: "auto 0px",minWidth: "70px", maxWidth: "100px"}}>
                    {finalDate}
                </div>
                <div title={props.contract.contract.amount} className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "80px", margin: "auto 0px", maxWidth: "100px"}}>
                    {props.contract.contract.amount}
                </div>
                <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                    style={{minWidth: "30px",margin: "auto 0px", maxWidth: "50px"}}>
                    {paymentPercent}
                </div>
                <div title={termsOfPaymentName} className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "80px",margin: "auto 0px", maxWidth: "200px"}}>
                    {termsOfPaymentName}
                </div>
                {
                    documentSpecification.firstChild.textContent != "null" && documentSpecification.firstChild.textContent != "" ? 
                    (<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" 
                        style={{padding: "5px", minWidth: "50px", maxWidth: "50px"}}
                        onClick={() => specificationClicked()}>
                            <img className="click-style" id="specImg" 
                                src={specificationImage}
                                title="Спецификация"
                                >
                            </img>
                        </div>)
                    :
                    (<div></div>)
                }
            </div>
            <div id="mpopupBox" class="mPopupSpecification">
                <div className="modal-background-specification">
                    <div className="specification-description">
                        <div id="specificationDesc"></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                        onClick={() => closeSpecEvent()}
                        ></img>
                    </div>
                    <div id="specificationDiv" className="specification-table"></div>
                </div>
            </div>
            <div id={"mpopupActs" + props.contract.contract.id} class="mPopupSpecification">
                <div className="modal-background-acts">
                    <div className="specification-description">
                        <div id={"actDescription" + props.contract.contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                            onClick={() =>{ closeActs() }}></img>
                    </div>
                    <ActOfContract acts={props.contract.acts} id={props.contract.contract.id}></ActOfContract>
                </div>
            </div>
            <div id={"mpopupPayment" + props.contract.contract.id} class="mPopupSpecification">
                <div className="modal-background-acts">
                    <div className="specification-description">
                        <div id={"paymentDescription" + props.contract.contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                            onClick={() =>{ closePayment() }}></img>
                    </div>
                    <ContractsPayments payments={props.contract.payments} id={props.contract.contract.id}></ContractsPayments>
                </div>
            </div>
            <div id={"mpopupSign" + props.contract.contract.id} class="mPopupSpecification">
                <div className="modal-background-sign">
                    <div className="specification-description">
                        <div id={"signDescription" + props.contract.contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                                onClick={() =>{ closeSignView() }}></img>
                    </div>
                        <SignContract contractDescription={props.contract.contract} id={props.contract.contract.id}></SignContract> 
                    </div>
            </div>
            <div id={"mpopupReady" + props.contract.contract.id} class="mPopupSpecification">
                <div className="modal-background-sign">
                    <div className="specification-description">
                        <div id={"readyDescription" + props.contract.contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                                onClick={() =>{ closeReadyView() }}></img>
                    </div> 
                        <ReadyContract contractDescription={props.contract.contract}
                            id={props.contract.contract.id}></ReadyContract>
                   
                </div>
            </div>
            <div id={"mpopupNotes" + props.contract.contract.id} class="mPopupSpecification">
                <div className="modal-background-sign">
                    <div className="specification-description">
                        <div id={"notesDescription" + props.contract.contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                                onClick={() =>{ closeNotesView() }}></img>
                    </div> 
                        <ManufacturerNotes contractDescription={props.contract.contract}
                            id={props.contract.contract.id}></ManufacturerNotes>
                   
                </div>
            </div>
        </div>
    )
}

export default CommissioningRowElement;