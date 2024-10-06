import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import type { Response } from "./types";

type TableProps = {
  data: Response;
  loading: boolean;
};

type RowProps = {
  id: number;
  appName: string;
  downloads: number;
};

const Table = ({ data, loading }: TableProps) => {
  if (!data.length) {
    return null;
  }

  if (loading) {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </div>
    );
  }

  const columns: GridColDef<RowProps>[] = [
    { field: "appName", headerName: "App Name", width: 150 },
    { field: "downloads", headerName: "Downloads", width: 150 },
  ];

  const rows = data.map((appData) => {
    const totalDownloads = 42;
    const row: RowProps = {
      id: appData.id,
      appName: appData.name,
      downloads: totalDownloads,
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
