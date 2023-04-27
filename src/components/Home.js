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
  const [scriptDetail, setScriptDetail] = useState([]);

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

  const generateScriptInsert = () => {
    let string = `insert into s_script_sql (SCRIPT_SQL_ID, SCRIPT_SQL_NAME, SCRIPT_TYPE)\n\
                  values ('${scriptId}', '${scriptName}', 2);`;
    setScriptInsert(string);
  };

  const generateInsertPart = (row) => {
    let part = `insert into s_script_sql_detail (SCRIPT_SQL_ID, ORDERBY, SCRIPT_SQL_CONTENT, ISSTOREPROCEDURE)\n\
                values ('${scriptId}',${row}, N'WITH TB_RS AS `;
    return part;
  };
  const generateSelectA = (record) => {
    let part = `(SELECT(\n\
                SELECT ISNull((Select  ROUND(try_Convert(DECIMAL(18,3),REPLACE(COALESCE(${record.columnA},''0''),'','',''.'')),2) FROM RP_MASTER_DATA WHERE RP_CODE =''${reportCodeA}'' AND SheetName = ''${sheetNameA}'' AND R_RP_CODE =''${record.rowA}'' AND CAST(DATERP AS DATE) = ''{DATERP}''  AND BRANCHID =''{Branch}''),0)) AS "${reportCodeA}", \n\
                `;
    return part;
  };
  const generateSelectB = (record) => {
    let part = `(SELECT ISNull((Select ROUND(try_Convert(DECIMAL(18,3),REPLACE(COALESCE(${record.columnB},''0''),'','',''.'')),2) FROM RP_MASTER_DATA WHERE RP_CODE =''${reportCodeB}'' AND SheetName = ''${sheetNameB}'' AND R_RP_CODE =''${record.rowB}'' AND CAST(DATERP AS DATE) = ''{DATERP}''  AND BRANCHID =''{Branch}''),0)) AS "${reportCodeB}", `;
    return part;
  };
  const generateDescription = (record) => {
    let part = `N''${record.descriptionA}(${record.rowA})(${record.columnA}) = ${record.descriptionB}(${record.rowB})(${record.columnB}).'' AS DESCRIPTION) `;
    return part;
  };
  const generateSelectFinal = (record) => {
    let part = `SELECT DESCRIPTION,"${reportCodeA}","${reportCodeB}",(CASE WHEN ABS( (COALESCE("${reportCodeA}",0)) - (COALESCE("${reportCodeB}",0))) > 0  THEN ''1'' ELSE ''0'' END) as RESULT  FROM  TB_RS', 0);`;
    return part;
  };

  const generateScriptDetail = () => {
    let scriptList = [...scriptDetail];
    for (let i = 0; i < data.length; i++) {
      let row = i + 1;
      if (
        data[i].descriptionA !== null &&
        data[i].descriptionA !== "" &&
        data[i].descriptionB !== null &&
        data[i].descriptionB !== ""
      ) {
        let string =
          generateInsertPart(row) +
          generateSelectA(data[i]) +
          generateSelectB(data[i]) +
          generateDescription(data[i]) +
          generateSelectFinal(data[i]);
        scriptList.push(string);
      }
    }
    setScriptDetail(scriptList);
  };


  const [data, setData] = useState([
    {
      rowA: "",
      columnA: "",
      descriptionA: "",
      rowB: "",
      columnB: "",
      descriptionB: "",
    },
  ]);

  const handleCloseModal = () => {
    setScriptInsert("");
    setScriptDetail([])
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
              color="error"
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
        colWidths={150}
        stretchH="last"
        colHeaders={[
          "(A)Row",
          "(A)Col",
          "(A)Description",
          "(B)Row",
          "(B)Col",
          "(B)Description",
        ]}
        columns={[
          { data: "rowA" },
          { data: "columnA" },
          { data: "descriptionA" },
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
