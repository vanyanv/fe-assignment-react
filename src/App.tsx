import Chart from "./Chart";
import Table from "./Table";
import useData from "./useData";
import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import "./App.css";
import DatePickerComponent from "./DatePickerComponent";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Update state once data is available
  useEffect(() => {
    if (data?.length > 0) {
      //starting date from our data
      const startingDate = data[0]?.data[0][0];
      //ending date from our data
      const endingDate = data[0]?.data[data[0]?.data?.length - 1][0];
      if (startingDate) setStartDate(startingDate);
      if (endingDate) setEndDate(endingDate);
    }
  }, [data]);

  return (
    <div className="container">
      <div>
        <p>
          Start Date:{" "}
          <DatePickerComponent
            givenDate={startDate}
            updateTime={setStartDate}
          />
        </p>
        <p>
          End Date:{" "}
          <DatePickerComponent givenDate={endDate} updateTime={setEndDate} />
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
      <Chart
        data={data}
        loading={loading}
        selected={selected}
        startDate={startDate}
        endDate={endDate}
      />
      <Table
        data={data}
        loading={loading}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default App;
