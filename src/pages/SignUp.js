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
    .oneOf([true], "Please review and accept terms and conditions to proceed"),
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
        <div className="grid h-screen place-items-center">
          <div className="container flex flex-wrap items-center mx-auto">
            <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white shadow-lg lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
              <div className="mb-8">
                <img src={logo} alt="logo" className="h-24 mx-auto my-8" />
                <h1 className="text-2xl font-bold text-center">
                  SMSWithoutBorders
                </h1>
                <p className="my-1 text-2xl font-light tracking-wide text-center">
                  Developer
                </p>
              </div>

              <p className="mb-4 text-center text-gray-800">
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
        </div>
      </PageAnimationWrapper>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="grid min-h-screen place-items-stretch md:place-items-center">
        <div className="container p-8 bg-white md:my-20 md:max-w-md md:shadow-lg md:rounded-xl">
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-32 mx-auto my-6" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
            <p className="my-1 text-2xl font-light tracking-wide text-center">
              Developer
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
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
                  <div className="inline-flex">
                    <CheckBox
                      value={value}
                      defaultChecked={watch("acceptTerms")}
                      onChange={onChange}
                      className="mt-0.5"
                    />
                    <div className="ml-2 text-sm">
                      <p className="font-medium">Terms and Conditions</p>
                      <p className="text-sm text-gray-600">
                        By signing up I agree to the <a href="#terms">terms</a>{" "}
                        of use
                      </p>
                    </div>
                  </div>
                )}
              />
            </FormGroup>
            <Button className="w-full" disabled={!watch("acceptTerms")}>
              sign up
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-800">
              login
            </Link>
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default SignUp;
