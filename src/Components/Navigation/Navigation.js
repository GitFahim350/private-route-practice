import React, { useContext } from 'react'
import './Navigation.css';
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Navigation = () => {

    const [loggedinuser, setLoggedinuser] = useContext(UserContext);
    
    const history=useHistory();
    const loginhandler=()=>{
        history.push('/login');
        
        
        console.log("login button clicked");
    }
    return (
        <div className="Navcolor">
            
            
            <Navbar  expand="lg">
                <Container>
                    <Navbar.Brand href="home" style={{color:'black'}} >Dream rider</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/home" className="p-3 links">Home</Link>
                            
                            <Link to="/destination" className="p-3 links">Destination</Link>
                            
                            <Link to="/blog" className="p-3 links">Blog</Link>
                            <Link to="/contact" className="p-3 links ">Contact</Link>

                            {
                                loggedinuser.email?<h3 className="mt-2 links ">{loggedinuser.name}</h3>:<button   onClick={loginhandler}>Login</button>
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
};

export default Navigation;