import clsx from "clsx";
import { Typography } from "components/common";
import { BaseTable } from "components/common/table";
import { MemberLayout } from "components/layouts";
import React, { useEffect, useMemo, useState } from "react";
import { TransactionService } from "service/transaction_service";
import { ProjectType } from "service/types";
import { dateFormat } from "utils/date_format";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import { rupiahFormat } from "utils/number_format";

function TransactionList() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const response = await sendAndHandleInvalidToken(
        TransactionService.getUserTransaction
      );

      if (!active) return;

      setTransactions(response.data ?? []);
      setLoading(false);
    };
    fetchData();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnSettings = useMemo(() => {
    return [
      {
        label: "Created At",
        name: "created_at",
        options: {
          customBodyRender: (val: string) => dateFormat(val),
        },
      },
      {
        label: "Campaign",
        name: "campaign",
        options: {
          customBodyRender: (val: ProjectType) => val.name,
        },
      },
      {
        label: "Amount",
        name: "amount",
        options: {
          customBodyRender: (val: number) => rupiahFormat(val),
        },
      },
      {
        label: "Status",
        name: "status",
        options: {
          customBodyRender: (val: string) => {
            let background = "bg-red-500";
            if (val === "paid") background = "bg-success";
            if (val === "expired") background = "bg-secondary";
            return (
              <span
                className={clsx(
                  "inline-block p-1 rounded text-white font-medium text-center bg-opacity-90",
                  background
                )}
              >
                {val}
              </span>
            );
          },
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return (
    <MemberLayout title="Transaction List">
      <Typography variant="h4" className="font-medium">
        Transaction list
      </Typography>

      <div className="w-full bg-white p-4 mt-4">
        <div className="overflow-auto">
          <BaseTable
            loading={loading}
            data={transactions}
            columns={columnSettings}
          />
        </div>
      </div>
    </MemberLayout>
  );
}

export default TransactionList;
