import React from 'react';
import Navbar from './components/Navbar/NavbarTop';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NotFound from './components/404/NotFound';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import { Container } from '@material-ui/core';
import Friends from './components/Friends/Friends';
import Contact from './components/Contact/Contact';
import Account from './components/Account/Account';
import Protected from './routes/Protected';
import EditProfil from './components/Edit/EditProfil';
import Notification from './components/Notification/Notification';
import ShowPost from './components/ShowItem/ShowPost';
import Story from './components/Story/Story';
import Chatbot from './components/Chatbot/Chatbot';
// import Register from './components/Register/Register';
// import View from './components/Portofolio/View';
// import CakeContainer from './containers/CakeContainer';
// import UserContainer from './containers/UserContainer'

function App() {
	// const location = window.location.pathname;
	let user_info = JSON.parse(localStorage.getItem('user'));


	return (
		<div>
			<Router>
				{
					user_info !== null && <Navbar />
				}
				<Container maxWidth={false}>
					<Switch>
						<Route path="/contact">
							<Contact/>
						</Route>
						
						{/*
						<Route path="/singup">
							<Register />
						</Route>
						
						<Route path="/singin">
							<Login />
						</Route>
						
						<Route path="/create">
							<Create />
						</Route>
						
						<Route path="/preview/:item">
							<View />
						</Route>
						
						<Route path="/show_item/:item">
							<ShowItem />
						</Route> */}

						<Route exact path="/singup">
							<Signup />
						</Route>

						<Route exact path="/">
							<Signin />
						</Route>

						<Protected exact path="/show_post/:id">
							<ShowPost />
						</Protected>

						<Protected exact path="/notification">
							<Notification />
						</Protected>

						<Protected exact path="/story">
							<Story />
						</Protected>

						<Protected exact path="/list_user">
							<Friends />
						</Protected>

						<Protected exact path="/edit">
							<EditProfil />
						</Protected>
						
						<Protected path="/account/:id">
							<Account />
						</Protected>

						<Protected path="/home">
							<Home />
						</Protected>

						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Container>
			</Router>

			{
				user_info !== null && <Chatbot/>
			}
		</div>
	);
}

export default App;