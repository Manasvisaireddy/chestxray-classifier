import { useRef } from "react"
import axios from "axios"

export default function Uploader({ setResult, setLoading, setPreview }) {
  const inputRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post("https://manasvisaireddy-chestxray-classifier.hf.space/predict", formData)
      setResult(res.data)
    } catch (err) {
      alert("Error connecting to backend. Make sure uvicorn is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current.click()}
      style={{
        border: "2px dashed #d1d5db",
        borderRadius: 12,
        padding: "2.5rem",
        textAlign: "center",
        cursor: "pointer",
        background: "#fff",
        transition: "border-color 0.2s"
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#d1d5db"}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <p style={{ fontSize: 32, margin: "0 0 8px" }}>🫁</p>
      <p style={{ fontWeight: 500, margin: "0 0 4px" }}>Drop a chest X-ray here</p>
      <p style={{ fontSize: 13, color: "#888", margin: 0 }}>PNG, JPG supported — click or drag to upload</p>
    </div>
  )
}