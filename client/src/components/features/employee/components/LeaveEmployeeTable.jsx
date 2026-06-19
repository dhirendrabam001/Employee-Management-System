const LeaveEmployeeTable = () => {
  return (
    <div class="table-responsive">
      <table class="table table-hover">
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
          <tr>
            <td data-label="Date">12 Aug 2026</td>
            <td data-label="Leave Date">Some Important work</td>
            <td data-label="Reason">Sick Leave</td>
            <td data-label="Status" className="text-center">
              <span className="status-badge status-approved">Approved</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaveEmployeeTable;
