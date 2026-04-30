import React from "react";
import { useSelector } from "react-redux";

const Dashoard = () => {
  const { user } = useSelector((store) => store.auth);

  const adminDashboard = [{}];

  return <div></div>;
};

export default Dashoard;
