import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const renderList = products.map((product) => {
        const { id, name } = product;
        return (
            <div>
                <div> { id } : { name } <Link to={`/product/${id}`} > See more </Link> </div>
            </div>
        );
    });

    return (
        <div>
            <h1> ProductComponent </h1>
            { renderList }            
        </div>
    )
}

export default ProductComponent
