import { CampaignForm } from "components/campaign";
import { Typography } from "components/common";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { MemberLayout } from "components/layouts";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

function EditCampaign() {
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<ProjectType>();
  const { showToast, toastLoading, updateToast } = useToast();
  const router = useRouter();
  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const { id } = router.query;
      const response = await sendAndHandleInvalidToken(() =>
        CampaignService.getItem(+id!)
      );
      if (!active) return;
      const { data, meta } = response;
      if (meta.code != 200) {
        showToast(meta.message, "error");
        router.push("/member/campaign");
        return;
      }
      data.perks = data.perks.join(", ");
      setLoading(false);
      setCampaign(data);
    };

    if (router.isReady) {
      fetchData();
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  const onSubmit = async (val: any) => {
    try {
      toastLoading();
      const response = await sendAndHandleInvalidToken(() =>
        CampaignService.update(campaign!.id, {
          description: val.description,
          goal_amount: val.goal_amount,
          name: val.name,
          perks: val.perks,
          short_description: val.short_description,
        })
      );

      const { meta } = response;
      if (meta.code != 200) {
        updateToast(meta.message, "error");
        return;
      }
      updateToast(meta.message, "success");
      router.push("/member/campaign");
    } catch (error) {
      updateToast("Internal server error", "error");
    }
  };

  return (
    <MemberLayout title="Edit Campaign">
      <Typography variant="h3">Edit Campaign</Typography>

      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIndicator width={48} height={48} />
        </div>
      ) : (
        <CampaignForm onSubmit={onSubmit} defaultValues={campaign} />
      )}
    </MemberLayout>
  );
}

export default EditCampaign;
