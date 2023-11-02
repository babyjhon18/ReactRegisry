import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_UPDATE_CONTRACT, EDIT_CTC, SERVER_LINK } from '../../Constants';
import '..//ReadyContract//ReadyContract.css';    

function ReadyContract(props){

    const clients = useSelector(state => state.contractReduser);
    const dispatch = useDispatch();

    async function saveCommentAndStatusOfContract(contract){
        let readyToWork = document.getElementById("ready" + contract.id);
        let notes = document.getElementById("notes" + contract.id).value;
        contract.notes = notes;
        contract.readyMark = readyToWork.checked;
        let dataToSend = contract;
        let clientIndex = clients.contracts.clients.findIndex((client) => client.id == contract.clientId);
        let clientName = clients.contracts.clients[clientIndex].fullName;
        let termIndex = clients.contracts.termsOfPayment.findIndex((paym) => paym.id == contract.termsOfPaymentId);
        let termsOfPaymentName = clients.contracts.termsOfPayment[termIndex].name;
        dataToSend.clientName = clientName;
        dataToSend.termsOfPaymentName = termsOfPaymentName;
        var data = await fetch(SERVER_LINK + DELETE_UPDATE_CONTRACT + contract.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            }).then((response) => {
                return response.json();
        });
        if(data != null){
            dispatch({type: EDIT_CTC, payload: contract})
        }
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
                        Готов к выдаче: &nbsp;<input id={"ready"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} defaultChecked></input>
                    </div> :
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов к выдаче: &nbsp;<input id={"ready"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"}></input>
                    </div>
                }
                <div className="row" style={{margin: "5px 0px"}}>
                    Комментарий: &nbsp;<textarea id={"notes"+props.contractDescription.id} 
                    className='NumberContractInputReadyToConst textAlignStart' type={"text"}>{props.contractDescription.notes}</textarea>
                </div>
             </div>
             <div style={{padding: "10px", margin: "auto", marginRight: "25px", minWidth: "80px", maxWidth: "100px"}}>
                <button type="button" id="addButton" 
                    className="btn col" 
                    onClick={() => saveCommentAndStatusOfContract(props.contractDescription)}>Сохранить</button> 
             </div>
        </div>
    );
}

export default ReadyContract;