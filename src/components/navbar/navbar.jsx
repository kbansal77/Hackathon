import React from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './navbar.css'

function Navbar (){
    return(
        <Container>
            <Grid item xs={4}>
                <span id="navhead">
                    Mailman
                </span>
            </Grid>
        </Container>
    )
}

export default Navbar