import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import {
  Bath,
  BedDouble,
  Building2,
  Calculator,
  Car,
  Landmark,
  Ruler,
  Sparkles,
  Trash2
} from "lucide-react"

const cityMultipliers = {
  Hyderabad: 1.03,
  Mumbai: 1.18,
  Bangalore: 1.12,
  Pune: 0.98,
  Chennai: 0.94,
  "Delhi NCR": 1.08
}

const formatPrice = (value) => `INR ${Number(value).toLocaleString("en-IN")}`

const rentYieldByCity = {
  Hyderabad: 0.058,
  Mumbai: 0.049,
  Bangalore: 0.062,
  Pune: 0.054,
  Chennai: 0.046,
  "Delhi NCR": 0.052
}

function localEstimate({ bedrooms, bathrooms, sqft, city, parking, age }) {
  const baseRate = 7200
  const cityFactor = cityMultipliers[city] ?? 1
  const bedroomPremium = Number(bedrooms) * 175000
  const bathPremium = Number(bathrooms) * 125000
  const parkingPremium = parking ? 350000 : 0
  const ageDiscount = Math.max(Number(age), 0) * 55000

  return Math.max(
    Number(sqft) * baseRate * cityFactor +
      bedroomPremium +
      bathPremium +
      parkingPremium -
      ageDiscount,
    1500000
  )
}

