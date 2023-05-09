import { useState } from "react";
const GenerateScriptDetail = (
  scriptId,
  reportCodeA,
  sheetNameA,
  reportCodeB,
  sheetNameB,
  data
) => {
  const [scriptDetail, setScriptDetail] = useState([]);

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
    // let conditon = !record.condition ? "=" : record.condition;
    let part = `SELECT DESCRIPTION,"${reportCodeA}","${reportCodeB}",(CASE WHEN ABS( (COALESCE("${reportCodeA}",0)) - (COALESCE("${reportCodeB}",0))) > 0  THEN ''1'' ELSE ''0'' END) as RESULT  FROM  TB_RS', 0);`;
    return part;
  };

  const generateScriptDetail = () => {
    let scriptList = [];
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

  return { scriptDetail, generateScriptDetail };
};

export default GenerateScriptDetail;
