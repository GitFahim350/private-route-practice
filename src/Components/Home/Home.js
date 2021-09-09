import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import fakedata from '../../fakedata';
import Products from '../Products/Products';
import './Home.css'


const Home = () => {
    const [vehicles,setVehicles]=useState(fakedata);
    const history=useHistory();
    const vehiclehandler=(key)=>{
        history.push('/vehicle/'+key)
    } 
    return (
        <Container className="vehicle">
            <Row >
                {
                    vehicles.map(vehicle=><Products vehicle={vehicle} key={vehicle.key} vechiclehandler={vehiclehandler}></Products>)
                }
            </Row>
        </Container>
    );
};

export default Home;