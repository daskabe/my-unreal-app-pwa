import React, { useState, useEffect } from "react";
import PlaceAutocomplete from "./AddressInputGoogle";
import { useAutocompleteSuggestions } from "../hooks/use-autocomplete-suggestions";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const AddressModal = ({ isOpen, onClose, modalType, onAddressSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    console.log("Selected place:", place);
    setSelectedPlace(place);
    setInputValue(place.formatted_address);
  };

  // Sample list of favorited addresses
  const favoriteAddresses = [
    "123 Main St",
    "456 Oak Ave",
    "789 Pine Rd",
    "101 Maple Dr",
    "202 Birch Ln",
  ];

  // Reset input value when the modal opens
  useEffect(() => {
    if (isOpen) {
      setInputValue(""); // Reset the input field when modal opens
    }
  }, [isOpen]);

  // Set placeholder based on modal type
  useEffect(() => {
    if (modalType === "pickup") {
      setPlaceholder("Enter pickup location");
    } else if (modalType === "destination") {
      setPlaceholder("Enter final destination");
    } else {
      setPlaceholder("Enter stop address");
    }
  }, [modalType]);

  if (!isOpen) return null;

  const handleSelectFavorite = (address) => {
    console.log("Selected favorite address:", address);
    setInputValue(address);
    onAddressSelect(address);
  };

  const handleDone = () => {
    if (inputValue) {
      console.log("Address on Done click:", inputValue);
      onAddressSelect(inputValue);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center m-0">
      <div className="rounded-lg p-3 w-full max-w-md text-white">
        <img
          src="background.png"
          height="400px"
          style={{ opacity: 1, filter: "blur(30px)", height: 100 }}
        />
        {/* Input Field */}
        <div className="places-wrapper">
          <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
        </div>
        {selectedPlace && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Selected Address:</h2>
            <p>{selectedPlace.formatted_address}</p>
          </div>
        )}

        {/*         <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-white-900 bg-transparent"
        /> */}
        {/* Placeholder for Google Maps API Autocomplete */}
        {/* You can integrate Google Maps API here to populate suggestions as the user types */}

        {/* Favorited Addresses */}
        {/*         <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Recent Locations</h3>
          <ul>
            {favoriteAddresses.map((address, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => handleSelectFavorite(address)}
              >
                {address}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Done Button */}
        <button
          onClick={handleDone}
          className="w-full p-3 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
