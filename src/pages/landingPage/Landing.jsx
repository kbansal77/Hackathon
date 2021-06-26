
import Navbar from "../../components/navbar/navbar";
import { Container, Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Modal from 'react-modal';
import mail from '../../images/mail.png'
import './Landing.css'
import { useState } from "react";

Modal.setAppElement('#root')


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: "-1rem"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#3EBDF1",
    },
    root: {
        flexGrow: 1,
        marginTop: "1rem",        
        backgroundColor: "white",        
        boxShadow: 'none',
    
    },
}));

const Landing = () => {    
    const history = useHistory()
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const { Gsignup,emailLogin,emailSignup, } = useAuth()
    const [value, setValue] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

    function clickhandler(e) {
        e.preventDefault()
        Gsignup()
        history.push('/home');
    }
     function Echange(e){
        setEmail(e.target.value)
     }
     function Pchange(e){
        setPass(e.target.value)
     }
    function loginHandle(e){
            e.preventDefault()
            emailLogin(email,pass)
                setEmail("")
                setPass("")    
                history.push('/home');                 
        }

    function signupHandle(e){
        e.preventDefault()
        emailSignup(email,pass)          
        
        setEmail("")
        setPass("")
        history.push('/home');
    }
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Navbar page="landing" />
            <Container>
                <Grid container className="cont">
                    <Grid item xs={8}>
                        <div id="textdiv">
                            <p id="title1">Lorem ipsumae ullam reprehenderit s culpa ipsa natus!</p>
                            <p id="title2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique ut odit delectus dignissimos </p>
                            <Button variant="contained" id="loginbtn" onClick={openModal}>
                                Login /Signup
                            </Button>
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <img src={mail} style={{ height: "25rem" }} alt="" />
                    </Grid>
                </Grid>
            
            </Container>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="My dialog" className="myLmodal" overlayClassName="myLoverlay"   >
            {/* () => history.push("/home") */}
                <Container fixed>

                    {/* HEADER */}
                    <Grid container>
                        <Grid item lg={2} sm={2}>
                            <p onClick={closeModal}>
                                <IconButton aria-label="delete" >
                                    <ArrowBackIosIcon style={{ color: "#3EBDF1" }} />
                                </IconButton>
                            </p>
                        </Grid>
                        <Grid item lg={10} sm={6}>                            
                            <AppBar position="static" className={classes.root}>
                                <Tabs value={value} 
                                
                                onChange={handleChange} 
                                aria-label="simple tabs example" 
                                indicatorColor="primary"
                                textColor="primary"
                                centered>
                                    <Tab label="Login" {...a11yProps(0)} />
                                    <Tab label="Signup" {...a11yProps(1)} />

                                </Tabs>
                            </AppBar>
                        </Grid>
                    </Grid>


                    <TabPanel value={value} index={0}>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value = {email}
                                autoFocus
                                onChange={Echange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value = {pass}
                                onChange = {Pchange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={loginHandle}
                            >
                                LogIn
                            </Button>
                            <p className="or">-OR-</p>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={clickhandler}
                                style={{height:"3rem"}}
                            >
                                
                                <i class="fab fa-google" style={{fontSize:"1.5rem", marginRight: ".5rem"}} ></i>
                                Continue with google
                            </Button>
                            

                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value = {email}
                                autoFocus
                                onChange={Echange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value = {pass}
                                onChange = {Pchange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={signupHandle}
                            >
                                Signup
                            </Button>
                            <p className="or">-OR-</p>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                onClick={clickhandler}
                                style={{height:"3rem"}}
                            >
                                <i class="fab fa-google" style={{fontSize:"1.5rem", marginRight: ".5rem"}} ></i>
                                Continue with google
                            </Button>

                        </form>
                    </TabPanel>

                </Container>

            </Modal>

        </div>
    );
}

export default Landing;