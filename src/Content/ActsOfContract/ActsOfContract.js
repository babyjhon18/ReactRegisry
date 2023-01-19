import { useEffect } from 'react';
import '..//ActsOfContract//ActsOfContract.css';
import Act from '../ActsOfContract/Act.js'

function ActsOfContract(props){
    
    return(<div>
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
                            style={{minWidth: "200px", margin: "auto 0px", maxWidth: "250px"}}>
                            Номер акта: <input type={"text"}></input>
                        </div>
                        <div 
                            className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3 textAlign"
                            style={{minWidth: "200px",margin: "auto 0px", maxWidth: "250px"}}>
                            Дата: <input type={"text"}></input>
                        </div>
                        <div className='col' style={{margin: "auto 0px", minWidth: "80px", maxWidth: "100px"}}>
                            <button type="button" id="addButton" 
                                className="btn col" 
                                onClick={() => {document.getElementById('addDiv' + props.id).style.display = "none"}}>Добавить</button> 
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