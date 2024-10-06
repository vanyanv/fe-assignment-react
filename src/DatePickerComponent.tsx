import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DatePickerComponent() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs("2020-01-01")}
          slotProps={{
            textField: {
              sx: {
                maxWidth: 140,
                "& .MuiInputBase-root": {
                  border: "1px solid black",
                  borderRadius: "0px",
                  height: "20px", // adjust height
                  padding: "0 10px", // adjust padding
                },
                "& .MuiInputBase-input": {
                  padding: "0", // remove default input padding
                  textAlign: "center", // center align text
                },
                "& .MuiInputBase-root:focus": {
                  borderColor: "#B0D0DF", // focus border color
                  outline: "none",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
