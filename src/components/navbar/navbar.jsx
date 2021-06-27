import React from 'react'

import Container from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import {  useHistory } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext";
import './navbar.css'

function Navbar({page}) {
    const history = useHistory()
    const { currentUser,logout } = useAuth();
    function handlelogout(e){
        e.preventDefault()
        logout()
        history.push('/')
    }
    
    return (
        <Container>
            <Grid container id="nav" >
                <Grid item lg={8} sm={7} xs={6}>
                    <span onClick={()=>{history.push("/dashboard")}} id="navhead" style={{cursor:"pointer"}} >
                        Mailman
                    </span>
                </Grid>
                { page=="dashboard"?(
                <Grid item lg={2} sm={3} xs={4} >
                    <Button variant="contained" id="composebtn" href="/createMail">
                        Compose Mail
                    </Button>
                </Grid>):
                <Grid item lg={2} sm={3} xs={1}>
                </Grid>}
                
                {currentUser ? (
                    <Grid item lg={2} sm={2} xs={2}>
                        <Button variant="outlined" id="logoutbtn" onClick={handlelogout}>
                            Logout
                        </Button>
                    </Grid>
                ) : (
                    <Grid item xs={2} >
                    
                </Grid>
                )}

            </Grid>
        </Container>

    )
}

export default Navbar