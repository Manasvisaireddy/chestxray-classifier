import { useState } from "react"
import Uploader from "./components/Uploader"
import ResultChart from "./components/ResultChart"
import HeatmapOverlay from "./components/HeatmapOverlay"

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
        
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Chest X-Ray Analyser</h1>
          <p style={{ color: "#666", marginTop: 6 }}>Upload a chest X-ray to detect 14 thoracic conditions using DenseNet121</p>
        </div>

        <Uploader setResult={setResult} setLoading={setLoading} setPreview={setPreview} />

        {loading && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
            Analysing image...
          </div>
        )}

        {result && !loading && (
          <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
            
            <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e5e7eb" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#888" }}>Top finding</p>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{result.top_condition}</p>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "#555" }}>
                Confidence: <strong>{(result.top_confidence * 100).toFixed(1)}%</strong>
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <ResultChart predictions={result.predictions} />
              <HeatmapOverlay heatmap={result.heatmap} preview={preview} />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}