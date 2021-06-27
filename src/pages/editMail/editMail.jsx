import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/navbar/navbar";
import "./editMail.css";

Modal.setAppElement("#root");

const dates = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const weeks = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function EditMail(props) {
  const classes = useStyles();
  let subtitle;
  const { currentUser } = useAuth();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState(props.location.state.type);
  const [daySelected, setDaySelected] = React.useState(
    props.location.state.day || ""
  );
  const [dateSelected, setDateSelected] = React.useState(
    props.location.state.date || ""
  );
  const [monthSelected, setMonthSelected] = React.useState(
    props.location.state.month || ""
  );
  const [timeSelected, setTimeSelected] = React.useState(
    props.location.state.time || ""
  );
  const history = useHistory()
  const [tovalue, setToValue] = React.useState("");
  const [tochip, setToChip] = React.useState(props.location.state.to);
  const [ccvalue, setCcValue] = React.useState("");
  const [ccchip, setCcChip] = React.useState(props.location.state.cc);
  const [bccvalue, setBccValue] = React.useState("");
  const [bccchip, setBccChip] = React.useState(props.location.state.bcc);
  const [subject, setSubject] = React.useState(props.location.state.subject);
  const [body, setBody] = React.useState(props.location.state.body);
  var mailId = props.location.state._id;
  


  function isValid(email) {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      return false;
    }

    return true;
  }
  // console.log(tochip);

  function isInList(email) {
    if (tochip.includes(email)) {
      return true;
    } else if (ccchip.includes(email)) {
      return true;
    } else if (bccchip.includes(email)) {
      return true;
    } else {
      return false;
    }
  }

  function isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  const handleToKeyDown = (event) => {
    if (["Enter", " ", ","].includes(event.key)) {
      event.preventDefault();

      var value = tovalue.trim();

      if (value && isValid(value)) {
        setToChip([...tochip, tovalue]);
        setToValue("");
      }
    }
  };

  const handleBccKeyDown = (event) => {
    if (["Enter", "Tab", ","," "].includes(event.key)) {
      event.preventDefault();

      var value = bccvalue.trim();

      if (value && isValid(value)) {
        setBccChip([...bccchip, bccvalue]);
        setBccValue("");
      }
    }
  };

  const handleCcKeyDown = (event) => {
    if (["Enter", "Tab", ","," "].includes(event.key)) {
      event.preventDefault();

      var value = ccvalue.trim();

      if (value && isValid(value)) {
        setCcChip([...ccchip, ccvalue]);
        setCcValue("");
      }
    }
  };

  const handleBccPaste = (event) => {
    event.preventDefault();
    var paste = event.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var bccBeAdded = emails.filter((email) => !isInList(email));
      setBccChip([...bccchip, ...bccBeAdded]);
    }
  };

  const handleToPaste = (event) => {
    event.preventDefault();
    var paste = event.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !isInList(email));
      setToChip([...tochip, ...toBeAdded]);
    }
  };

  const handleCcPaste = (event) => {
    event.preventDefault();
    var paste = event.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var ccBeAdded = emails.filter((email) => !isInList(email));
      setCcChip([...ccchip, ...ccBeAdded]);
    }
  };

  const handleCcChange = (event) => {
    setCcValue(event.target.value);
  };

  const handleBccChange = (event) => {
    setBccValue(event.target.value);
  };

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };

  const handleDelete = (chipToDelete) => () => {
    setToChip((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleCcDelete = (chipToDelete) => () => {
    setCcChip((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleBccDelete = (chipToDelete) => () => {
    setBccChip((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const selectday = (event) => {
    // event.currentTarget.classList.add('selected');
    if (daySelected === event.currentTarget.id) {
      setDaySelected("");
    } else {
      setDaySelected(event.currentTarget.id);
    }
  };

  const selectTime = (event) => {
    setTimeSelected(event.target.value);
  };

  const selectDate = (event) => {
    if (dateSelected === event.target.value) {
      setDateSelected("");
    } else {
      setDateSelected(event.target.value);
    }
  };
  const selectMonth = (event) => {
    if (monthSelected === event.target.value) {
      setMonthSelected("");
    } else {
      setMonthSelected(event.target.value);
    }
  };
  // console.log(timeSelected);
  // console.log(dateSelected);
  // console.log(daySelected);
  // console.log(monthSelected);
  
  const handlesubjectchange =(event) =>{
    setSubject(event.target.value)
  }
  const handlebodychange =(event) =>{
    setBody(event.target.value)
  }
  const handleChange = (event) => {
    setType(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const editMail = () => {
    if (subject == "" || body == "") {
      alert("Subject and body is required")
    } else {


      const maildata = {
        "to": tochip,
        "cc": ccchip,
        "bcc": bccchip,
        "subject": subject,
        "body": body,
        "day": daySelected,
        "date": dateSelected,
        "time": timeSelected,
        "month": monthSelected,
        "type": type,
        "sender": currentUser.email,
        "displayName": currentUser.displayName
        
      }
      console.log(maildata)
      console.log(mailId)
      fetch(`https://mailman-backend.herokuapp.com/mails/${mailId}`, {
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify(maildata),
        headers: {
          'Content-Type': 'application/json',
        }

      })
        .then(response => response.json()).then(data => {
          console.log(data);
          alert(data.message)         
          
          history.push("/dashboard")


        })
        .catch(err => { console.log(err) })
    }
  }
  // var M
  // document.addEventListener('DOMContentLoaded', function() {
  //     var elems = document.querySelectorAll('.chips');
  //     var instances = M.Chips.init(elems, {});
  //   })
  return (
    <div>
      <Navbar />
      <Container style={{ padding: "2rem 0" }}>
        <Card style={{ padding: "2rem " }}>
          <Container style={{ textAlign: "left", marginLeft: "3rem" }}>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>To:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
              <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.root}>
                      {tochip.map((chip) => {
                        let icon;

                        return (
                          <li key={chip}>
                            <Chip
                              icon={icon}
                              label={chip}
                              onDelete={handleDelete(chip)}
                              className={classes.chip}
                            />
                          </li>
                        );
                      })}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      value={tovalue}
                      // inputRef={toRef}
                      placeholder="Press Enter, Spacebar or , after typing mail"
                      onKeyDown={handleToKeyDown}
                      onChange={handleToChange}
                      onPaste={handleToPaste}
                      style={{ width: "90%" }}
                    />
                  </Grid>
                </Grid>
                {/* <Input
                  defaultValue={props.location.state.to}
                  placeholder="To"
                  style={{ width: "90%" }}
                /> */}
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}></Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>CC:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.root}>
                      {ccchip.map((chip) => {
                        let icon;

                        return (
                          <li key={chip}>
                            <Chip
                              icon={icon}
                              label={chip}
                              onDelete={handleCcDelete(chip)}
                              className={classes.chip}
                            />
                          </li>
                        );
                      })}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      value={ccvalue}
                      // inputRef={ccRef}
                      placeholder="Press Enter, Spacebar or , after typing mail"
                      onKeyDown={handleCcKeyDown}
                      onChange={handleCcChange}
                      onPaste={handleCcPaste}
                      style={{ width: "90%" }}
                    />
                    {/* <Input defaultValue={props.location.state.cc} placeholder="CC" style={{ width: "90%" }} /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>BCC:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.root}>
                      {bccchip.map((chip) => {
                        let icon;

                        return (
                          <li key={chip}>
                            <Chip
                              icon={icon}
                              label={chip}
                              onDelete={handleBccDelete(chip)}
                              className={classes.chip}
                            />
                          </li>
                        );
                      })}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      value={bccvalue}
                      // inputRef={bccRef}
                      placeholder="Press Enter, Spacebar or , after typing mail"
                      onKeyDown={handleBccKeyDown}
                      onChange={handleBccChange}
                      onPaste={handleBccPaste}
                      style={{ width: "90%" }}
                    />
                  </Grid>
                </Grid>
                {/* <Input
                  defaultValue={props.location.state.bcc}
                  placeholder="BCC"
                  style={{ width: "90%" }}
                /> */}
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>Subject:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Input
                  value={subject}
                  onChange={handlesubjectchange}
                  placeholder="Subject"
                  style={{ width: "90%" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>Body:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Input
                  placeholder="Body"
                  style={{ width: "90%" }}
                  multiline
                  rows={6}
                  value={body}
                onChange={handlebodychange}
                />
              </Grid>
            </Grid>
            {type === "30secs" ? (
              <div>
                <Grid container>
                  <Grid item xs={8}>
                    <span>Mail Scheduled For Every 30 Seconds</span>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={openModal}
                      style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}
                    >
                      Edit Schedule
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={editMail} style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem",fontSize:"1.2rem"}}>
                      Edit Mail
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : type === "Weekly" && daySelected && timeSelected ? (
              <div>
                <Grid container>
                  <Grid item xs={8}>
                    <p>
                      Mail Scheduled For Every Week on {daySelected} at{" "}
                      {timeSelected}
                    </p>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={openModal}
                      style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}
                    >
                      Edit Schedule
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained"  onClick={editMail} style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem",fontSize:"1.2rem"}}>
                      Edit Mail
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : type === "Monthly" && dateSelected && timeSelected ? (
              <div>
                <Grid container>
                  <Grid item xs={8}>
                    <p>
                      Mail Scheduled For Every Month on {dateSelected} at{" "}
                      {timeSelected}
                    </p>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={openModal}
                      style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}
                    >
                      Edit Schedule
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={editMail} style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem",fontSize:"1.2rem"}}>
                      Edit Mail
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : type === "Yearly" &&
              dateSelected &&
              monthSelected &&
              timeSelected ? (
              <div>
                <Grid container>
                  <Grid item xs={8}>
                    <p>
                      Mail Scheduled For Every Year on {dateSelected}{" "}
                      {monthSelected} at {timeSelected}
                    </p>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={openModal}
                      style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}
                    >
                      Edit Schedule
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={editMail} style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem",fontSize:"1.2rem"}}>
                      Edit Mail
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Grid container>
                <Grid item style={{ textAlign: "center" }} xs={12}>
                  <Button
                    variant="contained"
                    onClick={openModal}
                    style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}
                  >
                    Select Schedule
                  </Button>
                </Grid>
              </Grid>
            )}
          </Container>

          {/* <TextField
              InputLabelProps={{ shrink: true }}
                style={{
                  width: "100%",
                }}
                id="standard-helperText"
                label=""
                defaultValue=""
                variant="outlined"
              /> */}
          {/* <div class="input-field col s12">
                  <div id="tech_stack" class="chips chips-placeholder"></div>
                </div> */}
          {/* </Grid>
            </Grid> */}
          {/* <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
              <TextField
                style={{
                  width: "80%",
                }}
                id="standard-helperText"
                label="CC"
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
              <TextField
                style={{
                  width: "80%",
                }}
                id="standard-helperText"
                label="Subject"
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
              <TextField
                style={{
                  width: "80%",
                }}
                id="outlined-multiline-static"
                label="Body"
                multiline
                rows={7}
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid> */}
        </Card>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
      >
        <Container style={{ textAlign: "center" }}>
          <Grid container style={{
                padding:"0.5rem"
              }}>
            <Grid item xs={6} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
              Send Mail Every
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleChange}
                style={{ width: "80%" }}
              >
                <MenuItem value="30secs">Thirty Seconds</MenuItem>
                <MenuItem value="Weekly">Week</MenuItem>
                <MenuItem value="Monthly">Month</MenuItem>
                <MenuItem value="Yearly">Year</MenuItem>
              </Select>
            </Grid>
          </Grid>
          {type === "Weekly" ? (
            <div>
              <Grid container >
                <Grid item xs={12} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select A Day</span>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ textAlign: "center" }}>
                {weeks.map((day) => (
                  <Grid item xs={3}>
                    <div
                      style={{
                        margin: "0.5rem",
                        cursor: "pointer",
                      }}
                      id={day}
                      key={day}
                      onClick={selectday}
                      className={`${
                        daySelected === day ? "selected" : ""
                      } btn dayclass`}
                    >
                      {day}
                    </div>
                  </Grid>
                ))}
              </Grid>
              <Grid container >
                <Grid item xs={12} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select Time</span>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue={timeSelected}
                    onChange={selectTime}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ) : (
            ""
          )}
          {type === "Monthly" ? (
            <div>
              <Grid container style={{
                padding:"1.5rem"
              }} className="textdiv">
                <Grid item xs={6} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select A Date</span>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dateSelected}
                    onChange={selectDate}
                    style={{ width: "80%" }}
                  >
                    {dates.map((date) => (
                      <MenuItem value={date} id={date} key={date}>
                        {date}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container style={{
                padding:"1.5rem"
              }}>
                <Grid item xs={6} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select Time</span>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    onChange={selectTime}
                    defaultValue={timeSelected}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ) : (
            ""
          )}
          {type === "Yearly" ? (
            <div>
              <Grid container style={{
                padding:"1.5rem"
              }}>
                <Grid item xs={6} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select A Date</span>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dateSelected}
                    onChange={selectDate}
                    style={{ width: "80%" }}
                  >
                    {dates.map((date) => (
                      <MenuItem value={date} id={date} key={date}>
                        {date}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container >
                <Grid item xs={6}style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  Select A Month
                </Grid>
                <Grid item xs={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={monthSelected}
                    onChange={selectMonth}
                    style={{ width: "80%" }}
                  >
                    {months.map((month) => (
                      <MenuItem value={month} id={month} key={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container style={{
                padding:"1.5rem"
              }}>
                <Grid item xs={6} style={{color:"#3ebdf1", fontSize:"1.4rem"}}>
                  <span>Select Time</span>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    onChange={selectTime}
                    defaultValue={timeSelected}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ) : (
            ""
          )}
          {type ? (
            <Grid container>
              <Grid item xs={12}>
                <Button variant="contained" onClick={closeModal} style={{backgroundColor:"#3ebdf1" , color: "cornsilk", marginTop: ".6rem"}}>
                  Continue
                </Button>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </Container>
      </Modal>
    </div>
  );
}

export default EditMail;
