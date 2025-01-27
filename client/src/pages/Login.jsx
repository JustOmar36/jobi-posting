import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" labelText="Email" defaultValue="admin@mail.com" />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="admin"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Submit"}
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        <p>
          Admin View - Email: admin@mail.com, Password: admin
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
