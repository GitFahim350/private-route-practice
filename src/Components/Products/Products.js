import React from 'react';
import { Col } from 'react-bootstrap';
import './Products.css'

const Products = (props) => {
    console.log(props)
    return (<Col md={3}  className="p-3 column"><img src={props.vehicle.photourl} alt={props.vehicle.key} className="vehicleimages" onClick={()=>props.vechiclehandler(props.vehicle.key)}/></Col>);
};

export default Products;