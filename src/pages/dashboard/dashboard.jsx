import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Card, Button, Grid } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useAuth } from "../../contexts/AuthContext";

import "./dashboard.css";
import { getDefaultNormalizer } from "@testing-library/react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
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
    backgroundColor: "#3EBDF1",
    boxShadow: 'none',
    color: "white",
    fontSize: "5rem"

  },
}));

function Dashboard() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("")
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()
  const {currentUser } = useAuth();
  const [mails, setMails] = useState("")




  useEffect(() => {
    if (currentUser){
      fetch('https://mailman-backend.herokuapp.com/mails', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'sender': currentUser.email
      }
    })
      .then(response => response.json()).then(data => {
        console.log(data);

        setMails(data);
        setIsLoading(false)
      })
      .catch(err => { console.log(err) })
    }else{
      history.push('/')
    }
    
  }, [])

  

 const reload =()=>{
  fetch('https://mailman-backend.herokuapp.com/mails', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'sender': currentUser.email
    }
  })
    .then(response => response.json()).then(data => {
      console.log(data);

      setMails(data);
      setIsLoading(false)
    })
    .catch(err => { console.log(err) })
 }
  const handleClick = (id) => {
    if (selectedId === id) {
      setSelectedId("")
      setOpen(false)
    } else {
      setSelectedId(id)
      setOpen(true)
    }
  };

  const classes = useStyles();
  const editMail = (id) => {
    fetch(`https://mailman-backend.herokuapp.com/mails/${id}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json()).then(data => {
        console.log(data);
        // setSMail(data) 
        // console.log(sMail)  
        history.push({
          pathname: '/editMail',
          state: data
        });
      })
      .catch(err => { console.log(err) })
  }
const delMail =(id) =>{
  fetch(`https://mailman-backend.herokuapp.com/mails/${id}`, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json()).then(data => {
        console.log(data);
        alert(data.message)
        reload()
      })
      .catch(err => { console.log(err) })

}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Navbar page="dashboard" />
      <Container>
        <Card style={{ paddingT: "2rem 0" }}>
          <AppBar position="static" className={classes.root}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              aria-label="nav tabs example"
            >
              <LinkTab label="Scheduled Mails" style={{ fontSize: "1.3rem" }} href="/drafts" {...a11yProps(0)} />
              <LinkTab label="Mails Sent" style={{ fontSize: "1.3rem" }} href="/trash" {...a11yProps(1)} />

            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {!isLoading && mails.map((mail) => (
              <List component="nav" >
                <ListItem button onClick={() => { handleClick(mail._id) }}>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Grid container>
                          <Grid item xs={3} className={`${open ? '' : 'limit'}`}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              To:
                            </Typography>
                            {mail.to.map((rec) => (
                              ` ${rec},   `
                            ))}
                          </Grid>
                          <Grid item xs={7} className={`${open ? '' : 'limit'}`}>
                            <Typography
                              component="span"
                              color="textPrimary">
                              Subject:
                            </Typography>
                            {" "}{mail.subject}

                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              component="span"
                              color="textPrimary">
                              Type:
                            </Typography>
                            {" "}{mail.type}

                          </Grid>
                        </Grid>
                      </React.Fragment>
                    }
                  />

                  {open ? <ExpandLess /> : <ExpandMore />}

                </ListItem>
                <Collapse in={mail._id === selectedId} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemText >
                      <Container>
                        <Grid container className="collp">
                          <Grid item lg={8} xs={6}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              CC:
                            </Typography>
                            {mail.cc.map((rec) => (
                              ` ${rec},`
                            ))}
                            
                          </Grid>
                          <Grid item lg={4} xs={6}>
                            <Button variant="outlined" id="editbtn" onClick={() => { editMail(mail._id) }} endIcon={<EditIcon />}>
                              Edit Mail
                            </Button>
                            <Button variant="outlined" id="delbtn" color="secondary" endIcon={<DeleteIcon />} onClick={()=>{delMail(mail._id)}}>
                              Delete Mail
                            </Button>


                          </Grid>
                        </Grid>
                        <Typography
                              component="span"
                              color="textPrimary"
                            >
                              BCC:
                            </Typography>
                            {mail.bcc.map((rec) => (
                              ` ${rec},`
                            ))}

                        <Card style={{ padding: "2rem " }}>
                          {mail.body}
                        </Card>

                      </Container>
                    </ListItemText>

                  </List>
                </Collapse>
              </List>
            ))}

          </TabPanel>
          <TabPanel value={value} index={1}>
          {!isLoading && mails.map((mail) => (
            mail.last_sent != "" ?(
              <List component="nav" >
                <ListItem button onClick={() => { handleClick(mail._id) }}>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Grid container>
                          <Grid item xs={3} className={`${open ? '' : 'limit'}`}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              To:
                            </Typography>
                            {mail.to.map((rec) => (
                              ` ${rec},   `
                            ))}
                          </Grid>
                          <Grid item xs={7} className={`${open ? '' : 'limit'}`}>
                            <Typography
                              component="span"
                              color="textPrimary">
                              Subject:
                            </Typography>
                            {" "}{mail.subject}

                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              component="span"
                              color="textPrimary">
                              Type:
                            </Typography>
                            {" "}{mail.type}

                          </Grid>
                        </Grid>
                      </React.Fragment>
                    }
                  />

                  {open ? <ExpandLess /> : <ExpandMore />}

                </ListItem>
                <Collapse in={mail._id === selectedId} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemText >
                      <Container>
                        <Grid container className="collp">
                          <Grid item lg={4} xs={6}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              CC:
                            </Typography>
                            {mail.cc.map((rec) => (
                              ` ${rec},`
                            ))}
                            
                          </Grid>
                          <Grid item lg={4} xs={6}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              BCC:
                            </Typography>
                            {mail.bcc.map((rec) => (
                              ` ${rec},`
                            ))}
                            {/* <Button variant="outlined" id="editbtn" onClick={() => { editMail(mail._id) }} endIcon={<EditIcon />}>
                              Edit Mail
                            </Button>
                            <Button variant="outlined" id="delbtn" color="secondary" endIcon={<DeleteIcon />} onClick={()=>{delMail(mail._id)}}>
                              Delete Mail
                            </Button> */}


                          </Grid>
                          <Grid item lg={4} xs={6}>
                            <Typography
                              component="span"
                              color="textPrimary"
                            >
                              Last Sent:
                            </Typography>
                            {" "}{mail.last_sent}
                            
                          </Grid>
                        </Grid>
                        

                        <Card style={{ padding: "2rem " }}>
                          {mail.body}
                        </Card>

                      </Container>
                    </ListItemText>

                  </List>
                </Collapse>
              </List>) : null
            ))}
            
          </TabPanel>


        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
