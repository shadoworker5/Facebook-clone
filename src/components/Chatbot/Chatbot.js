import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import { Fab, Grid,Paper, TextField, Button } from '@material-ui/core';
import Response from '../../data/chatbot.json';
import './Chatbot.css';

let Styles = {
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
    }
}

class Chatbot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open    : false,
            userName: '',
            message : '',
            email   : '',
        }
    }

    componentDidMount(){
        // code
        // console.log(Response.questions);
    }

    componentDidUpdate(){
        if(this.state.open){
            var coll = document.getElementsByClassName("collapsible");
            for (let i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
            
                    var content = this.nextElementSibling;
            
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }            
                });
            }
        }
    }

    isOpen(){
        this.setState({open : !this.state.open});
        this.start()
    }

    start(){
        if(!this.state.open){
            this.startChat();
        }
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    sendMessage(e){
        let timing = `<h5>${this.getTime()}</h5>`;
        let userText = this.state.message;
        let userHtml = `${timing} <p class="userText"><span> ${userText} </span></p>`;
        
        document.getElementById("chatbox").innerHTML += userHtml;
        this.setState({message : ''});

        setTimeout(() => {
            this.chatBot(userText);
        }, 1000)
    }

    printMessage(content){
        let timing = `<h5>${this.getTime()}</h5>`;
        let message_body = document.getElementById("chatbox");
        
        setTimeout(() => {
            message_body.innerHTML += `${timing} <p class="botText"><span> ${content} </span></p>`;
        }, 1000);
        document.getElementById("chatbox").scrollTop += 100;
    }

    chatBot(msg){
        if(msg === ""){
            this.printMessage("Je ne comprends pas ce que vous dites!!!!");
        }else{
            if(this.state.userName === ''){
                this.setState({userName: msg});
                this.printMessage(`Ravi de faire votre connaissance ${msg} Quoi de neuf?`);
            }
            
            else if(msg.indexOf("comment vas tu") >= 0){
                this.printMessage("Je vais bien et Vous?");
            }
    
            else if(msg.indexOf("contact") >= 0){
                this.printMessage(Response.response.contact);
            }
            
            else if(msg.indexOf("passion") >= 0){
                this.printMessage("Ma passion c'est programmation car je ne comprend qu du binaire");
            }
            
            else if(msg.indexOf("quel pays") >= 0){
                this.printMessage("Je viens du Burkina Faso");
            }
            
            else if(msg.indexOf("heure") >= 0 || msg.indexOf("time") >= 0){
                let time = new Date();
                this.printMessage("Actuellement il est "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" dans mon pays");
            }
            
            else if(msg.indexOf("Qui est Kassoum") >= 0){
                this.printMessage("Kassoum est celui qui m'a developpe. Il envisage devenir un expert en cyber securite");
            }

            else{
                this.printMessage("Je ne comprends pas ce que vous dites!!!!");
            }
        }
    }

    getTime() {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
    
        if (hours < 10) {
            hours = "0" + hours;
        }
    
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    
        let time = hours + ":" + minutes;
        return time;
    }

    startChat(){
        setTimeout(() => {
            document.getElementById("botStarterMessage").innerHTML = `<p class="botText"><span> ${Response.salutation} </span></p>`;

            let time = this.getTime();
            document.getElementById('chat-timestamp').append(time);
        }, 2000);
    }
    
    render() {
        return (
            <div>
                {
                    this.state.open && (
                    <Grid style={Styles.container}>
                        <Paper elevation={10} style={Styles.chat_container}>
                            <div>
                                <Button class="collapsible" onClick={() => this.isOpen()}> Chat with us! </Button>

                                <div >
                                    <div className="full-chat-block">
                                        <div className="outer-container">
                                            <div className="chat-container">                                                
                                                <div id="chatbox" className="chatbox_scrool">
                                                    <h5 id="chat-timestamp"> </h5>
                                                    <p id="botStarterMessage" className="botText"><span>Loading...</span></p>
                                                </div>

                                                <div className="chat-bar-input-block">
                                                    <div id="userInput">
                                                        <TextField
                                                            label='Contenu'
                                                            name="message"
                                                            multiline
                                                            rows={5}
                                                            value={this.state.message}
                                                            onChange={e => this.handleInputChange(e)}
                                                            variant="outlined"
                                                            placeholder='Ecrivez ici'
                                                            type='text'
                                                            fullWidth required
                                                        />

                                                        <p></p>
                                                    </div>

                                                    <div className="chat-bar-icons">
                                                        <Button type='submit' onClick={() => this.sendMessage()} color='primary' variant="contained"> Envoyé </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    )
                }

                {/* style={{zIndex: 1, position: 'fixed', bottom: 20, right: 15,}} */}
                
                <Fab color="secondary" onClick={() => this.isOpen()} aria-label="add" style={Styles.fabButton}>
                    {this.state.open ? <CloseIcon/> : <ChatIcon/>}
                </Fab>
            </div>
        )
    }
}

export default Chatbot;