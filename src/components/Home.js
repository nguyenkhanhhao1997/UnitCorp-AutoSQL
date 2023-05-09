import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Modal,
  Typography,
} from "@mui/material";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import SqlModal from "./SqlModal";
import GenerateScriptDetail from "../functions/GenerateScriptDetail";

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
    marginTop: "20px",
    maxWidth: 1000,
  },
  generateBtn: {
    marginTop: "10px !important",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [scriptId, setscriptId] = useState("");
  const [scriptName, setScriptName] = useState("");
  const [reportCodeA, setReportCodeA] = useState("");
  const [reportCodeB, setReportCodeB] = useState("");
  const [sheetNameA, setSheetNameA] = useState("");
  const [sheetNameB, setSheetNameB] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [scriptInsert, setScriptInsert] = useState("");
  const [data, setData] = useState([
    {
      rowA: "",
      columnA: "",
      descriptionA: "",
      condition: "",
      rowB: "",
      columnB: "",
      descriptionB: "",
    },
  ]);

  const { scriptDetail, generateScriptDetail } = GenerateScriptDetail(
    scriptId,
    reportCodeA,
    sheetNameA,
    reportCodeB,
    sheetNameB,
    data
  );

  // Handle event
  const handleChangeReportCodeA = (event) => {
    let text = event.target.value;
    setReportCodeA(text);
  };

  const handleChangeReportCodeB = (event) => {
    let text = event.target.value;
    setReportCodeB(text);
  };

  const handleChangeSheetNameA = (event) => {
    let text = event.target.value;
    setSheetNameA(text);
  };

  const handleChangeSheetNameB = (event) => {
    let text = event.target.value;
    setSheetNameB(text);
  };

  const handleChangeId = (event) => {
    let id = event.target.value;
    setscriptId(id);
  };

  const handleChangeName = (event) => {
    let name = event.target.value;
    setScriptName(name);
  };

  const handleCloseModal = () => {
    setScriptInsert("");
    setOpenModal(false);
  };

  const handleGenerateSQLBtn = () => {
    if (
      scriptId === "" ||
      scriptName === "" ||
      reportCodeA === "" ||
      reportCodeB === "" ||
      sheetNameA === "" ||
      sheetNameB === ""
    ) {
      alert("Please enter all information!");
      return false;
    }
    generateScriptInsert();
    generateScriptDetail();
    setOpenModal(true);
  };

  // Generate SQL
  const generateScriptInsert = () => {
    let string = `insert into s_script_sql (SCRIPT_SQL_ID, SCRIPT_SQL_NAME, SCRIPT_TYPE)\n\
                  values ('${scriptId}', '${scriptName}', 2);`;
    setScriptInsert(string);
  };

  // View
  return (
    <div className={classes.root}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SqlModal
          scriptId={scriptId}
          scriptInsert={scriptInsert}
          scriptDetail={scriptDetail}
        ></SqlModal>
      </Modal>

      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          {/* ID and Name */}
          <Typography variant="h6">Script information</Typography>
          <Grid item xs={12} sm container>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Script ID"
                variant="outlined"
                value={scriptId}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeId}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Script name"
                variant="outlined"
                value={scriptName}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeName}
                size="small"
              />
            </Grid>
          </Grid>

          {/* Report A */}
          <Typography variant="h6">Report A</Typography>
          <Grid item xs={12} sm container>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Report code"
                variant="outlined"
                value={reportCodeA}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeReportCodeA}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Sheet name"
                variant="outlined"
                value={sheetNameA}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeSheetNameA}
                size="small"
              />
            </Grid>
          </Grid>
          {/* Report B */}
          <Typography variant="h6">Report B</Typography>
          <Grid item xs={12} sm container>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Report code"
                variant="outlined"
                value={reportCodeB}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeReportCodeB}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                type="text"
                label="Sheet name"
                variant="outlined"
                value={sheetNameB}
                className={classes.txtInput}
                color="secondary"
                onChange={handleChangeSheetNameB}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              className={classes.generateBtn}
              fullWidth
              variant="contained"
              onClick={handleGenerateSQLBtn}
              color="primary"
            >
              Generate SQL
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <HotTable
        className={classes.table}
        data={data}
        height="auto"
        width="100%"
        colWidths={[125, 125, 400, 125, 125, 125, 400]}
        stretchH="last"
        colHeaders={[
          "(A)Row",
          "(A)Col",
          "(A)Description",
          "Condition",
          "(B)Row",
          "(B)Col",
          "(B)Description",
        ]}
        columns={[
          { data: "rowA" },
          { data: "columnA" },
          { data: "descriptionA" },
          {
            data: "condition",
            editor: "select",
            selectOptions: ["=", ">", "<"],
          },
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
