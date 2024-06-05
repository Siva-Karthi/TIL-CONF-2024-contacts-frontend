import { Box } from "@mui/joy";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/joy/IconButton";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
const Contact = (props) => {
  let navigate = useNavigate();
  function handleDelete() {
    console.log("props contact_id", props);
    var url = `http://127.0.0.1:8000/contacts/${props.contact_id}`;
    console.log("contacts url", url);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions).then((result) => {
      console.log("contacts delete result", result);
    });
    window.location.reload();
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box>{props.name}</Box>
      <IconButton
        variant="plain"
        color="primary"
        onClick={() => {
          navigate(`/${props.contact_id}/edit`);
        }}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        variant="plain"
        color="danger"
        onClick={() => {
          handleDelete();
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};

export default Contact;
