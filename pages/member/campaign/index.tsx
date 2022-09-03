import { Button, Typography } from "components/common";
import { MemberLayout } from "components/layouts";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
          <table className="w-full border">
            <thead className="border-b">
              <tr>
                <th className="p-2">
                  <Typography variant="small">Campaign</Typography>
                </th>
                <th className="p-2">
                  <Typography variant="small">Goal Amount</Typography>
                </th>
                <th className="p-2">
                  <Typography variant="small">Current Amount</Typography>
                </th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {!loading && campaigns.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-2">
                    <Typography variant="small">No data available!</Typography>
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center p-2">
                    <Typography variant="small">Loading...</Typography>
                  </td>
                </tr>
              )}
              {campaigns.map((item: ProjectType, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <Typography variant="small">{item.name}</Typography>
                  </td>
                  <td className="p-2">
                    <Typography variant="small">
                      {new Intl.NumberFormat().format(item.goal_amount)}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography variant="small">
                      {new Intl.NumberFormat().format(item.current_amount)}
                    </Typography>
                  </td>
                  <td className="p-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MemberLayout>
  );
}

export default CampaignList;
