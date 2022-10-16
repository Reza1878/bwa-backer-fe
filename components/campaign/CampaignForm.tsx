import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card } from "components/common";
import {
  CurrencyInput,
  TextAreaField,
  TextField,
} from "components/common/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateCampaignPayload } from "service/campaign_service";
import { ProjectType } from "service/types";
import { purgeInitialFormData } from "utils/form";
import * as yup from "yup";
import { BLANK_CAMPAIGN_FORM } from "./utils";

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  short_description: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  goal_amount: yup
    .number()
    .typeError("This field should be a number")
    .required()
    .min(10000, "Goal amount should be at least 10k"),
  perks: yup.string().required("This field is required"),
});

interface CampaignFormProps {
  onSubmit: (values: any) => void;
  disabled: boolean;
  defaultValues: ProjectType;
}

function CampaignForm(props: Partial<CampaignFormProps>) {
  const {
    onSubmit = (val) => console.log("Supply on submit props"),
    disabled,
    defaultValues,
  } = props;

  const [initialValue] = useState<ProjectType>(() =>
    purgeInitialFormData(defaultValues, BLANK_CAMPAIGN_FORM)
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProjectType>({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });
  const getInputAttribute = (
    label: string,
    name: keyof CreateCampaignPayload,
    id: string
  ) => {
    return {
      label,
      name,
      id,
      register,
      error: !!errors[name],
      helperText: errors[name]?.message,
      labelClassName: "text-black",
      className: "border",
      defaultValue: initialValue[name],
    };
  };

  return (
    <Card className="my-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...getInputAttribute("Name", "name", "name")} />
        <TextField
          {...getInputAttribute(
            "Short Description",
            "short_description",
            "short_description"
          )}
        />
        <TextAreaField
          {...getInputAttribute("Description", "description", "description")}
        />
        <CurrencyInput
          label="Goal Amount"
          labelClassName="text-black"
          defaultValue={initialValue["goal_amount"]}
          error={!!errors["goal_amount"]}
          helperText={errors["goal_amount"]?.message}
          onValueChange={(val) => setValue("goal_amount", val)}
        />
        <TextField
          {...getInputAttribute("Perks (seperate by comma)", "perks", "perks")}
        />
        <Button disabled={disabled} type="submit" style={{ width: "auto" }}>
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default CampaignForm;
