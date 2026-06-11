"use client";

import SectionCard from "../components/SectionCard";
import { getAuthHeaders } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const [dashboardData, setDashboardData] = useState({
    analytics: {
      total_resumes: 120,
      active_users: 45,
      templates_used: 2,
      templates: 2,
      weekly_resume_creation: [
        { week: "2026-18", count: 4 },
        { week: "2026-19", count: 6 },
        { week: "2026-20", count: 3 },
        { week: "2026-21", count: 8 },
        { week: "2026-22", count: 10 },
      ],
      most_used_template: [
        {
          template: "modern",
          usage_count: 7,
        },
        {
          template: "minimal",
          usage_count: 2,
        },
      ],
    },
    recentActivity: [
      {
        id: 1,
        action: "User Alex created a resume",
        timestamp: "2024-06-01 10:00",
        user_name: "Alex",
      },
      {
        id: 2,
        action: "Admin deleted resume #15",
        timestamp: "2024-06-01 09:30",
        user_name: "Admin",
      },
      {
        id: 3,
        action: "New user registered",
        timestamp: "2024-06-01 08:00",
        user_name: "Sam",
      },
    ],
  });
  //  "weekly_resume_creation": [
  //               {
  //                   "week": "2026-17",
  //                   "count": 12
  //               },
  //               {
  //                   "week": "2026-21",
  //                   "count": 5
  //               }
  //           ]
  //  "most_used_template": [
  //               {
  //                   "template": "modern",
  //                   "usage_count": 7
  //               },
  //               {
  //                   "template": "minimal",
  //                   "usage_count": 2
  //               }
  //           ],
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/index.php?type=dashboard", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Fetched dashboard data:", data.data);

          setDashboardData({
            analytics: {
              total_resumes: data.data.analytics.total_resumes || 0,

              active_users: data.data.analytics.active_users || 0,

              templates: data.data.analytics.templates || 0,

              templates_used: data.data.analytics.templates_used || 0,

              weekly_resume_creation:
                data.data.analytics.weekly_resume_creation || [],

              most_used_template: data.data.analytics.most_used_template || [],
            },

            recentActivity: data.data.activity || [],
          });
        } else {
          console.error("Failed to fetch dashboard data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Most Used Templates">
          <div className="space-y-3">
            {dashboardData.analytics.most_used_template.map(
              (template, index) => (
                <div key={index}>
                  {template.template} - {template.usage_count} uses
                </div>
              ),
            )}
          </div>
        </SectionCard>

        <WeeklyResumeChart
          data={dashboardData.analytics.weekly_resume_creation}
        />
      </div>
    </div>
  );
}

function WeeklyResumeChart({ data = [] }) {
  const chartData = data.map((item) => ({
    week: item.week,
    count: Number(item.count),
    label: `W${item.week.split("-")[1]}`,
  }));

  const totalResumes = chartData.reduce((sum, item) => sum + item.count, 0);

  const hasEnoughData = chartData.length > 1;

  return (
    <SectionCard title="Resume Creation Activity">
      <div className="space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-900">{totalResumes}</p>

            <p className="text-sm text-slate-500">Total resumes created</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">Weekly Trend</p>

            <p className="text-xs text-slate-400">
              Last {chartData.length} weeks
            </p>
          </div>
        </div>

        {/* Empty state */}
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400">
            No resume activity yet
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  domain={[0, "dataMax + 2"]}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                  formatter={(value) => [`${value} resumes`, "Created"]}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0f172a"
                  strokeWidth={3}
                  connectNulls={true}
                  dot={{
                    r: 5,
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Single point helper */}
            {!hasEnoughData && (
              <p className="text-center text-xs text-slate-400 mt-2">
                Need more weekly data to display a trend line
              </p>
            )}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
