import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  ClipboardCheck,
  Gauge,
  IndianRupee,
  Landmark,
  MapPin,
  Ruler,
  ShieldCheck,
  Timer,
  TrendingUp
} from "lucide-react"

import AppShell from "../components/AppShell"
import properties from "../data/properties"
import {
  estimateMonthlyRent,
  formatCurrency,
  getDealScore,
  getHoldingStrategy,
  getInvestmentLabel,
  getPricePerSqft
} from "../utils/propertyMetrics"

export default function PropertyDetails() {
  const { title } = useParams()
  const navigate = useNavigate()

  const property = useMemo(() => {
    const decodedTitle = decodeURIComponent(title || "")
    return (
      properties.find((item) => item.title === decodedTitle) || properties[0]
    )
  }, [title])

  const comparables = properties
    .filter((item) => item.city === property.city && item.id !== property.id)
    .slice(0, 3)
  const dealScore = getDealScore(property)
  const monthlyRent = estimateMonthlyRent(property)
  const pricePerSqft = getPricePerSqft(property)

  return (
    <AppShell
      title={property.title}
      subtitle={`${property.location} | ${property.type} | AI score ${property.aiScore}%`}
      searchPlaceholder="Search property details..."
      action={
        <button
          type="button"
          onClick={() => navigate("/properties")}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-slate-400"
        >
          <ArrowLeft size={18} />
          Listings
        </button>
      }
    >
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-hidden rounded-lg bg-slate-950">
          <img
            src={property.image}
            alt={property.title}
            className="h-[420px] w-full object-cover opacity-90"
          />
        </div>

        <aside className="app-surface rounded-lg p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Investment snapshot
          </p>
          <p className="mt-3 text-4xl font-black text-slate-950">
            {property.displayPrice}
          </p>
          <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-800">
                  {getInvestmentLabel(dealScore)}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {getHoldingStrategy(property)} strategy
                </p>
              </div>
              <p className="text-3xl font-black text-teal-800">
                {dealScore}%
              </p>
            </div>
          </div>
          <p className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin size={17} />
            {property.location}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              [BedDouble, "Bedrooms", property.beds],
              [Bath, "Bathrooms", property.baths],
              [Ruler, "Sqft", property.sqft],
              [Gauge, "AI score", `${property.aiScore}%`],
              [IndianRupee, "Monthly rent", formatCurrency(monthlyRent)],
              [Landmark, "Price/sqft", formatCurrency(pricePerSqft)]
            ].map(([Icon, label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <Icon size={18} className="text-teal-700" />
                <p className="mt-3 text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-xl font-black text-slate-950">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Property Overview
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-slate-600">
            This listing is screened for appreciation, rental demand, location
            liquidity, and downside risk. The current profile favors a
            medium-term holding strategy with measured upside from local
            infrastructure growth and stable end-user demand.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["Expected ROI", `+${property.roi}%`],
              ["Risk level", property.risk],
              ["Cap rate", `${property.capRate}%`],
              ["Demand", property.demand],
              ["Occupancy", property.occupancy],
              ["Appreciation", `+${property.appreciation}%`]
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Due Diligence
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              [ClipboardCheck, "Legal status", property.legalStatus],
              [ShieldCheck, "Builder grade", property.builderGrade],
              [Timer, "Exit window", property.exitWindow],
              [TrendingUp, "Transit signal", property.transit]
            ].map(([Icon, label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <Icon size={18} className="text-teal-700" />
                <p className="mt-3 text-sm text-slate-500">{label}</p>
                <p className="mt-1 font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="app-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-amber-50 p-3 text-amber-700">
              <Building2 size={20} />
            </span>
            <div>
              <h2 className="font-black text-slate-950">Comparable Assets</h2>
              <p className="text-sm text-slate-500">{property.city} market</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {(comparables.length ? comparables : properties.slice(0, 3)).map(
              (item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    navigate(`/property/${encodeURIComponent(item.title)}`)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-teal-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>
                      <span className="block font-bold text-slate-950">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-500">
                        {item.displayPrice}
                      </span>
                    </span>
                    <span className="font-black text-emerald-700">
                      +{item.roi}%
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </AppShell>
  )
}
