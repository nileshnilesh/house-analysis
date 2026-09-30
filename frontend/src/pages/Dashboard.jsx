import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowUpRight,
  Building2,
  Download,
  IndianRupee,
  LineChart,
  ShieldCheck
} from "lucide-react"

import AppShell from "../components/AppShell"
import MetricCard from "../components/MetricCard"
import PriceChart from "../charts/PriceChart"
import PropertyCard from "../components/PropertyCard"
import PredictionForm from "../components/PredictionForm"
import generateReport from "../utils/generateReport"
import properties from "../data/properties"

const markets = [
  { city: "Bangalore", growth: 21, inventory: "Tight", sentiment: "Buy" },
  { city: "Hyderabad", growth: 18, inventory: "Balanced", sentiment: "Buy" },
  { city: "Pune", growth: 16, inventory: "Balanced", sentiment: "Watch" },
  { city: "Mumbai", growth: 14, inventory: "Tight", sentiment: "Hold" }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [reportData, setReportData] = useState(null)
  const [query, setQuery] = useState("")

  const featured = useMemo(
    () =>
      properties
        .filter((property) =>
          `${property.title} ${property.location} ${property.type}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 3),
    [query]
  )

  const portfolioValue = properties.reduce(
    (total, property) => total + property.price,
    0
  )

  return (
    <AppShell
      title="Smart Price Dashboard"
      subtitle="Monitor market movement, compare investment-ready properties, and generate AI valuation reports."
      searchValue={query}
      onSearchChange={setQuery}
      action={
        <button
          type="button"
          onClick={() => {
            if (!reportData) {
              alert("Please make a prediction first")
              return
            }

            generateReport(reportData)
          }}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
        >
          <Download size={18} />
          Report
        </button>
      }
    >
      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-slate-950 text-white">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop"
            alt="Modern residential home"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />
          <div className="relative flex min-h-[360px] flex-col justify-between p-6 sm:p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Investor command center
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Find the next high-confidence property move.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                HouseAI blends predictive pricing, rental yield signals, and
                market risk scoring into a single decision workspace.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Tracked value", `INR ${(portfolioValue / 10000000).toFixed(1)} Cr`],
                ["Avg AI score", "94%"],
                ["Hot markets", "12"]
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-sm text-slate-300">{label}</p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="app-surface rounded-lg p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Decision queue
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Today&apos;s watchlist
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-slate-300"
              aria-label="Open listings"
              title="Open listings"
            >
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {properties.slice(0, 4).map((property) => (
              <button
                type="button"
                key={property.id}
                onClick={() =>
                  navigate(`/property/${encodeURIComponent(property.title)}`)
                }
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-teal-300"
              >
                <span>
                  <span className="block font-bold text-slate-950">
                    {property.title}
                  </span>
                  <span className="text-sm text-slate-500">
                    {property.location}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-black text-emerald-700">
                    +{property.roi}%
                  </span>
                  <span className="text-xs text-slate-500">
                    ROI outlook
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Properties"
          value="12,450"
          change="+9.8% this quarter"
          icon={Building2}
        />
        <MetricCard
          title="Average Price"
          value="INR 85L"
          change="+6.1% this month"
          icon={IndianRupee}
          tone="amber"
        />
        <MetricCard
          title="Market Growth"
          value="+14%"
          change="Metro composite index"
          icon={LineChart}
        />
        <MetricCard
          title="Risk Screened"
          value="1,240"
          change="88 flagged as low risk"
          icon={ShieldCheck}
          tone="slate"
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_380px]">
        <PriceChart variant="area" />

        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Top Market Signals
          </h2>
          <div className="mt-5 space-y-3">
            {markets.map((market) => (
              <div
                key={market.city}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-black text-slate-950">{market.city}</p>
                  <p className="font-black text-emerald-700">
                    +{market.growth}%
                  </p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-teal-700"
                    style={{ width: `${Math.min(market.growth * 4, 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  {market.inventory} inventory | {market.sentiment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <PredictionForm onGenerateReport={setReportData} compact />

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                AI curated
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Recommended Properties
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-slate-400"
            >
              View all
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.image}
                title={property.title}
                location={property.location}
                price={property.displayPrice}
                rawPrice={property.price}
                roi={property.roi}
                aiScore={property.aiScore}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                risk={property.risk}
                capRate={property.capRate}
                demand={property.demand}
                occupancy={property.occupancy}
              />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  )
}
