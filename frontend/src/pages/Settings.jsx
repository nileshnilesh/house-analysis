import { useState } from "react"
import { Bell, Mail, Moon, Save, Shield } from "lucide-react"

import AppShell from "../components/AppShell"

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "Nilesh",
    email: "nilesh@example.com",
    alerts: true,
    weeklyReport: true,
    darkExports: false,
    riskWarnings: true
  })

  const update = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }))
  }

  return (
    <AppShell
      title="Workspace Settings"
      subtitle="Manage profile details, market alerts, report preferences, and risk warnings."
      searchPlaceholder="Search settings..."
      action={
        <button
          type="button"
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
        >
          <Save size={18} />
          Save
        </button>
      }
    >
      <section className="grid gap-4 xl:grid-cols-[0.8fr_1fr]">
        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">Profile</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">
                Full name
              </span>
              <input
                value={settings.name}
                onChange={(event) => update("name", event.target.value)}
                className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">
                Email
              </span>
              <input
                type="email"
                value={settings.email}
                onChange={(event) => update("email", event.target.value)}
                className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
              />
            </label>
          </div>
        </div>

        <div className="app-surface rounded-lg p-5">
          <h2 className="text-2xl font-black text-slate-950">Preferences</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["alerts", "AI Notifications", Bell],
              ["weeklyReport", "Weekly Reports", Mail],
              ["darkExports", "Dark PDF Export", Moon],
              ["riskWarnings", "Risk Warnings", Shield]
            ].map(([field, label, Icon]) => (
              <label
                key={field}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
              >
                <span className="flex items-center gap-3 font-semibold text-slate-700">
                  <Icon size={18} className="text-teal-700" />
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={settings[field]}
                  onChange={(event) => update(field, event.target.checked)}
                  className="size-5 accent-teal-700"
                />
              </label>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  )
}
