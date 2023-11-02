import { useDispatch, useSelector } from "react-redux";
import BlackListItem from "../BlackList/BlackListItem.js";
import "./BlackList.css";
import { useState } from "react";
import { isExistOnBlackList, ADD_CLIENT_TO_BLACK_LIST, SERVER_LINK, CREATE_GET_BLACK_LIST } from "../../Constants.js";

function BlackList(){

    const blackList = useSelector(state => state.contractReduser);
    const [showErrorIsExist, setError] = useState("none");
    const [errorMessage, setErrorMessage] = useState(isExistOnBlackList);
    const [enableButton, setButtonAvailability] = useState(true)
    const dispatch = useDispatch();

    const onChangeClient = () => {
        setButtonAvailability(false);
    }

    async function AddBadClient(){
        setErrorMessage(isExistOnBlackList);
        let companyToBlackList = document.getElementById('clientSelect');
        let fK_CompanyID = companyToBlackList.value;
        let companyName = companyToBlackList.options[companyToBlackList.selectedIndex].text;
        let dataToSend = {
            "companyName": companyName,
            "fK_CompanyID": fK_CompanyID
        }
        var isExists = blackList.contracts.blackListClients.findIndex((client) => client.fK_CompanyID == fK_CompanyID);
        if(isExists == -1){
            setError("none")
            var data = await fetch(SERVER_LINK + CREATE_GET_BLACK_LIST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(dataToSend),
            }).then((response) => {
                if(response.status == 200){
                    return response.json();
                }
                else{
                    return null;
                }
            });
            if(data != null){
                dataToSend["id"] = data;
                dispatch({type: ADD_CLIENT_TO_BLACK_LIST, payload: dataToSend});
            }
        }
        else{
            setError("block")
        }
        
    }

    return(
        <div style={{padding: "5px"}}>
            <div className="row selectorForm">
                <div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 col-xl-10" 
                    style={{padding: "5px", margin:"0px"}}>
                    <select id="clientSelect" className="form-control" onChange={onChangeClient}>
                        <option value="-1" selected="true" disabled="disabled">Выберите клиента для добавления в черный список...</option>
                            {
                                blackList.contracts.clients && blackList.contracts.clients.map((client, index) => ( 
                                    <option key={index} value={client.id}>{client.name}</option>
                                )) 
                            }
                    </select> 
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{padding: "5px"}}>
                    <button type="button" id="addButton" disabled={enableButton} onClick={() => AddBadClient()}>
                        Добавить 
                    </button>
               </div>
            </div>
            <div className="listBody">
            {
                blackList.blackList &&  blackList.blackList.map((element, index) => (
                    <BlackListItem key={index} props={element}></BlackListItem>
                ))
            }
            </div>
            <div style={{display: showErrorIsExist}}>
                {errorMessage}
            </div>
        </div>
    )
}

export default BlackList;