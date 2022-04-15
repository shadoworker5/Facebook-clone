import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../redux/actions/productAction';

const ProductListing = (props) => {
    const url = "http://127.0.0.1/api_laravel/api/users";
    const dispatch = useDispatch();

    const products = useSelector((state) => state);
    const fetchProducts = () => {
        fetch(url).then((response)=>{
            response.json().then((result)=> {
                    dispatch(setProducts(result));
                }
            );
        }).catch((err) =>{
            console.log(err);
        });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log("Products from server: ", products);

    return (
        <div>
            <ProductComponent/>
        </div>
    )
}

export default ProductListing;