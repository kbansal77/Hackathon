import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Modal from 'react-modal';

import Navbar from "../../components/navbar/navbar";
import "./createMail.css";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



function CreateMail() {
    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  // var M
  // document.addEventListener('DOMContentLoaded', function() {
  //     var elems = document.querySelectorAll('.chips');
  //     var instances = M.Chips.init(elems, {});
  //   })
  return (
    <div>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Card style={{ paddingTop: "2rem" }}>
          <Container style={{ textAlign: "left", marginLeft: "3rem" }}>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>To:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Input placeholder="To" style={{ width: "90%" }} />
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>CC:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Input placeholder="CC" style={{ width: "90%" }} />
              </Grid>
            </Grid>
            <Grid container style={{ paddingBottom: "1rem" }}>
              <Grid item xs={1}>
                <label>Subject:</label>
              </Grid>
              <Grid item xs={11} style={{ paddingBottom: "1rem" }}>
                <Input placeholder="Subject" style={{ width: "90%" }} />
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
                />
              </Grid>
            </Grid>
            <Grid container>
              <Button variant="contained" onClick={openModal} color="primary">
                Select Schedule
              </Button>
            </Grid>
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal } contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay"   >
                <Grid container>
                    Send Mail Every
                </Grid>
            </Modal>
    </div>
  );
}

export default CreateMail;
