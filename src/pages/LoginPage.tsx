import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type loginFormData } from "../schemas/login.schema"
import { useLoginMutation } from "../services/authApi"
import { useAppDispatch } from "../store/hooks"
import { setCredentials } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data).unwrap()
      dispatch(setCredentials(response.data))
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "40px 36px" }}>

        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "var(--radius)", background: "var(--primary)", marginBottom: 14 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </div>
          <h1 style={{ fontSize: "1.35rem", marginBottom: 4 }}>HR System</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" {...register("email")} placeholder="you@example.com" />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: "100%", justifyContent: "center", marginTop: 4, padding: "0.65rem" }}>
            {isLoading ? <><span className="spinner" style={{ borderTopColor: "#fff" }} /> Signing in…</> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
