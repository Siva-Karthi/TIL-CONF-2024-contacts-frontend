import { Box } from "@mui/joy";
import { useState } from "react";
import ContactList from "./components/contact/contact_list";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ContactForm from "./components/contact/contact_form";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import EditContactForm from "./components/contact/edit_contact";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      // <Route path="/" element={<Layout />} errorElement={<NoPage />}>
      //show errors in local
      <Route path="/" element={<Layout />} id="root">
        <Route index element={<ContactList />} />
        <Route path="/new" element={<ContactForm />} />
        <Route path="/:id/edit" element={<EditContactForm />} />
      </Route>
    )
  );
  return (
    <Box>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </Box>
  );
}
export default App;
