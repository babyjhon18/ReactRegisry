import { useDispatch, useSelector } from 'react-redux';
import '../MessageComponent/MessageComponent.css';
import { SET_MESSAGE_STATE } from '../../Constants';
import { useEffect } from 'react';

function MessageComponent(props){

    const messages = useSelector(state => state.messagesReduser);
    const dispatch = useDispatch();
    useEffect(() => {}, [messages])
    
    function acceptButtonClick(){
        dispatch({type: SET_MESSAGE_STATE, payload: {accepted: true, ready: true}});
    }

    return(
        <div>
        <div>{props.messageText}</div>
        <div style={{padding: "10px", margin: "auto", marginRight: "50px", minWidth: "80px", maxWidth: "100px"}}>
            <button type="button" id="addButton" className="btn col" onClick={() => acceptButtonClick()}>Продолжить</button> 
            </div>
        </div>
    );
}

export default MessageComponent;