import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
  givenDate: string;
  updateTime: React.Dispatch<React.SetStateAction<string>>;
};

export default function DatePickerComponent({
  givenDate,
  updateTime,
}: DatePickerComponentProps) {
  const dateValue = dayjs(givenDate); // Convert the givenDate to a dayjs object

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dateValue}
          onChange={(newDate) => {
            if (newDate) {
              updateTime(newDate.format("YYYY-MM-DD"));
            }
          }}
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
