import { useDispatch } from 'react-redux';
import { ADD_ACT, CREATE_GET_ACT, SERVER_LINK } from '../../Constants';
import '..//ActsOfContract//ActsOfContract.css';
import Act from '../ActsOfContract/Act.js'

function ActsOfContract(props){

    const dispatch = useDispatch();

    async function AddNewAct(id){
        let actDate = document.getElementById('actDate' + id).value;
        let actNum = document.getElementById('actNum' + id).value;
        let actSum = document.getElementById('actSum' + id).value;
        let data = {actNumber: actNum, actPayment: actSum, actDate: actDate + "T00:00:00", fK_ContractId: props.id}
        const dataNew = await fetch(SERVER_LINK + CREATE_GET_ACT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            data.id = 0;
            return response.json();
        });
        if(dataNew != null){
            data.id = dataNew;
            dispatch({type: ADD_ACT, payload: data})
        }
    }
    
    return(<div className='mainActs'>
            <div className='addNewAct'>
                <div style={{margin: "5px 5px", display: "flex", justifyContent: "flex-start"}}>
                    <button type="button" id="addButton" 
                        className="btn" 
                        onClick={() => 
                        {document.getElementById('addDiv' + props.id).style.display = "block"}}>Новый</button> 
                </div>
                <div id={"addDiv" + props.id} className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 addDiv' 
                    style={{display: "none"}}>
                    <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row"
                    style={{margin: "auto"}}>
                        <div
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign" 
                            style={{minWidth: "150px", margin: "auto 0px", maxWidth: "160px"}}>
                            Номер акта: <input id={"actNum" + props.id} type={"text"} 
                                placeholder={"номер акта"} className='NumberContractInput' required></input>
                        </div>
                        <div 
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign"
                            style={{minWidth: "150px",margin: "auto 0px", maxWidth: "180px"}}>
                            Дата: <input id={"actDate"+ props.id} type='date' className='datetime-pickers-act' required></input>
                        </div>
                        <div
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign" 
                            style={{minWidth: "150px", margin: "auto 0px", maxWidth: "180px"}}>
                            Сумма: <input id={"actSum" + props.id} type={"number"} placeholder={"сумма платежа"}
                                className='NumberContractInput' required></input>
                        </div>
                        <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                            <button type="button" id="addButton" 
                                className="btn col" 
                                onClick={() => AddNewAct(props.id)}>Добавить</button> 
                        </div>
                        <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                            <button type="button" id="closeButton" 
                                className="btn col"
                                onClick={() => {document.getElementById('addDiv' + props.id).style.display = "none"}}>Отмена</button> 
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    props.acts && props.acts.map((act, index) => 
                        <div style={{paddingLeft: "0px", paddingRight: "0px"}}
                         className='actOfContract'><Act key={index} act={act}></Act></div>
                    )
                }           
            </div>
            
        </div>
    )
}

export default ActsOfContract;