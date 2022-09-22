import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Typography } from "components/common";
import { TextField } from "components/common/input";

const schema = yup.object().shape({
  oldPassword: yup.string().required("This field is required"),
  newPassword: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be contain at least 8 characters"),
  confirmationPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("newPassword"), null], "Password didnt match"),
});

type PasswordFormProps = {
  onSubmit: (val: any) => void;
};

function PasswordForm(props: PasswordFormProps) {
  const { onSubmit } = props;
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getFormAttribute = (label: string, name: string, id: string) => {
    return {
      label,
      name,
      id,
      register,
      error: !!errors[name],
      helperText: errors[name]?.message,
      labelClassName: "text-black",
    };
  };
  return (
    <Card className="w-full mt-4">
      <Typography variant="h5" className="font-medium mb-4">
        Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...getFormAttribute("Old Password", "oldPassword", "old-password")}
          type="password"
        />
        <TextField
          {...getFormAttribute("New Password", "newPassword", "new-password")}
          type="password"
        />
        <TextField
          {...getFormAttribute(
            "Confirmation Password",
            "confirmationPassword",
            "confirmation-password"
          )}
          type="password"
        />
        <Button size="sm" type="submit">
          Save
        </Button>
      </form>
    </Card>
  );
}

export default PasswordForm;
