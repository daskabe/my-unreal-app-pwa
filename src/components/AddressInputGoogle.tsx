import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const API_KEY =
  globalThis.GOOGLE_MAPS_API_KEY ?? "";

const App = ({onPlaceSelect}) => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

/*   const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    setSelectedPlace(place);
    console.log("Selected place:", place);
  }; */

  return (
    <APIProvider
      apiKey={API_KEY}
      libraries={["places"]}
    >
      <div className="autocomplete-control relative" style={{zIndex:200}}>
        {selectedPlace && (
          <div className="selected-place-info">
            <p>Selected: {selectedPlace.formatted_address}</p>
          </div>
        )}
        <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
      </div>
    </APIProvider>
  );
};

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({
  onPlaceSelect,
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(""); // State for input value
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    console.log('here 1')
    if (!placeAutocomplete) return;
    console.log('here 2')

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      if (place.formatted_address) {
        setInputValue(place.formatted_address);
        onPlaceSelect(place);
      }
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">

      <input
        type="text"
        ref={inputRef} // Attach ref to input
        value={inputValue} // Bind input value to state
        onChange={(e) => setInputValue(e.target.value)} // Update state on user input
        placeholder={"Enter address"}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-white-900 bg-transparent"
      />
    </div>
  );
};

export default App;
