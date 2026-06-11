"use client";

export const LoadingSkeleton = ({ rows = 3, columns = 2 }) => (
  <div className={`grid grid-cols-${columns} gap-4`}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="bg-slate-200 rounded-lg h-20 animate-pulse" />
    ))}
  </div>
);

export const ResumeListSkeleton = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white border rounded-lg p-4 space-y-2">
        <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse" />
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export const StatCardSkeleton = ({ count = 3 }) => (
  <div className="grid md:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white border rounded-lg p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-1/2 animate-pulse" />
        <div className="h-8 bg-slate-200 rounded w-2/3 animate-pulse" />
      </div>
    ))}
  </div>
);
