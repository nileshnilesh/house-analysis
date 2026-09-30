import { useNavigate } from "react-router-dom"
import { ArrowRight, Building2 } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  return (
    <main className="grid min-h-screen bg-[#eef2ec] text-slate-950 lg:grid-cols-[1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop"
          alt="Modern home exterior"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            HouseAI
          </p>
          <h1 className="mt-4 max-w-xl text-5xl font-black tracking-tight">
            A cleaner way to read the housing market.
          </h1>
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Building2 size={22} />
            </span>
            <div>
              <h1 className="text-3xl font-black">HouseAI</h1>
              <p className="text-slate-500">Real estate intelligence</p>
            </div>
          </div>

          <div className="app-surface rounded-lg p-6">
            <h2 className="text-2xl font-black text-slate-950">
              Welcome back
            </h2>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-600">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="nilesh@example.com"
                  className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-600">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3"
                />
              </label>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-teal-800"
              >
                Login
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-bold text-teal-700"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
