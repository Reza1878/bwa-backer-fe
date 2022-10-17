import { CampaignImageItem, CampaignInfo } from "components/campaign";
import { Container, ProgressBar, Typography } from "components/common";
import { GuestLayout } from "components/layouts";
import { BASE_URL } from "config/constant";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";

function CampaignDetail() {
  const [campaign, setCampaign] = useState<ProjectType>();
  const [banner, setBanner] = useState("");
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
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
            <div className="w-full lg:w-3/4 lg:mr-8">
              {campaign && (
                <>
                  <div className="w-full bg-white rounded-lg p-4 border border-gray-400">
                    <div className="relative lg:h-[450px] h-60">
                      {banner && (
                        <>
                          <Image
                            src={banner}
                            className="rounded-lg"
                            objectFit="cover"
                            layout="fill"
                            alt="project-banner"
                          />
                        </>
                      )}
                    </div>
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
              {campaign && <CampaignInfo campaign={campaign} />}
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
