import { useState } from "react"
import { Download, ShieldCheck, TrendingUp, WalletCards } from "lucide-react"

import AppShell from "../components/AppShell"
import PredictionForm from "../components/PredictionForm"
import generateReport from "../utils/generateReport"

const checklist = [
  "Comparable sales variance below 8%",
  "Rental demand above city average",
  "Liquidity risk within target band",
  "Infrastructure signal detected"
]

export default function Predictions() {
  const [reportData, setReportData] = useState(null)

  return (
    <AppShell
      title="AI Price Prediction"
      subtitle="Estimate value, confidence range, and report-ready investment context from property inputs."
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
      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[620px] overflow-hidden rounded-lg bg-slate-950 text-white">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury residential interior"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
          <div className="relative flex min-h-[620px] flex-col justify-end p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Valuation lab
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              Turn raw property specs into an investment-ready estimate.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [TrendingUp, "Growth adjusted"],
                [ShieldCheck, "Risk screened"],
                [WalletCards, "Report ready"]
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <Icon size={20} className="text-emerald-200" />
                  <p className="mt-3 font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <PredictionForm onGenerateReport={setReportData} />

          <section className="app-surface rounded-lg p-5">
            <h2 className="text-2xl font-black text-slate-950">
              Underwriting Checks
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
                >
                  <span className="size-2 rounded-full bg-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  )
}
