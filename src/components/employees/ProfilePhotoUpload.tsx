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
    <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "20px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", marginBottom: "24px" }}>
      <div style={{ position: "relative", width: 80, height: 80, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid var(--border)" }}>
        {isLoading && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="spinner" style={{ width: 24, height: 24, borderTopColor: "#fff" }} />
          </div>
        )}
        <img src={avatarUrl} alt={employeeName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: 600 }}>Profile Photo</h3>
        <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Upload a high-resolution image to update the employee's profile photo.
        </p>
        <button 
          className="btn btn-outline" 
          style={{ padding: "6px 14px", fontSize: "0.85rem" }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Change Photo"}
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
