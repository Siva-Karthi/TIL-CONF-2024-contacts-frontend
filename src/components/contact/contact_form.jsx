import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ContactForm() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    return fetch("http://127.0.0.1:8000/contacts", {
      //mode: 'no-cors',
      method: "POST",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name : </label>

      <input {...register("name", { required: true })} label="Name" />
      {errors.name && <span>name field is required</span>}
      <br />
      <label>Mobile number : </label>
      <input
        {...register("mobile_number", { required: true })}
        label="mobile_number"
      />
      {errors.mobile_number && <span>mobile number field is required</span>}
      <br />
      <br />
      <input type="submit" />
    </form>
  );
}
