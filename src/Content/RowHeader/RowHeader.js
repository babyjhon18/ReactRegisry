import '..//RowHeader//RowHeader.css'


function RowHeader(props){  
    return (
        <div className="col-lg-12" id="mainHeaderDiv">
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2">
                {props.contract.description}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.contractNumber}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.contractDate}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.amount}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.percent}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.deadlineCondition}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.signatureMark}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.readyMark}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1">
                {props.contract.ourDelivery}
            </div>
        </div>
    )
}

export default RowHeader;