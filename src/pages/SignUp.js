import React, { useEffect, useState } from "react";
import logo from "images/logo.png";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCache, getCache, clearCache } from "services/storage";
import * as yup from "yup";
import {
  ErrorMessage,
  FormGroup,
  Input,
  Label,
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
    if (cache && cache.email) {
      setValue("email", cache.email, {
        shouldValidate: true,
      });
      setValue("password", cache.password, {
        shouldValidate: true,
      });
      clearCache();
    }
  }, [setValue]);

  const handleSignUp = (data) => {
    setCache(data);
    // handle login here
  };

  return (
    <Container className="grid h-screen place-items-center">
      <div className="container flex flex-wrap items-center mx-auto">
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white shadow-lg lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
          <div className="mb-4">
            <img src={logo} alt="logo" className="mx-auto my-8 h-28" />
            <h1 className="text-3xl font-bold text-center">
              SMSWithoutBorders
            </h1>
            <p className="my-1 text-3xl font-light tracking-wide text-center">
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
                <ToggleButton toggleFunc={setToggle} value={toggle} />
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
                <ToggleButton toggleFunc={setToggle2} value={toggle2} />
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
