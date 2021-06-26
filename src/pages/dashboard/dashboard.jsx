import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Card, Button, Grid } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import "./dashboard.css";

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
  const [mails, setMails] = useState(
    [
      {
        "to": [
          "Devanshi","Blah"
        ],
        "cc": [
          "Kartik","Devanshi","Blah"
        ],
        "_id": "60d6c6e99f59421994c6074c",
        "sender": "Basu",
        "subject": "This is a 30 secs mail body Lorem ipsum dolor sit amet consectetur ",
        "body": "This is a 30 secs mail body Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit in ea eveniet velit unde corporis officia quibusdam totam, ut nam mollitia. Dolorem, consequuntur rem nesciunt quia iure perspiciatis quod.",
        "type": "30secs",
        "__v": 0
      },
      {
        "to": [
          "Devanshi"
        ],
        "cc": [
          "Kartik"
        ],
        "_id": "60d6e873c9222f415414c7de",
        "sender": "Basu",
        "subject": "This is a weekly mail",
        "body": "This is a weekly mail body",
        "type": "Weekly",
        "time": "13:00",
        "day": "Friday",
        "__v": 0
      },
      {
        "to": [
          "Devanshi"
        ],
        "cc": [
          "Kartik"
        ],
        "_id": "60d6efc92d19ff2bb4245001",
        "sender": "Basu",
        "subject": "This is a yearly mail",
        "body": "This is a yearly mail body",
        "type": "Yearly",
        "time": "19:00",
        "date": "_15",
        "month": "Jan",
        "__v": 0
      },
      {
        "to": [
          "Devanshi"
        ],
        "cc": [
          "Kartik"
        ],
        "_id": "60d6f403a03afa2bac512e49",
        "sender": "Basu",
        "subject": "This is a monthly mail",
        "body": "This is a monthly mail body ",
        "type": "Monthly",
        "time": "19:00",
        "date": "_14",
        "month": "Jan",
        "__v": 0
      }
    ])





  const handleClick = (id) => {
    if (selectedId === id) {
      setSelectedId("")
    } else {
      setSelectedId(id)
    }
  };

  const classes = useStyles();


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
            {mails.map((mail)=>(
              <List component="nav" >
              <ListItem button onClick={()=>{handleClick(mail._id)}}>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Grid container>
                        <Grid item xs={2}>
                          <Typography
                            component="span"
                            color="textPrimary"
                          >
                            To:
                          </Typography>
                          {mail.to.map((rec)=>(
                            ` ${rec},`
                          ))}
                        </Grid>
                        <Grid item xs={7}>
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
                          <Grid item lg={9} xs={6}>
                            <Typography
                            component="span"
                            color="textPrimary"
                            >
                            CC:
                          </Typography>
                          {mail.cc.map((rec)=>(
                            ` ${rec},`
                          ))}</Grid>
                          <Grid item lg={3} xs={6}>
                          <Button variant="outlined" id="editbtn" href="/createMail" >
                            Edit Mail
                        </Button>
                        <Button variant="outlined" id="delbtn" color="secondary" >
                            Delete Mail
                        </Button>
                          </Grid>
                        </Grid>
                      
                          <Card  style={{ padding: "2rem " }}>
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
            Page Two
          </TabPanel>


        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
