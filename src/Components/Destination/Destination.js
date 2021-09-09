import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fakedata from '../../fakedata';
import './Destination.css'
import styled from 'styled-components'
import { UserContext } from '../../App';



const Destination = () => {
    const vehiclekey = useParams();

    const [vehicles, setVehicles] = useState(fakedata);
    const [loggedinuser, setLoggedinuser] = useContext(UserContext);
    const [sourcedestination, setSourcedestination] = useState({ source: "", destination: "" });
    const [transport, setTransport] = useState({});
    const [visibility1, setVisibility1] = useState("sec1");
    const [visibility2, setVisibility2] = useState("sec2");
    useEffect(() => {
        const transport = vehicles.find(vehicle =>
            vehiclekey.vehiclekey === vehicle.key
        )
        setTransport(transport);
    }, [vehiclekey])


    const searchhandler = () => {
        setVisibility1("sec2");
        setVisibility2("sec1");
    }
    const sourcedestinationhandler = (e) => {
        if (e.target.name === "source") {

            const part1 = { ...sourcedestination };
            part1.source = e.target.value;
            setSourcedestination(part1);
        }
        else if (e.target.name === "destination") {
            const part2 = { ...sourcedestination };
            part2.destination = e.target.value;
            setSourcedestination(part2);
        }
    }
    return (
        <div className="row ">
            <div className="col-md-4 bg-light p-5" id="serachcard">
                <div className={visibility1}>
                    <p className="destination">Pick From</p>
                    <input className="destination" id="pickfrom" type="text" name="source" onBlur={sourcedestinationhandler} />
                    <br />
                    <br />
                    <p className="destination">Pick To</p>
                    <input className="destination" id="pickto" type="text" name="destination" onBlur={sourcedestinationhandler} />
                    <br />
                    <br />
                    <button className="destination searchbutton" onClick={searchhandler}>Search</button>
                </div>

                <div className={visibility2}>
                    <div className="sourcedestination p-3">
                        <p className="h5">{sourcedestination.source}</p>
                        <p className="h5">{sourcedestination.destination}</p>
                    </div>
                    <br />
                    <br />

                    <div className="cost">

                        <div>

                            <img src={transport.photourl} classname="transportphoto" style={{ width: "100px" }} alt="" />


                        </div>




                        <div style={{ textAlign: "center", width: "100px" }}>
                            <h3>{transport.key}</h3>
                        </div>




                        <div style={{ textAlign: "center", width: "100px" }}>
                            <h3>$67</h3>

                        </div>

                    </div>

                    <br />
                    <br />
                    <div className="cost">
                        <div>
                            <img src={transport.photourl} classname="transportphoto" style={{ width: "100px" }} alt="" />
                        </div>

                        <div style={{ textAlign: "center", width: "100px" }}>
                            <h3>{transport.key}</h3>
                        </div>

                        <h3 style={{ textAlign: "center", width: "100px" }}>$67</h3>

                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" alt="Googlemap" />
            </div>
        </div>

    );
};

export default Destination;