import { useSelector } from "react-redux";

const LeaveEmployeeTable = () => {
  const { leave } = useSelector((store) => store.leave);
  console.log("leave", leave);
  const formatStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">LEAVE DATE</th>
            <th scope="col">REASON</th>
            <th scope="col" className="text-center">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody>
          {leave.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No leave apply this time
              </td>
            </tr>
          ) : (
            leave.map((item) => {
              return (
                <tr key={item._id}>
                  <td data-label="Date">
                    {new Date(item.startDate).toLocaleDateString("en-NP")}
                  </td>
                  <td data-label="Leave Date">{item.leaveType}</td>
                  <td data-label="Reason">{item.reason}</td>
                  <td data-label="Status" className="text-center">
                    <span className={`status-badge status-${item.status}`}>
                      {formatStatus(item.status)}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveEmployeeTable;
