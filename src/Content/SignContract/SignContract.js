import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_UPDATE_CONTRACT, EDIT_CTC, SERVER_LINK } from '../../Constants';
import '..//SignContract//SignContract.css';    

function SignContract(props){

    const clients = useSelector(state => state.contractReduser)
    const dispatch = useDispatch();
    const [dateTime, setDate] = useState(new Date()); 
    const [signMark, setSignMark] = useState(); 
    
    async function saveCommentAndStatusOfContract(contract){ 
        let readyToWorkDate = document.getElementById("readyToWorkDate" + contract.id).value;
        let readyToWork = document.getElementById("readyToWork" + contract.id).checked;
        let comment = document.getElementById("comment" + contract.id).value;
        let sawContract = document.getElementById("sawContract" + contract.id).checked;
        let contractSawBy = document.getElementById("contractSawBy" + contract.id).value;
        contract.comment = comment;
        contract.signatureMark = readyToWork;
        contract.signDate = readyToWorkDate;
        contract.sawContract = sawContract;
        contract.contractAcceptedBy = contractSawBy;
        let dataToSend = contract;
        console.log(dataToSend);
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

    useEffect(()=>{
        setDate(props.contractDescription.signDate.split('T')[0]);
        setSignMark(props.contractDescription.contractAcceptedBy);
    },[clients])

    const handleInputChange = (e) => {
        setDate(e.target.value)
    }

    return(
        <div className='mainSign'>
             <div className='addNewAct' id={props.id}>
                {
                    props.contractDescription.signatureMark ? (
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов к производству: &nbsp;<input id={"readyToWork"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} defaultChecked></input>
                    </div> ):
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов к производству: &nbsp;<input id={"readyToWork"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"}></input>
                    </div>
                }
                <div className="row" style={{margin: "5px 0px"}}>
                    Комментарий: &nbsp;<textarea id={"comment"+props.contractDescription.id} 
                    className='NumberContractInputReadyToConst textAlignStart' type={"text"}></textarea>
                </div>
                {
                    props.contractDescription.sawContract ? (
                    <div className="row" style={{margin: "5px 0px"}}>
                        Договор подписан: &nbsp;<input id={"sawContract"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} defaultChecked></input>
                    </div> ):
                    <div className="row" style={{margin: "5px 0px"}}>
                        Договор подписан: &nbsp;<input id={"sawContract"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"}></input>
                    </div>
                }
                <div className='date-time' style={{margin: "0px 0px", display: 'flex', alignItems: 'center'}}>
                    Дата подписания: &nbsp;<input id={"readyToWorkDate"+props.contractDescription.id} 
                    type='date' className='datetime-pickers' onChange={handleInputChange} value={dateTime}></input>
                </div>
                <div className="row" style={{margin: "5px 0px"}}>
                    Утверждён: &nbsp; <textarea id={"contractSawBy"+props.contractDescription.id} 
                        placeholder='Фамилия Имя Отчество, утвердившего договор'
                        className='NumberContractInputReadyToConst textAlignStart' type={"text"}>{signMark}</textarea>
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