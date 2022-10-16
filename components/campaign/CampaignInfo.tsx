import { Avatar, Button, Typography } from "components/common";
import { CurrencyInput } from "components/common/input";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { TransactionService } from "service/transaction_service";
import { ProjectType } from "service/types";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

interface CampaignInfoProps {
  campaign: ProjectType;
}

function CampaignInfo(props: CampaignInfoProps) {
  const { campaign } = props;
  const [nominal, setNominal] = useState(0);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toastLoading, updateToast, showToast } = useToast();

  const send = useSendAndHandleInvalidToken();

  const handleButtonClick = async () => {
    if (nominal < 10000) {
      setError(true);
      setHelperText("Minimum amount is 10k");
      return;
    }
    setError(false);
    setHelperText("");

    const token = Cookies.get("token");
    if (!token) {
      showToast("Please, sign in first!", "error");
      router.push("/sign-in");
      return;
    }
    toastLoading();
    setLoading(true);

    const payload = {
      campaign_id: campaign.id,
      amount: nominal,
    };

    const response = await send(() =>
      TransactionService.createTransaction(payload)
    );

    const { data, meta } = response;
    if (meta.code != 200) {
      updateToast(meta.message, "error");
    } else {
      updateToast(meta.message, "success");
    }
    setLoading(false);
    setTimeout(() => {
      window.location = data.payment_url;
    }, 2000);
  };
  return (
    <div className="bg-white p-4 border border-gray-400 rounded-xl mt-4 lg:mt-0 sticky top-4">
      <Typography variant="body" className="mb-4">
        Project Leader:
      </Typography>
      <div className="flex mb-4">
        <Avatar className="w-14 h-14" src={campaign.user.image_url} />
        <div className="ml-4">
          <Typography variant="h5" className="font-medium">
            {campaign.user.name}
          </Typography>
          <Typography variant="small" className="text-gray-400">
            {new Intl.NumberFormat().format(campaign.backer_count)} backer
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

      <CurrencyInput
        label="Amount in Rp."
        labelClassName="text-black"
        defaultValue={nominal}
        onValueChange={(val) => setNominal(val)}
        error={error}
        helperText={helperText}
      />

      <Button
        onClick={handleButtonClick}
        block
        className="mt-4"
        rounded
        disabled={loading}
      >
        Fund Now
      </Button>
    </div>
  );
}

export default CampaignInfo;
