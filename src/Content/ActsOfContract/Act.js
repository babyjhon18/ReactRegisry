import './Act.css';
import { useEffect, useState } from 'react';
import penImage from '..//..//images/penEdit.png';
import deleteImage from '..//..//images/trashCanDelete.png';
import { DELETE_ACT, DELETE_UPDATE_ACT, EDIT_ACT, SERVER_LINK } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';

function Act(props){

    const dispatch = useDispatch();
    const [date, setDateFormat] = useState();
    const [dateTime, setDate] = useState(new Date());
    const store = useSelector(state => state.contractReduser);

    function deleteActs(actInfo){
        fetch(SERVER_LINK + DELETE_UPDATE_ACT + actInfo.act.id, { method: 'DELETE' }).then((responce) => {
            dispatch({type: DELETE_ACT, payload: actInfo})
        });  
    }

    function editContractClick(id){
        let actData = document.getElementById("actData" + id);
        actData.style.display == "none" ? actData.style.display = "" : actData.style.display = "none";
        let actToEdit = document.getElementById("actToEdit" + id);
        actToEdit.style.display == "" ? actToEdit.style.display = "none" : actToEdit.style.display = "";
    }

    async function editContract(props){
        let actDate = document.getElementById('actDate' + props.act.id).value;
        let actNum = document.getElementById('actNum' + props.act.id).value;
        let dataToSend = {id: props.act.id, actNumber: actNum, actDate: actDate + "T00:00:00", fK_ContractId: props.act.fK_ContractId}
        console.log(dataToSend);
        var data = await fetch(SERVER_LINK + DELETE_UPDATE_ACT + props.act.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            }).then((response) => {
                console.log(response);
                return response.json();
        });
        if(data != null){
            dispatch({type: EDIT_ACT, payload: dataToSend});
            editContractClick(data);
        }
    }
    
    const handleInputChange = (e) => {
        setDate(e.target.value)
    }

    useEffect(()=>{
        setDate(props.act.actDate.split('T')[0]);
        let formattedDate = props.act.actDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    },[store])

    return (
        <div className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row actRow' style={{margin: "0px"}}>
            <div id={"actData"+props.act.id} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row">
                <div
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign" 
                    style={{minWidth: "200px", margin: "auto 0px", maxWidth: "200px"}}>
                    Номер акта: {props.act.actNumber}
                </div>
                <div 
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "200px"}}>
                    Дата: {date}
                </div>
            </div>
            <div id={"actToEdit"+props.act.id} style={{display: "none"}} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row ">
                <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign" 
                    style={{minWidth: "150px", margin: "auto 0px", maxWidth: "160px"}}>
                    Номер акта: <input id={"actNum" + props.act.id} placeholder={"номер акта"} defaultValue={props.act.actNumber} className="NumberContractInput" required></input>
                </div>
                <div 
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "180px"}}>
                    Дата: <input type='date' id={"actDate" + props.act.id} onChange={handleInputChange} value={dateTime} className='datetime-pickers-act' required></input> 
                </div>
                <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                    <button type="button" id="addButton" 
                        className="btn col" 
                        onClick={() => editContract(props)}>Изменить</button> 
                </div>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 row actIcons">
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                    <img className="imageButtons" src={penImage} onClick={() => editContractClick(props.act.id)}></img>
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                    <img className="imageButtons" src={deleteImage} onClick={() => deleteActs(props)}></img>
                </div>
            </div>
        </div>
    )
}

export default Act;