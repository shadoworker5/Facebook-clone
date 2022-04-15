import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Paper, Avatar } from '@material-ui/core';
import RedeemIcon from '@material-ui/icons/Redeem';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PlusGroupIcon from '@material-ui/icons/ControlPointOutlined';
import SpeakerIcon from '@material-ui/icons/VolumeMuteRounded';

function NavbarRight(props) {
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    let user_info = JSON.parse(localStorage.getItem('user'));

    return (
        <Paper className={props.class}>
            <div>
                <strong>
                    <RedeemIcon className="icon_align"/>  Birthdays  <span style={{ float: "right", cursor: "pointer" }}> <CloseIcon /> </span>
                </strong>
                <p>
                    <strong className="cursor_pointer"> Kassoum TRAORE </strong> and <strong className="cursor_pointer"> 3 others </strong> have Birthdays today
                </p>
            </div>

            <hr />
            
            <div>
                <div>
                    <strong>
                        Yours Pages
                        <span style={{ float: "right", position: "relative", bottom: "7px", cursor: "pointer" }}> ... </span>
                    </strong>
                </div>
                <p  className="link">
                    <Avatar className="icon_align" style={{ backgroundColor: "blueviolet" }}> S </Avatar>
                    <strong className="icon_text"> Software Development Info </strong>
                </p>

                <p className="link">
                    <NotificationsIcon className="icon_align icon_text" /> <span className="icon_text"> 3 Notifications </span>
                </p>

                <p className="link">
                    <SpeakerIcon className="icon_align icon_text" /> 
                    <span className="icon_text"> Create Promotions</span>
                </p>
            </div>
            
            <hr />

            <div>
                <div>
                    <strong> Contact </strong>
                    <span className="icon_contact" style={{ position: "relative", bottom: "7px" }}> ... </span>
                    <SearchIcon className="icon_contact" />
                    <VideoCallIcon className="icon_contact" />
                </div>

                    <Link to={`/account/${user_info.token}`} className="link">
                        <Avatar src={avatar} className="icon_align" /> <strong className="icon_text"> {user_info.name} </strong>
                    </Link>
            </div>

            <hr />

            <div>
                <strong> Group conversations </strong> 
                <p className="link">
                    <PlusGroupIcon className="icon_align icon_text" />
                    <span className="icon_text"> Create New Group </span>
                </p>
            </div>
        </Paper>
    )
}

export default NavbarRight; 