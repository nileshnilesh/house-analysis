import {
  Bath,
  BedDouble,
  Bookmark,
  Gauge,
  IndianRupee,
  MapPin,
  Ruler,
  ShieldCheck
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import {
  estimateMonthlyRent,
  formatCurrency,
  getDealScore,
  getInvestmentLabel
} from "../utils/propertyMetrics"

export default function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  rawPrice,
  roi,
  aiScore,
  beds,
  baths,
  sqft,
  risk,
  capRate,
  demand,
  occupancy,
  saved = false,
  onToggleSave
}) {
  const navigate = useNavigate()
  const property = { price: rawPrice, roi, aiScore, risk, capRate, demand, sqft }
  const dealScore = getDealScore(property)
  const monthlyRent = rawPrice ? estimateMonthlyRent(property) : null
  const scoreLabel = getInvestmentLabel(dealScore)

  return (
    <article className="app-surface overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3">
          <div className="rounded-md bg-white/90 px-3 py-2 text-sm font-black text-slate-950 shadow-sm">
            Deal {dealScore}%
          </div>
          {onToggleSave && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onToggleSave(id)
              }}
              className={[
                "flex size-10 items-center justify-center rounded-md border shadow-sm backdrop-blur transition",
                saved
                  ? "border-amber-200 bg-amber-100 text-amber-700"
                  : "border-white/70 bg-white/90 text-slate-700 hover:text-teal-700"
              ].join(" ")}
              aria-label={saved ? "Remove from watchlist" : "Save to watchlist"}
              title={saved ? "Remove from watchlist" : "Save to watchlist"}
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} />
              {location}
            </p>
          </div>
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
            +{roi}%
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <span className="rounded-md bg-teal-50 px-2.5 py-2 font-bold text-teal-800">
            {scoreLabel}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-2 font-semibold text-slate-700">
            AI {aiScore}%
          </span>
          <span className="rounded-md bg-amber-50 px-2.5 py-2 font-semibold text-amber-800">
            {occupancy || "Ready"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-sm text-slate-600">
          <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-2">
            <BedDouble size={15} />
            {beds}
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-2">
            <Bath size={15} />
            {baths}
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-2">
            <Ruler size={15} />
            {sqft}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Asking value</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{price}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <Gauge size={15} />
              {risk} risk | {capRate}% cap rate
            </p>
            {monthlyRent && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <IndianRupee size={15} />
                {formatCurrency(monthlyRent)} expected rent
              </p>
            )}
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <ShieldCheck size={15} />
              {demand || "High"} demand
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/property/${encodeURIComponent(title)}`)}
            className="rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}
