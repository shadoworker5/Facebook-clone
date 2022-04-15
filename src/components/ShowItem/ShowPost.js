import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as timeago from 'timeago.js'
import { Grid, makeStyles, Paper, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { useHistory, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './ShowItem.css';
import { selectedPost, removeSelectedPost } from "../../redux/actions/postAction";
import axios from 'axios';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    }
}));

const ShowPost = () => {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const post_data = useSelector((state) => state.post);
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    let user_info = JSON.parse(localStorage.getItem('user')); //user_info.name
    const { content, image_path, created_at, like_sum_like, like_sum_dislike } = post_data;
    const [user, setUser] = useState({});
    const [comment, setComment] = useState([]);
    const history = useHistory();

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
                    fetchPost();
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
                    fetchPost();
                    // Services.showResponseOK(response.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        });
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

    const fetchPost = async () => {
        const response = await axios.get(`api/posts/${id}`).catch((err) => { console.log('Error', err) });
        setUser(response.data[0].user)
        console.log(response.data)
        dispatch(selectedPost(response.data[0]))
    }
    
    const fetchComment = async () => {
        const response = await axios.get(`api/getCommentByPost/${id}`).catch((err) => { console.log('Error', err) });
        setComment(response.data);
    }

    useEffect(() => {
        fetchPost();
        fetchComment();

        return () => {
            dispatch(removeSelectedPost());
        }
    }, []);

    const renderComment = comment.map((content) => {
        const { id, name, token, comment, created_at } = content;
        return (
            <Paper key={'key_'+id} style={{ marginBottom: "10px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>                            
                            <NavLink to={`/account/${token}`}>
                                { name }
                            </NavLink>
                        </Typography>
                        <Typography> <small> { timeago.format(created_at) } </small> </Typography>
                        <Typography> { comment } </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    });

    return (
        <div>
            <br /><br /><br /><br /><br />
            <Helmet>
                <title> Show post | FaceBook clone </title>
            </Helmet>

            <Paper style={{ marginBottom: "20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={avatar}>  </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            <NavLink to={`/account/${user.token}`}> {user.name} </NavLink>
                        </Typography>
                        <Typography>{timeago.format(created_at)}</Typography>
                        <Typography>
                            {content} <br />
                            {
                                image_path && (
                                    <img src={`${URL}/${image_path}`} height="100px" width="100px" />
                                )
                            }
                        </Typography>
                        <Button color='primary' onClick={(e) => sendLikeDislike(id, 'like')}> <LikeIcon /> {counItem(like_sum_like)} </Button>
                        <Button color='secondary' onClick={(e) => sendLikeDislike(id, 'dislike')}> <DislikeIcon /> {counItem(like_sum_dislike)} </Button>
                        
                        <div className="form_container">
                            <form autoComplete="off" onSubmit={(e) => sendCommente(e)}>
                                <input type="text"
                                    name="post_id"
                                    value={id}
                                    hidden />
                                <TextField
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    name="commente"
                                    onChange={ e => e }
                                    style={{ width: "1412px", height: "75px", float: "left" }}
                                />
                                <Button type="submit" variant="contained" color='primary'
                                    style={{ float: "right", display: "block", position: "relative", left: "808px", bottom: "0px" }}
                                > Send </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Paper>

            <div className="content_comment">
                { renderComment }
            </div>

        </div>
    )
}

export default ShowPost;