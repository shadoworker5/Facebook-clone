import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { Button, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import GroupAddIcon from '@material-ui/icons/SupervisedUserCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            // backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#151525',
        zIndex: '5',
    },
    inputRoot: {
        color: '#151525',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        background: '#e2e9f7',
        color: '#151525',
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        borderRadius: '16px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link_container: {
        marginLeft: "80px",
    },
    link: {
        color: "#eee",
        marginRight: "40px",
        textDecorationLine: "none",
    },
}));

const Navbar = (props) => {
    let FB_icon = `${process.env.PUBLIC_URL}/images/fb_icon.jpg`;
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [search, setSearch] = useState("")
    const history = useHistory();
    let user_info = JSON.parse(localStorage.getItem('user'));
    const [countNotify, setCountNotify] = useState();
    
    const getNotify = async () => {
        const response = await axios.get(`api/getNofifyByUser/${user_info.token}`).catch((err) => { console.log('Error', err) });
        if (response.data.count > 0) {
            setCountNotify(response.data.count);
            return response.data;
        }
    }

    useEffect(() => {
        getNotify();

        return () => { }
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        localStorage.clear();
        history.push("/")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={logout}> Log out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={countNotify} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const getKeyCode = (event) =>{
        if(event.keyCode === 8){
            getResponse()
        }
    }

    const getResponse = async () => {
        let result_container = document.getElementById("result_container");
        let result = document.getElementById("result");
        const show_result = "result_container";
        const hide_result = "result_container hide";
        let list_result = ""
        
        if (search !== "") {
            const response = await axios.get(`api/searchUser/${search}`).catch((err) => { console.log('Error', err) });
            const data = response.data.user;

            if (data.length > 1) {
                data.map((response) => {
                    list_result +=
                        `<li class="result_item" id="${response.id}">
                            <a href="/account/${response.token}" >
                                <img src="${avatar}" alt="Image de ${response.name}" /> ${response.name}
                            </a>
                        </li>`
                })
                result.innerHTML = list_result;
                result_container.setAttribute("class", show_result);
            }else{
                list_result = "";
                result_container.setAttribute("class", hide_result);
            }
        }
    }

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" >
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Button onClick={(e) => { history.push('/home') }}>
                            <Avatar src={FB_icon}>  </Avatar>
                        </Button>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            type="search"
                            placeholder="Search from facebook"
                            value={search}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown = {(e) => getKeyCode(e)}
                            onChange={(e) => {setSearch(e.target.value); getResponse();}}
                        />
                    </div>

                    <div className={classes.link_container}>
                        <NavLink to="/home" className={classes.link}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <HomeIcon style={{ fontSize: 50 }}/>
                            </IconButton>
                        </NavLink>

                        <NavLink to="/list_user" className={classes.link}>
                            <IconButton aria-label="show 8 new mails" color="inherit">
                                <OndemandVideoIcon style={{ fontSize: 50 }} />
                            </IconButton>
                        </NavLink>

                        <NavLink to="/list_user" className={classes.link}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <RedeemIcon style={{ fontSize: 50 }} />
                            </IconButton>
                        </NavLink>

                        <NavLink to="/list_user" className={classes.link}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <GroupAddIcon style={{ fontSize: 50 }} />
                            </IconButton>
                        </NavLink>

                        <NavLink to="/list_user" className={classes.link}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <EventNoteIcon style={{ fontSize: 50 }} />
                            </IconButton>
                        </NavLink>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NavLink to={`/account/${user_info.token}`} className={classes.link}>
                            <IconButton aria-label="show 4 new mails" variant="h3" color="inherit">
                                <Avatar src={avatar} /> {user_info.name.split(" ")[0]}
                            </IconButton>
                        </NavLink>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge color="secondary">
                                <AppsIcon />
                            </Badge>
                        </IconButton>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>

                        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={(e) => { history.push('/notification') }}>
                            <Badge color="secondary" badgeContent={countNotify}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <ArrowDropDownIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="result_container hide" id="result_container">
                <ul id="result" className="user_list">

                </ul>
            </div>

            {renderMobileMenu}
            {renderMenu}
        </div>
    );




    // const [clicked, setClicked] = useState(false)
    // const [itemCount, setItemCount] = useState(0);
    // const [search, setSearch] = useState("");
    // const handleClick = () => {
    //     setClicked(!clicked)
    // }


    // useEffect(() => {
    //     // code
    //     readAllData('cards').then(result => {
    //         setItemCount(result.length);
    //     })
    //     // setItemCount(5);
    //     return () => {
    //         // code
    //     }
    // }, [itemCount])

    // const logout = () => {
    //     // axios.get('sanctum/csrf-cookie').then(response => {
    //     axios.post('api/logout').then((response) => {
    //         if (response.data.status === 200) {
    //             localStorage.clear();
    //         }
    //     }).catch((err) => {
    //         // console.log('login: '+err);
    //     })
    //     // })
    // }

    // let auth_buttons = '';
    // if (!localStorage.getItem('app_token')) {
    //     auth_buttons = (
    //         <div>
    //             <li>
    //                 <NavLink to='/' className="nav-links">
    //                     Login
    //                 </NavLink>
    //             </li>
    //             <li>
    //                 <NavLink to='/register' className="nav-links">
    //                     Register
    //                 </NavLink>
    //             </li>
    //         </div>
    //     );
    // } else {
    //     auth_buttons = (
    //         <li>
    //             <Button onClick={(e) => logout()} style={{ background: '#ff0000' }}> Logout </Button>
    //         </li>
    //     );
    // }

    // return (
    //     <div>

    //         {/* <nav className="NavbarItems">
    //             <NavLink to='/' className="navbar-logo">
    //                 React
    //             </NavLink>

    //             <div className="menu-icon" onClick={() => handleClick()}>
    //                 {clicked ? <CloseIcon /> : <MenuIcon />}
    //             </div>

    //             <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
    //                 {
    //                     MenuItems.map((item, index) => {
    //                         return (
    //                             <div key={index}>
    //                                 <li>
    //                                     <NavLink to={item.url} className={item.cName} >
    //                                         {item.title}
    //                                     </NavLink>
    //                                 </li>
    //                             </div>
    //                         )
    //                     })
    //                 }
    //                 {auth_buttons}
    //             </ul>
    //         </nav> */}
    //     </div>
    // )
}

export default Navbar;