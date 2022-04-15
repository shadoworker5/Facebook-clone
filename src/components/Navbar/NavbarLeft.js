import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Paper, Avatar } from '@material-ui/core';
import UserIcon from '@material-ui/icons/Group';
import FlagIcon from '@material-ui/icons/EmojiFlags';
import GroupIcon from '@material-ui/icons/SupervisedUserCircle';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import SpeakerIcon from '@material-ui/icons/VolumeMuteRounded';
import SettingIcon from '@material-ui/icons/SettingsRounded';
import MarketplaceIcon from '@material-ui/icons/ShoppingCartRounded';
import ChartIcon from "@material-ui/icons/EqualizerOutlined";
import ManageChartIcon from "@material-ui/icons/DonutSmallRounded";

function NavbarLeft(props) {
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    let user_info = JSON.parse(localStorage.getItem('user'));

    return (
        <Paper className={props.class}>
            <Link to={`/account/${user_info.token}`} className="link">
                <Avatar src={avatar} className="icon_align" /> <span className="icon_text"> {user_info.name.split(" ")[0]} </span>
            </Link>
            <p className="link">
                <UserIcon className="icon_align icon_text" /> <span className="icon_text"> Friends </span>
            </p>
            <p className="link">
                <FlagIcon className="icon_align icon_text" /> <span className="icon_text"> Pages </span>
            </p>
            <p className="link">
                <GroupIcon className="icon_align icon_text" /> <span className="icon_text"> Group </span>
            </p>
            <p className="link">
                <MarketplaceIcon className="icon_align icon_text" /> <span className="icon_text"> Marketplace </span>
            </p>
            <p className="link">
                <VideoIcon className="icon_align icon_text" /> <span className="icon_text"> Watch </span>
            </p>
            <p className="link">
                <SpeakerIcon className="icon_align icon_text" /> <span className="icon_text"> Ad Center </span>
            </p>
            <p className="link">
                <ChartIcon className="icon_align icon_text" /> <span className="icon_text"> Ads Manager </span>
            </p>
            <p className="link">
                <SettingIcon className="icon_align icon_text" />  <span className="icon_text"> Settings </span>
            </p>
            <p className="link">
                <ManageChartIcon className="icon_align icon_text" /> <span className="icon_text"> Business Manager </span>
            </p>
        </Paper>
    )
}

export default NavbarLeft
