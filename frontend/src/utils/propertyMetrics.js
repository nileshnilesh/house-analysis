export const formatCurrency = (value) => {
  if (!Number.isFinite(Number(value))) return "INR --"

  return `INR ${Number(value).toLocaleString("en-IN")}`
}

export const formatCompactPrice = (value) => {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return "INR --"
  if (amount >= 10000000) return `INR ${(amount / 10000000).toFixed(2)} Cr`

  return `INR ${(amount / 100000).toFixed(0)} L`
}

export const estimateMonthlyRent = (property) => {
  const rentYield = Number(property.capRate || 0) / 100
  return Math.round((Number(property.price || 0) * rentYield) / 12)
}

export const getRiskScore = (risk) => {
  const normalizedRisk = String(risk || "").toLowerCase()
  if (normalizedRisk === "low") return 92
  if (normalizedRisk === "medium") return 76
  return 62
}

export const getDemandScore = (demand) => {
  const normalizedDemand = String(demand || "").toLowerCase()
  if (normalizedDemand === "very high") return 96
  if (normalizedDemand === "high") return 88
  if (normalizedDemand === "stable") return 78
  return 68
}

export const getDealScore = (property) => {
  const roiScore = Math.min(Number(property.roi || 0) * 4.5, 100)
  const capRateScore = Math.min(Number(property.capRate || 0) * 14, 100)
  const demandScore = getDemandScore(property.demand)
  const riskScore = getRiskScore(property.risk)

  return Math.round(
    Number(property.aiScore || 0) * 0.34 +
      roiScore * 0.28 +
      capRateScore * 0.16 +
      demandScore * 0.12 +
      riskScore * 0.1
  )
}

export const getInvestmentLabel = (score) => {
  if (score >= 92) return "Prime buy"
  if (score >= 86) return "Strong watch"
  if (score >= 78) return "Selective buy"
  return "Review risk"
}

export const getHoldingStrategy = (property) => {
  if (property.roi >= 18 && property.risk === "Low") return "Growth hold"
  if (property.capRate >= 5.5) return "Rental yield"
  if (property.city === "Mumbai") return "Capital safety"
  return "Balanced hold"
}

export const getPricePerSqft = (property) =>
  Math.round(Number(property.price || 0) / Number(property.sqft || 1))
