import { Avatar, Button, Typography } from "components/common";
import { CurrencyInput } from "components/common/input";
import React, { useState } from "react";
import { ProjectType } from "service/types";

interface CampaignInfoProps {
  campaign: ProjectType;
}

function CampaignInfo(props: CampaignInfoProps) {
  const { campaign } = props;
  const [nominal, setNominal] = useState(0);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleButtonClick = () => {
    if (nominal < 10000) {
      setError(true);
      setHelperText("Minimum donation is 10k");
      return;
    }
    setError(false);
    setHelperText("");
  };
  return (
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

      <Button onClick={handleButtonClick} block className="mt-4" rounded>
        Fund Now
      </Button>
    </div>
  );
}

export default CampaignInfo;
