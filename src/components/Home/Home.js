import React, { useEffect, useState } from 'react';
import './Home.css'
import { Grid, makeStyles, Paper, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import NavbarLeft from '../Navbar/NavbarLeft';
import NavbarRight from '../Navbar/NavbarRight';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import * as timeago from 'timeago.js'
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import { fecthPosts, removeSelectedPost } from "../../redux/actions/postAction";
import EventNoteIcon from '@material-ui/icons/EventNote';
import Services from '../../service/Services';
import Icon from '@material-ui/core/Icon';
import Story from '../Story/Story';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: 10,
        color: theme.palette.text.secondary,
    },
}));

export default function Home(props) {
    const classes = useStyles();
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    const posts = useSelector((state) => state.allPosts.posts);
    const history = useHistory();
    const dispatch = useDispatch();
    let user_info = JSON.parse(localStorage.getItem('user'));
    const URL = "http://127.0.0.1:8000/post_image_path";

    const fecthAllPosts = async () => {
        const response = await axios.get(`api/posts`).catch((err) => { console.log('Error', err) });
        dispatch(fecthPosts(response.data))
    }

    const sendCommente = (event) => {
        event.preventDefault();
        const data = {
            post_id: parseInt(event.target.post_id.value),
            user_id: user_info.id,
            commente: event.target.commente.value,
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/add_commente', data).then((response) => {
                if (response.status === 200) {
                    // Services.showResponseOK(response.data.message);
                    fecthAllPosts();
                    event.target.commente.value = ""
                }
            }).catch((err) => {
            })
        })
    }

    const sendLikeDislike = (post_id, value) => {
        const data = {
            post_id: post_id,
            user_id: user_info.id,
            value: value,
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/add_like', data).then((response) => {
                if (response.status === 200) {
                    fecthAllPosts();
                    // Services.showResponseOK(response.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        });
    }

    const openPost = (id) => {
        history.push(`/show_post/${id}`);
    }

    const counItem = (value) => {
        if (value === null) {
            return 0;
        } else {
            if (value < 1000) {
                return value;
            } else {
                const new_value = String(value)
                if (value < 10000) {
                    return `${new_value[0]}K`;
                } else {
                    if (value <= 99999) return `${new_value[0]}${new_value[1]}K`;
                    else if (value <= 999999) return `${new_value[0]}${new_value[1]}${new_value[2]}K`;
                    else return `${new_value[0]}M`;
                }
            }
        }
    }

    useEffect(() => {
        fecthAllPosts();
    }, []);

    const setStyle = (content) => {
        const LARGE_SIZE = 1555
        return content.length > LARGE_SIZE ? "post_container_size" : ""
    }

    const setSize = (event) => {
        let btn = event.target.id
        let post_container = "key_"+btn.split("_")[1]
        document.getElementById(post_container).setAttribute("class", "")
        document.getElementById(btn).setAttribute("hidden", "true")
    }

    const renderPosts = posts.map((post_content) => {
        const { id, content, created_at, image_path, like_sum_like, like_sum_dislike, comments_sum_post_id, user } = post_content;
        let user_avatar = avatar; //user.image_path ||
     
        return (
            <Paper className={classes.paper} key={id}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={user_avatar}>  </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            <NavLink to={`/account/${user.token}`} style={{ textDecorationLine: "none" }}>
                                {user.name}
                            </NavLink>
                        </Typography>
                        <Typography>{timeago.format(created_at)}</Typography>
                        <Typography style={{ textAlign: "justify", marginRight: "50px" }} id={'key_'+id} className={setStyle(content)}>
                            <p onClick={(e) => openPost(id)} style={{ cursor: "pointer"}}>
                            {content} <br />
                            {
                                image_path && (
                                    <img src={`${URL}/${image_path}`} height="100px" width="100px" />
                                )
                            }
                            </p>
                        </Typography>
                        {
                            content.length > 1555 ? (<span style={{ color: "blueviolet", cursor: "pointer" }} id={'btn_'+id} onClick={ (e) => setSize(e) }>
                                Read more </span>
                            ) : (<div></div>)
                        }
                        <Button color='primary' onClick={(e) => sendLikeDislike(id, 'like')}> <LikeIcon /> {counItem(like_sum_like)} </Button>
                        <Button color='secondary' onClick={(e) => sendLikeDislike(id, 'dislike')}> <DislikeIcon /> {counItem(like_sum_dislike)} </Button>
                        
                        <div className="form_container">
                            <form autoComplete="off" onSubmit={(e) => sendCommente(e)}>
                                <input type="text" name="post_id" value={id} readOnly hidden />
                                <TextField
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    className="input_comment"
                                    name="commente"
                                    onChange={ e => e }
                                />
                                <Button type="submit" variant="contained" title='Reply' color='primary' className="send_comment_btn">
                                    <SendIcon/>
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <Helmet>
                <title> Home | ShowcaseAPP </title>
            </Helmet>

            <br /><br /><br /><br />

            <Grid container spacing={2}>
                <Grid item xs>
                    <NavbarLeft class={classes.paper} />
                </Grid>

                <Grid item xs={6} className="auto_scroll">
                    <Story />
                    
                    {
                        Object.keys(posts).length === 0 ? (<h2 style={{ textAlign: 'center' }}> Loading... </h2>) : (
                            renderPosts
                        )
                    }
                </Grid>

                <Grid item xs>
                    <NavbarRight class={classes.paper} />
                </Grid>
            </Grid>
        </div>
    )
}