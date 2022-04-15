import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            error_list: '',
            _token: '',
            disable: false,
            spinner: false
        };
        this.redirect_to = '/home';
        this.user_name = 'user_name';
        this.user_role = 'user_role';
        this.token = 'app_token';
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
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then((response) => {
                if(response.data.status === 200){
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('app_token', response.data.app_token);
                }else if(response.data.status === 401){
                    this.setState({error: response.data.message})
                    this.setState({error_list: []})
                }else{
                    this.setState({error_list: response.data.error})
                }
            }).catch((err) =>{
                // console.log('login: '+err);
            })
        })
    }

    render() {
        const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
        const avatarStyle = { backgroundColor: '#3370bd' }
        const btnstyle = { margin: '8px 0' }

        // const token = ;
        if (localStorage.getItem(this.token)) return <Redirect to={this.redirect_to} />

        return (
            <div>
                <br/> <br/> <br/> <br/>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h3 style={{ color: "red" }}> {this.state.error} </h3>
                        </Grid>

                        <TextField
                            label='Email'
                            name="email"
                            value={this.state.email}
                            onChange={e => this.handleInputChange(e)}
                            placeholder='Enter Email'
                            type='email'
                            fullWidth required
                        />
                        <small style={{color:"red"}}>{this.state.error_list['email']}</small>

                        <TextField
                            label='Password'
                            name="password"
                            value={this.state.password}
                            onChange={e => this.handleInputChange(e)}
                            placeholder='Enter password'
                            type='password'
                            fullWidth required
                        />
                        <small style={{color:"red"}}>{this.state.error_list['password']}</small>

                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e) => this.handleSubmit(e)}>
                            {/* <CircularProgress sx={{ position: 'relative' }} size={50} color="light" /> */}
                            Sign in
                        </Button>

                        {/* <Box>
                    </Box> */}

                        <Typography > Don't Have Account ?
                            <NavLink to="/singup">
                                <span style={{ marginLeft: "4px" }}>Singup</span>
                            </NavLink>
                        </Typography>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

// const styles = StyleSheet.create({
//     container: {
//       padding: 10
//     },
// });

export default Signin;