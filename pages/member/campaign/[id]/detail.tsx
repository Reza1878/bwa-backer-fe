import { CampaignImageForm, CampaignImageItem } from "components/campaign";
import { Button, Card, Img, ItemsDisplay, Typography } from "components/common";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { BaseTable } from "components/common/table";
import { MemberLayout } from "components/layouts";
import { BASE_URL } from "config/constant";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";
import UserService from "service/user_service";
import { dateFormat } from "utils/date_format";
import { rupiahFormat } from "utils/number_format";
import useToast from "utils/toast-hooks";

function DetailCampaign() {
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<ProjectType>();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [flagRefetch, setFlagRefetch] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const handleUploadImage = async (val: FormData) => {
    setIsUploading(true);
    val.append("campaign_id", campaign!.id.toString());
    const response = await CampaignService.uploadImage(val);
    const { data, meta } = response;
    setIsUploading(false);
    setShowUploadModal(false);
    showToast(meta.message, meta.code == 200 ? "success" : "error");
    setFlagRefetch(!flagRefetch);
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const { id } = router.query;
      if (!id) router.push("/member/campaign");

      setLoading(true);
      const response = await CampaignService.getItem(+id!);
      const trxResponse = await CampaignService.getCampaignTransactions(+id!);
      if (!active) return;
      const { data, meta } = response;
      if (meta.code != 200) {
        showToast(meta.message, "error");
        router.push("/member/campaign");
        return;
      }
      const { data: trxData } = trxResponse;
      setTransactions(trxData.filter((d: any) => d.status === "success"));
      setCampaign(data);
      setLoading(false);
    };

    if (router.isReady) fetchData();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady, flagRefetch]);

  const attrAndLabels = [
    { label: "Name", key: "name" },
    { label: "Short Description", key: "short_description" },
    {
      label: "Goal Amount",
      key: "goal_amount",
      display: (val: any) => new Intl.NumberFormat().format(val),
    },
    { label: "Description", key: "description" },
    {
      label: "Banner",
      key: "image_url",
      display: (val: any) => {
        if (!val) return `No image banner available!`;
        return (
          <Img
            src={`${BASE_URL}${val}`}
            className="w-full h-72 object-cover rounded-lg"
          />
        );
      },
    },
  ];

  const columnSettings = useMemo(() => {
    return [
      {
        label: "Trx Id",
        name: "code",
      },
      {
        label: "Backer",
        name: "name",
      },
      {
        label: "Amount",
        name: "amount",
        options: {
          customBodyRender: (val: number) => rupiahFormat(val),
        },
      },
      {
        label: "Date",
        name: "created_at",
        options: {
          customBodyRender: (val: string) => dateFormat(val),
        },
      },
    ];
  }, []);
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
            <div className="flex justify-between">
              <Typography variant="h5">Gallery</Typography>
              <Button
                onClick={() => setShowUploadModal(!showUploadModal)}
                size="sm"
                style={{ width: "auto" }}
              >
                Upload
              </Button>
            </div>
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

          <Card className="my-4">
            <div className="w-full overflow-x-auto">
              <Typography variant="h5">Transactions</Typography>
              <BaseTable columns={columnSettings} data={transactions} />
            </div>
          </Card>
        </>
      )}

      <CampaignImageForm
        show={showUploadModal}
        closeHandler={() => setShowUploadModal(false)}
        onSubmit={handleUploadImage}
        loading={isUploading}
      />
    </MemberLayout>
  );
}

export default DetailCampaign;
