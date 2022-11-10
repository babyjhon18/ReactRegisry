import '..//RowHeader//RowHeader.css'


function RowHeader(props){  
    return (
        <div className="col-lg-12" id="mainHeaderDiv">
            <div className="col-lg-2">
                {props.contract.description}
            </div>
            <div className="col-lg-1">
                {props.contract.contractNumber}
            </div>
            <div className="col-lg-1">
                {props.contract.contractDate}
            </div>
            <div className="col-lg-1">
                {props.contract.amount}
            </div>
            <div className="col-lg-1">
                {props.contract.percent}
            </div>
            <div className="col-lg-1">
                {props.contract.deadlineCondition}
            </div>
            <div className="col-lg-1">
                {props.contract.signatureMark}
            </div>
            <div className="col-lg-1">
                {props.contract.readyMark}
            </div>
            <div className="col-lg-1">
                {props.contract.ourDelivery}
            </div>
        </div>
    )
}

export default RowHeader;