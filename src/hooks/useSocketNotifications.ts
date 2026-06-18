import { useEffect } from "react"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || "http://localhost:5000"

export const useSocketNotifications = () => {
  // Access the current user from Redux auth slice safely
  const { user, isAuthenticated } = useSelector((state: any) => state.auth)

  useEffect(() => {
    // Only connect if the user is logged in
    if (!isAuthenticated || !user) return

    const socket = io(SOCKET_URL)

    // Join the appropriate rooms based on role
    socket.emit("join", { role: user.role, employeeId: user.employeeId })

    // Listen for new vacation requests (Admins/HR)
    socket.on("vacation:new", (data) => {
      toast.success(data.message || "New vacation request submitted!", {
        duration: 5000,
        position: "top-right"
      })
    })

    // Listen for approved vacation (Employee)
    socket.on("vacation:approved", (data) => {
      toast.success(data.message || "Your vacation request was approved!", {
        duration: 5000,
        position: "top-right",
        icon: '🎉'
      })
    })

    // Listen for rejected vacation (Employee)
    socket.on("vacation:rejected", (data) => {
      toast.error(data.message || "Your vacation request was rejected.", {
        duration: 5000,
        position: "top-right"
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [user, isAuthenticated])
}
