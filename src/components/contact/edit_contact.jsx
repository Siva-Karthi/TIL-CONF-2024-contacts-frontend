import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useEffect } from "react";

export default function EditContactForm() {
  let [contact, setContact] = React.useState({
    name: null,
    mobile_number: null,
  });
  const params = useParams();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    return fetch(`http://127.0.0.1:8000/contacts/${contact.id}`, {
      //mode: 'no-cors',
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // data.json();
        // setLoading(false);
        // setOpen(false);
        // toast("Success");
        console.log(result.e);
        if (!result.errors) {
          toast("success");
          navigate("/");
        } else {
          toast(
            "Error while add contact. Please try after sometime!" +
              result.errors.toString()
          );
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        toast("Error create contact. Please try after sometime!");
      });
  };
  useEffect(() => {
    var url = `http://127.0.0.1:8000/contacts/${params.id}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log("contacts", result);
        if (result) {
          setContact(result);
        }
      });
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name : </label>

      <input
        {...register("name", { required: true })}
        defaultValue={contact.name}
        label="Name"
      />
      {errors.name && <span>name field is required</span>}
      <br />
      <label>Mobile number : </label>
      <input
        {...register("mobile_number", { required: true })}
        label="mobile_number"
        defaultValue={contact.mobile_number}
      />
      {errors.mobile_number && <span>mobile number field is required</span>}
      <br />
      <br />
      <input type="submit" />
    </form>
  );
}
