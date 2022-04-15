import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeSelectedProduct, selectedProduct } from '../redux/actions/productAction';

const ProductDetail = () => {
    const { productId } = useParams();
    const url = `http://127.0.0.1/api_laravel/api/users/${productId}`;
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product );
    const {id, name, email} = product;

    console.log(product.user_info);

    const fetchData = () => {
        fetch(url).then((response)=>{
            response.json().then((result)=> {
                    console.log(result);
                    dispatch(selectedProduct(result));
                }
            );
        }).catch((err) =>{
            console.log(err);
        });
    }

    useEffect(() => {
        if(productId && productId !== "") fetchData();
        return () => {
            dispatch(removeSelectedProduct());
        }
    }, [productId]);
    
    return (
        <div>
            <h1> ProductDetail </h1>
            <h5> {id} {name} {email} </h5>    
        </div>
    )
}

export default ProductDetail
