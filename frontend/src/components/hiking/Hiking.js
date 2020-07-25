import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getHikingKeys } from "../../actions/hiking/keys";

import Footer from "./layout/Footer";
import MapParent from "./mapComponents/MapParent";
import GeocodeContainer from "./mapComponents/GeocodeContainer";
import TrailResults from "./trails/TrailResults";

function search(arr, key_name) {
  // Searches an array for an item with a given name
  // Returns the items name and value
  var match = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == key_name) {
      match = arr[i].api_key;
      break;
    }
  }
  return match;
}

const Hiking = () => {
  const dispatch = useDispatch();
  const keys = useSelector((state) => state.hikingKeysReducer.apiKeys);

  // Get the relevant API keys and don't update again
  useEffect(() => {
    document.title = "Hiking Trails";
    dispatch(getHikingKeys());
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="sticky-top my-3">
          <MapParent apiKey={search(keys, "go")} />
        </div>
        <h1 className="d-none d-lg-inline">Discover Trails Near You</h1>
        <h3 className="d-lg-none">Discover Trails Near You</h3>
        <GeocodeContainer apiKey={search(keys, "go")} />
        <TrailResults apiKey={search(keys, "hp")} />
      </div>
      <Footer />
    </>
  );
};

export default Hiking;
