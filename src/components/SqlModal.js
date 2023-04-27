import { React, forwardRef } from "react";
import { Box, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 4,
  overflow: "scroll",
  border: 0,
  boxShadow: "0 3px 5px 2px grey",
  height: 600,
  fontSize: "12px",
};

const SqlModal = (props, ref) => {
  const { scriptId, scriptInsert, scriptDetail } = props;

  return (
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        SQL STRING
        <br />
        *************
      </Typography>
      <p>{scriptInsert}</p>
      <p>----{scriptId}----</p>
      {scriptDetail.length > 0 &&
        scriptDetail.map((record) => {
          return <p>{record}</p>;
        })}
      <p>----{scriptId}----</p>
    </Box>
  );
};
export default forwardRef(SqlModal);
