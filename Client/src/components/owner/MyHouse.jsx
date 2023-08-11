const MyHouse = () => {
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-4">My house</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="w-full">
            <tr>
              <th>No.</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Room size</th>
              <th>Rent</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="w-full text-center">
            <tr>
              <th>1</th>
              <td>4</td>
              <td>3</td>
              <td>Medium</td>
              <td>15000</td>
              <td>
                <button className="px-2 py-1 bg-blue-500 rounded">Edit</button>
              </td>
              <td>
                <button className="px-2 py-1 bg-red-500 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>No.</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Room size</th>
              <th>Rent</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyHouse;
