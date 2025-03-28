import React, { useState, useEffect } from "react";
import AddressModal from "./AddressModal";

const TripPlanner = ({ onChange, bookingData }) => {
  // Initialize state with values from bookingData if provided, otherwise use defaults
  const [addresses, setAddresses] = useState({
    pickup: bookingData?.pickupLocation || "",
    stops: bookingData?.stops || [],
    destination: bookingData?.destinationLocation || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Sync addresses with bookingData if bookingData changes externally, but only if the values differ
  useEffect(() => {
    const newAddresses = {
      pickup: bookingData?.pickupLocation || "",
      stops: bookingData?.stops || [],
      destination: bookingData?.destinationLocation || "",
    };

    // Only update addresses if the values have actually changed
    if (
      newAddresses.pickup !== addresses.pickup ||
      newAddresses.destination !== addresses.destination ||
      JSON.stringify(newAddresses.stops) !== JSON.stringify(addresses.stops)
    ) {
      console.log("Syncing addresses with bookingData:", newAddresses);
      setAddresses(newAddresses);
    }
  }, [bookingData]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleAddressSelect = (address) => {
    console.log("handleAddressSelect called with address:", address);
    //let updatedAddresses;
    if (modalType === "pickup") {
      setAddresses({ ...addresses, pickup: address });
      localStorage.setItem("pickup", address);
      //updatedAddresses = { ...addresses, pickup: address };
    } else if (modalType === "destination") {
      setAddresses({ ...addresses, destination: address });
      localStorage.setItem("destination", address);
      //updatedAddresses = { ...addresses, destination: address };
    } else if (modalType === "stop") {
      setAddresses({ ...addresses, stops: [...addresses.stops, address] });
      localStorage.setItem(
        "stops",
        JSON.stringify([...addresses.stops, address])
      );
      //updatedAddresses = { ...addresses, stops: [...addresses.stops, address] };
    } else {
      console.error("Invalid modalType:", modalType);
      return;
    }

    //console.log('Updated addresses:', updatedAddresses);
    //setAddresses(updatedAddresses);
    // Call onChange with the updated values
    // onChange({
    //   pickupLocation: updatedAddresses.pickup,
    //   stops: updatedAddresses.stops,
    //   destinationLocation: updatedAddresses.destination,
    // });
    closeModal();
  };

  const handleAddStop = () => {
    openModal("stop");
  };

  // Function to delete a stop
  const handleDeleteStop = (index) => {
    const updatedStops = addresses.stops.filter((_, i) => i !== index);
    const updatedAddresses = { ...addresses, stops: updatedStops };
    console.log("After deleting stop, updated addresses:", updatedAddresses);
    setAddresses(updatedAddresses);
    // Call onChange with the updated values
    onChange({
      pickupLocation: updatedAddresses.pickup,
      stops: updatedStops,
      destinationLocation: updatedAddresses.destination,
    });
  };

  console.log("Current addresses state:", addresses);

  return (
    <div className="w-full max-w-md p-1 rounded-lg shadow-md overflow-auto max-h-[520px]">
      {/* Starting Address */}
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 mr-2">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div
          className="flex-1 p-2 rounded cursor-pointer border border-gray-300 h-10 text-white"
          onClick={() => openModal("pickup")}
        >
          {addresses.pickup || "Enter pickup location"}
        </div>
      </div>

      {/* Added Stops Section */}
      <div className="ml-3 border-l-2 border-[#2af0ea] pl-4">
        <span className="text-sm text-gray-500 ml-6">
          Your Stops{" "}
          {addresses.stops.length > 0 ? " : " + addresses.stops.length : ""}
        </span>
        {addresses.stops.map((stop, index) => (
          <div key={index} className="flex items-center mb-2 mt-2">
            <div className="w-3 h-3 mr-2 bg-gray-300 rounded-full"></div>
            <div
              className="flex-1 p-2 rounded cursor-pointer border border-gray-300 h-10 text-white"
              onClick={() => openModal("stop")}
            >
              {stop}
            </div>
            {/* Delete Icon */}
            <div
              className="ml-2 p-1 cursor-pointer"
              onClick={() => handleDeleteStop(index)}
            >
              <svg
                className="w-5 h-5 text-gray-400 hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
        <div className="flex items-center mb-4 mt-4">
          <div className="w-3 h-3 mr-2 mt-8"></div>
          <div
            className={`flex-1 p-3 text-center rounded cursor-pointer ${
              addresses.stops.length >= 3
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-[#2af0ea] text-black"
            }`}
            onClick={addresses.stops.length < 3 ? handleAddStop : null} // Disable click if 3 stops are added
          >
            + Add Stop
          </div>
        </div>
      </div>

      {/* Destination Address */}
      <div className="flex items-center mt-8">
        <div className="w-6 h-6 mr-2">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div
          className="flex-1 p-2 rounded cursor-pointer border border-gray-300 h-10 text-white"
          onClick={() => openModal("destination")}
        >
          {addresses.destination || "Enter destination location"}
        </div>
      </div>

      {/* Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={modalType}
        onAddressSelect={handleAddressSelect}
      />
    </div>
  );
};

export default TripPlanner;
