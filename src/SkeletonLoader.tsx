import { Skeleton } from "@mui/material";

export default function SkeletonLoader() {
  return (
    <div style={{ width: "100%", padding: "16px" }}>
      {/* Graph Skeleton */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          marginBottom: "5px",
        }}
      >
        {/* Title of the Chart */}
        <Skeleton variant="text" height={50} width="40%" />

        {/* Simulating a line chart */}
        <div
          style={{
            height: 200,
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            position: "relative",
          }}
        >
          {/* Simulate a line graph with Skeletons */}
          <Skeleton
            variant="rectangular"
            height={300}
            width="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />

          <Skeleton
            variant="rectangular"
            height={4}
            width="50%"
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              backgroundColor: "#c0c0c0",
            }}
          />
          <Skeleton
            variant="rectangular"
            height={4}
            width="60%"
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              backgroundColor: "#c0c0c0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
