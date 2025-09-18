import { BarChart } from "../components/charts/BarChart";
import { Donut } from "../components/charts/Donut";
import { KpiCard } from "../components/KpiCard";

function LegendRow({ label, amount, pct, dot }: { label: string; amount: string; pct: string; dot: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
                <span className="text-slate-700 font-medium">{label}</span>
            </div>
            <div className="text-slate-700">{amount}</div>
            <div className="text-slate-500">{pct}</div>
        </div>
    );
}

export function AnalyticsPage() {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl font-bold">Financial Insights Dashboard</h2>
                <div className="flex items-center gap-2">
                    <input
                        placeholder="Search item…"
                        className="rounded-lg border px-3 py-2 text-sm outline-none dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button className="btn">Export</button>
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard title="Total Income" tag="This Month" value="$5,200.00" delta="↑ 12%" deltaClass="text-emerald-600" />
                <KpiCard title="Total Expenses" tag="Last Month" value="$3,750.90" delta="↓ 6%" deltaClass="text-rose-600" />
                <KpiCard title="Revenue" tag="This Month" value="$6,742.40" delta="▲ $340" deltaClass="text-emerald-600" />
                <div className="box p-4 kpi" style={{ background: "#0f6b5f", color: "#e8fffa" }}>
                    <div className="flex items-center justify-between">
                        <h3>Available Savings</h3>
                        <span className="chip" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>
                            Top 20%
                        </span>
                    </div>
                    <div className="val text-white">$15,600</div>
                    <div className="text-white/80 text-sm">Savings percentage: 34% of total income</div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="box p-5">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">Expenditure Category</div>
                        <span className="tag">40% · 35% · 25%</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,200px] gap-6 mt-4 items-center">
                        <Donut valueA={40} valueB={35} valueC={25} />
                        <div className="grid gap-3">
                            <LegendRow label="Housing" amount="$2,500" pct="40%" dot="#0f6b5f" />
                            <LegendRow label="Transportation" amount="$1,860" pct="35%" dot="#9ec8be" />
                            <LegendRow label="Food & Dining" amount="$1,300" pct="25%" dot="#cfe6e0" />
                        </div>
                    </div>
                </div>
                <div className="box p-5">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">Monthly Financial</div>
                        <select className="border rounded-md px-2 py-1 text-sm">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                    </div>
                    <BarChart labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} values={[72, 48, 66, 54, 20, 65, 58]} max={80} />
                </div>
            </section>
        </>
    );
}
