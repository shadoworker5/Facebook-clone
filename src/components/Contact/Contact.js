import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
// import Notify from '../Notify/Notify';

export default function Contact(){
    const [error, setError] = useState();
    const [testName, setTestName] = useState(false);
    const [testMail, setTestMail] = useState(false);
    const [testContent, setTestContent] = useState(false);

    const verify = (value, setTestValue) => {
        if(value === ''){
            setTestValue(true);
        }else{
            setTestValue(false);
        }
    }
    
    const onBlurInput = (e) =>{
        if(e.target.name === 'name'){
            verify(e.target.value, setTestName)
        }
        if(e.target.name === 'email'){
            let regex = /^[a-z0-9_.]+@[a-z0-9_]+?\.[a-z]{2,3}$/;            
            verify(e.target.value, setTestMail)
            !regex.test(e.target.value.toLowerCase()) ? setTestMail(true) : setTestMail(false);
        }
        if(e.target.name === 'content'){
            verify(e.target.value, setTestContent)
        }
    }

    const [contact, setContact] = useState({
        name    : "",
        email   : "",
        content : ""
    });
    
    const {name, email, content} = contact;
    const onInputChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const send = (e) => {
        if(contact.name === '' || contact.email === '' || contact.content === ''){
            setError('Veuillez remplir tous les champs');
        }else if(contact.name !== '' && contact.email !== '' && contact.content !== ''){
            let url = "http://127.0.0.1/api_laravel/api/contact";
            let send_mail = new FormData();
            send_mail.append('name', contact.name);
            send_mail.append('email', contact.email);
            send_mail.append('content', contact.content)

            fetch(url, {method: 'POST', body: send_mail})
            .then(response =>{
                response.json().then((result) =>{
                    if(result.status_code === 200){
                        // setOpen(true);
                        // <Notify />
                        setContact({name: '', email: '', content: ''});
                    }
                });
            }).catch((err) =>{
                console.log("Erreur: "+err);
            })
        }
    }

    return (
        <div>
            <Helmet>
                <title> Contacts | ShowcaseAPP </title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">                    
                    <Grid align="center"
                        style={{
                            marginTop: 50,
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 'auto'
                        }}
                    >
                        <Paper elevation={10} spacing={2}>
                            <small style={{color:"red", fontSize:'50px'}}> {error} </small>

                            <TextField
                                error={testName}
                                label='Nom et prénom'
                                name="name"
                                variant="outlined"
                                value={name}
                                onBlur={e => onBlurInput(e)}
                                onChange={e => onInputChange(e)}
                                placeholder='Enter nom et prénom'
                                type='text'
                                fullWidth
                                style={{marginBottom: '10px'}}
                                required
                            />
                            
                            <TextField
                                label='Email'
                                name="email"
                                variant="outlined"
                                error={testMail}
                                value={email}
                                onBlur={e => onBlurInput(e)}
                                onChange={e => onInputChange(e)}
                                placeholder='Enter Email'
                                type='email'
                                fullWidth
                                style={{marginBottom: '10px'}}
                                required
                            />

                            <TextField
                                label='Contenu'
                                name="content"
                                error={testContent}
                                value={content}
                                multiline
                                rows={10}
                                variant="outlined"
                                onBlur={e => onBlurInput(e)}
                                onChange={e => onInputChange(e)}
                                placeholder='Ecrivez votre mail'
                                type='text'
                                fullWidth required
                            />

                            <Button type='submit' onClick={send} color='primary' variant="contained" fullWidth> Envoyé </Button>
                        </Paper>
                    </Grid>
                </Container>
            </Box>

        </div>
    )
}
