import { Button, Card, Typography } from "components/common";
import { TextField } from "components/common/input";
import React, { useState } from "react";
import { UserType } from "service/types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { purgeInitialFormData } from "utils/form";
import { PROFILE_BLANK_FORMS } from "./utils";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProfileFormProps {
  user: UserType;
  onSubmit: (val: any) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  occupation: yup.string().required("This field is required"),
});

function ProfileForm(props: ProfileFormProps) {
  const { user, onSubmit } = props;
  const [initialValue] = useState(() =>
    purgeInitialFormData(user, PROFILE_BLANK_FORMS)
  );
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: initialValue,
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
      defaultValue: initialValue[name],
      labelClassName: "text-black",
    };
  };
  
  return (
    <Card className="w-full mt-4">
      <Typography variant="h5" className="font-medium mb-4">
        Profile
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...getFormAttribute("Name", "name", "name")} />
        <TextField
          {...getFormAttribute("Email", "email", "email")}
          type="email"
        />
        <TextField
          {...getFormAttribute("Occupation", "occupation", "occupation")}
        />
        <Button size="sm" type="submit">
          Save
        </Button>
      </form>
    </Card>
  );
}

export default ProfileForm;
