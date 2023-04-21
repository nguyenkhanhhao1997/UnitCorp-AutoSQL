import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, TextField, Button, Paper } from "@material-ui/core";
import Handsontable from "handsontable";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

registerAllModules();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  card: {
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

const Home = () => {
  const classes = useStyles();

  const [numberRow, setNumberRow] = useState(1);
  const handleChangNumberOfRow = (event) => {
    let number = event.target.value;
    if (data.length > number) {
      //slice list
      let newData = data.slice(0, number);
      setData(newData);
    } else {
      //append list
      let newList = [...data];
      for (var i = 0; i < number - data.length; i++) {
        let newRecord = {
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
        };
        newList.push(newRecord);
      }
      setData(newList);
    }
    setNumberRow(number);
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item xs={12} sm container>
            <Grid item xs={6}>
              <TextField
                required
                type="number"
                label="Row"
                variant="outlined"
                value={numberRow}
                className={classes.txtInput}
                onChange={handleChangNumberOfRow}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Generate SQL
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <HotTable
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
