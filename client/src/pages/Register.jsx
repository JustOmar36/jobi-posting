import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Register = () => {
  return (
    <div>
      <Wrapper>
        <form className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow
            type="text"
            name="fisrtName"
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
          <button type="submit" className="btn btn-block">
            Submit
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
        </form>
      </Wrapper>
    </div>
  );
};

export default Register;
