import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/SupervisedUserCircle';
import './Sidebar.css';

export default function Sidebar() {
    const nav = document.getElementById('nav');
    const open_item = document.getElementById('open');

    const open = () => {
        nav.style.width = "200px";
        open_item.style.display = "none";
    }
    
    const close = () => {
        nav.style.width = "40px";
        open_item.style.display = "inline-block";
    }
    
    return (
        <nav id="nav">
            <div id="head">
                <div id="logo"></div>
                <MenuIcon id="open" onClick={() => open()} />
                <div id="va"> Shadoworker5 </div>
                <CloseIcon id="close"onClick={() => close()} />
            </div>
            <Link to='/account'>
                <HomeIcon /> Home
            </Link>
            <Link to='/account'>
                <UserIcon /> Profil
            </Link>
            <Link to='/account'>
                <HomeIcon /> Message
            </Link>
            <Link to='/account'>
                <HomeIcon /> Event
            </Link>
            <Link to='/account'>
                <HomeIcon /> Analytics
            </Link>
            <Link to='/account'>
                <HomeIcon /> Services
            </Link>
            <Link to='/account'>
                <HomeIcon /> Help
            </Link>
            <Link to='/account'>
                <HomeIcon /> Settings
            </Link>
            <Link to='/account' id="sign">
                <HomeIcon /> Sign out
            </Link>
        </nav>
    )
}
