import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

export class MapContainer extends Component {
  // static propTypes = {
  //   userLocation: PropTypes.array.isRequired,
  //   nearbyTrails: PropTypes.array
  // };
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  render() {
    const mapStyles = {
      height: "33vh"
      // width: "100vw"
    };

    if (
      this.props.nearbyTrails === null ||
      typeof this.props.nearbyTrails === "undefined"
    ) {
      return <Fragment />;
    }

    return (
      // Need to put map styles here so the map's container is not 0 height
      <div style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{
            lat: this.props.userLocation[0],
            lng: this.props.userLocation[1]
          }}
          center={{
            lat: this.props.userLocation[0],
            lng: this.props.userLocation[1]
          }}
        >
          {/* Add Marker for each trail in the array */}
          {this.props.nearbyTrails.map(trail => (
            <Marker
              key={trail.id}
              name={trail.name}
              onClick={this.onMarkerClick}
              image={trail.imgSqSmall}
              stars={trail.stars}
              votes={trail.starVotes}
              distance={trail.length}
              position={{
                lat: trail.latitude,
                lng: trail.longitude
              }}
            />
          ))}
          {/* Setup the Info Window for when we click a marker */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div className="col">
              <div className="row">
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
              <div className="row">
                <div className="col">
                  <img src={this.state.activeMarker.image} alt="" />
                </div>
                <div className="col">
                  <div className="row">
                    Rating: {this.state.activeMarker.stars} stars/
                    {this.state.activeMarker.votes} Votes
                  </div>
                  <div className="row">
                    Distance: {this.state.activeMarker.distance} mi
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y"
})(MapContainer);
