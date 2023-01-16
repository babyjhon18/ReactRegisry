import '..//RowHeader//RowHeader.css'


function RowHeader(props){  
    return (
        <div style={{padding: "0px"}} className="col-lg-12" id="mainHeaderDiv">
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "45px", maxWidth: "45px"}}>
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.contract.description}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "300px"}}>
                {props.contract.client}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "80px", maxWidth: "100px"}}>
                {props.contract.contractNumber}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "80px", maxWidth: "100px"}}>
                {props.contract.contractDate}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "80px", maxWidth: "100px"}}>
                {props.contract.amount}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "80px", maxWidth: "100px"}}>
                {props.contract.percent}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "80px", maxWidth: "150px"}}>
                {props.contract.deadlineCondition}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "100px"}}>
                {props.contract.signatureMark}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "100px"}}>
                {props.contract.readyMark}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "100px"}}>
                {props.contract.ourDelivery}
            </div>
        </div>
    )
}

export default RowHeader;