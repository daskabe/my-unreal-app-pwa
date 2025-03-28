import * as Dialog from "@radix-ui/react-dialog";
import { useState, useRef } from "react";
import {
  ChevronRightIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SewingPinIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import TripPlanner from "./components/TripPlanner";
import HeaderDesktop from "./components/headerDesktop";
import FooterMobile from "./components/footerMobile";
import PlaceAutocomplete from "./components/AddressInputGoogle"

function App() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const displayMode = window.navigator.standalone
    ? "standalone"
    : window.matchMedia("(display-mode: standalone)").matches
    ? "standalone"
    : window.matchMedia("(display-mode: fullscreen)").matches
    ? "fullscreen"
    : window.matchMedia("(display-mode: minimal-ui)").matches
    ? "minimal-ui"
    : "browser";
  console.log("Running in standalone mode:", isStandalone);

  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    pickupTime: "now",
    pickupLocation: "",
    stops: [],
    destinationLocation: "",
    passengers: 1,
    carPreference: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBook = () => {
    alert("Booking confirmed! Details: " + JSON.stringify(bookingData));
    setBookingOpen(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] text-white">
      {/* Header */}
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>

      <header className="flex items-center justify-between p-0 md:hidden bg-[#111] mx-auto flex max-w-7xl">
        <div className="flex items-center space-x-2 ml-5">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=100"
            className="h-8 w-auto mr-2"
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: 40,
              fontFamily: "Knewave",
              color: "#2af0ea",
            }}
          >
            VIP - KC
          </span>
        </div>
        {/* <span className="text-sm text-gray-400 mr-5">
          Display Mode: {displayMode}
        </span> */}
        <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
          <Dialog.Trigger asChild>
            <HamburgerMenuIcon
              className="h-9 w-9 text-white mr-5 cursor-pointer"
              style={{ color: "#2af0ea" }}
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-0 right-0 h-full w-full md:w-3/4 bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] p-6 shadow-lg text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Menu</h2>
                <Dialog.Close asChild>
                  <Cross1Icon className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav className="space-y-4">
                <MenuItem title="About" />
                <MenuItem title="Privacy" />
                <MenuItem title="Terms of Service" />
              </nav>
              <button className="mt-6 w-full bg-[#2af0ea] text-black font-semibold py-3 rounded">
                Login / Register
              </button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>

      {!isStandalone && (
        <div className="mt-2 bg-[#555] text-white p-2 flex items-center justify-between rounded-lg shadow-md top-0 left-0 right-0">
          <span className="text-white">Install "VIP-KC as an App"</span>
          <button
            onClick={() => {
              if (window.deferredPrompt) {
                window.deferredPrompt.prompt(); // Show the install prompt
                window.deferredPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                  } else {
                    console.log("User dismissed the install prompt");
                  }
                  window.deferredPrompt = null; // Clear the deferred prompt
                });
              }
            }}
            className="bg-[#2af0ea] text-black font-semibold py-2 px-4"
          >
            Install
          </button>
        </div>
      )}

      <main className="flex justify-center min-h-screen p-6">
        <div className="space-y-4 w-full max-w-md">
          <ServiceCard
            title="Car Service"
            description="Airport and local event rides in style."
            onClick={() => setBookingOpen(true)}
          />
          <ServiceCard
            title="Shop Runner"
            description="Let us do all the run around for you."
          />
          <ServiceCard
            title="Concierge Service"
            description="Simplify your life with our concierge services."
          />
        </div>
      </main>

      <FooterMobile />
      {/* Bottom Sheet for Car Service Booking */}
      <Dialog.Root
        open={bookingOpen}
        onOpenChange={(open) => {
          setBookingOpen(open);
          if (!open) setStep(1); // Reset step when closing
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed bottom-0 left-0 w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] p-6 rounded-t-2xl">
            <div className="flex justify-between items-center mb-6">
              {step > 1 ? (
                <ArrowLeftIcon
                  className="h-6 w-6 text-white"
                  onClick={() => setStep(step - 1)}
                />
              ) : (
                <div className="w-6" /> // Placeholder to maintain layout
              )}
              <h2 className="text-xl font-bold text-white">
                Car Service Booking {step}/5
              </h2>
              <Dialog.Close asChild>
                <Cross1Icon className="h-6 w-6 text-white" />
              </Dialog.Close>
            </div>
            <CarServiceBooking
              step={step}
              bookingData={bookingData}
              onChange={handleBookingChange}
              onNext={handleNext}
              onBook={handleBook}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

const MenuItem = ({ title }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-lg text-white">{title}</span>
    <ChevronRightIcon className="h-5 w-5 text-white" />
  </div>
);

const ServiceCard = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between bg-[#111] rounded-lg p-4 shadow-md transition-colors w-full"
    style={{ borderColor: "#2af0ea", borderWidth: 0 }}
  >
    <div className="text-left">
      <img
        src="background.png"
        width="400px"
        style={{ opacity: 0.6, filter: "blur(30px)", height: 50 }}
      />
      <h3 className="text-xl font-bold text-white m-0">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
    <ArrowRightIcon className="h-10 w-10 text-gray-400" />
  </button>
);

const CarServiceBooking = ({ step, bookingData, onChange, onNext, onBook }) => {
  const [pickupMode, setPickupMode] = useState("now");
  const datePickerRef = useRef(null); // Create a ref for the date picker
  const locations = [
    "Openideas, 905, Tower, beside, wall",
    "Settelite Area, 905, Tower, beside, wall",
    "Openideas, 905, Tower, beside, wall",
  ];

  const cars = [
    {
      title: "Luxury Sedan - up to 3 passengers",
      description: "BMW 7 Series, Mercedes-Benz S-Class, Audi A8, Lexus LS",
      time: "12:39PM",
      eta: "2 min away",
      price: "$48.21",
      img: "bmw.png",
    },
    {
      title: "Luxury Suv - up to 5 passengers",
      description:
        "Cadillac Escalade,Chevy Tahoe,Lincoln Navigator, Ford Expedition",
      img: "cadilac.jpg",
      time: "12:39PM",
      eta: "2 min away",
      price: "$48.21",
    },
    {
      title: "Transit Van - up to 12 passengers",
      description: "Ford Transit",
      img: "transit.avif",
      time: "12:39PM",
      eta: "2 min away",
      price: "$48.21",
    },
    {
      title: "Grech Mini Bus - up to 22 passengers",
      description: "Great for Corporate Events, Weddings, and Group Outings",
      img: "bus.jpeg",
      time: "12:39PM",
      eta: "2 min away",
      price: "$48.21",
    },
  ];

  // Add state to control dropdown visibility
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  // Simulate triggering a payment action
  const handlePayment = (method) => {
    alert(`Initiating payment with ${method}...`);
    // In a real app, you would integrate with the payment provider's SDK or deep link
    // For example, for Google Pay:
    // window.location.href = 'gpay://pay?pa=merchant@bank&pn=Merchant Name&am=48.21&cu=USD';
    // For PhonePe:
    // window.location.href = 'phonepe://pay?pa=merchant@bank&pn=Merchant Name&am=48.21&cu=USD';
    onBook(); // Close the bottom sheet after payment initiation
  };

  // Handle changes from TripPlanner and update bookingData
  const handleTripPlannerChange = (updatedData) => {
    onChange({
      ...bookingData,
      pickupLocation: updatedData.pickupLocation,
      stops: updatedData.stops,
      destinationLocation: updatedData.destinationLocation,
    });
  };

  const ImageWithOverlayText = ({ img, text, description }) => {
    return (
      <div
        className="relative w-full h-64 bg-cover rounded-lg hover:border-[#2af0ea] hover:border"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-80 text-white rounded-b-lg">
          <h2 className="text-xl font-semibold">{text}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    );
  };

  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md p-0 rounded-lg shadow-md overflow-auto max-h-[520px] justify-center">
              <div className="relative justify-center text-center mt-10">
                <label className="block text-lg font-large text-gray-300 mb-1">
                  <h3 className="text-3xl font-bold text-white mb-10">
                    <span style={{ color: "#2af0ea" }}>When</span> would you
                    like to be picked up?
                  </h3>
                </label>
                <div className="flex space-x-2 mb-2 justify-center">
                  {/* "Now" Button */}
                  <button
                    onClick={() => {
                      setPickupMode("now"); // Set mode to "now"
                      onChange(
                        "pickupTime",
                        new Date().toISOString().slice(0, 16)
                      ); // Set current time
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      pickupMode === "now"
                        ? "bg-[#2af0ea] text-black"
                        : "bg-[#3a3a3a] text-white"
                    }`}
                  >
                    Now
                  </button>

                  {/* "Scheduled" Button */}
                  <button
                    onClick={() => {
                      setPickupMode("scheduled"); // Set mode to "scheduled"
                      onChange("pickupTime", ""); // Clear the time to allow scheduling
                      if (datePickerRef.current) {
                        datePickerRef.current.focus(); // Focus on the date picker
                        // Simulate a click event
                        datePickerRef.current.click();
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      pickupMode === "scheduled"
                        ? "bg-[#2af0ea] text-black"
                        : "bg-[#3a3a3a] text-white"
                    }`}
                  >
                    Scheduled
                  </button>
                </div>

                {/* Date Picker for "Scheduled" */}
                {pickupMode === "scheduled" && (
                  <>
                    <input
                      type="datetime-local"
                      onChange={(e) => onChange("pickupTime", e.target.value)}
                      value={bookingData.pickupTime}
                      placeholder="Select Date/Time"
                      className="w-80 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#2af0ea] focus:border-[#2af0ea] h-10 mt-5"
                      step={900} // 15 minutes in seconds
                      ref={datePickerRef} // Attach the ref
                      min={new Date().toISOString().slice(0, 16)} // Current date/time
                      max={new Date(
                        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(0, 16)} // Current date/time + 30 days
                    />
                  </>
                )}

                {/* Display Selected Time */}
                {bookingData.pickupTime && (
                  <p className="text-md text-gray-100 mt-10">
                    {pickupMode === "now"
                      ? "Pickup time is set to Now/ASAP."
                      : `Scheduling for: ${new Date(
                          bookingData.pickupTime
                        ).toLocaleString()} CST`}
                  </p>
                )}
              </div>
              <button
                onClick={onNext}
                className="w-full bg-[#2af0ea] text-black font-semibold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed mt-12"
                disabled={!bookingData.pickupTime}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <div className="flex justify-center mt-10">
            <TripPlanner
              onChange={handleTripPlannerChange}
              bookingData={bookingData}
            />
          </div>
          <div className=" flex justify-center">
            <button
              onClick={onNext}
              className="w-full bg-[#2af0ea] text-black font-semibold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={
                !localStorage.getItem("pickup") ||
                !localStorage.getItem("destination")
              }
            >
              Next
            </button>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 w-full max-w-md justify-center place-self-center mt-10">
          <div>
            <label className="block text-xl font-medium text-gray-300 mb-1">
              Number of Passengers
            </label>
            <input
              type="number"
              min="1"
              value={bookingData.passengers}
              onChange={(e) => onChange("passengers", e.target.value)}
              className="block w-full bg-[#3a3a3a] text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#2af0ea] focus:border-[#2af0ea]"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-300 mb-1">
              Car Preferences
            </label>
            <small className="text-gray-400">
              *Select your preferred car for the trip
            </small>
            <div className="space-y-2 overflow-auto max-h-[500px]">
              <ImageWithOverlayText
                img={cars[0].img}
                text={cars[0].title}
                description={cars[0].description}
              />
              <ImageWithOverlayText
                img={cars[1].img}
                text={cars[1].title}
                description={cars[1].description}
              />
              <ImageWithOverlayText
                img={cars[2].img}
                text={cars[2].title}
                description={cars[2].description}
              />
              <ImageWithOverlayText
                img={cars[3].img}
                text={cars[3].title}
                description={cars[3].description}
              />

              {cars.map((car, index) => (
                <button
                  key={index}
                  onClick={() => onChange("carPreference", car.name)}
                  className={`flex justify-between w-full p-4 rounded-lg ${
                    bookingData.carPreference === car.name
                      ? "bg-[#3a3a3a] border border-[#2af0ea]"
                      : "bg-[#2a2a2a]"
                  } hover:bg-[#3a3a3a] transition-colors`}
                >
                  <div className="flex space-x-4">
                    <img src={car.img} className="w-16 rounded-lg" />
                    <div>
                      <p className="text-white font-medium">{car.name}</p>
                      <p className="text-sm text-gray-400">
                        {car.time} • {car.eta}
                      </p>
                    </div>
                  </div>
                  <p className="text-white font-medium">{car.price}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onNext}
            className="w-full bg-[#2af0ea] text-black font-semibold py-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={!bookingData.passengers || !bookingData.carPreference}
          >
            Next
          </button>
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Booking Summary</h3>
          <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-2">
            <p className="text-white">
              <CalendarIcon className="h-5 w-5 inline-block mr-2" />
              <strong>Pickup Time:</strong> {bookingData.pickupTime}
            </p>
            <p className="text-white">
              <SewingPinIcon className="h-5 w-5 inline-block mr-2" />
              <strong>Pickup Location:</strong> {bookingData.pickupLocation}
            </p>
            <p className="text-white">
              <SewingPinIcon className="h-5 w-5 inline-block mr-2" />
              <strong>Destination:</strong> {bookingData.destination}
            </p>
            <p className="text-white">
              <SewingPinIcon className="h-5 w-5 inline-block mr-2" />
              <strong>Passengers:</strong> {bookingData.passengers}
            </p>
            <p className="text-white">
              <ChevronRightIcon className="h-5 w-5 inline-block mr-2" />
              <strong>Car Preference:</strong> {bookingData.carPreference}
            </p>
            <p className="text-white">
              <strong>Total:</strong> $48.21
            </p>
          </div>
          <button
            onClick={onNext}
            className="w-full bg-[#2af0ea] text-black font-semibold py-3 rounded-lg"
          >
            Book
          </button>
        </div>
      );
    case 5:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Payment</h3>
          <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Trip Details</h4>
            <p className="text-white">
              <SewingPinIcon className="h-5 w-5 inline-block mr-2" />
              {bookingData.pickupLocation}
            </p>
            <p className="text-white">
              <SewingPinIcon className="h-5 w-5 inline-block mr-2" />
              {bookingData.destination}
            </p>
            <p className="text-white">
              <strong>Total:</strong> $48.21
            </p>
          </div>
          <h4 className="text-sm font-medium text-gray-300">
            Choose Payment Option
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => handlePayment("Google Pay")}
              className="flex items-center justify-between w-full bg-[#3a3a3a] rounded-lg p-4 hover:bg-[#4a4a4a] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-white">Google Pay</span>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </button>
            <button
              onClick={() => handlePayment("PhonePe")}
              className="flex items-center justify-between w-full bg-[#3a3a3a] rounded-lg p-4 hover:bg-[#4a4a4a] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-white">PhonePe</span>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-[#2af0ea] focus:border-[#2af0ea]"
            />
            <button className="bg-[#2af0ea] text-black font-semibold py-3 px-4 rounded-lg">
              Apply
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default App;
