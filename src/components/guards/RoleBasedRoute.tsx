import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"

interface Props {
  allowedRoles: string[]
}

const RoleBasedRoute = ({ allowedRoles }: Props) => {
  const { user } = useAppSelector(state => state.auth)

  // If user is not loaded or doesn't have the right role, redirect to dashboard
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleBasedRoute
