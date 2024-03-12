import '..//Search//Search.css'
import Dropdown from 'react-bootstrap/Dropdown';

import sortUp from '../../images/sortUpDown.png'
import sortDown from '../../images/sortDownUp.png'
import downloadFile from '../../images/downloadContract.png'
import {React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_CTC, SERVER_LINK, SORT_BY_DATE, SORT_CTC, TEMPLATE_LINK } from '../../Constants';

function Search(){

    const dispatch = useDispatch();
    const contracts = useSelector(state => state.contractReduser)
    const [dateFrom,setDateFrom] = useState();
    const [dateTo,setDateTo] = useState();
    const [searchItemIndex, setSearchItemIndex] = useState(0);
    const [searchItemPlaceholder, setPlaceholder] = useState("Поиск по наименованию договора...");
    const [sortTypeText, setSortTypeText] = useState("Сортировать по...")
    const [searchInputValue, setSearchInputValue] = useState("");
    const [sortDirection, setSortDirection] = useState(true);
    const [sortType, setSortType] = useState(3);

    useEffect(() => {
        setSortDirection(false);   
        const currentYear = new Date().getFullYear();
        setDateFrom(currentYear + "-01-01");
        const date = new Date().toLocaleDateString();
        setDateTo(date.split('.').reverse().join('-'));
    },[]);

    const doFetchDownload = () => {
        fetch(SERVER_LINK + TEMPLATE_LINK)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "Шаблон для заполнения договора.dotm";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {});
    };

    const sortClick = event => {
        if(event.target.src === sortUp)  {
            event.target.src = sortDown;
            setSortDirection(true);
            dispatch({type: SORT_CTC, sortDirection: true, sortType: sortType})
        }
        else{
            event.target.src = sortUp;
            setSortDirection(false);
            dispatch({type: SORT_CTC, sortDirection: false, sortType: sortType})
        }    
    }

    const searchFieldChange = event => {
        setSearchInputValue(event.target.value); 
        if(event.target.value == ""){
            dispatch({type: SEARCH_CTC, keyword: event.target.value, index: 3}); 
        }
    }

    const search = () => {
        dispatch({type: SEARCH_CTC, keyword: searchInputValue, index: searchItemIndex}); 
    }

    const onSelelectedSortType = (index) => {
        switch(index){
            case 0:{
                setSortTypeText("По готовности");
                setSortType(index);
                break;
            }
            case 1:{
                setSortTypeText("По подписанию");
                setSortType(index);
                break;
            }
            case 2:{
                setSortTypeText("По доставке");
                setSortType(index);
                break;
            }
            case 3:{
                setSortTypeText("По дате");
                setSortType(index);
                break;
            }
            case 4:{
                setSortTypeText("По наименованию договора");
                setSortType(index);
                break;
            }
        }
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

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        if(e.target.value === ""){
            dispatch({type: SORT_CTC, sortDirection: sortDirection})
        }
        else{
            dispatch({type: SORT_BY_DATE, dateFrom: e.target.value, dateTo: dateTo, sortDirection: sortDirection});
        }
    }

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        if(e.target.value === ""){
            dispatch({type: SORT_CTC, sortDirection: sortDirection})
        }
        else{
            dispatch({type: SORT_BY_DATE, dateFrom: dateFrom, dateTo: e.target.value, sortDirection: sortDirection});
        }
    }

    return (<div className='divLogo'>
        <div>
            <input className='searchContractInput' onChange={searchFieldChange} 
             placeholder={searchItemPlaceholder} type='text' value={searchInputValue}></input>
        </div>  
        <div>
            <Dropdown className="mx-2">
                <button id='searchButton' type="button" className="searchButton btn" onClick={() => search()}>Поиск</button>
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
            <input type='date' className='datetime-pickers' onChange={handleDateFromChange} value={dateFrom} ></input>
        </div>
        <div>
            по:
            <input type='date' className='datetime-pickers' onChange={handleDateToChange} value={dateTo} ></input>
        </div>
        <div>
            <Dropdown className="mx-2">
                <button id='searchButton' type="button" className="searchButton btn" onClick={() => search()}>{sortTypeText}</button>
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                </Dropdown.Toggle>
                <Dropdown.Menu id="drop-down-menu-items">
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(0)}>по готовности</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(1)}>по подписанию</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(2)}>по доставке</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(3)}>по дате</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(4)}>по наименованию договора</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div class="sortBtn">
            <img style={{margin: "2px"}} onClick={sortClick} src={sortUp}></img>
        </div>
        <div class="downloadContract" title='Новый договор'>
            <img style={{margin: "0px"}} onClick={doFetchDownload} src={downloadFile}></img>
        </div>
    </div>);
}

export default Search;