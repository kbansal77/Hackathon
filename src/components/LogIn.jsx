import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './LogIn.css'
import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../contexts/AuthContext';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import search from '../images/search.png'
import Box from '@material-ui/core/Box';
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
        boxShadow: 'none'
    },
}));

const LogIn = () => {
    const [resultId, setResultId] = useState("")
    const history = useHistory()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { Gsignup } = useAuth()
    const [value, setValue] = useState(0);

    function clickhandler(e) {
        e.preventDefault()

        Gsignup()
    }

    const classes = useStyles();

    // const isFirstRender = useRef(true)
    // useEffect(() => {
    //     if (!isFirstRender.current) {
    //         history.push({
    //             pathname: '/otp',
    //             state: {
    //                 id: resultId,
    //                 num: phoneRef.current.value
    //             }
    //         });
    //     }
    // }, [resultId]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     isFirstRender.current = false;
    // }, []);


    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Modal isOpen={true} onRequestClose={() => history.push("/")} contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay"   >

                <Container fixed>

                    {/* HEADER */}
                    <Grid container>
                        <Grid item lg={2} sm={2}>
                            <p onClick={() => history.push("/")}>
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
                                autoFocus
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
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
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
                            >
                                <img src={search} style={{ height: '2rem', margin: '.2rem' }} />
                                Continue with google
                            </Button>

                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>

                </Container>

            </Modal>
        </div >
    );
}

export default LogIn;