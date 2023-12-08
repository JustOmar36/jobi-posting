import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div>
      <Wrapper>
        <Form method="post" className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow
            type="text"
            name="name"
            labelText="First Name"
            defaultValue="Omar"
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue="Masri"
          />
          <FormRow
            type="text"
            name="location"
            labelText="Location"
            defaultValue="Minneapolis"
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            defaultValue="Omar@gmail.com"
          />
          <FormRow
            type="password"
            name="password"
            labelText="Password"
            defaultValue="12345678"
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Register;
