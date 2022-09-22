import { Button, Typography } from "components/common";
import { BaseTable } from "components/common/table";
import { MemberLayout } from "components/layouts";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Edit, FileText } from "react-feather";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";

function CampaignList() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const response = await CampaignService.getUserCampaigns();

      if (!active) return;
      setCampaigns(response.data);
      setLoading(false);
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const columnSettings = useMemo(() => {
    return [
      {
        label: "Campaign",
        name: "name",
      },
      {
        label: "Amount",
        name: "goal_amount",
        options: {
          customBodyRender: (val: number) =>
            new Intl.NumberFormat().format(val),
        },
      },
      {
        label: "Current Amount",
        name: "current_amount",
        options: {
          customBodyRender: (val: number) =>
            new Intl.NumberFormat().format(val),
        },
      },
      {
        label: "",
        name: "",
        options: {
          customBodyRenderLite: (index: number) => {
            const item: ProjectType = campaigns[index];
            return (
              <>
                <button
                  className="p-2 bg-primary bg-opacity-80 hover:bg-opacity-100 transition-all rounded-lg"
                  onClick={() =>
                    router.push(`/member/campaign/${item.id}/detail`)
                  }
                >
                  <FileText size={16} color="white" />
                </button>
                <button
                  className="p-2 bg-success bg-opacity-80 hover:bg-opacity-100 transition-all rounded-lg lg:ml-2 mt-2 lg:mt-0"
                  onClick={() =>
                    router.push(`/member/campaign/${item.id}/edit`)
                  }
                >
                  <Edit size={16} color="white" />
                </button>
              </>
            );
          },
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns]);
  return (
    <MemberLayout title="Campaign List">
      <Typography variant="h4" className="font-medium">
        Campaign List
      </Typography>

      <div className="w-full bg-white p-4 mt-4">
        <div className="flex justify-end mb-4">
          <Button
            style={{ width: "auto" }}
            onClick={() => router.push("/member/campaign/create")}
          >
            Create
          </Button>
        </div>
        <div className="overflow-auto">
          <BaseTable
            loading={loading}
            data={campaigns}
            columns={columnSettings}
          />
        </div>
      </div>
    </MemberLayout>
  );
}

export default CampaignList;
