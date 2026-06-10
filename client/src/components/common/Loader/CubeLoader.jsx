import LoaderCanvas from "./LoaderCanvas";

const CubeLoader = () => {
  return (
    <div style={styles.wrapper}>
      <LoaderCanvas />
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backdropFilter: "blur(5px)",
    background: "rgba(0,0,0,0.2)",
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
