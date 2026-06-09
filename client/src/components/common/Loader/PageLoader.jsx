import { useEffect, useState } from "react";
import CubeLoader from "./CubeLoader";

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CubeLoader />;
  }

  return children;
};

export default PageLoader;
