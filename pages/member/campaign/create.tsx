import { CampaignForm } from "components/campaign";
import { Typography } from "components/common";
import { MemberLayout } from "components/layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CampaignService } from "service/campaign_service";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

function CreateCampaign() {
  const [loading, setLoading] = useState(false);
  const { toastLoading, updateToast } = useToast();
  const router = useRouter();
  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      toastLoading();
      const response = await sendAndHandleInvalidToken(() =>
        CampaignService.create({
          description: values.description,
          goal_amount: values.goal_amount,
          name: values.name,
          perks: values.perks,
          short_description: values.short_description,
        })
      );

      const { data, meta } = response;
      if (meta.code != 200) {
        updateToast(meta.message, "error");
        setLoading(false);
        return;
      }
      updateToast(meta.message, "success");
      setLoading(false);
      router.push("/member/campaign");
    } catch (error) {
      console.log(error);
      updateToast("Internal server error", "error");
      setLoading(false);
    }
  };
  return (
    <MemberLayout title="Create Campaign">
      <Typography variant="h4" className="font-medium">
        Create Campaign
      </Typography>
      <CampaignForm disabled={loading} onSubmit={onSubmit} />
    </MemberLayout>
  );
}

export default CreateCampaign;
