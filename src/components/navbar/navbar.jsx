import React from 'react'

import Container from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import { useAuth } from "../../contexts/AuthContext";
import './navbar.css'

function Navbar({page}) {
    const { currentUser,logout } = useAuth();
    function handlelogout(e){
        e.preventDefault()
        logout()
    }
    
    return (
        <Container>
            <Grid container id="nav" >
                <Grid item xs={8}>
                    <span id="navhead">
                        Mailman
                    </span>
                </Grid>
                { page=="home"?(
                <Grid item xs={2} >
                    <Button variant="contained" id="composebtn">
                        Compose Mail
                    </Button>
                </Grid>):
                <Grid item xs={2} >
                </Grid>}
                
                {currentUser ? (
                    <Grid item xs={2} >
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