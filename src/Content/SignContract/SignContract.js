import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CTC } from '../../Constants';
import '..//SignContract//SignContract.css';    

function SignContract(props){

    const clients = useSelector(state => state.contractReduser)
    const dispatch = useDispatch();

    async function saveCommentAndStatusOfContract(contract){
        let readyToWork = document.getElementById("readyToWork" + contract.id);
        let comment = document.getElementById("comment" + contract.id).value;
        contract.comment = comment;
        contract.signatureMark = readyToWork.checked;
        let dataToSend = contract;
        let clientIndex = clients.contracts.clients.findIndex((client) => client.id == contract.clientId);
        let clientName = clients.contracts.clients[clientIndex].name;
        let termIndex = clients.contracts.termsOfPayment.findIndex((paym) => paym.id == contract.termsOfPaymentId);
        let termsOfPaymentName = clients.contracts.termsOfPayment[termIndex].name;
        dataToSend.clientName = clientName;
        dataToSend.termsOfPaymentName = termsOfPaymentName;
        var data = await fetch('http://37.17.58.180:8087/api/Contracts?contractId=' + contract.id, {
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
        <div>
             <div className='addNewAct' id={props.id}>
                {
                    props.contractDescription.signatureMark == true ? 
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов к производству: &nbsp;<input id={"readyToWork"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"} defaultChecked></input>
                    </div> :
                    <div className="row" style={{margin: "5px 0px"}}>
                        Готов к производству: &nbsp;<input id={"readyToWork"+props.contractDescription.id} 
                        className='checkInput' type={"checkbox"}></input>
                    </div>
                }
                <div className="row" style={{margin: "5px 0px"}}>
                    Комментарий: &nbsp;<textarea id={"comment"+props.contractDescription.id} 
                    className='NumberContractInputReadyToConst textAlignStart' type={"text"}>{props.contractDescription.comment}</textarea>
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