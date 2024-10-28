import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_UPDATE_CONTRACT, EDIT_CTC, SERVER_LINK } from '../../Constants';
import '..//ManufacturerNotes//ManufacturerNotes.css';    

function SignContract(props){

    const clients = useSelector(state => state.contractReduser)
    const dispatch = useDispatch();
    
    async function saveCommentAndStatusOfContract(contract){ 
        let noteColor = document.getElementById("noteColor" + contract.id).value;
        let notes = document.getElementById("manufacturerNotes" + contract.id).value;
        contract.manufacturingLeadNoteColor = noteColor;
        contract.manufacturingLeadNotes = notes;
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
        <div className='mainSign'>
             <div className='addNewAct' id={props.id}>
                <div style={{margin: "0px 0px", display: 'flex', alignItems: 'center'}}>
                    Цвет:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input id={"noteColor"+props.contractDescription.id} style={{padding: "0px"}}
                    type='color'></input>
                </div>
                {/* {props.contractDescription.manufacturingLeadNotes} */}
                <div className="row" style={{margin: "5px 0px"}}>
                    Заметка:&nbsp;<textarea id={"manufacturerNotes"+props.contractDescription.id} 
                    className='NumberContractInputReadyToConst textAlignStart' type={"text"}></textarea>
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

export default SignContract;