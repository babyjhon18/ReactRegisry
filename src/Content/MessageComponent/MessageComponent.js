import { useDispatch, useSelector } from 'react-redux';
import '../MessageComponent/MessageComponent.css';
import { SET_MESSAGE_STATE } from '../../Constants';

function MessageComponent(props){

    const dispatch = useDispatch();
    
    function acceptButtonClick(){
        props.contract.readyMark = true;
        dispatch({type: SET_MESSAGE_STATE, payload: {accepted: true, ready: true, sendNotification: true, contract: props.contract }});
    }

    function rejectMessageButtonClick(){
        props.contract.readyMark = true;
        dispatch({type: SET_MESSAGE_STATE, payload: {accepted: true, ready: true, sendNotification: false, contract: props.contract }});
    }

    return(
        <div>
        <div>{props.messageText}</div>
        <div style={{padding: "10px", margin: "auto", minWidth: "80px", maxWidth: "300px"}}>
            <button type="button" id="addButton" className="btn col" onClick={() => rejectMessageButtonClick()}>Не уведомлять</button> 
            <button style={{marginLeft: "10px"}} type="button" id="addButton" className="btn col" onClick={() => acceptButtonClick()}>Продолжить</button> 
            </div>
        </div>
    );
}

export default MessageComponent;