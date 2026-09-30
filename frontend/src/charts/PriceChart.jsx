import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const data = [
  { month: "Jan", price: 62, rent: 28 },
  { month: "Feb", price: 68, rent: 30 },
  { month: "Mar", price: 72, rent: 31 },
  { month: "Apr", price: 78, rent: 34 },
  { month: "May", price: 84, rent: 36 },
  { month: "Jun", price: 91, rent: 39 },
  { month: "Jul", price: 96, rent: 41 },
  { month: "Aug", price: 101, rent: 43 }
]

export default function PriceChart({ compact = false, variant = "line" }) {
  const Chart = variant === "area" ? AreaChart : LineChart

  return (
    <div className="app-surface rounded-lg p-5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Real estate analytics
          </p>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Metro Market Trend
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Average asking price and rental yield movement
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-2xl font-black text-emerald-700">+24%</p>
          <p className="mt-1 text-xs font-medium text-emerald-700">
            YoY growth
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={compact ? 260 : 380}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 14 }} />
          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 14 }}
            tickFormatter={(value) => `${value}L`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#0f172a"
            }}
            formatter={(value, name) => [
              `INR ${value}L`,
              name === "price" ? "Avg price" : "Rent index"
            ]}
          />
          <Legend />

          {variant === "area" ? (
            <>
              <Area
                type="monotone"
                dataKey="price"
                stroke="#0f766e"
                fill="#99f6e4"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="rent"
                stroke="#b45309"
                fill="#fde68a"
                strokeWidth={3}
              />
            </>
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="price"
                stroke="#0f766e"
                strokeWidth={4}
                dot={{ r: 5, fill: "#0f766e", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="rent"
                stroke="#b45309"
                strokeWidth={3}
                dot={{ r: 4, fill: "#b45309", strokeWidth: 2 }}
              />
            </>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
