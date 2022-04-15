import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Card, CardActionArea, CardMedia, Avatar, CardContent, Typography, Fab } from '@material-ui/core';
import BtnPlus from '@material-ui/icons/Add';
import './Story.css';
import CameraIcon from '@material-ui/icons/VideoCall';
import AlbumIcon from '@material-ui/icons/PhotoLibraryRounded';
import EmojiIcon from '@material-ui/icons/EmojiEmotionsRounded';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    paper: {
        height: 301,
        width: 180,
        marginBottom: 10,
    },
    user_story: {
        backgroundColor: "red",
    },
    paper_new: {
        height: 60,
        width: 750,
        marginBottom: 15,
    },
}));

export default function Story() {
    const classes = useStyles();
    let avatar = `${process.env.PUBLIC_URL}/avatars/avatar.jpg`;
    let user_info = JSON.parse(localStorage.getItem('user'));
    const [content, setContent] = useState('');

    const submit = (event) => {
        if (event.charCode === 13) {
            const data = new FormData();
            data.append('user_id', user_info.id)
            data.append('content', content)

            axios.get('sanctum/csrf-cookie').then(() => {
                axios.post(`api/send_post`, data).then((response) => {
                    if (response.data.status === 200) {
                        setContent('');
                    }
                }).catch((err) => {
                    console.log(err)
                })
            })
        }
    }

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                {[0, 1, 2, 3].map((value) => (
                    value === 0 ? (
                        <Grid key={value} item>
                            <Paper elevation={5} className={classes.paper} >
                                <Card sx={{ display: 'flex', flexDirection: 'column' }} className="card">
                                    <CardActionArea onClick={(e) => console.log(e)}>
                                        <CardMedia
                                            component='img'
                                            alt="image test"
                                            image={avatar}
                                            title="Current user"
                                            style={{ height: 204 }}
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography align="center">
                                            <Fab color="primary" aria-label="add">
                                                <BtnPlus />
                                            </Fab>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ) : (
                        <Grid key={value} item>
                            <Paper elevation={5} className={classes.paper} >
                                <Card sx={{ display: 'flex', flexDirection: 'column' }} className="card">
                                    <CardActionArea onClick={(e) => console.log(e)}>
                                        <CardMedia
                                            component='img'
                                            alt="image test"
                                            style={{ height: 300 }}
                                            image={avatar}
                                            title="Story"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </Grid>
                    )
                ))}
            </Grid>

            <Grid container justifyContent="center" alignItems="center" direction="row">
                <Grid item>
                    <Paper elevation={5} className={classes.paper_new}>
                        <Avatar src={avatar} className="avatar_icon_new" />
                        <input
                            type="text" placeholder={"What's up on your mind " + user_info.name.split(" ")[0] + "? Press Enter to send"}
                            className="input_new"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            onKeyPress={e => submit(e)}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" direction="row">
                <Grid item>
                    <Paper elevation={5} className={classes.paper_new} justifyContent="center" alignItems="center">
                        <p className="create_live">
                            <CameraIcon style={{ margin: '5px', position: 'relative', float: 'left', marginLeft: '30px' }} />
                            <span style={{ position: 'relative', float: 'left', margin: '5px' }}>  Live Video </span>
                        </p>

                        <p className="create_live">
                            <AlbumIcon style={{ margin: '5px', position: 'relative', float: 'left', marginLeft: '30px' }} />
                            <span style={{ position: 'relative', float: 'left', margin: '5px' }}>  Photos/Videos </span>
                        </p>

                        <p className="create_live">
                            <EmojiIcon style={{ margin: '5px', position: 'relative', float: 'left', marginLeft: '30px' }} />
                            <span style={{ position: 'relative', float: 'left', margin: '5px' }}>  Feeling/Activity </span>
                        </p>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" direction="row">
                <Grid item>
                    <Paper elevation={5} className={classes.paper_new}>
                        <p className="create_room">
                            <CameraIcon style={{ margin: '5px', position: 'relative', float: 'left', marginLeft: '30px' }} />
                            <span style={{ position: 'relative', float: 'left', margin: '5px' }}>  Create room </span>
                        </p>
                        <Avatar src={avatar} className="avatar_icon_room" />
                        <Avatar src={avatar} className="avatar_icon_room" />
                        <Avatar src={avatar} className="avatar_icon_room" />
                        <Avatar src={avatar} className="avatar_icon_room" />
                        <Avatar src={avatar} className="avatar_icon_room" />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
