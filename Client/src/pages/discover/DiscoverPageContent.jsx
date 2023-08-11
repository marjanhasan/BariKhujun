import Card from "../../components/cards/Card";
import Loader from "../../components/loader/Loader";
import NoDataFound from "../../components/noDataFound/NoDataFound";
import Pagination from "../../components/pagination/Pagination";

const DiscoverPageContent = ({ loading, houseData, page, setPage }) => {
  return (
    <div className="basis-[70%] bg-gradient-to-r from-cyan-50 to-blue-50">
      <h1 className="text-center font-semibold text-4xl my-12">
        Welcome To House Hunting!
      </h1>
      {loading ? (
        <Loader />
      ) : !houseData ? (
        <NoDataFound />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 mx-5">
          {houseData.map((data, i) => (
            <Card key={i} room={data} />
          ))}
        </div>
      )}

      {/* pagination */}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default DiscoverPageContent;
