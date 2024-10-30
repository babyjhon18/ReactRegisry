import '..//Search//Search.css'
import Dropdown from 'react-bootstrap/Dropdown';

import { useCookies } from 'react-cookie';
import sortUp from '../../images/sortUpDown.png'
import sortDown from '../../images/sortDownUp.png'
import downloadFile from '../../images/downloadContract.png'
import {React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_CTC, SERVER_LINK, SORT_BY_DATE, SORT_CTC, TEMPLATE_LINK } from '../../Constants';
import { Form } from 'react-bootstrap';

function Search(){

    const dispatch = useDispatch();
    const contracts = useSelector(state => state.contractReduser)
    const [dateFrom,setDateFrom] = useState();
    const [dateTo,setDateTo] = useState();
    const [searchItemIndex, setSearchItemIndex] = useState(0);
    const [searchItemPlaceholder, setPlaceholder] = useState("Поиск по номеру договора...");
    const [sortTypeText, setSortTypeText] = useState("Сортировать по...")
    const [searchInputValue, setSearchInputValue] = useState("");
    const [sortDirection, setSortDirection] = useState(true);
    const [sortType, setSortType] = useState(3);
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("searchHistory") != undefined){
            var localSearch = localStorage.getItem("searchHistory").split(",");
            setSearchHistory(localSearch)
            console.log(searchHistory)
        }
        setSortDirection(false);   
        const currentYear = new Date().getFullYear();
        if(localStorage.getItem("dateFrom") != undefined){
            setDateFrom(localStorage.getItem("dateFrom"));
        }
        else
            setDateFrom(currentYear + "-01-01");
        const date = new Date().toLocaleDateString();
        if(localStorage.getItem("dateTo") != undefined){
            setDateTo(localStorage.getItem("dateTo"));
        }
        else
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
            dispatch({type: SORT_BY_DATE, dateFrom: dateFrom, dateTo: dateTo, sortType: sortType})
        }
    }

    const search = () => {
        console.log('searching....', searchInputValue)
        if(searchInputValue != ""){
            localStorage.setItem("searchHistory",searchInputValue + "," + localStorage.getItem("searchHistory"))
            setSearchHistory(localStorage.getItem("searchHistory").split(","))
            if(searchHistory.length > 4){
                let searchHistoryLimited = localStorage.getItem("searchHistory").split(",");
                searchHistoryLimited.pop();
                setSearchHistory(searchHistoryLimited);
                localStorage.setItem("searchHistory", searchHistoryLimited)
            }
        }
        dispatch({type: SEARCH_CTC, keyword: searchInputValue, index: searchItemIndex}); 
    }

    const onSelelectedSortType = (index) => {
        switch(index){
            case 0:{
                setSortTypeText("По доставке");
                setSortType(index);
                break;
            }
            case 1:{
                setSortTypeText("По дате");
                setSortType(index);
                break;
            }
            case 2:{
                setSortTypeText("По номеру договора");
                setSortType(index);
                break;
            }
            case 3:{
                setSortTypeText("По дате поставки");
                setSortType(index);
                break;
            }
            case 4:{
                setSortTypeText("По дате подписи");
                setSortType(index);
                break;
            }
        }
    }

    const onSelectedItem = (index) => {
        switch(index){
            case 0:{
                setPlaceholder("Поиск по номеру договора...");
                setSearchItemIndex(index);
                document.getElementById('searchButton').textContent = "Поиск по номеру договора";
                break;
            }
            case 1:{
                setPlaceholder("Поиск по наименованию заказчика...");
                setSearchItemIndex(index);
                document.getElementById('searchButton').textContent = "Поиск по заказчику";
                break;
            }
            case 2:{
                setPlaceholder("Поиск по наименованию договора...");
                setSearchItemIndex(index);
                document.getElementById('searchButton').textContent = "Поиск по договору";
                break;
            }
        }
    }

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        localStorage.setItem("dateFrom", e.target.value);
        if(e.target.value === ""){
            dispatch({type: SORT_CTC, sortDirection: sortDirection})
        }
        else{
            dispatch({type: SORT_BY_DATE, dateFrom: e.target.value, dateTo: dateTo, sortDirection: sortDirection});
        }
    }

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        localStorage.setItem("dateTo", e.target.value);
        if(e.target.value === ""){
            dispatch({type: SORT_CTC, sortDirection: sortDirection})
        }
        else{
            dispatch({type: SORT_BY_DATE, dateFrom: dateFrom, dateTo: e.target.value, sortDirection: sortDirection});
        }
    }

    const searchFromHistory = event => {
        console.log(event);
        setSearchInputValue(event);
        dispatch({type: SEARCH_CTC, keyword: event, index: searchItemIndex}); 
    }

    return (<div className='divLogo'>
        <div className='searchBarHistory'>
        <Dropdown className="mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-inside">
                <input className='searchContractInput' onChange={searchFieldChange} 
                placeholder={searchItemPlaceholder} type='text' value={searchInputValue}></input>
             </Dropdown.Toggle>
             <Dropdown.Menu id="drop-down-menu-items">
                {searchHistory.map((history, index) =>
                (
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => searchFromHistory(history)}>{history}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>  
        <div>
            <Dropdown className="mx-2">
                <button id='searchButton' type="button" className="searchButton btn" onClick={() => search()}>Поиск</button>
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                </Dropdown.Toggle>
                <Dropdown.Menu id="drop-down-menu-items">
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(0)}>по номеру договора</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(1)}>по заказчику</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelectedItem(2)}>по договору</Dropdown.Item>
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
                <button id='searchButton' type="button" className="searchButton btn" onClick={() => sortClick()}>{sortTypeText}</button>
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                </Dropdown.Toggle>
                <Dropdown.Menu id="drop-down-menu-items">
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(0)}>по доставке</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(1)}>по дате</Dropdown.Item>
                    <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(2)}>по номеру договора</Dropdown.Item>
                    {
                        contracts.currentTab == 1 ? 
                        <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(3)}>по дате поставки</Dropdown.Item> : ""
                    }
                    {
                        contracts.currentTab == 1 ? 
                        <Dropdown.Item id="drop-down-menu-item" type="button" onClick={() => onSelelectedSortType(4)}>по дате подписи</Dropdown.Item> : ""
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className="sortBtn">
            <img style={{margin: "2px"}} onClick={sortClick} src={sortUp}></img>
        </div>
        {/* <div class="downloadContract" title='Новый договор'>
            <img style={{margin: "0px"}} onClick={doFetchDownload} src={downloadFile}></img>
        </div> */}
    </div>);
}

export default Search;