import React, { useEffect, useState } from "react";
import logo from "images/logo.png";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCache, getCache, clearCache } from "services/storage";
import * as yup from "yup";
import { useLoginMutation } from "services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAuth } from "features";
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
  rememberMe: yup.bool(),
});

const LogIn = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // get the stored cache to repopulate
    const cache = getCache();
    if (cache && cache.session_id) {
      dispatch(saveAuth(cache));
      navigate("/dashboard");
    } else if (cache && cache.email) {
      setValue("email", cache.email, {
        shouldValidate: true,
      });
      setValue("password", cache.password, {
        shouldValidate: true,
      });
      clearCache();
    }
  }, [setValue, dispatch, navigate]);

  const handleLogin = async (data) => {
    setCache(data);
    try {
      const user = await login(data).unwrap();
      dispatch(saveAuth(user));
      // remove any cached email and password
      clearCache();
      // if user wants to be remembered then cache their session
      if (data.rememberMe) {
        setCache(user);
      }
      /* 
        redirect users if they initially tried to access a private route
        without permission
      */
      navigate(location.state.path || "/dashboard");
    } catch (error) {
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

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader message="processing please wait ..." />;
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
          <form onSubmit={handleSubmit(handleLogin)}>
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
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <Label className="inline-flex items-center">
                    <CheckBox value={value} onChange={onChange} />
                    <span className="ml-2">remember me</span>
                  </Label>
                )}
              />
            </FormGroup>
            <Button>login</Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
