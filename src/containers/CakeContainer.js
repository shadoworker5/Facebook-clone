import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux/actions/cakeAction';

function CakeContainer(props) {
    const numOfCake = useSelector((state) => state.numOfCakes);
    const dispatch = useDispatch();

    return (
        <div>
            <br/><br/>
            <h2> Number of cakes- {numOfCake} </h2>
            <Button variant="primary" onClick={() => dispatch(buyCake())}> By cakes </Button>
        </div>
    )
}

export default CakeContainer;