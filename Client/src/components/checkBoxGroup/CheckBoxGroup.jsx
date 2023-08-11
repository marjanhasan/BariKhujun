const CheckBoxGroup = ({ selectedOptions, setSelectedOptions }) => {
  const options = [
    { label: "Owner", value: "owner" },
    { label: "Renter", value: "renter" },
  ];

  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  return (
    <>
      <label className="block mb-1 font-bold">Role:</label>
      <div className="flex gap-3 items-center">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </>
  );
};

export default CheckBoxGroup;
