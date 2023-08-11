const Bookings = () => {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-4">Booked house</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="w-full">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Bookings</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="w-full text-center">
            <tr>
              <th>1</th>
              <td>Salman</td>
              <td>Dhaka</td>
              <td>Mirpur</td>
              <td>01782210366</td>
              <td>
                <button className="px-2 py-1 bg-blue-500 rounded">
                  Bookings
                </button>
              </td>
              <td>
                <button className="px-2 py-1 bg-red-500 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Bookings</th>
              <th>Remove</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
