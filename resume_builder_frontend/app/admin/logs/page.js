"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { getAuthHeaders } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import SectionCard from "../components/SectionCard";

const API = "http://localhost:8000/api/logs/logs.php";

const LEVEL_STYLES = {
  INFO: "bg-blue-100 text-blue-800",
  WARNING: "bg-yellow-100 text-yellow-800",
  ERROR: "bg-red-100 text-red-800",
  CRITICAL: "bg-purple-100 text-purple-800",
};
const CAT_STYLES = {
  AUTH: "bg-green-100 text-green-800",
  RESUME: "bg-cyan-100 text-cyan-800",
  ERROR: "bg-red-100 text-red-800",
  SECURITY: "bg-orange-100 text-orange-800",
  SYSTEM: "bg-slate-100 text-slate-800",
};
const CATEGORIES = ["", "AUTH", "RESUME", "ERROR", "SECURITY", "SYSTEM"];
const LEVELS = ["", "INFO", "WARNING", "ERROR", "CRITICAL"];

function getToken() {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "{}")?.token ?? "";
  } catch {
    return "";
  }
}

const MetricCard = memo(function MetricCard({
  label,
  value,
  color = "text-slate-900",
  icon,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
      {icon && <span className="text-2xl">{icon}</span>}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className={`text-2xl font-bold ${color}`}>{value ?? "—"}</p>
      </div>
    </div>
  );
});

const LogRow = memo(function LogRow({ log }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyMeta = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(log.metadata ?? {}, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-b border-slate-100 hover:bg-slate-50">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-4 py-3 grid grid-cols-[155px_80px_90px_150px_1fr_70px_125px] gap-2 items-center text-sm"
      >
        <span className="text-slate-500 font-mono text-xs truncate">
          {log.timestamp?.replace("T", " ").replace("Z", "")}
        </span>
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_STYLES[log.level] ?? "bg-slate-100 text-slate-700"}`}
        >
          {log.level}
        </span>
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${CAT_STYLES[log.category] ?? "bg-slate-100 text-slate-700"}`}
        >
          {log.category}
        </span>
        <span className="font-mono text-xs text-slate-700 truncate">
          {log.action}
        </span>
        <span className="text-slate-600 truncate">{log.message}</span>
        <span className="text-slate-500 text-xs">{log.user_id ?? "—"}</span>
        <span className="text-slate-400 font-mono text-xs truncate">
          {log.ip_address}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 bg-slate-50 border-t border-slate-100 text-xs space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 mb-1">Request</p>
              <p className="font-mono text-slate-700">
                {log.http_method} {log.request_url}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">User Agent</p>
              <p className="text-slate-600 truncate">{log.user_agent ?? "—"}</p>
            </div>
          </div>
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-slate-400">Metadata</p>
                <button
                  onClick={copyMeta}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  {copied ? "✓ Copied" : "Copy JSON"}
                </button>
              </div>
              <pre className="bg-slate-900 text-green-400 rounded p-3 overflow-x-auto text-xs">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          )}
          {log.metadata?.stack_trace && (
            <div>
              <p className="text-slate-400 mb-1">Stack Trace</p>
              <pre className="bg-red-950 text-red-300 rounded p-3 overflow-x-auto text-xs">
                {log.metadata.stack_trace}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

function Skeleton() {
  return (
    <div className="animate-pulse space-y-2 p-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-10 bg-slate-200 rounded" />
      ))}
    </div>
  );
}

export default function LogsPage() {
  useAuth();

  const [filters, setFilters] = useState({
    category: "",
    level: "",
    search: "",
    user_id: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    per_page: 50,
    total_pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page,
          per_page: 50,
          sort: "desc",
        });
        Object.entries(filters).forEach(([k, v]) => {
          if (v) params.set(k, v);
        });
        const res = await fetch(`${API}?${params}`, {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs);
          setPagination(data.pagination);
        } else {
          setError(data.message ?? "Failed to load logs");
        }
      } catch (e) {
        setError("Network error: " + e.message);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch(`${API}?metrics=1`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) setMetrics(data.metrics);
    } catch (_) {}
  }, []);

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const download = (fmt) => {
    const params = new URLSearchParams({
      download: "1",
      format: fmt,
      token: getToken(),
    });
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    window.open(`${API}?${params}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Logs</h1>
          <p className="text-slate-500 text-sm mt-1">
            {pagination.total} entries
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => download("json")}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            ↓ JSON
          </button>
          <button
            onClick={() => download("csv")}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            ↓ CSV
          </button>
          <button
            onClick={() => fetchLogs(pagination.page)}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            ↺ Refresh
          </button>
        </div>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <MetricCard
            label="Total Today"
            value={metrics.total_today}
            icon="📋"
          />
          <MetricCard
            label="Errors"
            value={metrics.errors_today}
            icon="🔴"
            color="text-red-600"
          />
          <MetricCard
            label="Warnings"
            value={metrics.warnings_today}
            icon="🟡"
            color="text-yellow-600"
          />
          <MetricCard
            label="Active Users"
            value={metrics.active_users}
            icon="👤"
            color="text-blue-600"
          />
          <MetricCard
            label="Failed Logins"
            value={metrics.failed_logins}
            icon="🔒"
            color="text-orange-600"
          />
          <MetricCard
            label="Exports"
            value={metrics.exports_today}
            icon="📤"
            color="text-cyan-600"
          />
        </div>
      )}

      <SectionCard title="Filters">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c || "All Categories"}
              </option>
            ))}
          </select>
          <select
            value={filters.level}
            onChange={(e) =>
              setFilters((f) => ({ ...f, level: e.target.value }))
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l || "All Levels"}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters((f) => ({ ...f, date: e.target.value }))
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="User ID"
            value={filters.user_id}
            onChange={(e) =>
              setFilters((f) => ({ ...f, user_id: e.target.value }))
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Search action, message, IP…"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            className="col-span-2 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => fetchLogs(1)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={() =>
              setFilters({
                category: "",
                level: "",
                search: "",
                user_id: "",
                date: new Date().toISOString().slice(0, 10),
              })
            }
            className="px-4 py-2 border border-slate-300 text-sm rounded-lg hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Log Feed">
        <div className="grid grid-cols-[155px_80px_90px_150px_1fr_70px_125px] gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          <span>Timestamp</span>
          <span>Level</span>
          <span>Category</span>
          <span>Action</span>
          <span>Message</span>
          <span>User</span>
          <span>IP</span>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {loading ? (
            <Skeleton />
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : logs.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No logs found.</div>
          ) : (
            logs.map((log) => (
              <LogRow
                key={`${log.timestamp}|${log.action}|${log.user_id ?? ""}|${log.ip_address ?? ""}${Math.random()}`}
                log={log}
              />
            ))
          )}
        </div>

        {pagination.total_pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-sm text-slate-600">
            <span>
              Showing {(pagination.page - 1) * pagination.per_page + 1}–
              {Math.min(
                pagination.page * pagination.per_page,
                pagination.total,
              )}{" "}
              of {pagination.total}
            </span>
            <div className="flex gap-1">
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchLogs(pagination.page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-slate-50"
              >
                ‹ Prev
              </button>
              {[...Array(Math.min(5, pagination.total_pages))].map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => fetchLogs(p)}
                    className={`px-3 py-1 border rounded ${pagination.page === p ? "bg-blue-600 text-white border-blue-600" : "hover:bg-slate-50"}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                disabled={pagination.page >= pagination.total_pages}
                onClick={() => fetchLogs(pagination.page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-slate-50"
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
