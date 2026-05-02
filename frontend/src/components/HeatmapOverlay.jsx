export default function HeatmapOverlay({ heatmap, preview }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e5e7eb" }}>
      <p style={{ margin: "0 0 1rem", fontWeight: 500 }}>Grad-CAM heatmap</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {preview && (
          <div>
            <p style={{ fontSize: 11, color: "#888", margin: "0 0 4px" }}>Original</p>
            <img src={preview} alt="original" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 160 }} />
          </div>
        )}
        {heatmap && (
          <div>
            <p style={{ fontSize: 11, color: "#888", margin: "0 0 4px" }}>Heatmap overlay</p>
            <img src={heatmap} alt="heatmap" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 160 }} />
          </div>
        )}
      </div>
      <p style={{ fontSize: 11, color: "#aaa", marginTop: 8, margin: "8px 0 0" }}>
        Red areas = regions the model focused on most
      </p>
    </div>
  )
}