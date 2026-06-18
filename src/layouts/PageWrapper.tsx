import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useSocketNotifications } from "@/hooks/useSocketNotifications"

const PageWrapper = () => {
  useSocketNotifications()

  return (
    <div className="page-layout">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default PageWrapper