import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Hiking = () => {
  const dispatch = useDispatch();
  const keys = useSelector(state => state.hikingReducer.keys);

  // Get the relevant API keys and don't update again
  useEffect(() => {
    dispatch(getHikingKeys());
  }, []);

  return (
    <>
      <h1>Hiking</h1>
    </>
  );
};

export default Hiking;
