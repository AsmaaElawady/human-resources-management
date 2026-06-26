import { useRef } from "react"
import toast from "react-hot-toast"
import { useUploadPhotoMutation } from "@/services/employeeApi"

interface ProfilePhotoUploadProps {
  employeeId: string
  currentPhoto?: string
  employeeName: string
}

const ProfilePhotoUpload = ({ employeeId, currentPhoto, employeeName }: ProfilePhotoUploadProps) => {
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const avatarUrl = currentPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeName)}&background=random`

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      await uploadPhoto({ id: employeeId, photo: file }).unwrap()
      toast.success("Profile photo updated successfully!")
    } catch (error) {
      toast.error("Failed to upload profile photo.")
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50/50 border border-border/80 rounded-md mb-6 shadow-sm">
      {/* Photo Container */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0 bg-slate-100">
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
        <img src={avatarUrl} alt={employeeName} className="w-full h-full object-cover" />
      </div>

      {/* Description & Trigger */}
      <div className="text-center sm:text-left flex-1">
        <h3 className="text-sm font-bold text-text-strong tracking-wide">Profile Photo</h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          Upload a high-resolution image to update the employee profile display. Supported formats: PNG, JPG, WEBP.
        </p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 mt-3.5 px-3 py-1.5 border border-border bg-white text-text-strong font-bold text-xs rounded-sm hover:bg-slate-50 hover:text-primary transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {isLoading ? "Uploading..." : "Upload New Photo"}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: "none" }} 
          accept="image/png, image/jpeg, image/jpg, image/webp" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}

export default ProfilePhotoUpload
