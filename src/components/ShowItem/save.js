import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeSelectedProduct, selectedProduct } from '../../redux/actions/productAction';
import { Button, CardMedia, makeStyles, Snackbar, TextField } from '@material-ui/core';
// import { writeData } from '../../Database/utility';
import { useHistory } from 'react-router-dom';
import './ShowItem.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *' : {
            marginTop: theme.spacing(2),
        }
    }
}));

const ShowPost = () => {
    const classes = useStyles();
    const { item } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product );
    const url = `http://127.0.0.1/api_laravel/api/stores/${item}`;
    const url_image = "http://127.0.0.1/api_laravel/public/item_images/";
    // let image = `${process.env.PUBLIC_URL}/images/img.jpg`;
    const { id, title, description, prices, quantity, image_path } = product;
    const sizes = document.querySelectorAll('.size');
    const colors = document.querySelectorAll('.color')
    const items = document.querySelectorAll('.item')
    const gradients = document.querySelectorAll('.gradient');
    const [price, setPrice ] = useState(0);
    const [qte, setQte] = useState(1);
    const [open, setOpen] = useState(false);
    const history = useHistory()
    let prevColor = "blue";
    let animationEnd = true;
    
    const changeSize = () =>{
        sizes.forEach(size => size.classList.remove('active'));
        // this.classList.add('active');
        // // console.log('ok');
    }

    const changeColor = () =>{
        if(!animationEnd) return;
        let primary = this.getAttribute('primary');
        let color = this.getAttribute('color');
        let item = document.querySelector(`item[color]="${color}"`);
        let gradient = document.querySelector(`.gradient[color="${color}"]`);
        let prevGrdient  = document.querySelector(`.gradient[color="${prevColor}"]`);

        colors.forEach(c => c.classList.remove('active'));
        document.documentElement.style.setProperty('--primary', primary);
        items.forEach(item => item.classList.remove('show'));
        item.classList.add('show')

        gradients.forEach(g => g.classList.remove('first', 'second'));
        gradient.classList.add('first');
        prevGrdient.classList.add('')

        prevColor = color;
        animationEnd = false;
        gradient.addEventListener('animationend', () => {
            animationEnd = true;
        })
        // this.classList.add('active');
        // console.log(primary);

        // let x = window.matchMedia("(max-width: 1000)");

    }
    
    sizes.forEach(size => size.addEventListener('click', changeSize));
    colors.forEach(color => color.addEventListener('click', changeColor))

    const fetchData = () => {
        fetch(url).then((response)=>{
            response.json().then((result)=> {
                    setPrice(result.prices*95/100);
                    dispatch(selectedProduct(result));
                }
            );
        }).catch((err) =>{
            console.log(err);
        });
    }

    const onInputChange = (event) =>{
        const value = event.target.value;
        setQte(value);
        value >= 1 ? setPrice(value * prices) : setPrice(prices)
    }

    const addItem = () => {
        let chop = {
            id: new Date().toISOString(),
            item_id: id,
            title,
            qte,
            price,
            created_at: new Date().getUTCDate(),
            status: 0
        };
        writeData('cards', chop).then(function(){
            setOpen(true);
            history.push('/');
        })
    }

    useEffect(() => {
        if(item && item !== "") fetchData();

        return () => {
            dispatch(removeSelectedProduct());
            setOpen(false);
        }
    }, []);
    
    return (
        <>
            <br/><br/><br/><br/><br/>

            <div className="container main">
                <div className="content">
                    <div className="item-backgroung">
                        <div className="gradients">
                            <div className="gradient" color="blue">
                            </div>

                            <div className="gradient" color="red">
                            </div>

                            <div className="gradient" color="green">
                            </div>

                            <div className="gradient" color="orange">
                            </div>

                            <div className="gradient" color="black">
                            </div>
                        </div>

                        <h1 className="nike"> Nike</h1>
                        <a href="/home" className="share"> share </a>
                        {/* <img src="http://127.0.0.1/api_laravel/public/item_images/img.jpg" alt="test" className="item show" color="blue" />
                        <img src="/img" alt="test" className="item" color="red" /> first
                        <img src="/img" alt="test" className="item" color="green" />
                        <img src="/img" alt="test" className="item" color="orange" />
                        <img src="/img" alt="test" className="item" color="black" /> */}
                        <CardMedia
                            component='img'
                            alt="image test"
                            className="card_image"
                            image={url_image+image_path}
                            title={ title }
                        />
                    </div>
                    <div className="info">
                        <div className="item-name">
                            <div>
                                <h1 className="big"> {title} </h1>
                                {/* <span className="new"> New </span> */}
                            </div>
                            <h3 className="small"> Stock available: {quantity} </h3>
                        </div>

                        <div className="description">
                            <h3 className="title"> Description </h3>
                            <p className="text"> {description} </p> 
                        </div>

                        <div className="color-container">
                            <h3 className="title"> Color </h3>
                            <div className="colors">
                                <span className="color active" primary="#2175f5" color="blue">  </span>
                                <span className="color" primary="#f84848" color="red">  </span>
                                <span className="color" primary="#29b864" color="green">  </span>
                                <span className="color" primary="#ff5521" color="orange">  </span>
                                <span className="color" primary="#444" color="black">  </span>
                            </div>
                        </div>

                        <div className="size-container">
                            <h3 className="title"> size</h3>
                            <div className="sizes">
                                <span className="size"> 7 </span>
                                <span className="size"> 8 </span>
                                <span className="size"> 9 </span>
                                <span className="size"> 10 </span>
                                <span className="size"> 11 </span>
                            </div>
                        </div>

                        <div className="size-container">
                            <h3 className="title"> Quantité et prix </h3>
                            <div className="sizes">
                                {/* <input type=""  name="quantity" placeholder='' /> */}
                                {/* <span className="size">  </span> */}
                                <TextField
                                    label='Quantity'
                                    name="qte"
                                    className="qte"
                                    value={qte}
                                    onChange={e => onInputChange(e)}
                                    placeholder='Enter Quantity'
                                    type='number'
                                    required
                                />
                                <div className="price" style={{ marginLeft: '10px'}}>
                                    <h1> ${prices} </h1>
                                </div>
                            </div>
                        </div>
                        <div className="buy-price">
                            <Button className="buy" onClick={e => addItem(e)}> Add to card </Button>
                            <div className="price">
                                <h1> ${price} </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            
            <div className={classes.root}>
                <Snackbar
                    open={open}
                    autoHideDuration={200}
                    message="Save success"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    // style={{ backgroundColor: "green", color: 'green' }}
                    // action={
                    //     <React.Fragment>
                    //         <IconButton size="small" aria-label="close" color="inherit">
                    //             <CloseIcon fontSize="small" />
                    //         </IconButton>
                    //     </React.Fragment> 
                    // }
                />                
            </div>
        </>
    )
}

export default ShowPost;