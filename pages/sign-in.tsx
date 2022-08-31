import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Img, Typography } from "components/common";
import { TextField } from "components/common/input";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "service/auth_service";
import useToast from "utils/toast-hooks";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

function SignIn() {
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
    toastLoading();
    setLoading(true);
    try {
      const response = await AuthService.signIn({
        email: values.email,
        password: values.password,
      });
      const { data, meta } = response;
      console.log(response);
      setLoading(false);
      if (meta.code !== 200) {
        updateToast(data?.errors || meta.message, "error");
        return;
      }
      updateToast(meta.message, "success");
      Cookies.set("token", data.token);
      setTimeout(() => {
        router.push("/");
      }, 250);
    } catch (error: unknown) {
      console.log(error);
      setLoading(false);
      updateToast("Internal server error", "error");
    }
  };
  return (
    <>
      <Head>
        <title>Backer - Sign In</title>
      </Head>
      <div className="header__bg"></div>
      <div className="h-screen flex justify-center items-center relative">
        <div className="hidden md:block w-1/3 h-full">
          <Img
            src="/image/sign-in-background.jpg"
            className="h-full rounded-r-xl"
          />
        </div>
        <div className="w-full md:w-2/3">
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography className="text-white mb-4" variant="h3">
                Sign In To Your Account
              </Typography>

              <TextField
                label="Email"
                placeholder="johndoe@mail.com"
                id="email"
                name="email"
                register={register}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                label="Password"
                placeholder="*********"
                type="password"
                id="password"
                name="password"
                register={register}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />

              <Button
                style={{ width: "100%" }}
                rounded
                size="md"
                block
                className="mt-4"
                type="submit"
                disabled={loading}
              >
                Sign In
              </Button>

              <div className="flex justify-center mt-4">
                <Typography className="text-white">
                  Don&apos;t have account?{" "}
                  <span
                    className="cursor-pointer text-secondary"
                    onClick={() => router.push("/sign-up")}
                  >
                    Sign up
                  </span>
                </Typography>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default SignIn;
