"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ResumeProvider } from "@/context/ResumeContext";
import MaintenanceGate from "@/components/guards/MaintenanceGate";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ResumeProvider>
        <MaintenanceGate>{children}</MaintenanceGate>
      </ResumeProvider>
    </AuthProvider>
  );
}
