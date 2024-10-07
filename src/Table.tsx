import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type { Response } from "./types";
import { formatRevenue } from "./utility";
import "./App.css";

type TableProps = {
  data: Response;
  loading: boolean;
};

type RowProps = {
  id: number;
  appName: string;
  downloads: number;
  revenue: number;
  rpd: number;
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
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en-US").format(Number(params)); // Format downloads with commas
      },
    },
    {
      field: "revenue",
      headerName: "Revenue",
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{`${params.colDef.headerName}`}</strong>
      ),
      valueFormatter: (params) => {
        return formatRevenue(params); // Format revenue as currency
      },
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
    const row: RowProps = {
      id: appData.id,
      appName: appData.name,
      downloads: totalDownloads,
      revenue: totalRevenue,
      rpd: appData.data[0][1],
    };
    return row;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Table;
