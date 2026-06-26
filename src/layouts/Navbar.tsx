import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice"

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  // Generate a simple initial for avatar badge
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U"

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border/80 flex items-center justify-between px-6 z-50 shadow-premium">
      <div className="flex items-center gap-3">
        {/* Brand Logo Container */}
        <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-tr from-primary to-indigo-400 text-white shadow-md shadow-primary/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
          </svg>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-text-strong to-primary bg-clip-text text-transparent tracking-tight">
          HR Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user?.email && (
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 py-1 pl-1.5 pr-3 rounded-full">
            <div className="w-7 h-7 rounded-full bg-primary text-white font-semibold text-xs flex items-center justify-center shadow-inner">
              {userInitial}
            </div>
            <span className="text-xs font-medium text-text-strong hidden sm:inline">
              {user.email}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-border bg-white text-text-strong font-medium text-xs rounded-sm hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar