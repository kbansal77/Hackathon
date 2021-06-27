
import Navbar from "../../components/navbar/navbar";
import { Container, Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
import { useEffect } from "react";

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
    const [name, setName] = useState("")
    const { Gsignup, emailLogin, emailSignup, currentUser,error } = useAuth()
    const [value, setValue] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    async function clickhandler(e) {
        e.preventDefault()
        await Gsignup()
        history.push('/dashboard');
    }
    function Echange(e) {
        setEmail(e.target.value)
    }
    function Pchange(e) {
        setPass(e.target.value)
    }
    function Nchange(e) {
        setName(e.target.value)
    }
    async function loginHandle(e) {
        e.preventDefault()
        await emailLogin(email, pass)
        
        if (error==""){
            setEmail("")
            setPass("")
            history.push('/dashboard');
        }
        closeModal()
        
    }

    function addUserDetail(name, email){
        const sdata = {
            "_id": email,
            "displayName":name
        }
        fetch('https://mailman-backend.herokuapp.com/users', {
        method: 'POST',
        body: JSON.stringify(sdata),
        headers: {
          'Content-Type': 'application/json',
        }
      }).catch(err=>{
          console.log(err)
      })
      return true
    }

    async function signupHandle(e) {
        e.preventDefault()
        await emailSignup(email, pass)
        await addUserDetail(name,email )
        setEmail("")
        setPass("")
        history.push('/dashboard');
    }
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(error)
    

    return (
        <div>
            <Navbar page="landing" />
            <Container>
                <Grid container className="cont">
                    <Grid item xs={8}>
                        <div id="textdiv">
                            <h2 id="title1"><i>Scheduling your mails, now easier!</i></h2>
                            <p id="title2"><i>Send recurring mails at the click of a button </i></p>

                            {currentUser ? (
                                
                                    <Button variant="outlined" id="contbtn" endIcon={<ArrowForwardIosIcon />} href="/dashboard">
                                        Continue
                                    </Button>                                
                            ) : (                                
                                    <Button variant="contained" id="loginbtn" onClick={openModal}>
                                        Login /Signup
                                    </Button>     
                                                            
                            )}
                            {error? <div>{error}</div> : ""}

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
                                value={email}
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
                                value={pass}
                                onChange={Pchange}
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
                                style={{ height: "3rem" }}
                            >

                                <i class="fab fa-google" style={{ fontSize: "1.5rem", marginRight: ".5rem" }} ></i>
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
                                id="Name"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                value={name}
                                autoFocus
                                onChange={Nchange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                
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
                                value={pass}
                                onChange={Pchange}
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
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={clickhandler}
                                style={{ height: "3rem" }}
                            >

                                <i class="fab fa-google" style={{ fontSize: "1.5rem", marginRight: ".5rem" }} ></i>
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