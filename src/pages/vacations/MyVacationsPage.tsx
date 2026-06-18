import { useGetMyVacationsQuery } from "@/services/vacationApi"

const statusClass = (status: string) => {
  if (status === "approved") return "badge badge-approved"
  if (status === "rejected") return "badge badge-rejected"
  return "badge badge-submitted"
}

const MyVacationsPage = () => {
  const { data, isLoading } = useGetMyVacationsQuery()

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Vacations</h1>
      </div>

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
          <span className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      )}

      {!isLoading && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={4} className="empty-state">You have not submitted any vacation requests yet.</td>
                </tr>
              )}
              {data?.map((vacation) => (
                <tr key={vacation._id}>
                  <td>{new Date(vacation.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(vacation.toDate).toLocaleDateString()}</td>
                  <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vacation.reason}</td>
                  <td><span className={statusClass(vacation.status)}>{vacation.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyVacationsPage
