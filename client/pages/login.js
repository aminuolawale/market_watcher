import { LoginBox } from "../styles/Box.styles";
import { loginUser } from "../utils/redux/actions/userActions";
import { LinkStyle, WideButton } from "../styles/Button.styles";
import { GreyBG } from "../styles/Section.styles";
import { useDispatch } from "react-redux";
import Link from "next/dist/client/link";
import { useForm } from "react-hook-form";

const login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };
  return (
    <GreyBG>
      <LoginBox>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              style={{ borderColor: errors?.password && "rgb(255, 93, 93)" }}
              type="password"
              {...register("password", {
                required: "field required",
                maxLength: { value: 20, message: "Maximum of 20 characters" },
                minLength: { value: 5, message: "Minimum of 3 characters" },
              })}
            />
            {errors.password && (
              <small role="alert" style={{ color: "rgb(255, 93, 93)" }}>
                {errors.password.message}
              </small>
            )}
          </div>
          <div>
            <WideButton bg="#F0BE3E">Sign In</WideButton>
          </div>
        </form>
      </LoginBox>
      <p style={{ textAlign: "center" }}>
        <LinkStyle>Forgot your password?</LinkStyle>
      </p>
      <p style={{ textAlign: "center", margin: 0 }}>
        Don't have an account yet?
        <Link href="/register">
          <LinkStyle>Sign Up</LinkStyle>
        </Link>
      </p>
    </GreyBG>
  );
};

export default login;
