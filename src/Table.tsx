import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type { Response } from "./types";
import SkeletonLoader from "./SkeletonLoader";
import { formatRevenue } from "./utility";
import "./App.css";
import { useEffect, useState } from "react";

type TableProps = {
  data: Response;
  loading: boolean;
  startDate: string;
  endDate: string;
};

type RowProps = {
  id: number;
  appName: string;
  downloads: number;
  revenue: number;
  rpd: number | string;
  avatar: string; // Add the image property
};

const Table = ({ data, loading, startDate, endDate }: TableProps) => {
  const [filteredData, setFilteredData] = useState<Response>([]);

  useEffect(() => {
    if (!data.length) {
      setFilteredData([]);
      return;
    }

    // Filter data within the specified date range
    const filteredData = data.filter((appData) => {
      // Assuming appData.data is an array of arrays where the first element is a date
      return appData.data.some((entry) => {
        const entryDate = new Date(entry[0]); // Assuming the date is the first element in the entry
        const start = new Date(startDate);
        const end = new Date(endDate);
        return entryDate >= start && entryDate <= end;
      });
    });

    setFilteredData(filteredData);
  }, [data, startDate, endDate]);

  if (loading) {
    return <SkeletonLoader />; // Add a loading indicator
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
      //renders the image of Application in Cell
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={params.row.avatar}
              alt={params.row.appName}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: "50%",
              }}
            />
            <span>{params.row.appName}</span>
          </div>
        );
      },
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
      valueFormatter: (params) => {
        return formatRevenue(params);
      },
      width: 150,
    },
  ];

  const rows = filteredData.map((appData) => {
    const totalDownloads = appData.data.reduce((a, b) => a + b[1], 0);
    const totalRevenue = appData.data.reduce((a, b) => a + b[2], 0);
    const rpd = totalRevenue / totalDownloads;
    const row: RowProps = {
      id: appData.id,
      avatar: appData.icon,
      appName: appData.name,
      downloads: totalDownloads,
      revenue: totalRevenue,
      rpd: rpd,
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
