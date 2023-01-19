import './ContractsPayments.css'

function ContractsPayments(){
    return(<div>
            <div>
                {
                    props.payments && props.payments.map((payment, index) => 
                        <div>
                            
                        </div>
                    )
                }           
            </div>
        </div>
    )
}

export default ContractsPayments;