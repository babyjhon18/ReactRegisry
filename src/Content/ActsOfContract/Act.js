import './Act.css';
import { useEffect, useState } from 'react';
import penImage from '..//..//images/penEdit.png';
import deleteImage from '..//..//images/trashCanDelete.png';

function Act(props){

    const [date, setDateFormat] = useState();

    useEffect(()=>{
        let formattedDate = props.act.actDate.split('T')[0];
        formattedDate = formattedDate.split('-').reverse().join('.');
        setDateFormat(formattedDate);
    })

    return (
        <div className='col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 row actRow' style={{margin: "0px"}}>
            <div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 col-xl-8 row">
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
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 row actIcons">
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                    <img className="imageButtons" src={penImage}></img>
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" 
                    style={{minWidth: "60px",margin: "auto 0px", maxWidth: "60px"}}>
                    <img className="imageButtons" src={deleteImage}></img>
                </div>
            </div>
        </div>
    )
}

export default Act;