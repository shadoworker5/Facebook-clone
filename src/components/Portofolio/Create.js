import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink, Redirect, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import View from './View';


const Create = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#3370bd' }
    const btnstyle = { margin: '8px 0' }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [result, setResult] = useState('');
    const [link, setLink] = useState('');

    const handleInputChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(name === 'name'){
            setName(value)
        }
        else if(name === 'email'){
            setEmail(value)
        }
        else if(name === 'phone'){
            setPhone(value)
        }
        else if(name === 'birth'){
            setBirth(value)
        }
        else if(name === 'pseudo'){
            setPseudo(value)
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {name, email, phone, birth, pseudo, token: localStorage.getItem('token')};

        axios.post('portofolio', data)
        .then((response) => {
            setLink(response.data.link);
            setResult(response.data.response);
        }).catch((err) =>{
            // code
        });
    }

    return (
        <div>
            <br/><br/><br/>

            <Grid>
                <Paper elevation={10}>
                    <Grid align='center'>
                        {/*<Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar> */}
                        <h2> Create </h2>
                        <h3 style={{color:"red"}}>{result}</h3>
                        <h3 style={{color:"green"}}><Link to={{pathname: link}} target="_blank"> {link} </Link></h3>
                    </Grid>

                    <TextField
                        label='Name'
                        name="name"
                        value={name}
                        onChange={e => handleInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />

                    <TextField
                        label='Pseudo'
                        name="pseudo"
                        value={pseudo}
                        onChange={e => handleInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />

                    <TextField
                        label='Phone'
                        name="phone"
                        value={phone}
                        onChange={e => handleInputChange(e)}
                        placeholder='Enter your phone'
                        type='tel'
                        fullWidth required
                    />

                    <TextField
                        label='Email'
                        name="email"
                        value={email}
                        onChange={e => handleInputChange(e)}
                        placeholder='Enter Email'
                        type='text'
                        fullWidth required
                    />

                    <TextField
                        name="birth"
                        value={birth}
                        onChange={e => handleInputChange(e)}
                        type='date'
                        fullWidth required
                    />

                    <TextField
                        name="birth"
                        value={birth}
                        onChange={e => handleInputChange(e)}
                        type='file'
                        fullWidth required
                    />

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e) => handleSubmit(e)}>
                        Create
                    </Button>

                </Paper>
            </Grid>
        </div>
    )
}


export default Create;