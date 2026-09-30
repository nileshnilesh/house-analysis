import jsPDF from "jspdf"

export default function generateReport(data) {
  const doc = new jsPDF()
  const predicted = Number(data.price).toLocaleString("en-IN")

  doc.setFillColor(17, 24, 39)
  doc.rect(0, 0, 210, 42, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text("HouseAI Valuation Report", 18, 24)

  doc.setTextColor(71, 85, 105)
  doc.setFontSize(11)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 18, 52)

  doc.setTextColor(15, 23, 42)
  doc.setFontSize(18)
  doc.text("Prediction Summary", 18, 70)

  doc.setFontSize(12)
  const rows = [
    ["Bedrooms", data.bedrooms],
    ["Bathrooms", data.bathrooms],
    ["Square Feet", data.sqft],
    ["City", data.city || "Not provided"],
    ["Parking", data.parking ? "Available" : "Not available"],
    ["Property Age", `${data.age ?? "N/A"} years`],
    ["Confidence", `${data.confidence ?? 90}%`],
    ["Predicted Price", `INR ${predicted}`]
  ]

  rows.forEach(([label, value], index) => {
    const y = 88 + index * 11
    doc.setTextColor(100, 116, 139)
    doc.text(label, 18, y)
    doc.setTextColor(15, 23, 42)
    doc.text(String(value), 84, y)
  })

  doc.setDrawColor(20, 184, 166)
  doc.line(18, 184, 190, 184)

  doc.setTextColor(15, 23, 42)
  doc.setFontSize(14)
  doc.text("Investment Note", 18, 200)
  doc.setTextColor(71, 85, 105)
  doc.setFontSize(11)
  doc.text(
    "Use this report as a decision aid alongside local due diligence, title checks, and comparable sales.",
    18,
    210,
    { maxWidth: 172 }
  )

  doc.save("HouseAI_Valuation_Report.pdf")
}
