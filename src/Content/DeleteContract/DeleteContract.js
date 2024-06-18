
import { DELETE_UPDATE_CONTRACT, SERVER_LINK } from '../../Constants';
import '..//DeleteContract//DeleteContract.css';    

function DeleteContract(props){

    async function acceptButtonClick(id){
        await fetch(SERVER_LINK + DELETE_UPDATE_CONTRACT + id, {
            method: 'DELETE',
            }).then(async (response) => {
                console.log(response.status);
                if(response.status == 200){
                    window.location.reload();     
            }
        });
    }

    return(
        <div>
            <div>{props.messageText}</div>
            <div style={{display: 'flex', padding: "10px", margin: "auto", marginRight: "0px", minWidth: "80px", maxWidth: "100px"}}>
                <button style={{marginLeft: '10px'}} type="button" id="addButton" className="btn col" onClick={() => acceptButtonClick(props.id)}>Да</button> 
            </div>
        </div>
    );
}

export default DeleteContract;