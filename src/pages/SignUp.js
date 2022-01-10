import React, { useEffect, useState } from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCache, getCache, clearCache } from "services/storage";
import * as yup from "yup";
import { useSignupMutation } from "services/api";
import { useNavigate } from "react-router-dom";

import {
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  Loader,
  CheckBox,
  Button,
  ToggleButton,
  Container,
} from "components";

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
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // get the stored user creds to repopulate
    const cache = getCache();
    console.log(cache);
    if (cache && cache.email) {
      setValue("email", cache.email, {
        shouldValidate: true,
      });
      setValue("password", cache.password, {
        shouldValidate: true,
      });
      setValue("confirmPassword", cache.confirmPassword, {
        shouldValidate: true,
      });
      setValue("acceptTerms", cache.acceptTerms, {
        shouldValidate: true,
      });
      clearCache();
    }
  }, [setValue]);

  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    setCache(data);
    try {
      const user = await signup(data).unwrap();
      console.log(user);
    } catch (error) {
      console.log(error);
      switch (error.status) {
        case 400:
          toast.error("An error occured. Please contact support");
          break;
        case 401:
          toast.error(
            "Sorry you are not authorized to use this service. Please contact support"
          );
          break;
        case 409:
          toast.error(
            "There is a possible duplicate of this account please contact support"
          );
          break;

        case 429:
          toast.error(
            "Too many failed attempts please wait a while and try again"
          );
          break;
        case 500:
          toast.error("A critical error occured. Please contact support");
          break;
        case "FETCH_ERROR":
          toast.error("An error occured, please check your network try again");
          break;
        default:
          toast.error("An error occured, please try again");
      }
    }
  };

  // when making requests show loading indicator
  if (isLoading) return <Loader message="processing please wait ..." />;

  // if user is successfully registered remove cached data and welcome them
  if (isSuccess) {
    clearCache();
    return (
      <Container className="grid h-screen place-items-center">
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
      </Container>
    );
  }

  return (
    <Container className="grid h-screen place-items-center">
      <div className="container flex flex-wrap items-center mx-auto">
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white shadow-lg lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
          <div className="mb-4">
            <img src={logo} alt="logo" className="h-24 mx-auto my-8" />
            <h1 className="text-2xl font-bold text-center">
              SMSWithoutBorders
            </h1>
            <p className="my-1 text-2xl font-light tracking-wide text-center">
              Developer
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup>
              <Label htmlFor="email">Email address</Label>
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={toggle ? "text" : "password"}
                  name="password"
                  {...register("password")}
                  error={errors.password}
                />
                <ToggleButton
                  className="absolute top-3 right-3"
                  toggleFunc={setToggle}
                  value={toggle}
                />
              </div>
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
              <PasswordStrengthBar password={watch("password")} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={toggle2 ? "text" : "password"}
                  name="confirmPassword"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword}
                />
                <ToggleButton
                  className="absolute top-3 right-3"
                  toggleFunc={setToggle2}
                  value={toggle2}
                />
              </div>
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
              )}
              <PasswordStrengthBar password={watch("confirmPassword")} />
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { value, onChange } }) => (
                  <Label className="inline-flex">
                    <CheckBox
                      value={value}
                      defaultChecked={watch("acceptTerms")}
                      onChange={onChange}
                      className="mt-0.5"
                    />
                    <div className="ml-2 text-sm">
                      <p className="font-medium">Terms and Conditions</p>
                      <p className="text-sm">
                        By signing up I agree to the <a href="#terms">terms</a>{" "}
                        of use
                      </p>
                    </div>
                  </Label>
                )}
              />
            </FormGroup>
            <Button disabled={!watch("acceptTerms")}>sign up</Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
