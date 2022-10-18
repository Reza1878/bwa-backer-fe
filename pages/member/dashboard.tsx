import { Typography } from "components/common";
import { MemberLayout } from "components/layouts";

import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Legend,
  Bar,
  Tooltip,
  Label,
} from "recharts";
import { TransactionService } from "service/transaction_service";
import { dateFormat } from "utils/date_format";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import { rupiahFormat } from "utils/number_format";

function Dashboard() {
  const router = useRouter();

  const [transactionsSummary, setTransactionsSummary] = useState([]);

  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();

  const months = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const current = new Date();
      current.setDate(current.getDate() + 1);
      current.setMonth(current.getMonth() - i);
      arr.push(current);
    }
    arr.reverse();
    return arr;
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const dateStart = months[0].toISOString().slice(0, 10);
      const dateEnd = months[months.length - 1].toISOString().slice(0, 10);
      const response = await sendAndHandleInvalidToken(() =>
        TransactionService.getTransactionSummary(dateStart, dateEnd)
      );
      if (!active) return;
      setTransactionsSummary(response.data || []);
    };

    if (months.length > 0) fetchData();

    return () => {
      active = false;
    };
  }, [months, sendAndHandleInvalidToken]);

  const data = useMemo(() => {
    return months.map((month) => {
      const name = dateFormat(
        month.toLocaleDateString(),
        {
          month: "short",
          year: "numeric",
        },
        "en-EN"
      );
      console.log(name);
      const currentTransaction: { amount: number; period: string } =
        transactionsSummary.filter((item: any) => item.period === name)[0];
      return {
        name: dateFormat(month.toLocaleDateString(), {
          month: "short",
          year: "2-digit",
        }),
        amount: currentTransaction?.amount || 0,
      };
    });
  }, [months, transactionsSummary]);
  console.log(data);

  return (
    <MemberLayout title="Dashboard">
      <Typography variant="h4" className="font-medium">
        Overviews
      </Typography>
      <Typography className="text-gray-400">Monthly reports</Typography>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="w-full bg-white rounded-lg p-4 h-[450px]">
          <Typography variant="h5" className="font-medium">
            Your Contribution (
            {rupiahFormat(data.reduce((a, b) => a + b.amount, 0))})
          </Typography>
          <Typography variant="small" className="text-gray-400">
            Last 12 months
          </Typography>

          <ResponsiveContainer>
            <BarChart
              width={500}
              height={500}
              data={data}
              margin={{ left: 24, top: 24, bottom: 48 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(val: number) =>
                  new Intl.NumberFormat().format(val)
                }
              />
              <Tooltip formatter={(val: number) => rupiahFormat(val)} />
              <Legend />
              <Bar name="Amount" dataKey="amount" fill="#1ABC9C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="w-full bg-white rounded-lg p-4">
          <Typography variant="h6" className="font-medium">
            Last Payments
          </Typography>
          <Typography variant="small" className="text-gray-400">
            0 total orders on progress
          </Typography>

          <div className="overflow-auto">
            <table className="w-full border mt-4">
              <thead className="border-b">
                <tr>
                  <th className="p-2">Campaign Leader</th>
                  <th className="p-2">Campaign Name</th>
                  <th className="p-2">Fund</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center p-2">
                    No data available!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </MemberLayout>
  );
}

export default Dashboard;
