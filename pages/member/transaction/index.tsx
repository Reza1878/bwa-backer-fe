import { Typography } from "components/common";
import { BaseTable } from "components/common/table";
import { MemberLayout } from "components/layouts";
import React, { useEffect, useMemo, useState } from "react";
import { TransactionService } from "service/transaction_service";
import { ProjectType } from "service/types";

function TransactionList() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const response = await TransactionService.getUserTransaction();

      if (!active) return;

      setTransactions(response.data);
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
        label: "Created At",
        name: "created_at",
        options: {
          customBodyRender: (val: string) => val.slice(0, 10),
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
          customBodyRender: (val: number) =>
            new Intl.NumberFormat().format(val),
        },
      },
      {
        label: "Status",
        name: "status",
        options: {
          customBodyRender: (val: string) => {
            return (
              <span className="inline-block p-1 rounded bg-red-500 text-white text-center">
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
