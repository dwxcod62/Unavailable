import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { DesignTokens } from "./styles/DesignTokens";

import { AnalyticsPage } from "./pages/AnalyticsPage";
import { GymLogPage } from "./pages/GymLogPage";
import { TransactionsPage } from "./pages/TransactionsPage";

export type PageKey = "spending" | "analytics" | "dashboard";

export default function AppBankio() {
    const [page, setPage] = useState<PageKey>("spending");

    return (
        <div className="min-h-screen w-full bg-[var(--bg-page)] text-slate-800 dark:text-slate-100">
            <DesignTokens />

            <div className="mx-auto max-w-[1400px] grid grid-cols-[260px,minmax(0,1fr)] gap-6 p-6">
                <Sidebar page={page} onNavigate={setPage} />

                <div className="flex flex-col gap-8">
                    {/* Header ở hàng đầu */}
                    <Header />

                    {page === "dashboard" && <GymLogPage />}
                    {page === "analytics" && <AnalyticsPage />}
                    {page === "spending" && <TransactionsPage />}
                </div>
            </div>
        </div>
    );
}
