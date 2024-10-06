import Chart from "./Chart";
import Table from "./Table";
import useData from "./useData";
import "./App.css";

const App = () => {
  const { data, loading } = useData();

  return (
    <div className="container">
      <div>
        <p>
          Start Date: <input value="2020-01-01" />
        </p>
        <p>
          End Date: <input value="2020-01-07" />
        </p>
      </div>
      <Chart data={data} loading={loading} />
      <Table data={data} loading={loading} />
    </div>
  );
};

export default App;
