import { useDispatch, useSelector } from 'react-redux';
import { DELETE_UPDATE_CONTRACT, EDIT_CTC, NOTIFICATION_LINK, SERVER_LINK, SET_MESSAGE_STATE } from '../../Constants';
import '..//ReadyContract//ReadyContract.css';    
import close from '../../images/close.png'
import MessageComponent from '../MessageComponent/MessageComponent';
import { useEffect } from 'react';
import { useState } from 'react';

function ReadyContract(props){

    const clients = useSelector(state => state.contractReduser);
    const messages = useSelector(state => state.messagesReduser)
    const dispatch = useDispatch();
    const [readyState, setReadyState] = useState();
    const [readyNotes, setReadyNotes] = useState(); 
    var mPopupNot = "";
    var _contract = props.contractDescription;

    useEffect(()=> {
        if(messages.isAccepted){
            saveCommentAndStatusOfContract(messages.contract, messages.sendNotification);
        }
    },[messages])

    async function Notification(contract){
        var dataToSend = {
            "clientId": contract.clientId,
            "contractId": contract.id,
            "readyDate": new Date().toJSON()
        }
        await fetch(SERVER_LINK + NOTIFICATION_LINK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            }).then((response) => {
                closeMessageView(contract.id); 
                console.log(response);
        });
    }

    async function saveCommentAndStatusOfContract(contract, sendNotification){
        contract.notes = readyNotes;
        if(contract.readyMark){
            contract.readyMark = true;
        }else{
            contract.readyMark = readyState;
        }
        let dataToSend = contract;
        let clientIndex = clients.contracts.clients.findIndex((client) => client.id == contract.clientId);
        let clientName = clients.contracts.clients[clientIndex].fullName;
        let termIndex = clients.contracts.termsOfPayment.findIndex((paym) => paym.id == contract.termsOfPaymentId);
        let termsOfPaymentName = clients.contracts.termsOfPayment[termIndex].name;
        dataToSend.clientName = clientName;
        dataToSend.termsOfPaymentName = termsOfPaymentName;
        dispatch({type: SET_MESSAGE_STATE, payload: {accepted: false, ready: true, sendNotification: sendNotification, contract: contract}});
        console.log(dataToSend);
        await fetch(SERVER_LINK + DELETE_UPDATE_CONTRACT + contract.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            }).then(async (response) => {
                if(response.json() != null){
                    dispatch({type: EDIT_CTC, payload: contract})
                    if(messages.contract.readyMark){
                        if(messages.sendNotification){
                            console.log(messages.sendNotification)
                            await Notification(contract)
                            closeMessageView(contract.id); 
                        }
                        else{
                            closeMessageView(contract.id); 
                        }
                    }   
            }
        });
    }

    function onReadyClicked(contract){
        let readyToWork = document.getElementById("ready" + contract.id);
        if(readyToWork.checked){
            _contract = contract;
            let messageDescription = document.getElementById("messageDescription" + contract.id);
            messageDescription.textContent = "Уведомление заказчика " + props.contractDescription.description;
            let bar = document.getElementById('bar');
            bar.classList.add('zindex');
            mPopupNot = document.getElementById('mpopupMessage' + contract.id);
            mPopupNot.style.display = "block";
            dispatch({type: SET_MESSAGE_STATE, payload: {accepted: false, ready: false, sendNotification: false, contract: contract}});
        }   
        else{
            contract.readyMark = false;
            saveCommentAndStatusOfContract(contract);
        }
    }

    function closeMessageView(id){
        document.getElementById('mpopupMessage' + id).style.display = "none";
    }

    const onChangeCheckHandler = (e) =>{
        if(e.target.checked) setReadyState(e.target.checked);
        else setReadyState(e.target.checked);
    }

    const onChangeNoteHandler = (e) =>{
        setReadyNotes(e.target.value);
    }

    return(
        <div className='mainReady'>
             <div className='addNewAct' id={props.id}>
             <div className="row" style={{margin: "5px 0px"}}>
                    Комментарий к производству: {(props.contractDescription.comment !== "" &&
                         props.contractDescription.comment !== null) ? props.contractDescription.comment : 
                         "нет комментария"}
                    </div>
                {
                    props.contractDescription.readyMark == true ? 
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов: &nbsp;<input id={"ready"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} defaultChecked onChange={onChangeCheckHandler}></input>
                    </div> :
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов: &nbsp;<input id={"ready"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} onChange={onChangeCheckHandler}></input>
                    </div>
                }
                <div className="row" style={{margin: "5px 0px"}}>
                    Комментарий: &nbsp;<textarea id={"notes"+props.contractDescription.id} 
                    className='NumberContractInputReadyToConst textAlignStart' type={"text"}
                     onChange={onChangeNoteHandler} defaultValue={props.contractDescription.readyComment}></textarea>
                </div>
             </div>
             <div style={{padding: "10px", margin: "auto", marginRight: "25px", minWidth: "80px", maxWidth: "100px"}}>
                <button type="button" id="addButton" 
                    className="btn col" 
                    onClick={() => onReadyClicked(props.contractDescription)}>Сохранить</button> 
             </div>
             <div id={"mpopupMessage" + props.contractDescription.id} class="mPopupSpecification">
                <div className="modal-background-sign">
                    <div className="specification-description">
                        <div id={"messageDescription" + _contract.id}></div>
                        <img className="close-img" src={close} width={"40px"} height={"40px"}
                                onClick={() =>{ closeMessageView(props.contractDescription.id) }}></img>
                    </div> 
                        <MessageComponent messageText={"Заказчику будет отправлено электронное письмо о готовности оборудования. Уверены, что хотите продолжить?"}
                            id={props.contractDescription.id}
                            contract={props.contractDescription}></MessageComponent>
                   
                </div>
            </div>
        </div>
    );
}

export default ReadyContract;