import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Grid, makeStyles, Paper, Card, Typography, CardActionArea, CardMedia, CardContent, Button } from '@material-ui/core';
import { NavLink, useHistory } from "react-router-dom";
import Services from '../../service/Services';
import { useDispatch, useSelector } from 'react-redux';
import { fecthUsers } from "../../redux/actions/userAction";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 520,
        width: 350,
    },
    container: {
        marginLeft: "10px",
        marginBottom: "10px",
    }
}));

export default function Friends() {
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    const classes = useStyles();
    const btnstyle = { margin: '8px 0' };
    const history = useHistory();
    const users = useSelector((state) => state.allUsers.users);
    let user_info = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();

    const fetchUsers = async () => {
        const response = await axios.get(`api/user`).catch((err) => {
            console.log(err)
        })
        dispatch(fecthUsers(response.data));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderUser = (id) => {
        history.push(`/account/${id}`);
    }

    const renderStore = users.map((user) => {
        const { id, name, token, image_path } = user;
        let url_image = image_path === null && avatar;

        return (
            <div key={id} className={classes.container}>
                {
                    token !== user_info.token &&
                    (
                        <Grid item>
                            <Paper elevation={10} className={classes.paper} >
                                <Card sx={{ display: 'flex', flexDirection: 'column' }} className="card">
                                    <CardActionArea onClick={() => renderUser(token)}>
                                        <CardMedia
                                            component='img'
                                            alt="image test"
                                            className="card_images"
                                            image={url_image}
                                            title={name}
                                        />
                                    </CardActionArea>

                                    <CardContent>
                                        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
                                            <NavLink to={`/account/${token}`} title={name}>
                                                {name}
                                            </NavLink>
                                        </Typography>

                                        <Typography variant="body1">
                                            <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e) => Services.sendFriendRequest(id)}>
                                                Add friend
                                            </Button>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    )
                }
            </div>
        );
    });

    return (
        <div>
            <Helmet>
                <title> Friends | FaceBook clone </title>
            </Helmet>

            <br /><br /><br /><br /><br /><br /><br />

            <Grid container className={classes.root} direction="column">
                <Grid item>
                    <Grid item container justify="center" spacing={4} alignItems="flex-start">
                        {renderStore}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}