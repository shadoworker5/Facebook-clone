import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Twitter from '@material-ui/icons/Twitter';
import GithubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Paper, Box, LinearProgress } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import Example from './model.json';

const IMAGE_PATH = `${process.env.PUBLIC_URL}/assets/`;
const AVATAR_PATH = `${process.env.PUBLIC_URL}/avatars/profile.jpg`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
    techno: {
        height: '80',
        width: '80',
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(
        'Langage de programmation',
        <CardMedia
            component="img"
            alt="c++.png"
            image={IMAGE_PATH + 'c++.png'}
            title="c++.png"
        />
    ),
    createData('Back-end', 3),
    createData('Front-end', 2),
    createData('Mobile', 1),
    createData('Base de données', 3),
    createData('Autres', 3),
];

export default function View() {
    const { item } = useParams();
    const [data, setData] = useState({});
    const classes = useStyles();

    console.log(Example);

    const fetchData = () => {
        axios.post('getportofolio', { token: item })
            .then((response) => {
                console.log(response.data[0]);
                setData(response.data[0]);
            }).catch((err) => {
                // console.log(err);
            });
    }

    useEffect(() => {
        fetchData();

        return () => {
            // code
        }
    }, []);

    return (
        <div className={classes.root} style={{ backgroundColor: 'slategray', width: 'auto', height: '1000px' }}>
            <br /><br /><br />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={AVATAR_PATH}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <Twitter />

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={9}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent container>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        A propos de moi
                                    </Typography>

                                    <Grid xs={12} variant="body2" color="textSecondary" component="p">
                                        <Table>
                                            {/* <TableHead>
                                                <th>
                                                    <td> Hello </td>
                                                </th>
                                                <th>
                                                    <td> Hello </td>
                                                </th>
                                                <th>
                                                    <td> Hello </td>
                                                </th>
                                                <th>
                                                    <td> Hello </td>
                                                </th>
                                            </TableHead> */}

                                            <TableBody>
                                                <tr>
                                                    <td> Nom et Prénom(s) </td>
                                                    <td> {Example.resume.name} </td>
                                                    <td> Grade </td>
                                                    <td> {Example.resume.grade} </td>
                                                </tr>

                                                <tr>
                                                    <td> Anniversaire </td>
                                                    <td> {Example.resume.birthday} </td>
                                                    <td> Fonction </td>
                                                    <td> {Example.resume.job} </td>
                                                </tr>

                                                <tr>
                                                    <td> Genre </td>
                                                    <td> {Example.resume.genre} </td>
                                                    <td> E-mail </td>
                                                    <td> {Example.resume.mail} </td>
                                                </tr>

                                                <tr>
                                                    <td> Lieu de naissance </td>
                                                    <td> {Example.resume.born_location}</td>
                                                    <td> Boîte postale </td>
                                                    <td> {Example.resume.postal_code} </td>
                                                </tr>

                                                <tr>
                                                    <td> Nationalité </td>
                                                    <td> {Example.resume.nationality} </td>
                                                    <td> Contact </td>
                                                    <td> {Example.resume.phone} </td>
                                                </tr>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent container>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Qui suis-je
                                    </Typography>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        {Example.about.describe}
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent container>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Mes compétences
                                    </Typography>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <p>
                                            Langage: {
                                                Example.knowledge.langage.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>

                                        <p>
                                            backend: {
                                                Example.knowledge.backend.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>

                                        <p>
                                            frontend: {
                                                Example.knowledge.frontend.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>

                                        <p>
                                            Mobile: {
                                                Example.knowledge.mobile.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>

                                        <p>
                                            dataBase: {
                                                Example.knowledge.dataBase.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>

                                        <p>
                                            others: {
                                                Example.knowledge.others.map((name, id) => (
                                                    <span key={id}>
                                                        {name}{`${id}` < 4 && ","}
                                                    </span>
                                                ))
                                            }
                                        </p>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent container>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Mes atouts
                                    </Typography>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Example.asset.work_group}
                                                </Typography>
                                            </Box>

                                            <Box width='100%' mr='1'>
                                                <LinearProgress variant="determinate" value={Example.asset.work_group} />
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Example.asset.flex_zone}
                                                </Typography>
                                            </Box>

                                            <Box width='100%' mr='1'>
                                                <LinearProgress variant="determinate" value={Example.asset.flex_zone} />
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Example.asset.anglais}
                                                </Typography>
                                            </Box>

                                            <Box width='100%' mr='1'>
                                                <LinearProgress variant="determinate" value={Example.asset.anglais} />
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Example.asset.franch}
                                                </Typography>
                                            </Box>

                                            <Box width='100%' mr='1'>
                                                <LinearProgress variant="determinate" value={Example.asset.franch} />
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Example.asset.dioula}
                                                </Typography>
                                            </Box>

                                            <Box width='100%' mr='1'>
                                                <LinearProgress variant="determinate" value={Example.asset.dioula} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent container>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Envoyez moi un mail
                                    </Typography>

                                    <Grid xs={6} variant="body2" color="textSecondary" component="p">
                                        <TextField
                                            label='Name'
                                            name="name"
                                            value={'name'}

                                            placeholder='Enter Name'
                                            type='text'
                                            fullWidth required
                                        />

                                        <TextField
                                            label='Pseudo'
                                            name="pseudo"
                                            value={'pseudo'}

                                            placeholder='Enter Name'
                                            type='text'
                                            fullWidth required
                                        />

                                        <TextField
                                            label='Phone'
                                            name="phone"
                                            value={'phone'}

                                            placeholder='Enter your phone'
                                            type='tel'
                                            fullWidth required
                                        />

                                        <TextField
                                            label='Email'
                                            name="email"
                                            value={'email'}

                                            placeholder='Enter Email'
                                            type='text'
                                            fullWidth required
                                        />

                                        <Button type='submit' color='primary' variant="contained" fullWidth>
                                            Create
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
