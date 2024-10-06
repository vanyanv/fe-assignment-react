import Chart from "./Chart";
import Table from "./Table";
import useData from "./useData";
import "./App.css";
import { Button } from "@mui/material";

const buttonStyle = {
  fontSize: "14px",
  color: "black", // black text
  border: "1px solid black", // border
  borderRadius: "0px", // makes border square
  "&:hover": {
    backgroundColor: "#9CBFD2", // hover effect for active button
  },
};

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
      <div className="buttons-container">
        <Button sx={buttonStyle} variant="outlined" size="medium">
          Downloads
        </Button>

        <Button sx={buttonStyle} variant="outlined" size="medium">
          Revenue
        </Button>
      </div>
      <Chart data={data} loading={loading} />
      <Table data={data} loading={loading} />
    </div>
  );
};

export default App;
