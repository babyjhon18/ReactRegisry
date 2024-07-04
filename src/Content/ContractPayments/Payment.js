import './Payment.css';
import penImage from '..//..//images/penEdit.png';
import deleteImage from '..//..//images/trashCanDelete.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PAYM, EDIT_PAYM, SERVER_LINK, DELETE_UPDATE_PAYMENTS } from '../../Constants';

function Payment(props){

    

    function deletePayment(paymentInfo){
        fetch(SERVER_LINK + DELETE_UPDATE_PAYMENTS + paymentInfo.payment.id, 
            { method: 'DELETE' }).then((responce) => {
            dispatch({type: DELETE_PAYM, payload: paymentInfo})
        });  
    }

    function editContractClick(id){
        let paymentData = document.getElementById("paymentData" + id);
        paymentData.style.display == "none" ? paymentData.style.display = "" : paymentData.style.display = "none";
        let paymentToEdit = document.getElementById("paymentToEdit" + id);
        paymentToEdit.style.display == "" ? paymentToEdit.style.display = "none" : paymentToEdit.style.display = "";
    }

    async function editContract(props){
        let paymentDate = document.getElementById('paymentEditDate' + props.payment.id).value;
        let paymentNum = document.getElementById('paymentEditNum' + props.payment.id).value;
        let paymnetSum = document.getElementById('paymentEditSum' + props.payment.id).value;
        paymnetSum = paymnetSum.replace(/,/g, '.')
        let dataToSend = {id: props.payment.id, paymentDate: paymentDate + "T00:00:00", paymentNumber: paymentNum,
             paymentSum: paymnetSum, fK_ContractId: props.payment.fK_ContractId}
        var data = await fetch(SERVER_LINK + DELETE_UPDATE_PAYMENTS + props.payment.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            }).then((response) => {
                return response.json();
        });
        if(data != null){
            dispatch({type: EDIT_PAYM, payload: dataToSend});
            editContractClick(data);
        }
    }

    const handleInputChange = (e) => {
        setDate(e.target.value)
    }

    const [date, setDateFormat] = useState();
    const dispatch = useDispatch();
    const [dateTime, setDate] = useState(new Date());
    const store = useSelector(state => state.contractReduser)

    useEffect(() => {
        setDate(props.payment.paymentDate.split('T')[0]);
        let formattedDate = props.payment.paymentDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    },[store])

    return(
        <div className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row actRow' style={{margin: "0px"}}>
            <div id={"paymentData"+props.payment.id} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row">
                <div
                    className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign" 
                    style={{minWidth: "190px", margin: "auto 0px", maxWidth: "150px"}}>
                    Номер платежа: {props.payment.paymentNumber}
                </div>
                <div 
                    className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "150px"}}>
                    Дата: {date}
                </div>
                <div 
                    className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "150px"}}>
                    Сумма: {props.payment.paymentSum}
                </div>
            </div>
            <div id={"paymentToEdit" + props.payment.id} style={{display: "none"}} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row ">
                <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign" 
                    style={{minWidth: "150px", margin: "auto 2px", maxWidth: "140px"}}>
                    Номер платежа: <input id={'paymentEditNum' + props.payment.id} placeholder={"номер платежа"} defaultValue={props.payment.paymentNumber} className='NumberContractInput' required></input>
                </div>
                <div 
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign"
                    style={{minWidth: "130px",margin: "auto 2px", maxWidth: "150px"}}>
                    Дата: <input id={'paymentEditDate' + props.payment.id} onChange={handleInputChange} value={dateTime} className='NumberContractInput' type='date' required></input> 
                </div>
                <div 
                    className="col textAlign"
                    style={{minWidth: "120px",margin: "auto 2px", maxWidth: "140px"}}>
                    Сумма: <input id={'paymentEditSum' + props.payment.id} placeholder={"сумма платежа"} defaultValue={props.payment.paymentSum} className='NumberContractInput' required></input>
                </div>
                <div className='col' style={{margin: "auto 0px", minWidth: "120px", maxWidth: "160px"}}>
                    <button type="button" id="addButton" 
                        className="btn col" 
                        onClick={() => editContract(props)}>Изменить</button> 
                </div>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 row actIcons">
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}
                        onClick={() => editContractClick(props.payment.id)}>
                    <img className="imageButtons" src={penImage} ></img>
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}
                        onClick={() => deletePayment(props)}>
                    <img className="imageButtons" src={deleteImage}></img>
                </div>
            </div>
        </div>
    )
}

export default Payment;