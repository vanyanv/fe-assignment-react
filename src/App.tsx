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
  const { data, loading } = useData();
  const [selected, setSelected] = useState("downloads");

  return (
    <div className="container">
      <div>
        <p>Start Date: </p>
        <p>End Date: </p>
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
