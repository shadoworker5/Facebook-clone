import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Services from '../../service/Services';
import { makeStyles, Paper, Grid, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser, removeSelectedUser } from "../../redux/actions/userAction";
import './Profile.css';
import * as timeago from 'timeago.js'
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    other_paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar_position: {
        // position: 'center'
        padding: 'auto',
    }
}));

export default function Account(props) {
    const btnstyle = { margin: '8px 0' };
    const classes = useStyles();
    const get_param = useParams();
    let user_info = JSON.parse(localStorage.getItem('user'));
    const token = get_param.id;
    const dispatch = useDispatch();
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    const [content, setContent] = useState('');
    const [empty, setEmpty] = useState(false);
    const user = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);

    const fetchUserProfil = async () => {
        const response = await axios.get(`api/user/${token}`).catch((err) => { });
        dispatch(selectedUser(response.data.user[0]));
    }

    const fecthAllPostsByUser = async () => {
        const response = await axios.get(`api/getPostByUser/${token}`).catch((err) => { console.log('Error', err) });
        setPosts(response.data)
        if (response.status) {
            response.data.length === 0 ? setEmpty(true) : setEmpty(false)
        }
    }

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const post_img = event.target.picture.files[0];
        const data = new FormData();
        data.append('user_id', user_info.id)
        data.append('content', content)
        data.append('post_img', post_img)

        axios.get('sanctum/csrf-cookie').then(() => {
            axios.post(`api/send_post`, data).then((response) => {
                console.log(response.data)
                if (response.data.status === 200) {
                    fecthAllPostsByUser();
                    setContent('');
                    event.target.picture.value = "";
                    Services.showResponseOK(response.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    useEffect(() => {
        if (token && token !== "") {
            fetchUserProfil();
            fecthAllPostsByUser();
        }

        return () => {
            dispatch(removeSelectedUser());
        }
    }, [token]);

    const setStyle = (content) => {
        const LARGE_SIZE = 1555
        return content.length > LARGE_SIZE ? "post_container_large_size" : ""
    }

    const setSize = (event) => {
        let btn = event.target.id
        let post_container = "key_" + btn.split("_")[1]
        document.getElementById(post_container).setAttribute("class", "")
        document.getElementById(btn).setAttribute("hidden", "true")
    }

    const renderPosts = posts.map((post_content) => {
        const { id, content, created_at } = post_content;
        return (
            <Paper className={classes.paper} key={id}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={avatar} />
                    </Grid>
                    <Grid item xs>
                        <Typography> {timeago.format(created_at)} </Typography>
                        <Typography style={{ textAlign: "justify" }} id={'key_' + id} className={setStyle(content)}>
                            {content}
                        </Typography>
                        {
                            content.length > 1555 ? (<span style={{ color: "blueviolet", cursor: "pointer" }} id={'btn_' + id} onClick={(e) => setSize(e)}>
                                Read more </span>
                            ) : (<div></div>)
                        }
                    </Grid>
                </Grid>
            </Paper>
        );
    });

    return (
        <div>
            <Helmet>
                <title> Profil | FaceBook clone </title>
            </Helmet>

            <br /> <br /> <br /><br />

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper} style={{ height: '550px' }}>
                            <div className={classes.avatar_position} style={{ textAlign: "center" }}>
                                <img src={avatar} alt="Avatar" className="image_size" />
                            </div>

                            <div>
                                {
                                    Object.keys(user).length === 0 ? (<h2 style={{ textAlign: "center" }}> Loading... </h2>) : (
                                        <div>
                                            <h3> Name: {user.name} </h3>
                                            <h3> Speudo: {user.user_name} </h3>
                                            <h3> E-mail: {user.email} </h3>
                                            <h3> Phone: {user.contact} </h3>
                                            <h3> Friend count: 1 </h3>

                                            {
                                                token === user_info.token ? (
                                                    <NavLink to={'/edit'}>
                                                        <Button color='primary' variant="contained" style={btnstyle} fullWidth>
                                                            Edit profil
                                                        </Button>
                                                    </NavLink>
                                                ) : (
                                                    <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e) => Services.sendFriendRequest(user.id)}>
                                                        Add friend
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <div className="post_container">
                            {
                                token === user_info.token && (
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <TextField
                                            type="file"
                                            name="picture"
                                        />
                                        <TextField
                                            type="text"
                                            name="content"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={content}
                                            onChange={(e) => handleChange(e)}
                                        />

                                        <Button type="submit"> Send </Button>
                                    </form>
                                )
                            }
                            {
                                Object.keys(posts).length === 0 ? (
                                    !empty ? (<h2 style={{ textAlign: "center" }}> Loading... </h2>) : (
                                        <Paper className={classes.paper}>
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <Grid item xs>
                                                    <Typography style={{ textAlign: "center", fontWeight: "700", fontSize: "20px" }}>
                                                        Post not found
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    )
                                ) : (
                                    renderPosts
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}