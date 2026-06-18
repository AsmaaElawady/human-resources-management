import { useApproveVacationMutation, useGetSubmittedVacationsQuery, useRejectVacationMutation } from "@/services/vacationApi"

const statusClass = (status: string) => {
  if (status === "approved") return "badge badge-approved"
  if (status === "rejected") return "badge badge-rejected"
  return "badge badge-submitted"
}

const SubmittedVacationsPage = () => {
  const { data, isLoading } = useGetSubmittedVacationsQuery()
  const [approveVacation] = useApproveVacationMutation()
  const [rejectVacation] = useRejectVacationMutation()

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Submitted Vacations</h1>
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
                <th>Employee</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={6} className="empty-state">No submitted vacation requests.</td>
                </tr>
              )}
              {data?.map((vacation) => (
                <tr key={vacation._id}>
                  <td style={{ fontWeight: 500, color: "var(--text-strong)" }}>{vacation.employeeId.name}</td>
                  <td>{new Date(vacation.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(vacation.toDate).toLocaleDateString()}</td>
                  <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vacation.reason}</td>
                  <td><span className={statusClass(vacation.status)}>{vacation.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn btn-success"
                        style={{ padding: "4px 12px", fontSize: "0.8rem" }}
                        onClick={() => approveVacation({ id: vacation._id })}
                        disabled={vacation.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: "4px 12px", fontSize: "0.8rem" }}
                        onClick={() => rejectVacation({ id: vacation._id })}
                        disabled={vacation.status === "rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SubmittedVacationsPage