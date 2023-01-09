import '../Search/Search.css'
import Dropdown from 'react-bootstrap/Dropdown';

import sortUp from '../../images/sortUpDown.png'
import sortDown from '../../images/sortDownUp.png'
import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_CTC } from '../../Constants';

function Search(){

    const dispatch = useDispatch();
    const [searchItemIndex, setSearchItemIndex] = useState(0);
    const [searchItemPlaceholder, setPlaceholder] = useState("Поиск по наименованию договора...");
    const [searchInputValue, setSearchInputValue] = useState("");

    const sortClick = event => {
        event.target.src === sortUp ? event.target.src = sortDown : event.target.src = sortUp;
    }

    const searchFieldChange = event => {
        setSearchInputValue(event.target.value); 
        if(event.target.value == ""){
            dispatch({type: SEARCH_CTC, keyword: event.target.value, index: 0}); 
        }
    }

    const search = () => {
        dispatch({type: SEARCH_CTC, keyword: searchInputValue, index: searchItemIndex}); 
    }

    const onSelectedItem = (index) => {
        switch(index){
            case 0:{
                setPlaceholder("Поиск по наименованию договора...");
                setSearchItemIndex(index);
                break;
            }
            case 1:{
                setPlaceholder("Поиск по наименованию заказчика...");
                setSearchItemIndex(index);
                break;
            }
            case 2:{
                setPlaceholder("Поиск по номеру договора...");
                setSearchItemIndex(index);
                break;
            }
        }
    }

    return (<div className='divLogo'>
        <div>
            <input className='searchContractInput' onChange={searchFieldChange} 
             placeholder={searchItemPlaceholder} type='text' value={searchInputValue}></input>
        </div>  
        <div>
            <Dropdown className="mx-2">
                <button id='searchButton' type="button" class="searchButton btn" onClick={() => search()}>Поиск</button>
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                </Dropdown.Toggle>
                <Dropdown.Menu id="drop-down-menu-items">
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(0)}>по наименованию договора</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(1)}>по наименованию заказчика</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(2)}>по номеру договора</Dropdown.Item>
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