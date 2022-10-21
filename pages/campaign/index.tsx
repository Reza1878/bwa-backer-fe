import { Button, Container, Typography } from "components/common";
import { TextField } from "components/common/input";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { GuestLayout } from "components/layouts";
import ProjectItem from "components/section/project/ProjectItem";
import React, { useEffect, useState } from "react";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string(),
});

function CampaignList() {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const response = await CampaignService.gets();
      if (!active) return;
      setCampaigns(response?.data || []);
      setLoading(false);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const searchCampaign = async (val: any) => {
    setLoading(true);
    const response = await CampaignService.gets({ name: val.name });
    setCampaigns(response?.data || []);
    setLoading(false);
  };
  return (
    <GuestLayout>
      <Container>
        <div className="w-full min-h-screen relative">
          <form onSubmit={handleSubmit(searchCampaign)}>
            <TextField
              placeholder="Search by campaign name..."
              className="mb-3"
              register={register}
              error={!!errors["name"]}
              name="name"
              helperText={errors["name"]?.message}
            />
            <Button type="submit">Search</Button>
          </form>
          {loading ? (
            <div className="flex justify-center">
              <LoadingIndicator color="white" width={36} height={36} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6 mt-4">
                {campaigns.map((campaign: ProjectType, index) => (
                  <ProjectItem
                    id={campaign.id}
                    description={campaign.short_description}
                    key={index}
                    title={campaign.name}
                    progress={
                      (campaign.current_amount / campaign.goal_amount) * 100
                    }
                    image={campaign.image_url}
                    target={campaign.goal_amount}
                  />
                ))}
              </div>

              {!loading && campaigns.length === 0 && (
                <Typography variant="h5" className="text-white">
                  No campaigns available
                </Typography>
              )}
            </>
          )}
        </div>
      </Container>
    </GuestLayout>
  );
}

export default CampaignList;
