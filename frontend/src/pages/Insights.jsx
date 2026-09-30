import { Brain, Building2, MapPin, TrendingUp, WalletCards } from "lucide-react"

import AppShell from "../components/AppShell"

const insightCards = [
  {
    title: "Growth Corridors",
    value: "+24%",
    detail: "Airport and IT corridor micro-markets continue to lead demand.",
    icon: TrendingUp
  },
  {
    title: "Buyer Liquidity",
    value: "High",
    detail: "Mid-premium inventory is moving fastest in end-user locations.",
    icon: WalletCards
  },
  {
    title: "Model Confidence",
    value: "94%",
    detail: "Back-tested estimates remain strongest for 1,000 to 4,500 sqft.",
    icon: Brain
  }
]

const cities = [
  ["Bangalore, Karnataka", "+21%", "Low risk"],
  ["Hyderabad, Telangana", "+18%", "Low risk"],
  ["Pune, Maharashtra", "+16%", "Medium risk"],
  ["Mumbai, Maharashtra", "+14%", "Medium risk"],
  ["Chennai, Tamil Nadu", "+13%", "Low risk"]
]

export default function Insights() {
  return (
    <AppShell
      title="AI Insights Hub"
      subtitle="A concise view of demand, pricing, and investment signals across high-growth Indian markets."
      searchPlaceholder="Search insights..."
    >
      <section className="relative min-h-[360px] overflow-hidden rounded-lg bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop"
          alt="Urban skyline"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
        <div className="relative max-w-4xl p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Signal brief
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Premium housing demand is shifting toward connected suburbs.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-200">
            The strongest opportunities combine job-center access, constrained
            supply, and improving rental depth.
          </p>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {insightCards.map((card) => {
          const Icon = card.icon

          return (
            <article key={card.title} className="app-surface rounded-lg p-5">
              <span className="inline-flex rounded-lg bg-teal-50 p-3 text-teal-700">
                <Icon size={22} />
              </span>
              <h2 className="mt-4 text-xl font-black text-slate-950">
                {card.title}
              </h2>
              <p className="mt-3 text-4xl font-black text-slate-950">
                {card.value}
              </p>
              <p className="mt-3 leading-6 text-slate-500">{card.detail}</p>
            </article>
          )
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="app-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-amber-50 p-3 text-amber-700">
              <Building2 size={20} />
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Strategic Investment Thesis
              </h2>
              <p className="text-sm text-slate-500">
                High-confidence pattern detected
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-4xl leading-7 text-slate-600">
            Assets near employment corridors are outperforming broader city
            averages because rental demand and resale liquidity are reinforcing
            each other. Lower-risk opportunities currently appear in compact
            premium units, transit-linked family apartments, and villa clusters
            with limited launch supply.
          </p>
        </div>

        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Hot Investment Cities
          </h2>
          <div className="mt-5 space-y-3">
            {cities.map(([city, growth, risk]) => (
              <div
                key={city}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-bold text-slate-950">
                    <MapPin size={17} className="text-teal-700" />
                    {city}
                  </p>
                  <p className="font-black text-emerald-700">{growth}</p>
                </div>
                <p className="mt-2 text-sm text-slate-500">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  )
}
