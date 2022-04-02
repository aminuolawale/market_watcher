import { LoginBox } from "../styles/Box.styles";
import { LinkStyle, WideButton } from "../styles/Button.styles";
import { GreyBG } from "../styles/Section.styles";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const register = () => {
  const [response, setResponse] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`http://127.0.0.1:8000/api/signup/`, data)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <GreyBG>
        {!response && (
          <div>
            <LoginBox width="850px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>First Name</label>
                  <input
                    style={{
                      borderColor: errors?.first_name && "rgb(255, 93, 93)",
                    }}
                    type="text"
                    {...register("first_name", {
                      required: "field required",
                      maxLength: {
                        value: 20,
                        message: "Maximum of 20 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum of 3 characters",
                      },
                    })}
                  />
                  {errors.first_name && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.first_name.message}
                    </small>
                  )}
                </div>
                <div>
                  <label>
                    Middle Name{" "}
                    <span style={{ color: "#a9a9a9" }}>(optional)</span>
                  </label>
                  <input
                    style={{
                      borderColor: errors?.middle_name && "rgb(255, 93, 93)",
                    }}
                    type="text"
                    {...register("middle_name", {
                      maxLength: {
                        value: 20,
                        message: "Maximum of 20 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum of 3 characters",
                      },
                    })}
                  />
                  {errors.middle_name && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.middle_name.message}
                    </small>
                  )}
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    style={{
                      borderColor: errors?.last_name && "rgb(255, 93, 93)",
                    }}
                    type="text"
                    {...register("last_name", {
                      required: "field required",
                      maxLength: {
                        value: 20,
                        message: "Maximum of 20 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum of 3 characters",
                      },
                    })}
                  />
                  {errors.last_name && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.last_name.message}
                    </small>
                  )}
                </div>
                <div>
                  <label>Email</label>
                  <input
                    style={{ borderColor: errors?.email && "rgb(255, 93, 93)" }}
                    type="email"
                    {...register("email", {
                      required: "field required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div>
                  <label>Password</label>
                  <input
                    style={{
                      borderColor: errors?.password && "rgb(255, 93, 93)",
                    }}
                    type="password"
                    {...register("password", {
                      required: "field required",
                      minLength: { value: 8, message: "Password too short" },
                      maxLength: { value: 30, message: "Password too long." },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*_#?&]{8,}$/,
                        message:
                          "Must contain uppercase, lowercase, number, special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    style={{
                      borderColor:
                        errors?.confirm_password && "rgb(255, 93, 93)",
                    }}
                    type="password"
                    {...register("confirm_password", {
                      required: "field required",
                      validate: (val) => {
                        if (watch("password") != val)
                          return "passwords must match";
                      },
                    })}
                  />
                  {errors.confirm_password && (
                    <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                      {errors.confirm_password.message}
                    </small>
                  )}
                </div>
                <div>
                  <WideButton bg="#F0BE3E">Sign In</WideButton>
                </div>
              </form>
            </LoginBox>
            <p style={{ textAlign: "center", margin: "30px 0px 0px 0px" }}>
              Already have an account?
              <Link href="/login">
                <LinkStyle>Log In</LinkStyle>
              </Link>
            </p>
          </div>
        )}
        {response && (
          <LoginBox width="850px">
            <p>
              An email with instructions to complete your registration has been
              sent to you.
            </p>
          </LoginBox>
        )}
      </GreyBG>
    </>
  );
};

export default register;
