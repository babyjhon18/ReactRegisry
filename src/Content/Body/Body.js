//import styles
import '../../Content/Body/Body.css'
import "react-pro-sidebar/dist/css/styles.css";
//import logic utils
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
//import network 
import axios from 'axios'
//import custom controls
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import RowElement from '../RowElement/RowElement'
import RowHeader from '../RowHeader/RowHeader'
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
//import constants
import { jsonHeaderRegistry, jsonHeaderWorkPlan, UPDATE_CTC_VIEW } from '../../Constants';

function Body() {  

  useEffect(() => {
    fetchData('http://37.17.58.180:8087/api/Contracts', 0, jsonHeaderRegistry);
  }, []);

  const [menuCollapse, setMenuCollapse] = useState(true);
  const [activate, setMenuActivate] = useState(0);
  const [header, setHeader] = useState(jsonHeaderRegistry);
  const [items, setItems] = useState();
  const dispatch = useDispatch();
  const c = useSelector(state => state.contract);

  const onMouseOn = () => {
    setMenuCollapse(false);
  };

  const onMouseOut = () => {
    setMenuCollapse(true);
  };

  const getData = async (link) => {
    await axios.get(link).then((response) => {
      dispatch({type: UPDATE_CTC_VIEW, payload: response.data, link: link, header: header})
    });
    setItems(c.contracts.contracts);
  };

  const fetchData = (link, index, header) => {
    setHeader(header);
    setMenuActivate(index);
    getData(link);
  };

  return ( <div>
    <div id="bar">
      <ProSidebar onMouseOver={onMouseOn} onMouseOut={onMouseOut} collapsed={menuCollapse}>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
            active={activate === 0} 
            onClick={() => fetchData('http://37.17.58.180:8087/api/Contracts', 0, jsonHeaderRegistry)} 
            icon={<ImBooks />}>Реестр договоров</MenuItem>
            <MenuItem 
            active={activate === 1} 
            onClick={() => fetchData('http://37.17.58.180:8087/api/Contracts?isReadyForAssemble=true', 1, jsonHeaderWorkPlan)} 
            icon={<FaRegCalendarAlt />}>План работ</MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
    <div id="mainBody">
        <div id="row" className='row'>
          <RowHeader contract={header}></RowHeader>
        </div>  
            {items && items.map((contract, index) =>
              (
                <div className='row'>
                  <RowElement key={index} contract={contract.contract}></RowElement>
                </div>
              )
            )}
      </div>
  </div>
  );
}

export default Body;
