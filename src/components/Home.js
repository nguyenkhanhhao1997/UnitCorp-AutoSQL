import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Modal,
  Typography,
} from "@material-ui/core";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

registerAllModules();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  table: {
    marginTop: "20px",
  },
  txtInput: {
    width: "98%",
    margin: "1%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  border: 0,
  boxShadow: "0 3px 5px 2px grey",
  height: 600,
};

const Home = () => {
  const classes = useStyles();

  const [scriptId, setscriptId] = useState("");
  const [scriptName, setScriptName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [scriptInsert, setScriptInsert] = useState("");
  const [scriptDetail, setScriptDetail] = useState({});

  const handleChangeId = (event) => {
    let id = event.target.value;
    setscriptId(id);
  };

  const handleChangeName = (event) => {
    let name = event.target.value;
    setScriptName(name);
  };

  const [data, setData] = useState([
    {
      condition: "A=B",
      codeA: "",
      sheetNameA: "",
      rowA: "",
      columnA: "",
      descriptionA: "",
      codeB: "",
      sheetNameB: "",
      rowB: "",
      columnB: "",
      descriptionB: "",
    },
  ]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGenerateSQLBtn = () => {
    if (scriptId == "") {
      alert("Please enter the script ID!");
      return false;
    }
    if (scriptName == "") {
      alert("Please enter the script Name!");
      return false;
    }
    setOpenModal(true);
  };

  return (
    <div className={classes.root}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            SQL STRING
            <br />
            *************
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {JSON.stringify(data)}
          </Typography>
        </Box>
      </Modal>

      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item xs={12} sm container>
            <Grid item xs={10}>
              <TextField
                required
                type="text"
                label="Script ID"
                variant="outlined"
                value={scriptId}
                className={classes.txtInput}
                onChange={handleChangeId}
                size="small"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                type="text"
                label="Script name"
                variant="outlined"
                value={scriptName}
                className={classes.txtInput}
                onChange={handleChangeName}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleGenerateSQLBtn}
                color="secondary"
              >
                Generate SQL
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <HotTable
        className={classes.table}
        data={data}
        height="auto"
        width="100%"
        colWidths={100}
        // colWidths={[100, 100, 100, 50, 50, 200, 100, 100, 50, 50, 200]}
        stretchH="last"
        colHeaders={[
          "Condition",
          "(A)Report code",
          "(A)Sheet name",
          "(A)Row",
          "(A)Col",
          "(A)Description",
          "(B)Report code",
          "(B)Sheet name",
          "(B)Row",
          "(B)Col",
          "(B)Description",
        ]}
        columns={[
          {
            data: "condition",
            type: "dropdown",
            source: ["A=B", "A>=B", "A<=B"],
          },
          { data: "codeA" },
          { data: "sheetNameA" },
          { data: "rowA" },
          { data: "columnA" },
          { data: "description" },
          { data: "codeB" },
          { data: "sheetNameB" },
          { data: "rowB" },
          { data: "columnB" },
          { data: "descriptionB" },
        ]}
        minSpareRows={1}
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  );
};

export default Home;
