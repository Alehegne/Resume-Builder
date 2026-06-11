"use client";

import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/context/AuthContext";
export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    analytics: {},
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8000/api/admin/index.php?type=dashboard", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDashboardData({
            analytics: data.data.analytics || {},
            recentActivity: data.data.activity,
          });
          setError(null);
        } else {
          setError(data.message || "Failed to load dashboard data");
        }
      })
      .catch((error) => {
        setError("Error loading dashboard: " + error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-slate-500 mt-2">Overview of your resume platform.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700">⚠️ {error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {(() => {
              const cards = [];

              const formatTitle = (k) =>
                k.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

              Object.entries(dashboardData.analytics).forEach(
                ([key, value]) => {
                  if (Array.isArray(value)) {
                    // For arrays (eg. most_used_template), render each item as its own stat
                    value.forEach((item, idx) => {
                      const title =
                        item.template ||
                        item.template_name ||
                        `${formatTitle(key)} ${idx + 1}`;
                      const val =
                        item.usage_count ?? item.count ?? JSON.stringify(item);
                      cards.push(
                        <StatCard
                          key={`${key}-${idx}`}
                          title={title}
                          value={val}
                        />,
                      );
                    });
                  } else if (value && typeof value === "object") {
                    // If it's an object with numeric properties, try to pick a sensible one
                    const val =
                      value.usage_count ?? value.count ?? JSON.stringify(value);
                    cards.push(
                      <StatCard
                        key={key}
                        title={formatTitle(key)}
                        value={val}
                      />,
                    );
                  } else {
                    cards.push(
                      <StatCard
                        key={key}
                        title={formatTitle(key)}
                        value={value}
                      />,
                    );
                  }
                },
              );

              return cards;
            })()}
          </div>

          <SectionCard title="Recent Activity">
            {dashboardData.recentActivity.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                No recent activity
              </p>
            ) : (
              <div className="space-y-4 text-sm">
                {dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-center ring-1 ring-slate-700/10 rounded-lg p-4"
                  >
                    <div>
                      <span className="font-medium">{activity.user_name}</span>{" "}
                      - {activity.action}
                    </div>
                    <div className="text-slate-500">{activity.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </>
      )}
    </div>
  );
}
