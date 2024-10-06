import Chart from "./Chart";
import Table from "./Table";
import useData from "./useData";
import { Button } from "@mui/material";
import { useState } from "react";
import "./App.css";

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
  const [selected, setSelected] = useState("downloads");
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
        <Button
          sx={{
            backgroundColor: selected === "downloads" ? "#B0D0DF" : "white",
            ...buttonStyle, // apply common button styles
          }}
          variant="outlined"
          size="medium"
          onClick={() => setSelected("downloads")}
        >
          Downloads
        </Button>

        <Button
          sx={{
            backgroundColor: selected === "revenue" ? "#B0D0DF" : "white",
            ...buttonStyle, // apply common button styles
          }}
          variant="outlined"
          size="medium"
          onClick={() => setSelected("revenue")}
        >
          Revenue
        </Button>
      </div>
      <Chart data={data} loading={loading} selected={selected} />
      <Table data={data} loading={loading} />
    </div>
  );
};

export default App;
