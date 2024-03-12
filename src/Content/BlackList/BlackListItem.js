import { useDispatch } from 'react-redux';
import deleteImage from '..//..//images/trashCanDelete.png';
import { DELETE_CLIENT_FROM_BLACK_LIST, SERVER_LINK, DELETE_UPDATE_BLACK_LIST } from '../../Constants';

function BlackListItem(props){

    const dispatch = useDispatch();

    function DeleteFromBlackList(id){
        fetch(SERVER_LINK + DELETE_UPDATE_BLACK_LIST + id, { method: 'DELETE' })
            .then((responce) => {
            if(responce.status == 200){
                dispatch({type: DELETE_CLIENT_FROM_BLACK_LIST, payload: id})
            }
        });  
    }

    return(
        <div>
            <div className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row actRow' style={{margin: "0px"}}>
                <div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row">
                    <div
                        className="col-md-6 col-sm-6 col-lg-6 col-xs-6 col-xl-6 textAlign" 
                        style={{minWidth: "400px", margin: "auto 0px", maxWidth: "450px"}}>
                        {props.props.companyName}
                    </div>
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                    <img className="imageButtons" src={deleteImage} onClick={() => DeleteFromBlackList(props.props.id)}></img>
                </div>
            </div>
            
        </div>
    )
}

export default BlackListItem;