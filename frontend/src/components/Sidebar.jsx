import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoPerson, IoStorefront, IoHome, IoLogOut, IoGrid, IoLayers } from 'react-icons/io5';

const Sidebar = () => {
    return (
        <aside className="menu has-shadow pl-2">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li><NavLink to={"/dashboard"}><IoHome style={{ paddingRight: "10px" }} /> Dashboard</NavLink></li>
                <li><NavLink to={"/layanan"}><IoGrid style={{ paddingRight: "10px" }} /> Layanan</NavLink></li>
            </ul>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
                <li><NavLink to={"/users"}><IoPerson style={{ paddingRight: "10px" }} />Users</NavLink></li>
                <li><NavLink to={"/agen"}><IoStorefront style={{ paddingRight: "10px" }} />Agen</NavLink></li>
                <li><NavLink to={"/warehouse"}><IoLayers style={{ paddingRight: "10px" }} />Warehouse</NavLink></li>
            </ul>
            <p className="menu-label">Settings</p>
            <ul className="menu-list">
                <li><button className='button is-white'><IoLogOut style={{ paddingRight: "10px" }} />Log out</button></li>
            </ul>
        </aside>
    )
}

export default Sidebar