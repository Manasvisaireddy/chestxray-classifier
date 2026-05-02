import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function ResultChart({ predictions }) {
  const data = Object.entries(predictions)
    .map(([name, value]) => ({ name, value: parseFloat((value * 100).toFixed(1)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e5e7eb" }}>
      <p style={{ margin: "0 0 1rem", fontWeight: 500 }}>Top predictions (%)</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={i === 0 ? "#6366f1" : "#c7d2fe"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}