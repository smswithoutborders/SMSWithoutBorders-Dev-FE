import React, { useEffect } from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAuth, saveCredentials, authSelector } from "features";
import {
  Input,
  Label,
  Loader,
  Button,
  FormGroup,
  ErrorMessage,
  PasswordInput,
  PageAnimationWrapper,
} from "components";

const schema = yup.object({
  email: yup.string().email().required("please enter your email"),
  password: yup.string().min(8).required("please enter your password"),
  rememberMe: yup.bool(),
});

const LogIn = () => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // if logged in then redirect to dashboard
    if (auth.uid && location.state && location.state.path) {
      /*
          redirect users if they initially tried to access a private route
          without permission
        */
      navigate(location.state.path);
    } else if (auth.uid) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate, auth.uid, location.state]);

  const handleLogin = async (data) => {
    try {
      const response = await login(data).unwrap();
      toast.success("Login successful");
      // create a cookie for this session
      dispatch(saveAuth(response));
      dispatch(saveCredentials(response));
      // check useEffect above for redirect which should happen at this stage
    } catch (error) {
      // we handle errors with middleware
    }
  };

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader light message="processing please wait ..." />;
  }

  return (
    <PageAnimationWrapper>
      <div className="grid min-h-screen justify-items-center 2xl:place-items-center">
        <div className="container p-8 mt-10 md:max-w-md md:shadow-lg md:rounded-xl backdrop-blur-xl">
          <div className="mb-8 text-gray-200">
            <img src={logo} alt="logo" className="h-24 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
            <p className="my-1 text-xl font-light tracking-widest text-center">
              DEVELOPER
            </p>
          </div>
          <form className="text-gray-300" onSubmit={handleSubmit(handleLogin)}>
            <FormGroup>
              <Label htmlFor="email" required>
                Email address
              </Label>
              <Input
                type="email"
                name="email"
                {...register("email")}
                error={errors.email}
              />
              {errors.email && (
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password" required>
                Password
              </Label>
              <PasswordInput
                name="password"
                showStrength={false}
                {...register("password")}
                error={errors.password}
              />
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </FormGroup>
            <Button className="w-full mt-2">login</Button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-300">
            Dont have an account? &nbsp;
            <Link to="/signup" className="text-blue-300">
              signup
            </Link>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default LogIn;
