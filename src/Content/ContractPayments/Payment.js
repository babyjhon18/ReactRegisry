import './Payment.css';
import penImage from '..//..//images/penEdit.png';
import deleteImage from '..//..//images/trashCanDelete.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_PAYM } from '../../Constants';

function Payment(props){

    const [date, setDateFormat] = useState();
    const dispatch = useDispatch();

    function deletePayment(paymentInfo){
        fetch('http://37.17.58.180:8087/api/Payments?paymentId=' + paymentInfo.payment.id, 
            { method: 'DELETE' }).then((responce) => {
            dispatch({type: DELETE_PAYM, payload: paymentInfo})
        });  
    }

    useEffect(() => {
        let formattedDate = props.payment.paymentDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    })

    return(
        <div className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row actRow' style={{margin: "0px"}}>
            <div id={"actData"+props.payment.id} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row">
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
            {/* <div id={"actToEdit"+props.act.id} style={{display: "none"}} className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row ">
                <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign" 
                    style={{minWidth: "200px", margin: "auto 0px", maxWidth: "200px"}}>
                    Номер акта: <input required></input>
                </div>
                <div 
                    className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 textAlign"
                    style={{minWidth: "150px",margin: "auto 0px", maxWidth: "200px"}}>
                    Дата: <input  type='date' className='datetime-pickers-act' required></input> 
                </div>
            </div> */}
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 row actIcons">
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                        {/* onClick={() => editContractClick(props.act.id)} */}
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