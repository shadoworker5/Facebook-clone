import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import './Signup.css';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            pseudo: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            error_list: []
        };
        this.redirect_to = '/home';
        this.user_name = 'user_name';
        this.user_role = 'user_role';
        this.token = 'token';
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/register', this.state).then((response) => {
                if(response.data.status === 200){
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('app_token', response.data.app_token);
                    return <Redirect to={this.redirect_to} />
                }
                this.setState({error_list : response.data.error});
            }).catch(err => {
                console.log('err: '+err);
            })
        })
    }

    render() {
        const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
        const avatarStyle = { backgroundColor: '#3370bd' }
        const btnstyle = { margin: '8px 0' }

        return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign Up</h2>
                        {/* <h3 >{errors}</h3> */}
                    </Grid>

                    <TextField
                        label='Name'
                        name="name"
                        value={this.state.name}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['name'] } </span>

                    <TextField
                        label='Pseudo'
                        name="pseudo"
                        value={this.state.pseudo}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter Name'
                        type='text'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['pseudo'] } </span>

                    <TextField
                        label='Phone'
                        name="phone"
                        value={this.state.phone}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter your phone'
                        type='tel'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['phone'] } </span>

                    <TextField
                        label='Email'
                        name="email"
                        value={this.state.email}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter Email'
                        type='email'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['email'] } </span>

                    <TextField
                        label='Password'
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['password'] } </span>

                    <TextField
                        label='Confirm password'
                        name="confirm_password"
                        value={this.state.confirm_password}
                        onChange={e => this.handleInputChange(e)}
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                    />
                    <span className="text_error"> { this.state.error_list['confirm_password'] } </span>

                    <Button type='submit' onClick={(e) => this.handleSubmit(e)} color='primary' variant="contained" style={btnstyle} fullWidth>
                        Signup
                    </Button>

                    <Typography>Click Here for
                        <NavLink to="/singin">
                            <span style={{ marginLeft: "4px" }}>Login</span>
                        </NavLink>
                    </Typography>
                </Paper>
            </Grid>
        )
    }
}

export default Register