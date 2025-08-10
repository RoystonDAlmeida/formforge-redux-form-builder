import { Box, CircularProgress, Typography } from "@mui/material";

// A loading indicator that displays a circular progress spinner and text in the center of the screen.
export default function LoadingIndicator() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)", // A light backdrop
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
      <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
        Loading...
      </Typography>
    </Box>
  );
}