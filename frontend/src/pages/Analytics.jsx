import { useState } from "react"
import { BarChart3, Building2, IndianRupee, TrendingUp } from "lucide-react"

import AppShell from "../components/AppShell"
import MetricCard from "../components/MetricCard"
import PriceChart from "../charts/PriceChart"

const cityAnalytics = [
  { city: "Bangalore", avg: "INR 96L", growth: 21, rental: 6.2, risk: "Low" },
  { city: "Hyderabad", avg: "INR 88L", growth: 18, rental: 5.8, risk: "Low" },
  { city: "Pune", avg: "INR 72L", growth: 16, rental: 5.4, risk: "Medium" },
  { city: "Mumbai", avg: "INR 1.34Cr", growth: 14, rental: 4.9, risk: "Medium" },
  { city: "Chennai", avg: "INR 74L", growth: 13, rental: 4.6, risk: "Low" }
]

export default function Analytics() {
  const [query, setQuery] = useState("")

  const filteredCities = cityAnalytics.filter((item) =>
    item.city.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AppShell
      title="Market Analytics"
      subtitle="Compare city-level growth, pricing strength, and rental yield quality."
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Search cities..."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Annual Growth"
          value="+24%"
          change="Top city composite"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Metro Price"
          value="INR 85L"
          change="+6.1% month over month"
          icon={IndianRupee}
          tone="amber"
        />
        <MetricCard
          title="Analyzed Assets"
          value="12.4K"
          change="Across 18 markets"
          icon={Building2}
          tone="slate"
        />
        <MetricCard
          title="Model Accuracy"
          value="94%"
          change="Back-tested validation"
          icon={BarChart3}
        />
      </section>

      <section className="mt-4">
        <PriceChart />
      </section>

      <section className="mt-4 app-surface overflow-hidden rounded-lg">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-2xl font-black text-slate-950">
            City Performance Matrix
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ranked by appreciation, rental yield, and risk profile.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Average Value</th>
                <th className="px-5 py-3">Growth</th>
                <th className="px-5 py-3">Rental Yield</th>
                <th className="px-5 py-3">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCities.map((city) => (
                <tr key={city.city} className="bg-white">
                  <td className="px-5 py-4 font-black text-slate-950">
                    {city.city}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{city.avg}</td>
                  <td className="px-5 py-4 font-bold text-emerald-700">
                    +{city.growth}%
                  </td>
                  <td className="px-5 py-4 text-slate-600">{city.rental}%</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                      {city.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  )
}
