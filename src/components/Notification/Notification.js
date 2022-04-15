import React, { useState, useEffect } from 'react'
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Helmet } from 'react-helmet';
import { makeStyles, Paper, Grid, Avatar, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Services from '../../service/Services';

const styles = (theme) => ({
    // root: {
    //     margin: 0,
    //     padding: theme.spacing(2),
    // },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
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
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
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


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Notification(props) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    let user_info = JSON.parse(localStorage.getItem('user'));
    const [friendRequest, setFriendRequest] = useState([]);
    const handleClose = () => {
        setOpenDialog(!openDialog);
    };

    const setFriendRelation = (id, status='1') => {
        const data = {
            id,
            status
        }
        axios.get('sanctum/csrf-cookie').then(() => {
            axios.patch(`api/friend_request/${data}`, data).then((response) => {
                if (response.data.status === 200) {
                    fecthAllFriendRequest();
                    Services.showResponseOK(response.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    const cancelRequest = (id) => {
        Services.cancelFriendRequest().then((willDelete) => {
            if (willDelete) {
                setFriendRelation(id, '2')
            }
        });
    }

    const fecthAllFriendRequest = async () => {
        const response = await axios.get(`api/getNofifyByUser/${user_info.token}`).catch((err) => { console.log('Error', err) });
        if (response.data.count > 0) {
            setFriendRequest(response.data.user);
        } else {
            setFriendRequest([]);
        }
    }

    useEffect(() => {
        fecthAllFriendRequest();

        return () => {
            // code
        }
    }, []);


    const renderFriendRequest = friendRequest.map((result) => {
        const { id, user } = result;
        return (
            <Paper className={classes.paper} key={id}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            <NavLink to='/notification'>
                                {user.name}
                            </NavLink>
                        </Typography>
                        <Typography>
                            <Button onClick={() => setFriendRelation(id)}> Add </Button>
                            <Button onClick={() => cancelRequest(id)}> Reject </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    });

    return (
        <div>
            <Helmet>
                <title> Notification | ShowcaseAPP </title>
            </Helmet>

            <br /><br /><br /><br />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper} style={{ height: '400px' }}>
                            {/* <div className={classes.avatar_position}>
                                <img src={avatar} alt="Avatar" className="image_size" />
                            </div> */}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        {
                            friendRequest.length > 0 ? (
                                renderFriendRequest
                            ) : (
                                <Paper className={classes.paper}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs>
                                            <Typography>
                                                You don't have friend request!!!
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        }
                    </Grid>
                </Grid>
            </div>

            <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={() => handleClose()}>
                    Notification
                </DialogTitle>

                <DialogContent dividers>
                    <Typography gutterBottom>
                        Votre mail a été envoyé avec succes.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={() => handleClose()} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}