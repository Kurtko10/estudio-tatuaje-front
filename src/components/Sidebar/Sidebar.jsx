import React from 'react'
import { useState, useEffect } from 'react';
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,
  BsArrowLeft,
  BsArrowRight} from 'react-icons/bs'
import "./Sidebar.css";


function Sidebar({openSidebarToggle, OpenSidebar}) {

    const [arrowIcon, setArrowIcon] = useState(<BsArrowLeft />);

    useEffect(() => {
        if (openSidebarToggle) {
            setArrowIcon(<BsArrowRight />);
        } else {
            setArrowIcon(<BsArrowLeft />);
        }
      }, [openSidebarToggle]);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-brand'>
            <span className='icon close_icon' onClick={OpenSidebar}> {arrowIcon}</span>
            </div>

        <ul className='sidebar-list'>
    <li className='sidebar-list-item'>
        <a href="">
            <BsGrid1X2Fill className='icon'/> <span>Dashboard</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsFillArchiveFill className='icon'/> <span>Products</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsFillGrid3X3GapFill className='icon'/> <span>Categories</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsPeopleFill className='icon'/> <span>Customers</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsListCheck className='icon'/> <span>Inventory</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsMenuButtonWideFill className='icon'/> <span>Reports</span>
        </a>
    </li>
    <li className='sidebar-list-item'>
        <a href="">
            <BsFillGearFill className='icon'/> <span>Setting</span>
        </a>
    </li>
</ul>

    </aside>
  )
}

export default Sidebar