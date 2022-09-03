import { CampaignImageItem } from "components/campaign";
import { Card, Img, ItemsDisplay, Typography } from "components/common";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { MemberLayout } from "components/layouts";
import { BASE_URL } from "config/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";
import useToast from "utils/toast-hooks";

function DetailCampaign() {
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<ProjectType>();
  const { showToast } = useToast();
  const router = useRouter();
  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const { id } = router.query;
      if (!id) router.push("/member/campaign");

      setLoading(true);
      const response = await CampaignService.getItem(+id!);
      const { data, meta } = response;
      if (meta.code != 200) {
        showToast(meta.message, "error");
        router.push("/member/campaign");
        return;
      }
      setCampaign(data);
      setLoading(false);
    };

    if (router.isReady) fetchData();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady]);

  const attrAndLabels = [
    { label: "Name", key: "name" },
    { label: "Short Description", key: "short_description" },
    {
      label: "Goal Amount",
      key: "goal_amount",
      display: (val: any) => new Intl.NumberFormat().format(val),
    },
    { label: "Description", key: "description" },
  ];
  return (
    <MemberLayout title="Detail Campaign">
      <Typography variant="h3">Campaign Details</Typography>

      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <Card className="my-4">
            <div className="w-full">
              <Typography variant="h5">Campaign</Typography>
              <ItemsDisplay data={campaign} attrAndLabels={attrAndLabels} />
            </div>
          </Card>

          <Card className="mb-4">
            <Typography variant="h5">Gallery</Typography>
            <div className="flex flex-wrap overflow-x-scroll mt-4 -mx-2 no-scrollbar">
              <div className="flex flex-nowrap">
                {campaign?.images.map((item, index) => (
                  <CampaignImageItem
                    src={`${BASE_URL}${item.image_url}`}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </MemberLayout>
  );
}

export default DetailCampaign;
