import './Act.css';
import { useEffect, useState } from 'react';
import penImage from '..//..//images/penEdit.png';
import deleteImage from '..//..//images/trashCanDelete.png';
import { DELETE_ACT, EDIT_ACT } from '../../Constants';
import { useDispatch } from 'react-redux';

function Act(props){

    const dispatch = useDispatch();
    const [date, setDateFormat] = useState();

    function deleteActs(actInfo){
        fetch('http://37.17.58.180:8087/api/Acts?actId=' + actInfo.act.id, { method: 'DELETE' }).then((responce) => {
            dispatch({type: DELETE_ACT, payload: actInfo})
        });  
    }

    function editContractClick(id){
        let actData = document.getElementById("actData" + id);
        actData.style.display == "none" ? actData.style.display = "" : actData.style.display = "none";
        let actToEdit = document.getElementById("actToEdit" + id);
        actToEdit.style.display == "" ? actToEdit.style.display = "none" : actToEdit.style.display = "";
    }

    async function editContract(actInfo){
        actInfo.act.actNumber = 20;
        console.log(actInfo.act);
        var data = await fetch('http://37.17.58.180:8087/api/Acts?actId=' + actInfo.act.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actInfo.act),
            }).then((response) => {
                return response.json();
        });
        if(data != null){
            dispatch({type: EDIT_ACT, payload: actInfo});
            editContractClick(data);
        }
    }

    useEffect(()=>{
        let formattedDate = props.act.actDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    })

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
                    style={{minWidth: "200px", margin: "auto 0px", maxWidth: "200px"}}>
                    Номер акта: <input required></input>
                </div>
                <div 
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "200px"}}>
                    Дата: <input type='date' className='datetime-pickers-act' required></input> 
                </div>
                <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                    <button type="button" id="addButton" 
                        className="btn col" 
                        onClick={() => editContract(props)}>Добавить</button> 
                </div>
                <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                    <button type="button" id="closeButton" 
                        className="btn col"
                        onClick={() => {document.getElementById('addDiv' + props.id).style.display = "none"}}>Отмена</button> 
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