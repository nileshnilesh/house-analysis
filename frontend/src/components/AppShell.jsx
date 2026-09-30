import { NavLink, useNavigate } from "react-router-dom"
import {
  BarChart3,
  Bell,
  Brain,
  Building2,
  Home,
  LineChart,
  LogOut,
  Search,
  Settings,
  Sparkles
} from "lucide-react"

const navItems = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Listings", path: "/properties", icon: Building2 },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Predictions", path: "/predictions", icon: LineChart },
  { label: "Insights", path: "/insights", icon: Brain },
  { label: "Settings", path: "/settings", icon: Settings }
]

export default function AppShell({
  children,
  title = "HouseAI",
  subtitle = "Real estate intelligence workspace",
  action,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search markets, properties..."
}) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#eef2ec] text-slate-950 lg:flex">
      <aside className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col p-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 rounded-lg px-2 py-3 text-left"
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Sparkles size={21} />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">
                HouseAI
              </span>
              <span className="text-sm text-slate-500">
                Property decisions
              </span>
            </span>
          </button>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex min-w-fit items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto hidden rounded-lg bg-[#173b35] p-4 text-white lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
              Market pulse
            </p>
            <p className="mt-3 text-2xl font-black">+18.4%</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Weighted appreciation across tracked metro markets.
            </p>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#eef2ec]/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Real estate intelligence
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-slate-500 shadow-sm sm:w-80">
                <Search size={18} />
                <input
                  value={searchValue}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                />
              </label>

              <button
                type="button"
                className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell size={19} />
              </button>

              {action}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hidden size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 sm:flex"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={19} />
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
