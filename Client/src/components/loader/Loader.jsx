import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
  return (
    <div className="h-[75vh] flex flex-col justify-center items-center">
      <HashLoader
        color="#7f42ff"
        loading
        size={100}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
