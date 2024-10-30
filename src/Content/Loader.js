//docs https://mhnpd.github.io/react-loader-spinner/docs/intro
import { MutatingDots } from "react-loader-spinner";
function Loader(){

    const customstyle = {
        position: "absolute",
        left: "50%", 
        top: "50%",
        transform: "translate(-50%, -50%)"
    };

    return (
        <MutatingDots
            height="120"
            width="120"
            color="#377AB7"
            secondaryColor="#377AB7"
            ariaLabel="tail-spin-loading"
            radius="12.5"
            wrapperStyle={customstyle}
            wrapperClass=""
            visible={true}
        />
    );
};  
export default Loader;