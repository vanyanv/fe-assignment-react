import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type { Response } from "./types";
import "./App.css";

type TableProps = {
  data: Response;
  loading: boolean;
};

type RowProps = {
  id: number;
  appName: string;
  downloads: string | number;
  revenue: number;
  rpd: number;
};

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          fontWeight: "bold", // Apply bold to all headers
        },
      },
    },
  },
});

const formatNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Table = ({ data, loading }: TableProps) => {
  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  if (!data.length) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "appName",
      headerName: "App Name",
      width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{`${params.colDef.headerName}`}</strong>
      ),
    },
    {
      field: "downloads",
      headerName: "Downloads",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{`${params.colDef.headerName}`}</strong>
      ),
      width: 150,
    },
    {
      field: "revenue",
      headerName: "Revenue",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{`${params.colDef.headerName}`}</strong>
      ),
      width: 150,
    },
    {
      field: "rpd",
      headerName: "RPD",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{`${params.colDef.headerName}`}</strong>
      ),
      width: 150,
    },
  ];

  const rows = data.map((appData) => {
    const totalDownloads = appData.data.reduce((a, b) => a + b[1], 0);
    const totalRevenue = appData.data.reduce((a, b) => a + b[2], 0);
    console.log(totalDownloads);
    const row: RowProps = {
      id: appData.id,
      appName: appData.name,
      downloads: formatNumberWithCommas(totalDownloads),
      revenue: totalRevenue,
      rpd: appData.data[0][1],
    };
    return row;
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </ThemeProvider>
  );
};

export default Table;
