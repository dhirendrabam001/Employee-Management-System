import LoaderCanvas from "./LoaderCanvas";

const CubeLoader = () => {
  return (
    <div style={styles.wrapper}>
      <LoaderCanvas />

      <div style={styles.text}>
        <h3>Dashboard System</h3>
        <p>Loading dashboard...</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "#0b0f14",
  },
  text: {
    position: "absolute",
    bottom: "15%",
    width: "100%",
    textAlign: "center",
    color: "#9ca3af",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.1em",
  },
};

export default CubeLoader;
