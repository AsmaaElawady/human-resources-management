import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "var(--bg)", textAlign: "center", padding: "24px" }}>
      <div style={{ fontSize: "5rem", fontWeight: 700, color: "var(--border)" }}>404</div>
      <h1 style={{ fontSize: "1.4rem" }}>Page not found</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: 360 }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>Back to Dashboard</Link>
    </div>
  )
}

export default NotFoundPage