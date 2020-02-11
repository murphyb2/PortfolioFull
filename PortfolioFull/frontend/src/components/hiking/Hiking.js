import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHikingKeys } from "../../actions/hiking/keys";
import Footer from "./layout/Footer";

const Hiking = () => {
  const dispatch = useDispatch();
  const keys = useSelector(state => state.hikingKeysReducer.apiKeys);

  // Get the relevant API keys and don't update again
  useEffect(() => {
    document.title = "Hiking Trails";
    dispatch(getHikingKeys());
  }, []);

  return (
    <>
      <h1>HIKING</h1>
      <Footer />
    </>
  );
};

export default Hiking;
