import { useEffect, useMemo, useState } from "react"
import { BarChart3, Bookmark, GitCompare, SlidersHorizontal } from "lucide-react"

import AppShell from "../components/AppShell"
import PropertyCard from "../components/PropertyCard"
import properties from "../data/properties"
import {
  estimateMonthlyRent,
  formatCurrency,
  getDealScore,
  getHoldingStrategy,
  getPricePerSqft
} from "../utils/propertyMetrics"

const cities = ["All", ...new Set(properties.map((property) => property.city))]

export default function Properties() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("All")
  const [minScore, setMinScore] = useState(88)
  const [sortBy, setSortBy] = useState("score")
  const [savedIds, setSavedIds] = useState(() => {
    const saved = localStorage.getItem("houseai-watchlist")
    return saved ? JSON.parse(saved) : []
  })
  const [compareIds, setCompareIds] = useState([])

  useEffect(() => {
    localStorage.setItem("houseai-watchlist", JSON.stringify(savedIds))
  }, [savedIds])

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        const matchesSearch = `${property.title} ${property.location} ${property.type}`
          .toLowerCase()
          .includes(query.toLowerCase())
        const matchesCity = city === "All" || property.city === city
        const matchesScore = property.aiScore >= minScore

        return matchesSearch && matchesCity && matchesScore
      })
      .sort((a, b) => {
        if (sortBy === "roi") return b.roi - a.roi
        if (sortBy === "price") return a.price - b.price
        return b.aiScore - a.aiScore
      })
  }, [city, minScore, query, sortBy])

  const comparison = useMemo(
    () => properties.filter((property) => compareIds.includes(property.id)),
    [compareIds]
  )

  const watchlistedProperties = useMemo(
    () => properties.filter((property) => savedIds.includes(property.id)),
    [savedIds]
  )

  const toggleSaved = (id) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    )
  }

  const toggleCompare = (id) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= 3) return [current[1], current[2], id]
      return [...current, id]
    })
  }

  return (
    <AppShell
      title="Investment Listings"
      subtitle="Filter AI-curated homes by city, score, price, and return potential."
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Search listings..."
    >
      <section className="app-surface rounded-lg p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-slate-950 p-3 text-white">
              <SlidersHorizontal size={20} />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Listing Controls
              </h2>
              <p className="text-sm text-slate-500">
                Showing {filteredProperties.length} qualified opportunities
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[760px]">
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold"
            >
              {cities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <span className="block text-xs font-semibold text-slate-500">
                Min AI score: {minScore}%
              </span>
              <input
                type="range"
                min="80"
                max="99"
                value={minScore}
                onChange={(event) => setMinScore(Number(event.target.value))}
                className="mt-1 w-full accent-teal-700"
              />
            </label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold"
            >
              <option value="score">Sort by AI score</option>
              <option value="roi">Sort by ROI</option>
              <option value="price">Sort by lowest price</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="app-surface rounded-lg p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-teal-50 p-3 text-teal-700">
                <GitCompare size={20} />
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Deal Comparison
                </h2>
                <p className="text-sm text-slate-500">
                  Select up to 3 listings for side-by-side underwriting
                </p>
              </div>
            </div>
            {compareIds.length > 0 && (
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {comparison.length ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Asset</th>
                    <th className="px-3 py-2">Deal score</th>
                    <th className="px-3 py-2">ROI</th>
                    <th className="px-3 py-2">Monthly rent</th>
                    <th className="px-3 py-2">Price/sqft</th>
                    <th className="px-3 py-2">Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparison.map((property) => (
                    <tr key={property.id} className="bg-white">
                      <td className="px-3 py-3 font-black text-slate-950">
                        {property.title}
                      </td>
                      <td className="px-3 py-3 font-bold text-teal-700">
                        {getDealScore(property)}%
                      </td>
                      <td className="px-3 py-3 text-emerald-700">
                        +{property.roi}%
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {formatCurrency(estimateMonthlyRent(property))}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {formatCurrency(getPricePerSqft(property))}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {getHoldingStrategy(property)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm font-semibold text-slate-500">
              Use the compare buttons below to build an investment shortlist.
            </div>
          )}
        </div>

        <aside className="app-surface rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-amber-50 p-3 text-amber-700">
              <Bookmark size={20} />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Saved Watchlist
              </h2>
              <p className="text-sm text-slate-500">
                {watchlistedProperties.length} tracked assets
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {watchlistedProperties.length ? (
              watchlistedProperties.map((property) => (
                <div
                  key={property.id}
                  className="rounded-lg border border-slate-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">
                        {property.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {property.city} | {getDealScore(property)}% score
                      </p>
                    </div>
                    <p className="font-black text-emerald-700">
                      +{property.roi}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold text-slate-500">
                Save listings to track them between sessions.
              </div>
            )}
          </div>
        </aside>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProperties.map((property) => (
          <div key={property.id} className="space-y-3">
            <PropertyCard
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
              saved={savedIds.includes(property.id)}
              onToggleSave={toggleSaved}
            />
            <button
              type="button"
              onClick={() => toggleCompare(property.id)}
              className={[
                "flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold transition",
                compareIds.includes(property.id)
                  ? "border-teal-300 bg-teal-50 text-teal-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              ].join(" ")}
            >
              <BarChart3 size={17} />
              {compareIds.includes(property.id) ? "In comparison" : "Compare deal"}
            </button>
          </div>
        ))}
      </section>
    </AppShell>
  )
}
