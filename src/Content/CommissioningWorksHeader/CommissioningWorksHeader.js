import '..//CommissioningWorksHeader//CommissioningWorksHeader.css';

function CommissioningWorksHeader(props){  
    return (
        <div style={{padding: "0px"}} className="col-lg-12" id="mainHeaderDiv">
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "45px", maxWidth: "45px"}}>
            </div>
            <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3" style={{minWidth: "120px", maxWidth: "260px"}}>
                {props.contract.notes}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "50px", maxWidth: "80px"}}>
                {props.contract.contractNumber}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "100px", maxWidth: "250px"}}>
                {props.contract.description}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "80px", maxWidth: "220px"}}>
                {props.contract.client}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "140px", maxWidth: "150px"}}>
                {props.contract.deadLineDate}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "70px", maxWidth: "100px"}}>
                {props.contract.deadlineCondition}
            </div>
            <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "100px", maxWidth: "100px"}}>
                {props.contract.amount}
            </div>
            <div title='Процент оплаты' className="col-md-1 col-sm-1 col-lg-1 col-xs-1 col-xl-1" style={{minWidth: "30px", maxWidth: "50px"}}>
                {props.contract.percent}
            </div>
            <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-xl-2" style={{minWidth: "100px", maxWidth: "200px"}}>
                {props.contract.termsOfPaymentId}
            </div>
        </div>
    )
}

export default CommissioningWorksHeader;