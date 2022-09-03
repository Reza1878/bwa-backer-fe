import { Typography } from "components/common";
import { MemberLayout } from "components/layouts";

import { useRouter } from "next/router";
import React from "react";

function Dashboard() {
  const router = useRouter();

  return (
    <MemberLayout title="Dashboard">
      <Typography variant="h4" className="font-medium">
        Overviews
      </Typography>
      <Typography className="text-gray-400">Monthly reports</Typography>

      <div className="w-full flex flex-wrap mt-4">
        <div className="container bg-white rounded-lg w-full lg:w-2/3 p-4">
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
        </div>
      </div>
    </MemberLayout>
  );
}

export default Dashboard;
