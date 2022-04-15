import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './EditProfil.css'
// import axios from 'axios';


function EditProfil() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    // const avatarStyle = { backgroundColor: '#3370bd' };
    const btnstyle = { margin: '8px 0' };
    let user_info = JSON.parse(localStorage.getItem('user'));
    const [profile, setProfile] = useState({
        name: user_info.name,
        pseudo: user_info.user_name,
        email: user_info.email,
        phone: user_info.contact,
        avatar: '',
        error_list: []
    });
    const [changemdp, setChangemdp] = useState({
        password: '',
        old_password: '',
        confirm_password: '',
        error_list: []
    });

    // const redirect_to = '/home';
    // const history = useHistory();

    const onDragInit = (event) => {
        // const item = document.querySelector("#dropzone");
        console.log(event)

    }
    // ();

    const ProfilInputChange = (event, type = 'profile') => {
        const target = event.target;
        if (type === 'profile')
            setProfile({ [target.name]: target.value })
        else
            setChangemdp({ [target.name]: target.value });
    }

    // const PasswordInputChange = (event) => {
    //     // const target = event.target;
    // }

    const handleSubmit = (event) => {
        event.preventDefault();

        // axios.get('sanctum/csrf-cookie').then(response => {
        //     axios.post('api/register', this.state).then((response) => {
        //         if(response.data.status === 200){
        //             localStorage.setItem('user', JSON.stringify(response.data.user));
        //             localStorage.setItem('app_token', response.data.app_token);
        //             return <Redirect to={this.redirect_to} />
        //         }
        //         this.setState({error_list : response.data.error});
        //     }).catch(err => {
        //         console.log('err: '+err);
        //     })
        // })
    }

    return (
        <div>
            <Helmet>
                <title> Edit profil | ShowcaseAPP </title>
            </Helmet>

            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar><LockOutlinedIcon /></Avatar>
                        <h2> Edit profil </h2>
                    </Grid>

                    <div draggable="true" id="dropzone">
                        <TextField
                            name="avatar"
                            // onChange={(e) => ProfilInputChange(e)}
                            // placeholder='Enter Name'
                            type='file'
                        // fullWidth required
                        />
                    </div>

                    <TextField
                        label='Name'
                        name="name"
                        value={profile.name}
                        onChange={(e) => ProfilInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {profile.error_list['name'] || ''} </span> */}

                    <TextField
                        label='Pseudo'
                        name="pseudo"
                        value={profile.pseudo}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {profile.error_list['pseudo'] || ''} </span> */}

                    <TextField
                        label='Phone'
                        name="phone"
                        value={profile.phone}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter your phone'
                        type='tel'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {profile.error_list['phone'] || ''} </span> */}

                    <TextField
                        label='Email'
                        name="email"
                        value={profile.email}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter Email'
                        type='email'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {profile.error_list['email'] || ''} </span> */}

                    <Button type='submit' onClick={(e) => handleSubmit(e)} color='primary' variant="contained" style={btnstyle} fullWidth>
                        Save
                    </Button>
                </Paper>
            </Grid>

            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar><LockOutlinedIcon /></Avatar>
                        <h2> Edit password </h2>
                    </Grid>

                    <TextField
                        label='Old Password'
                        name="old_password"
                        value={changemdp.old_password}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {changemdp.error_list['password']} </span> */}

                    <TextField
                        label='Password'
                        name="password"
                        value={changemdp.password}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {changemdp.error_list['password']} </span> */}

                    <TextField
                        label='Confirm password'
                        name="confirm_password"
                        value={changemdp.confirm_password}
                        onChange={e => ProfilInputChange(e)}
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                    />
                    {/* <span className="text_error"> {changemdp.error_list['confirm_password']} </span> */}

                    <Button type='submit' onClick={(e) => handleSubmit(e)} color='primary' variant="contained" style={btnstyle} fullWidth>
                        Save
                    </Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default EditProfil
