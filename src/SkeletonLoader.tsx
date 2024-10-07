import { Skeleton } from "@mui/material"; // Import MUI Skeleton

export default function SkeletonLoader() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* Use MUI Skeletons to mimic the table structure */}
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
    </div>
  );
}
