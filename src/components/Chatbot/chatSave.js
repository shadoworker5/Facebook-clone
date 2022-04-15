import React, { useState, useEffect } from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, Fab, makeStyles, Grid,Paper, TextField, Button } from '@material-ui/core';
import './Chatbot.css';
import Response from '../../data/chatbot.json';

const useStyles = makeStyles(() =>
    createStyles({
        fabButton: {
            position: 'fixed',
            zIndex: 1,
            bottom: 20,
            right: 15,
        },
        container:{
            position: 'fixed',
            zIndex: 1,
            right: 15,
            bottom: 85,
            width: 450,
        },
        chat_container: {
            height: 550,
        },
        chat_content: {
            height: 382,
        },
        chat_header: {
            height: 40,
            background: 'blue',
            color: '#fff',
        },
        chat_body: {
            height: 333,
            overflowY: 'auto',
        },
        chat_bot: {
            borderRadius: 5,
        },
        user: {
            // code
        },
    }),
);

export default function Chatbot() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    let message_body = document.getElementById("message_body");
    
    useEffect(() => {
        // code
    }, [open]);

    const isOpen = () => {
        console.log(Response)
        setOpen(!open);
        openChat();
    }

    const openChat = () => {
        // code
    }

    const onInputChange = e => {
        setMessage(e.target.value);
    };    
    
    const send = (e) => {
        if(userName !== ''){
            message_body.innerHTML += `<br/><span> <span class="chat-bot"> ${userName}: </span> ${message}</span>`;
        }
        chatBot(message);
        setMessage('');
    }

    function printMessage(content){
        message_body.innerHTML += '<br/><span> <span class="chat-bot">Chatot:</span> '+content+'</span>';
    }
    
    function chatBot(msg){
        if(userName === ''){
            setUserName((userName) => userName = msg);
            printMessage("Ravi de faire votre connaissance "+msg+". Quoi de neuf?");
        }
        
        if(msg.indexOf("comment vas tu?") >= 0){
            printMessage("Je vais bien et toi?");
        }
        
        if(msg.indexOf("passion") >= 0){
            printMessage("Ma passion c'est programmation car je ne comprend qu du binaire");
        }
        
        if(msg.indexOf("quel pays") >= 0){
            printMessage("Je viens du Burkina Faso");
        }
        
        if(msg.indexOf("heure") >= 0){
            printMessage("Actuellement il est "+Date('H:i:s')+" dans mon pays");
        }
        
        if(msg.indexOf("Qui est Kassoum") >= 0){
            printMessage("Kassoum est celui qui m'a developpe. Il envisage devenir un expert en cyber securite");
        }
        
        // if(message.indexOf("") = 0){
        //     printMessage("Je ne comprends pas ce que vous dites!!!!");
        // }
    }

    return (
        <>
            {
                open && (
                <Grid className={classes.container}>
                    <Paper elevation={10} className={classes.chat_container}>
                        <div className={classes.chat_content}>
                            <div className={classes.chat_header}>
                                Chatbot
                            </div>
                            
                            <div className={classes.chat_body} id="message_body">
                                <div className="chat_bot">
                                    Chatbot: 23:39 20/06/2021 
                                    <br/>
                                    Bonjour. Quel est votre nom?
                                </div>

                                {/* <div>
                                    Countdown: counters
                                </div> */}
                            </div>
                        </div>

                        <div className={classes.chat_input}>
                            <TextField
                                label='Contenu'
                                name="content"
                                multiline
                                rows={5}
                                value={message}
                                onChange={e => onInputChange(e)}
                                variant="outlined"
                                placeholder='Ecrivez ici'
                                type='text'
                                fullWidth required
                            />

                            <Button type='submit' onClick={send} color='primary' variant="contained" fullWidth> Envoyé </Button>
                        </div>
                    </Paper>
                </Grid>
                )
            }

            <Fab color="secondary" onClick={isOpen} aria-label="add" className={classes.fabButton}>
                {open ? <CloseIcon/> : <ChatIcon/>}
            </Fab>
        </>
    )
}