export default function PredictionForm({ onGenerateReport, compact = false }) {
  const [form, setForm] = useState({
    bedrooms: "3",
    bathrooms: "2",
    sqft: "1650",
    city: "Bangalore",
    parking: true,
    age: "4",
    downPayment: "20",
    interestRate: "8.4",
    tenure: "20"
  })
  const [price, setPrice] = useState(null)
  const [source, setSource] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("houseai-predictions")
    return saved ? JSON.parse(saved) : []
  })

  const confidence = useMemo(() => {
    const sqft = Number(form.sqft)
    if (!sqft) return 84
    if (sqft >= 1000 && sqft <= 4500) return 94
    return 88
  }, [form.sqft])

  const finance = useMemo(() => {
    if (!price) return null

    const downPaymentPercent = Number(form.downPayment) || 20
    const annualRate = Number(form.interestRate) || 8.4
    const tenureYears = Number(form.tenure) || 20
    const loanAmount = Math.max(price * (1 - downPaymentPercent / 100), 0)
    const monthlyRate = annualRate / 100 / 12
    const months = tenureYears * 12
    const emi =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * (1 + monthlyRate) ** months) /
          ((1 + monthlyRate) ** months - 1)
        : loanAmount / months
    const estimatedRent = Math.round(
      (price * (rentYieldByCity[form.city] || 0.052)) / 12
    )

    return {
      downPayment: Math.round(price * (downPaymentPercent / 100)),
      loanAmount: Math.round(loanAmount),
      emi: Math.round(emi),
      estimatedRent,
      pricePerSqft: Math.round(price / Number(form.sqft || 1)),
      rentCoverage: Math.round((estimatedRent / emi) * 100)
    }
  }, [form.city, form.downPayment, form.interestRate, form.sqft, form.tenure, price])

  useEffect(() => {
    localStorage.setItem("houseai-predictions", JSON.stringify(history))
  }, [history])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handlePrediction(event) {
    event.preventDefault()

    const payload = {
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft_living: Number(form.sqft)
    }

    if (!payload.bedrooms || !payload.bathrooms || !payload.sqft_living) {
      alert("Please enter bedrooms, bathrooms, and square feet")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", payload)
      const predictedPrice = Number(response.data.predicted_price)
      savePrediction(predictedPrice, "API model")
    } catch (error) {
      console.log(error)
      savePrediction(localEstimate(form), "Local estimate")
    } finally {
      setLoading(false)
    }
  }

  function savePrediction(predictedPrice, predictionSource) {
    const roundedPrice = Math.round(predictedPrice)
    const reportPayload = {
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft: Number(form.sqft),
      city: form.city,
      parking: form.parking,
      age: Number(form.age),
      confidence,
      price: roundedPrice,
      downPaymentPercent: Number(form.downPayment),
      interestRate: Number(form.interestRate),
      tenure: Number(form.tenure)
    }

    setPrice(roundedPrice)
    setSource(predictionSource)
    onGenerateReport?.(reportPayload)
    setHistory((prev) => [
      {
        ...reportPayload,
        predicted: roundedPrice,
        createdAt: new Date().toLocaleString()
      },
      ...prev
    ].slice(0, 6))
  }

  const lowRange = price ? Math.round(price * 0.94) : null
  const highRange = price ? Math.round(price * 1.07) : null

  return (
    <section className="app-surface rounded-lg p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          AI property estimation
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          Predict Property Value
        </h2>
        {!compact && (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Estimate a property value with the backend model, with a local
            valuation fallback for uninterrupted analysis.
          </p>
        )}
      </div>

      <form onSubmit={handlePrediction} className="grid gap-3 sm:grid-cols-2">
        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <BedDouble size={16} />
            Bedrooms
          </span>
          <input
            type="number"
            min="1"
            value={form.bedrooms}
            onChange={(event) => updateField("bedrooms", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Bath size={16} />
            Bathrooms
          </span>
          <input
            type="number"
            min="1"
            value={form.bathrooms}
            onChange={(event) => updateField("bathrooms", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Ruler size={16} />
            Square feet
          </span>
          <input
            type="number"
            min="250"
            value={form.sqft}
            onChange={(event) => updateField("sqft", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Building2 size={16} />
            City
          </span>
          <select
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2"
          >
            {Object.keys(cityMultipliers).map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 text-sm font-semibold text-slate-600">
            Property age
          </span>
          <input
            type="number"
            min="0"
            value={form.age}
            onChange={(event) => updateField("age", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Car size={16} />
            Parking
          </span>
          <input
            type="checkbox"
            checked={form.parking}
            onChange={(event) => updateField("parking", event.target.checked)}
            className="size-5 accent-teal-700"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Landmark size={16} />
            Down payment %
          </span>
          <input
            type="number"
            min="5"
            max="80"
            value={form.downPayment}
            onChange={(event) => updateField("downPayment", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Calculator size={16} />
            Interest rate %
          </span>
          <input
            type="number"
            min="1"
            step="0.1"
            value={form.interestRate}
            onChange={(event) => updateField("interestRate", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="rounded-lg border border-slate-200 bg-white p-3">
          <span className="mb-2 text-sm font-semibold text-slate-600">
            Loan tenure
          </span>
          <select
            value={form.tenure}
            onChange={(event) => updateField("tenure", event.target.value)}
            className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2"
          >
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
          </select>
        </label>

        <button
          disabled={loading}
          className="col-span-full mt-1 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60"
        >
          <Sparkles size={18} />
          {loading ? "Predicting..." : "Predict Price"}
        </button>
      </form>

      <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-4">
        <p className="text-sm font-semibold text-teal-800">
          Estimated Property Value
        </p>
        <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {price ? formatPrice(price) : "INR --"}
        </p>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
          <span>{price ? `${formatPrice(lowRange)} low` : "Range pending"}</span>
          <span>{confidence}% confidence</span>
          <span>{source || "Ready"}</span>
        </div>
        {price && (
          <p className="mt-2 text-sm font-medium text-slate-600">
            Upper range: {formatPrice(highRange)}
          </p>
        )}
      </div>

      {finance && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Monthly EMI", formatPrice(finance.emi)],
            ["Expected rent", formatPrice(finance.estimatedRent)],
            ["Down payment", formatPrice(finance.downPayment)],
            ["Price per sqft", formatPrice(finance.pricePerSqft)]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
            </div>
          ))}
          <div className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Rent-to-EMI coverage
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  A quick affordability signal for leveraged investors.
                </p>
              </div>
              <p className="text-2xl font-black text-amber-800">
                {finance.rentCoverage}%
              </p>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-black text-slate-950">Recent Predictions</h3>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 transition hover:text-rose-700"
              aria-label="Clear prediction history"
              title="Clear prediction history"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={`${item.createdAt}-${index}`}
                className="rounded-lg border border-slate-200 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">
                      {item.city} | {item.bedrooms}B/{item.bathrooms}B
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.sqft} sqft | {item.createdAt}
                    </p>
                  </div>
                  <p className="text-right font-black text-teal-700">
                    {formatPrice(item.predicted)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
