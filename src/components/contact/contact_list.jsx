import Contact from "./contact";
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import ContactForm from "./contact_form";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ContactList = () => {
  let navigate = useNavigate();

  let [contacts, setContacts] = React.useState([]);

  useEffect(() => {
    var url = `http://127.0.0.1:8000/contacts`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("contacts", result);
          if (result && result.length > 0) {
            setContacts(result);
          } else {
            setContacts([]);
          }
        },
        (error) => {
          throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
        }
      );
  }, []);

  /**
   *
   */
  return (
    <Box>
      {contacts &&
        contacts.map((contact) => (
          <Contact name={contact.name} contact_id={contact.id} />
        ))}
      <Button
        startDecorator={<Add />}
        onClick={() => {
          navigate("/new");
        }}
      >
        New
      </Button>
    </Box>
  );
};

export default ContactList;
