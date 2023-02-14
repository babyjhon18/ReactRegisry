import './ContractsPayments.css';
import Payment from '../ContractPayments/Payment.js'
import { ADD_PAYM } from '../../Constants';
import { useDispatch } from 'react-redux';

function ContractsPayments(props){

    const dispatch = useDispatch();

    async function AddNewPayment(id){
        let paymentDate = document.getElementById('paymentDate' + id).value;
        let paymentNum = document.getElementById('paymentNum' + id).value;
        let paymnetSum = document.getElementById('paymentSum' + id).value;
        let data = {paymentDate: paymentDate + "T00:00:00", paymentNumber: paymentNum,
             paymentSum: paymnetSum, fK_ContractId: props.id}
        const dataNew = await fetch('http://37.17.58.180:8087/api/Payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response);
            data.id = 0;
            return response.json();
        });
        if(dataNew != null){
            data.id = dataNew;
            dispatch({type: ADD_PAYM, payload: data})
        }
    }

    return(<div>
        <div className='addNewAct'>
                <div style={{margin: "5px 5px", display: "flex", justifyContent: "flex-start"}}>
                    <button type="button" id="addButton" 
                        className="btn" 
                        onClick={() => 
                        {document.getElementById('addPayment' + props.id).style.display = "block"}}>Новый</button> 
                </div>
                <div id={"addPayment" + props.id} className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 addPayment' 
                    style={{display: "none"}}>
                    <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row"
                    style={{margin: "auto"}}>
                        <div
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign" 
                            style={{minWidth: "150px", margin: "auto 0px", maxWidth: "160px"}}>
                            Номер платежа: <input id={"paymentNum" + props.id} placeholder={"номер платежа"} type={"text"} 
                                className='NumberContractInput' required></input>
                        </div>
                        <div 
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign"
                            style={{minWidth: "150px",margin: "auto 0px", maxWidth: "180px"}}>
                            Дата: <input id={"paymentDate"+ props.id} type='date' 
                                className='datetime-pickers-act' required></input>
                        </div>
                        <div
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign" 
                            style={{minWidth: "150px", margin: "auto 0px", maxWidth: "180px"}}>
                            Сумма: <input id={"paymentSum" + props.id} type={"number"} placeholder={"сумма платежа"}
                                className='NumberContractInput' required></input>
                        </div>
                        <div className='col' style={{margin: "auto 0px", paddingLeft: "20px",minWidth: "80px", maxWidth: "100px"}}>
                            <button type="button" id="addButton" 
                                className="btn col" 
                                onClick={() => AddNewPayment(props.id)}>Добавить</button> 
                        </div>
                        <div className='col' style={{margin: "auto 0px",  paddingLeft: "20px", minWidth: "80px", maxWidth: "100px"}}>
                            <button type="button" id="closeButton" 
                                className="btn col"
                                onClick={() => {document.getElementById('addPayment' + props.id).style.display = "none"}}>Отмена</button> 
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    props.payments && props.payments.map((payment, index) => 
                        <div style={{paddingLeft: "0px", paddingRight: "0px"}}
                            className='paymentOfContract'><Payment key={index} payment={payment}></Payment>
                        </div>
                    )
                }           
            </div>
        </div>
    )
}

export default ContractsPayments;