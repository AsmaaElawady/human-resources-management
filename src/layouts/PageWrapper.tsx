import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useSocketNotifications } from "@/hooks/useSocketNotifications"

const PageWrapper = () => {
  useSocketNotifications()

  return (
    <div className="min-h-screen bg-bg flex">
      <Navbar />
      <Sidebar />
      <main className="flex-1 ml-64 mt-16 p-8 min-h-[calc(100vh-4rem)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default PageWrapper