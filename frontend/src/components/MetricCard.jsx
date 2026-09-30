export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "teal"
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700"
  }

  return (
    <section className="app-surface rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-700">
            {change}
          </p>
        </div>
        {Icon && (
          <span className={`rounded-lg p-3 ${tones[tone]}`}>
            <Icon size={22} />
          </span>
        )}
      </div>
    </section>
  )
}
