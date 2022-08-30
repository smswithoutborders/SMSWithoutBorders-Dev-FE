import React, { useEffect } from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";

import {
  Input,
  Label,
  Loader,
  Button,
  CheckBox,
  FormGroup,
  ErrorMessage,
  PasswordInput,
  PageAnimationWrapper,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "features";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
  acceptTerms: yup
    .bool()
    .oneOf([true], "Please review and accept terms and conditions to proceed")
    .required("Please confirm you agree to our terms of use"),
});

const SignUp = () => {
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    control,
    watch,
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

  const handleSignUp = async (data) => {
    try {
      await signup(data).unwrap();
      toast.success("Account created");
    } catch (error) {
      // we handle errors with middleware
    }
  };

  // when making requests show loading indicator
  if (isLoading) return <Loader light message="processing please wait ..." />;

  if (isSuccess) {
    return (
      <PageAnimationWrapper>
        <div className="grid h-full min-h-screen justify-items-center 2xl:place-items-center">
          <div className="container flex flex-col p-8 mt-10 md:max-w-md md:shadow-lg md:rounded-xl backdrop-blur-xl">
            <div className="mb-8 text-gray-200">
              <img src={logo} alt="logo" className="h-24 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-center">
                SMSWithoutBorders
              </h1>
              <p className="my-1 text-xl font-light tracking-widest text-center">
                DEVELOPER
              </p>
            </div>
            <p className="mb-6 text-center text-gray-300">
              Your account has been created. Please login
            </p>

            <Button
              className="w-1/3 mx-auto"
              onClick={() => navigate("/login")}
            >
              login
            </Button>
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="grid h-full min-h-screen justify-items-center 2xl:place-items-center">
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
          <form className="text-gray-300" onSubmit={handleSubmit(handleSignUp)}>
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
                {...register("password")}
                error={errors.password}
              />
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password" required>
                Confirm Password
              </Label>
              <PasswordInput
                name="confirmPassword"
                {...register("confirmPassword")}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { value, onChange } }) => (
                  <div className="inline-flex items-start">
                    <CheckBox
                      value={value}
                      defaultChecked={watch("acceptTerms")}
                      onChange={onChange}
                      className="mt-0.5"
                      error={errors.acceptTerms}
                    />
                    <div className="ml-2 text-sm">
                      <p className="font-medium">Terms and Conditions</p>
                      <p className="text-sm text-gray-300">
                        By signing up I agree to the{" "}
                        <a className="text-blue-300" href="#terms">
                          terms
                        </a>{" "}
                        of use
                      </p>
                    </div>
                  </div>
                )}
              />
              {errors.acceptTerms && (
                <ErrorMessage>{errors.acceptTerms?.message}</ErrorMessage>
              )}
            </FormGroup>
            <Button className="w-full mt-4">sign up</Button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-300">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-300">
              login
            </Link>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default SignUp;
