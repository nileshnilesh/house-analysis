import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Signup() {
  const navigate = useNavigate()

  return (
    <main className="grid min-h-screen bg-[#eef2ec] text-slate-950 lg:grid-cols-[0.9fr_1fr]">
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Sparkles size={22} />
            </span>
            <div>
              <h1 className="text-3xl font-black">Create Account</h1>
              <p className="text-slate-500">Start your HouseAI workspace</p>
            </div>
          </div>

          <div className="app-surface rounded-lg p-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="focus-ring w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
              />
              <input
                type="email"
                placeholder="Email address"
                className="focus-ring w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
              />
              <input
                type="password"
                placeholder="Password"
                className="focus-ring w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
              />

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-teal-800"
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-bold text-teal-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1800&auto=format&fit=crop"
          alt="Premium apartment lobby"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Investor ready
          </p>
          <h2 className="mt-4 max-w-xl text-5xl font-black tracking-tight">
            Track, estimate, and compare property opportunities.
          </h2>
        </div>
      </section>
    </main>
  )
}
