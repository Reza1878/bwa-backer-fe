import { Button, Container } from "components/common";
import { TextField } from "components/common/input";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { GuestLayout } from "components/layouts";
import ProjectItem from "components/section/project/ProjectItem";
import React, { useEffect, useState } from "react";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";

function CampaignList() {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

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
  return (
    <GuestLayout>
      <Container>
        <div className="w-full min-h-screen relative">
          {loading ? (
            <div className="flex justify-center">
              <LoadingIndicator color="white" width={36} height={36} />
            </div>
          ) : (
            <>
              <TextField
                placeholder="Search by campaign name..."
                className="mb-3"
              />
              <Button>Search</Button>

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
            </>
          )}
        </div>
      </Container>
    </GuestLayout>
  );
}

export default CampaignList;
