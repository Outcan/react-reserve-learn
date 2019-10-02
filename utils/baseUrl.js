const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://react-reserve-outcan.now.sh"
    : "http://localhost:3000";

export default baseUrl;
