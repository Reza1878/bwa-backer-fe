import { CampaignImageItem } from "components/campaign";
import {
  Avatar,
  Button,
  Container,
  Img,
  ProgressBar,
  Typography,
} from "components/common";
import { GuestLayout } from "components/layouts";
import { BASE_URL } from "config/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import { toast } from "react-toastify";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";

function CampaignDetail() {
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<ProjectType>();
  const [banner, setBanner] = useState("");
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const { id } = router.query;
      if (!id) {
        toast("Campaign id is required!", { type: "error", autoClose: 3000 });
        router.push("/");
        return;
      }
      const response = await CampaignService.getItem(+id!);

      if (!active) return;
      if (response.meta.code !== 200) {
        toast(response.meta.message, { autoClose: 3000, type: "error" });
        router.push("/");
        return;
      }
      setCampaign(response.data);
      setLoading(false);
    };

    if (router.isReady) {
      fetchData();
    }
    return () => {
      active = false;
    };
  }, [router, router.isReady]);

  useEffect(() => {
    if (campaign?.image_url) {
      setBanner(`${BASE_URL}${campaign!.image_url}`);
    }
  }, [campaign]);

  const handleImgClick = (src: string) => {
    setBanner(`${BASE_URL}${src}`);
  };

  return (
    <GuestLayout>
      <Container>
        <div className="w-full min-h-screen relative">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-3/4 mr-8">
              {campaign && (
                <>
                  <div className="w-full bg-white rounded-lg p-4 border border-gray-400">
                    <Img
                      className="rounded-lg max-h-[420px] object-cover w-full"
                      src={banner}
                    />
                  </div>
                  <div className="w-full flex overflow-x-scroll mt-4 -mx-2 no-scrollbar">
                    <div className="flex flex-nowrap">
                      {campaign.images.map((img, index) => (
                        <CampaignImageItem
                          key={index}
                          src={`${BASE_URL}${img.image_url}`}
                          onClick={() => handleImgClick(img.image_url)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-1/4">
              {campaign && (
                <div className="bg-white p-4 border border-gray-400 rounded-xl mt-4 lg:mt-0 sticky top-4">
                  <Typography variant="body" className="mb-4">
                    Project Leader:
                  </Typography>
                  <div className="flex mb-4">
                    <Avatar src={campaign.user.image_url} />
                    <div className="ml-4">
                      <Typography variant="h5" className="font-medium">
                        {campaign.user.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-400">
                        {new Intl.NumberFormat().format(campaign.backer_count)}{" "}
                        backer
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="body" className="font-medium">
                    What will you get:
                  </Typography>
                  <ul className="list-check mb-4">
                    {campaign.perks.map((perk, index) => (
                      <li key={index} className="my-2 flex flex-wrap">
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <input
                    type="number"
                    className="border border-gray-400 w-full py-2 px-4 rounded-full focus:outline-none"
                    placeholder="Amount in Rp."
                  />

                  <Button block className="mt-4" rounded>
                    Fund Now
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="my-4 w-full lg:w-3/4">
            <Typography variant="h3" className="font-medium mb-2">
              {campaign?.name}
            </Typography>
            <Typography className="mb-2">
              {campaign?.short_description}
            </Typography>
            <ProgressBar
              percentage={
                ((campaign?.current_amount ?? 0) /
                  (campaign?.goal_amount ?? 1)) *
                100
              }
              className="h-6"
            />
            <div className="flex justify-between mb-2">
              <Typography variant="h5" className="font-medium">
                {((campaign?.current_amount ?? 0) /
                  (campaign?.goal_amount ?? 1)) *
                  100}
                %
              </Typography>
              <Typography variant="h5" className="font-medium">
                Rp. {new Intl.NumberFormat().format(campaign?.goal_amount ?? 0)}
              </Typography>
            </div>

            <Typography variant="body">{campaign?.description}</Typography>
          </div>
        </div>
      </Container>
    </GuestLayout>
  );
}

export default CampaignDetail;
