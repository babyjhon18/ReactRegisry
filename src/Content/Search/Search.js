import '../Search/Search.css'
import Dropdown from 'react-bootstrap/Dropdown';

import sortUp from '../../images/sortUpDown.png'
import sortDown from '../../images/sortDownUp.png'
import {React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

function Search(){

    const [searchItems, setSearchItems] = useState([]);
    const c = useSelector(state => state.contract);
    useEffect(() => {
        console.log(c.contracts);
    });

    const sortClick = event => {
        event.target.src === sortUp ? event.target.src = sortDown : event.target.src = sortUp;
    }

    return (<div className='divLogo'>
        <div>
            <input className='searchContractInput' placeholder='Поиск договора...' type='text'></input>
        </div>
        <div>
            <Dropdown className="mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                    Поиск по
                </Dropdown.Toggle>
                <Dropdown.Menu id="drop-down-menu-items">
                    <Dropdown.Item id="drop-down-menu-item">Наименованию договора</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item">Заказчику</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item">Номеру договора</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div>
            С:
            <input type='date' className='datetime-pickers'></input>
        </div>
        <div>
            по:
            <input type='date' className='datetime-pickers'></input>
        </div>
        <div class="sortBtn">
            <img onClick={sortClick} src={sortUp}></img>
        </div>
    </div>);
}

export default Search;