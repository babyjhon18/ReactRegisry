//import styles
import '../../Content/Body/Body.css'
import "react-pro-sidebar/dist/css/styles.css";
//import logic utils
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
import WorkPlanRowElement from '../WorkPlanRows/WorkPlanRowElement'
import CommissioningRowElement from '../CommissioningWorksRow/CommissioningRowElement'
import RowHeader from '../RowHeader/RowHeader'
import WorkPlanHeader from '../WorkPlanHeader/WorkPlanHeader'
import { FaRegCalendarAlt, FaArchive, FaScrewdriver  } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { GiReceiveMoney } from "react-icons/gi";
import { BsExclamationCircleFill  } from "react-icons/bs";
//import constants
import { CREATE_GET_CONTRACT, jsonHeaderCommissionWorks, jsonHeaderRegistry, jsonHeaderShouldBePaid, jsonHeaderWorkPlan, SERVER_LINK, UPDATE_CTC_VIEW } from '../../Constants';
import close from '..//..//images/close.png';
import BlackList from '../BlackList/BlackList';
import { COLOR } from 'rsuite/esm/utils/constants';
import UnpaidRowElement from '../UnpaidRowElement/UnpaidRowElement';
import CommissioningWorksHeader from '../CommissioningWorksHeader/CommissioningWorksHeader';
import { useCookies } from 'react-cookie';
import UnpaidRowHeader from '../UnpaidRowHeader/UnpaidRowHeader';

function Body() {  

  const c = useSelector(state => state.contractReduser);

  const [menuCollapse, setMenuCollapse] = useState(true);
  const [activate, setMenuActivate] = useState(0);
  const [header, setHeader] = useState(jsonHeaderRegistry);
  const [cookies, setCookies] = useCookies();
  const dispatch = useDispatch();
  var mPopupBlackList = document.getElementById('mpopupBlackListId');

  useEffect(() => {
    fetchData(SERVER_LINK + CREATE_GET_CONTRACT, 0, jsonHeaderRegistry);
  }, []);

  const onMouseOn = () => {
    setMenuCollapse(false);
  };

  const onMouseOut = () => {
    setMenuCollapse(true);
  };

  const getData = async (link, index) => {
    await axios.get(link).then((response) => {
      dispatch({type: UPDATE_CTC_VIEW, payload: response.data, link: link, header: header, tab: index, dateFrom: cookies.dateFrom, dateTo: cookies.dateTo})
    });
  };

  function closeBlackList(){
    mPopupBlackList.style.display = "none"; 
    let bar = document.getElementById('bar');
    bar.classList.remove('zindex');
  }

  const openModalBlackList = () => {
    let blackListDescription = document.getElementById("blackListDesc");
    blackListDescription.textContent = "Черный список клиентов"
    let bar = document.getElementById('bar');
    bar.classList.add('zindex');
    mPopupBlackList.style.display = "block";
  }

  const closeBlackListClick = () => {
    closeBlackList();
  }

  const fetchData = (link, index, header) => {
    setHeader(header);
    setMenuActivate(index);
    getData(link, index);
  };

  return ( <div>
    <div id="bar">
      <ProSidebar onMouseOver={onMouseOn} onMouseOut={onMouseOut} collapsed={menuCollapse}>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
            active={activate === 0} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT, 0, jsonHeaderRegistry)} 
            icon={<ImBooks />}>Реестр договоров</MenuItem>
            <MenuItem 
            active={activate === 1} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT + '?contractsType=1', 1, jsonHeaderWorkPlan)} 
            icon={<FaRegCalendarAlt />}>План работ</MenuItem>
            <MenuItem 
            active={activate === 5} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT + '?contractsType=5', 5, jsonHeaderCommissionWorks)} 
            icon={<FaScrewdriver />}>ПНР</MenuItem>
            <MenuItem 
            active={activate === 4} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT + '?contractsType=4', 4, jsonHeaderRegistry)} 
            icon={<BsPatchCheckFill />}>Готовые</MenuItem>
            <MenuItem 
            active={activate === 2} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT + '?contractsType=2', 2, jsonHeaderShouldBePaid)} 
            icon={<GiReceiveMoney />}>Неоплаченные</MenuItem>
            <MenuItem 
            active={activate === 3} 
            onClick={() => fetchData(SERVER_LINK + CREATE_GET_CONTRACT + '?contractsType=3', 3, jsonHeaderRegistry)} 
            icon={<FaArchive />}>Архив</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem 
            onClick={() => openModalBlackList()}
            icon={<BsExclamationCircleFill />}>Черный список</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
    <div id="mpopupBlackListId" class="mPopupBlackList">
      <div className="modal-background-blackList">
          <div className="specification-description">
              <div id="blackListDesc"></div>
              <img className="close-img" src={close} width={"40px"} height={"40px"}
              onClick={closeBlackListClick}
              ></img>
          </div>
          <BlackList></BlackList>
      </div>
    </div>
    <div id="mainBody">
        <div id="row" className='row'>
          {
            c.currentTab == 1 ? 
            <WorkPlanHeader contract={header}></WorkPlanHeader> : 
            c.currentTab == 2 ?
            <UnpaidRowHeader contract={header}></UnpaidRowHeader> : 
            c.currentTab == 5 ? 
            <CommissioningWorksHeader contract={header}> </CommissioningWorksHeader> :
            <RowHeader contract={header}></RowHeader> 
          }
        </div>  
            {c.searchedContracts && c.searchedContracts.map((contract, index) =>
              (
                <div className='row'>
                  {
                    c.currentTab == 1 ? 
                    <WorkPlanRowElement key={index} contract={contract}></WorkPlanRowElement> : 
                    c.currentTab == 2 ?
                    <UnpaidRowElement key={index} contract={contract}></UnpaidRowElement> : 
                    c.currentTab == 5 ?
                    <CommissioningRowElement key={index} contract={contract}></CommissioningRowElement> :
                    <RowElement key={index} contract={contract}></RowElement>
                  }
                </div>
              )
            )}
      </div>
  </div>
  );
}

export default Body;
