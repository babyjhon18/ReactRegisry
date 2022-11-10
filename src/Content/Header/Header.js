import '../Header/Header.css'
import "react-datepicker/dist/react-datepicker.css";

import indelLogo from '../../images/indel_logo.png'
import Search from '../Search/Search';

function Header(){
    return <div className='divLogo'>
            <div>
                <img className='imgLogo' src={indelLogo}></img>
            </div>
            <div>
                <Search></Search>
            </div>
        </div>
}

export default Header;
