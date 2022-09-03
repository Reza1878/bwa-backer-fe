import { Button, Container, Img, Typography } from "components/common";
import { TextField } from "components/common/input";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthService, SignUpPayload } from "service/auth_service";

import useToast from "utils/toast-hooks";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  name: yup.string().required(),
  occupation: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toastLoading, updateToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values: any) => {
    const payload: SignUpPayload = {
      email: values.email,
      name: values.name,
      occupation: values.occupation,
      password: values.password,
    };

    setLoading(true);

    toastLoading();
    try {
      const response = await AuthService.signUp(payload);
      if (response.meta.code == 200) {
        updateToast(response.data.message, "success");
        setLoading(false);
        Cookies.set("token", response.data.token);
        router.push("/sign-up/upload");
      } else {
        updateToast(response.meta.message, "error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      updateToast("Can't sign up account!", "error");
    }
    // router.push("/sign-up/upload");
  };

  const getInputAttribute = (
    label: string,
    name: string,
    placeholder: string = ""
  ) => {
    return {
      label,
      name,
      placeholder,
      register,
      rounded: true,
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };

  return (
    <>
      <Head>
        <title>Backer - Sign Up</title>
      </Head>
      <div className="header__bg"></div>
      <div className="relative flex flex-wrap">
        <div className="hidden lg:block w-1/3 h-screen">
          <Img
            src="/image/sign-up-background.jpg"
            className="w-full h-screen rounded-r-lg object-cover"
          />
        </div>
        <Container className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
            <Typography variant="h3" className="text-white my-6">
              Sign Up Account
            </Typography>

            <TextField
              id="full-name"
              {...getInputAttribute("Full Name", "name", "John Doe")}
            />
            <TextField
              id="occupation"
              {...getInputAttribute(
                "Occupation",
                "occupation",
                "Full stack developer"
              )}
            />
            <TextField
              id="email"
              {...getInputAttribute("Email", "email", "johndoe@mail.com")}
              type="email"
            />
            <TextField
              id="password"
              {...getInputAttribute("Password", "password", "********")}
              type="password"
            />

            <Button
              block
              rounded
              size="md"
              className="mt-8"
              disabled={loading}
              type="submit"
              style={{ width: "100%" }}
            >
              Continue Sign Up
            </Button>

            <div className="flex justify-center mt-4">
              <Typography className="text-white">
                Already have account?{" "}
                <span
                  className="cursor-pointer text-secondary"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign in
                </span>
              </Typography>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
