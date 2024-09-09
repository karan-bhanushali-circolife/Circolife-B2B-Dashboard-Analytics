import AsidePage from "./AsidePage";
import { Link } from "react-router-dom";
import EChartsReact from "echarts-for-react";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import HeaderPage from "./HeaderPage";
import AddressPopup from "./AddressPopup";
import { AddressContext } from "./AddressContext";

const Analytics = () => {
  const [powerData, setPowerData] = useState([]);
  const [selecteddatetime, setselecteddatetime] = useState("7 Days");
  const [selectedLocation, setSelectedLocation] = useState("Andheri");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);
  const username = localStorage.getItem("username");
  const [customerData, setCustomerData] = useState(null);
  const [selectedDateValue, setSelectedDateValue] = useState("");
  const locations = ["Andheri", "Malad", "Kandivali"];
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { selectedAddressesCount } = useContext(AddressContext);
  const dummyData = {
    Today: {
      Andheri: {
        consumption: [2.5, 2.6, 2.4, 2.7, 3.0, 3.1, 2.8, 2.9],
        totalConsumption: "9.8 kWh",
        currentConsumption: "2.5 kWh",
        electricityBill: "₹ 30",
        co2Saved: "0.5 kg",
        avgTemp: "23°C",
        aqi: "45",
        totalConsumptionSaved: "1.96 kWh", // 20% of 9.8 kWh
        electricityBillSaved: "₹ 6", // 20% of ₹ 30
        currentConsumptionSaved: "0.5 kWh", // 20% of 2.5 kWh
      },
      Malad: {
        consumption: [2.4, 2.5, 2.3, 2.6, 2.9, 3.0, 2.7, 2.8],
        totalConsumption: "9.6 kWh",
        currentConsumption: "2.4 kWh",
        electricityBill: "₹ 29",
        co2Saved: "0.4 kg",
        avgTemp: "22°C",
        aqi: "47",
        totalConsumptionSaved: "2.96 kWh", // 20% of 9.8 kWh
        electricityBillSaved: "₹ 8", // 20% of ₹ 30
        currentConsumptionSaved: "0.4 kWh", // 20% of 2.5 kWh
      },
      Kandivali: {
        consumption: [2.6, 2.7, 2.5, 2.8, 3.1, 3.2, 2.9, 3.0],
        totalConsumption: "10.0 kWh",
        currentConsumption: "2.6 kWh",
        electricityBill: "₹ 31",
        co2Saved: "0.6 kg",
        avgTemp: "24°C",
        aqi: "43",
        totalConsumptionSaved: "2.96 kWh", // 20% of 9.8 kWh
        electricityBillSaved: "₹ 7", // 20% of ₹ 30
        currentConsumptionSaved: "1.5 kWh", // 20% of 2.5 kWh
      },
    },
    "7 Days": {
      Andheri: {
        consumption: [18, 19, 20, 21, 22, 20, 19],
        totalConsumption: "139 kWh",
        currentConsumption: "18 kWh",
        electricityBill: "₹ 1,668",
        co2Saved: "3.5 kg",
        avgTemp: "22°C",
        aqi: "40",
        totalConsumptionSaved: "80.2 kWh", // 20% savings
        electricityBillSaved: "₹ 962.4", // 20% savings
        currentConsumptionSaved: "14.4 kWh", // 20% savings
      },
      Malad: {
        consumption: [17, 18, 19, 20, 21, 19, 18],
        totalConsumption: "135 kWh",
        currentConsumption: "17 kWh",
        electricityBill: "₹ 1,620",
        co2Saved: "3.4 kg",
        avgTemp: "21°C",
        aqi: "42",
        totalConsumptionSaved: "80 kWh",
        electricityBillSaved: "₹ 960",
        currentConsumptionSaved: "13.6 kWh",
      },
      Kandivali: {
        consumption: [19, 20, 21, 22, 23, 21, 20],
        totalConsumption: "146 kWh",
        currentConsumption: "19 kWh",
        electricityBill: "₹ 1,752",
        co2Saved: "3.6 kg",
        avgTemp: "23°C",
        aqi: "38",
        totalConsumptionSaved: "116.8 kWh",
        electricityBillSaved: "₹ 1,401.6",
        currentConsumptionSaved: "15.2 kWh",
      },
    },
    "14 Days": {
      Andheri: {
        consumption: [35, 33, 32, 34, 36, 33, 31, 32, 34, 35, 36, 34, 33, 32],
        totalConsumption: "470 kWh",
        currentConsumption: "35 kWh",
        electricityBill: "₹ 5,640",
        co2Saved: "9.5 kg",
        avgTemp: "21°C",
        aqi: "42",
        totalConsumptionSaved: "176 kWh",
        electricityBillSaved: "₹ 2,112",
        currentConsumptionSaved: "28 kWh",
      },
      Malad: {
        consumption: [34, 32, 31, 33, 35, 32, 30, 31, 33, 34, 35, 33, 32, 31],
        totalConsumption: "456 kWh",
        currentConsumption: "34 kWh",
        electricityBill: "₹ 5,472",
        co2Saved: "9.4 kg",
        avgTemp: "22°C",
        aqi: "45",
        totalConsumptionSaved: "364.8 kWh",
        electricityBillSaved: "₹ 1,968",
        currentConsumptionSaved: "27.2 kWh",
      },
      Kandivali: {
        consumption: [36, 35, 34, 36, 37, 34, 32, 33, 35, 36, 37, 35, 34, 33],
        totalConsumption: "487 kWh",
        currentConsumption: "36 kWh",
        electricityBill: "₹ 5,844",
        co2Saved: "9.7 kg",
        avgTemp: "23°C",
        aqi: "40",
        totalConsumptionSaved: "189.6 kWh",
        electricityBillSaved: "₹ 2,275.2",
        currentConsumptionSaved: "28.8 kWh",
      },
    },
    "1 Month": {
      Andheri: {
        consumption: [
          150, 155, 160, 145, 140, 150, 160, 165, 170, 155, 145, 150,
        ],
        totalConsumption: "1,865 kWh",
        currentConsumption: "150 kWh",
        electricityBill: "₹ 22,380",
        co2Saved: "37 kg",
        avgTemp: "24°C",
        aqi: "48",
        totalConsumptionSaved: "492 kWh",
        electricityBillSaved: "₹ 5,904",
        currentConsumptionSaved: "120 kWh",
      },
      Malad: {
        consumption: [
          145, 150, 155, 140, 135, 145, 155, 160, 165, 150, 140, 145,
        ],
        totalConsumption: "1,835 kWh",
        currentConsumption: "145 kWh",
        electricityBill: "₹ 22,020",
        co2Saved: "36 kg",
        avgTemp: "23°C",
        aqi: "50",
        totalConsumptionSaved: "468 kWh",
        electricityBillSaved: "₹ 5,616",
        currentConsumptionSaved: "116 kWh",
      },
      Kandivali: {
        consumption: [
          160, 165, 170, 155, 150, 160, 170, 175, 180, 165, 155, 160,
        ],
        totalConsumption: "1,940 kWh",
        currentConsumption: "160 kWh",
        electricityBill: "₹ 23,280",
        co2Saved: "38 kg",
        avgTemp: "25°C",
        aqi: "46",
        totalConsumptionSaved: "552 kWh",
        electricityBillSaved: "₹ 6,624",
        currentConsumptionSaved: "128 kWh",
      },
    },
    "3 Months": {
      Andheri: {
        consumption: [
          450, 460, 470, 445, 430, 455, 470, 490, 500, 460, 445, 460,
        ],
        totalConsumption: "5,865 kWh",
        currentConsumption: "450 kWh",
        electricityBill: "₹ 70,380",
        co2Saved: "110 kg",
        avgTemp: "25°C",
        aqi: "50",
        totalConsumptionSaved: "4,692 kWh",
        electricityBillSaved: "₹ 56,304",
        currentConsumptionSaved: "360 kWh",
      },
      Malad: {
        consumption: [
          445, 455, 465, 440, 425, 450, 465, 485, 495, 455, 440, 455,
        ],
        totalConsumption: "5,780 kWh",
        currentConsumption: "445 kWh",
        electricityBill: "₹ 69,360",
        co2Saved: "108 kg",
        avgTemp: "24°C",
        aqi: "53",
        totalConsumptionSaved: "4,624 kWh",
        electricityBillSaved: "₹ 55,488",
        currentConsumptionSaved: "356 kWh",
      },
      Kandivali: {
        consumption: [
          470, 480, 490, 465, 450, 475, 490, 510, 520, 480, 465, 470,
        ],
        totalConsumption: "5,950 kWh",
        currentConsumption: "470 kWh",
        electricityBill: "₹ 71,400",
        co2Saved: "112 kg",
        avgTemp: "26°C",
        aqi: "48",
        totalConsumptionSaved: "4,760 kWh",
        electricityBillSaved: "₹ 57,120",
        currentConsumptionSaved: "376 kWh",
      },
    },
  };
  const [showModal, setShowModal] = useState(false);

  const handleButtonClickedPopupOpen = () => {
    setShowModal(true);
  };

  const handleButtonClickedPopupClose = () => {
    setShowModal(false);
  };
  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  const getChartOptions = () => {
    const data = dummyData[selecteddatetime][selectedLocation] || {};
    const timeLabels =
      selecteddatetime === "Today"
        ? ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"]
        : data.consumption.map((_, index) => `Day ${index + 1}`);

    return {
      xAxis: {
        type: "category",
        data: timeLabels,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.consumption || [],
          type: "line",
          smooth: true,
        },
      ],
    };
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleMouseClick = () => {
      if (isOpen === true) {
        handleButtonClickedPopupClose();
      }
    };
    document.addEventListener("click", handleMouseClick);
  }, []);
  const {
    currentConsumption,
    totalConsumption,
    electricityBill,
    co2Saved,
    avgTemp: averageTemperature,
    aqi,
    totalConsumptionSaved,
    currentConsumptionSaved,
    electricityBillSaved,
  } = dummyData[selecteddatetime][selectedLocation] || {};

  const deviceId = "A0:A3:B3:72:4D:AC";
  const days = "7 days";

  const handleChangeInputDate = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      const today = new Date();
      const options = { day: "numeric", month: "long" };
      const formattedDate = today.toLocaleDateString("en-GB", options);
      setSelectedDateValue(formattedDate);
    } else {
      console.log("Selected date:", inputValue);
      const date = new Date(inputValue);
      const options = { day: "numeric", month: "long" };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      setSelectedDateValue(formattedDate);
    }

    setIsPickerVisible(false);
  };

  return (
    <div className="flex min-h-screen bg-myCustomBackgroundColor font-sans">
      <AsidePage />
      <div className="flex-1 p-6 ml-64">
        <HeaderPage />
        <main>
          {/* <div className="flex py-6 px-6.5 rounded-xl border-custombordercolor border"> */}
          <div className="flex justify-start bg-myCustomBackgroundColor border-countContainerBorderColor shadow-custom-shadow py-6 px-6 rounded-xl mb-10 border-2">
            <div className="flex flex-1 justify-around">
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex justify-around items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3"
                  >
                    <rect
                      y="0.5"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#FFE5FB"
                    />
                    <path
                      d="M15 24.5C19.9706 24.5 24 20.4706 24 15.5C24 10.5294 19.9706 6.5 15 6.5C10.0294 6.5 6 10.5294 6 15.5C6 20.4706 10.0294 24.5 15 24.5Z"
                      fill="#B65DA8"
                    />
                    <path
                      d="M16.5039 12.125L16.8789 6.625L13.5039 12.125L10.1289 17.5H13.6289L13.5039 18.875L13.1289 24.375L16.5039 18.875L19.8789 13.5H16.3789L16.5039 12.125Z"
                      fill="white"
                    />
                  </svg>
                  <p className="text-base font-normal from-neutral-400 leading-normal tracking-tight">
                    Total Units
                  </p>
                </div>
                <p className="mt-3 text-fontCustom font-normal from-neutral-500 text-3xl text-right">
                  141kWh
                </p>
              </div>
              <div className="w-px h-[105px] bg-[#D0D0D0]"></div>
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex gap-2 justify-around items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <rect
                      y="0.5"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#F2E5FF"
                    />
                    <path
                      d="M15 15C14.337 15 13.7011 14.7366 13.2322 14.2678C12.7634 13.7989 12.5 13.163 12.5 12.5C12.5 11.837 12.7634 11.2011 13.2322 10.7322C13.7011 10.2634 14.337 10 15 10C15.663 10 16.2989 10.2634 16.7678 10.7322C17.2366 11.2011 17.5 11.837 17.5 12.5C17.5 12.8283 17.4353 13.1534 17.3097 13.4567C17.1841 13.76 16.9999 14.0356 16.7678 14.2678C16.5356 14.4999 16.26 14.6841 15.9567 14.8097C15.6534 14.9353 15.3283 15 15 15ZM15 5.5C13.1435 5.5 11.363 6.2375 10.0503 7.55025C8.7375 8.86301 8 10.6435 8 12.5C8 17.75 15 25.5 15 25.5C15 25.5 22 17.75 22 12.5C22 10.6435 21.2625 8.86301 19.9497 7.55025C18.637 6.2375 16.8565 5.5 15 5.5Z"
                      fill="#9564C6"
                    />
                  </svg>
                  <p className="text-base font-normal from-neutral-400 leading-normal tracking-tight">
                    Total Locations
                  </p>
                </div>
                <p className="mt-3 text-fontCustom font-normal from-neutral-500 text-3xl text-right">
                  3
                </p>
              </div>
              <div className="w-px h-[105px] bg-[#D0D0D0]"></div>
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex gap-2 justify-around items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <rect
                      y="0.5"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#EBF9FF"
                    />
                    <path
                      d="M14 21.35L11.425 23.875C11.2417 24.0583 11.0127 24.15 10.738 24.15C10.4633 24.15 10.234 24.05 10.05 23.85C9.85 23.6667 9.75 23.4377 9.75 23.163C9.75 22.8883 9.85 22.6507 10.05 22.45L14 18.5V16.5H12L8.025 20.475C7.84167 20.6583 7.61267 20.75 7.338 20.75C7.06333 20.75 6.82567 20.65 6.625 20.45C6.44167 20.2667 6.35 20.0377 6.35 19.763C6.35 19.4883 6.44167 19.259 6.625 19.075L9.15 16.5H5.975C5.69167 16.5 5.45833 16.404 5.275 16.212C5.09167 16.02 5 15.7827 5 15.5C5 15.2173 5.096 14.98 5.288 14.788C5.48 14.596 5.71733 14.5 6 14.5H9.15L6.625 11.95C6.44167 11.7667 6.35 11.5377 6.35 11.263C6.35 10.9883 6.45 10.7507 6.65 10.55C6.83333 10.3667 7.06267 10.275 7.338 10.275C7.61333 10.275 7.85067 10.3667 8.05 10.55L12 14.5H14V12.5L10.025 8.55C9.84167 8.36667 9.75 8.13767 9.75 7.863C9.75 7.58834 9.85 7.35067 10.05 7.15C10.2333 6.96667 10.4627 6.875 10.738 6.875C11.0133 6.875 11.2423 6.96667 11.425 7.15L14 9.65V6.5C14 6.21667 14.096 5.97934 14.288 5.788C14.48 5.59667 14.7173 5.50067 15 5.5C15.2827 5.49934 15.5203 5.59534 15.713 5.788C15.9057 5.98067 16.0013 6.218 16 6.5V9.65L18.55 7.15C18.7333 6.96667 18.9627 6.875 19.238 6.875C19.5133 6.875 19.7507 6.96667 19.95 7.15C20.1333 7.35 20.225 7.58767 20.225 7.863C20.225 8.13834 20.1333 8.36734 19.95 8.55L16 12.5V14.5H18L21.95 10.55C22.1333 10.3667 22.3627 10.275 22.638 10.275C22.9133 10.275 23.1507 10.375 23.35 10.575C23.5333 10.7583 23.625 10.9873 23.625 11.262C23.625 11.5367 23.5333 11.766 23.35 11.95L20.85 14.5H24C24.2833 14.5 24.521 14.596 24.713 14.788C24.905 14.98 25.0007 15.2173 25 15.5C24.9993 15.7827 24.9033 16.0203 24.712 16.213C24.5207 16.4057 24.2833 16.5013 24 16.5H20.85L23.35 19.075C23.5333 19.2583 23.625 19.4877 23.625 19.763C23.625 20.0383 23.5333 20.2673 23.35 20.45C23.15 20.65 22.9127 20.75 22.638 20.75C22.3633 20.75 22.134 20.65 21.95 20.45L18 16.5H16V18.5L19.95 22.475C20.1333 22.6583 20.225 22.8877 20.225 23.163C20.225 23.4383 20.125 23.6757 19.925 23.875C19.7417 24.0583 19.5127 24.15 19.238 24.15C18.9633 24.15 18.734 24.0583 18.55 23.875L16 21.35V24.525C16 24.8083 15.904 25.0417 15.712 25.225C15.52 25.4083 15.2827 25.5 15 25.5C14.7173 25.5 14.48 25.404 14.288 25.212C14.096 25.02 14 24.7827 14 24.5V21.35Z"
                      fill="#268CB2"
                    />
                  </svg>
                  <p className="text-base font-normal from-neutral-400 leading-normal tracking-tight">
                    Total ACS
                  </p>
                </div>
                <p className="mt-3 text-fontCustom font-normal from-neutral-500 text-3xl text-right">
                  27
                </p>
              </div>
              <div className="w-px h-[105px] bg-[#D0D0D0]"></div>
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex gap-2 justify-around items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <rect
                      y="0.5"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#FEEEE1"
                    />
                    <path
                      d="M16.1912 7.38574L24.1057 21.0936C24.2263 21.3026 24.2899 21.5397 24.2899 21.7811C24.2899 22.0224 24.2263 22.2595 24.1057 22.4686C23.985 22.6776 23.8114 22.8512 23.6024 22.9718C23.3934 23.0925 23.1563 23.1561 22.9149 23.1561H7.0859C6.84454 23.1561 6.60744 23.0925 6.39841 22.9718C6.18939 22.8512 6.01582 22.6776 5.89514 22.4686C5.77447 22.2595 5.71094 22.0224 5.71094 21.7811C5.71094 21.5397 5.77447 21.3026 5.89515 21.0936L13.8097 7.38574C14.3386 6.46908 15.6613 6.46908 16.1912 7.38574ZM15.0004 18.2501C14.7573 18.2501 14.5241 18.3467 14.3522 18.5186C14.1803 18.6905 14.0837 18.9236 14.0837 19.1667C14.0837 19.4099 14.1803 19.643 14.3522 19.8149C14.5241 19.9868 14.7573 20.0834 15.0004 20.0834C15.2435 20.0834 15.4767 19.9868 15.6486 19.8149C15.8205 19.643 15.9171 19.4099 15.9171 19.1667C15.9171 18.9236 15.8205 18.6905 15.6486 18.5186C15.4767 18.3467 15.2435 18.2501 15.0004 18.2501ZM15.0004 11.8334C14.7759 11.8334 14.5592 11.9159 14.3914 12.0651C14.2236 12.2143 14.1164 12.4198 14.0902 12.6428L14.0837 12.7501V16.4167C14.084 16.6504 14.1735 16.8751 14.3338 17.045C14.4942 17.2149 14.7134 17.3171 14.9467 17.3308C15.1799 17.3445 15.4096 17.2686 15.5887 17.1187C15.7679 16.9687 15.8831 16.756 15.9107 16.524L15.9171 16.4167V12.7501C15.9171 12.507 15.8205 12.2738 15.6486 12.1019C15.4767 11.93 15.2435 11.8334 15.0004 11.8334Z"
                      fill="#F95C5C"
                    />
                  </svg>
                  <p className="text-base font-normal from-neutral-400 leading-normal tracking-tight">
                    High Alert Devices
                  </p>
                </div>
                <p className="mt-3 text-fontCustom font-normal from-neutral-500 text-3xl text-right">
                  2
                </p>
              </div>
              <div className="w-px h-[105px] bg-[#D0D0D0]"></div>
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex gap-2 justify-around items-center">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <rect
                      y="0.5"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#EBFFE1"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0888 6.5C11.8127 6.5 13.3291 7.47747 14.2049 8.95604C15.1939 8.16607 16.4108 7.7002 17.7266 7.7002C21.0403 7.7002 23.7266 10.655 23.7266 14.3C23.7266 14.5495 23.714 14.7957 23.6895 15.038C25.591 15.5559 27.0007 17.4456 27.0007 19.6973C27.0007 22.1695 25.3016 24.2051 23.1179 24.4684V24.498H6.65483C6.62604 24.4989 6.59717 24.4994 6.56821 24.4994C6.53925 24.4994 6.51038 24.4989 6.48159 24.498H6.25V24.4809C4.4284 24.2682 3 22.2472 3 19.7853C3 17.3743 4.37007 15.386 6.13777 15.1052C5.53565 14.2087 5.17969 13.1 5.17969 11.8998C5.17969 8.91759 7.37756 6.5 10.0888 6.5Z"
                      fill="#A6EE81"
                    />
                    <path
                      d="M12.8306 17.3158C12.8493 17.3157 12.8678 17.3196 12.8848 17.3271C12.9017 17.3346 12.9166 17.3456 12.9285 17.3593L13.1987 17.6343C12.9925 17.8585 12.7374 18.0378 12.4508 18.1599C12.1581 18.2853 11.8039 18.348 11.3885 18.348C11.0288 18.348 10.702 18.289 10.4081 18.1709C10.1226 18.058 9.86594 17.8888 9.65522 17.6746C9.44062 17.4528 9.27611 17.1919 9.17172 16.908C9.05388 16.5926 8.99583 16.2601 9.00023 15.9257C9.00023 15.5684 9.0599 15.2407 9.17925 14.9425C9.28559 14.658 9.45457 14.3981 9.67504 14.1799C9.89551 13.9616 10.1625 13.79 10.4583 13.6764C10.7754 13.5561 11.1145 13.4962 11.4562 13.5002C11.8131 13.5002 12.1285 13.5542 12.4023 13.6622C12.675 13.7697 12.9154 13.9162 13.1234 14.1016L12.8992 14.3964C12.886 14.4184 12.8673 14.4371 12.8448 14.4509C12.8177 14.4658 12.7867 14.4732 12.7553 14.4723C12.7129 14.4723 12.6616 14.4507 12.6014 14.4075C12.4202 14.2767 12.2148 14.1789 11.9958 14.119C11.8192 14.072 11.6363 14.0501 11.4529 14.0542C11.1941 14.0542 10.9568 14.0969 10.741 14.1822C10.5295 14.265 10.3401 14.391 10.1864 14.5513C10.0314 14.712 9.91063 14.9083 9.8242 15.1401C9.73495 15.3927 9.6914 15.6578 9.69537 15.9241C9.69537 16.2191 9.74027 16.4826 9.83005 16.7144C9.91928 16.9462 10.042 17.142 10.1981 17.3016C10.4323 17.5411 10.5361 17.5837 10.7477 17.6675C10.9596 17.7513 11.188 17.7932 11.4328 17.7932C11.5823 17.7932 11.7169 17.7847 11.8368 17.7679C11.9503 17.7529 12.0619 17.727 12.1698 17.6904C12.2693 17.656 12.3644 17.6112 12.4533 17.5569C12.5409 17.5021 12.6282 17.4375 12.7152 17.3632C12.7457 17.3338 12.7871 17.3168 12.8306 17.3158ZM18.5264 15.9264C18.5264 16.281 18.4667 16.6072 18.3474 16.9049C18.2346 17.1892 18.0632 17.4495 17.843 17.6707C17.6223 17.8871 17.3558 18.057 17.0608 18.1694C16.7392 18.2892 16.3961 18.3491 16.0503 18.3456C15.6812 18.3456 15.3449 18.2869 15.0415 18.1694C14.7471 18.0568 14.4812 17.8869 14.261 17.6707C14.039 17.4508 13.8673 17.1901 13.7566 16.9049C13.635 16.5916 13.5743 16.2601 13.5776 15.9264C13.5776 15.5713 13.6373 15.2452 13.7566 14.948C13.8765 14.6514 14.0447 14.3956 14.261 14.1806C14.481 13.9636 14.7469 13.7928 15.0415 13.6796C15.3618 13.5571 15.7048 13.4964 16.0503 13.501C16.4201 13.501 16.7569 13.5605 17.0608 13.6796C17.3648 13.7987 17.6255 13.9657 17.843 14.1806C18.0605 14.3956 18.2286 14.6514 18.3474 14.948C18.4667 15.2452 18.5264 15.5713 18.5264 15.9264ZM17.8288 15.9264C17.8288 15.6346 17.7867 15.3732 17.7025 15.1425C17.6274 14.9256 17.5058 14.7257 17.3453 14.5553C17.1899 14.3943 16.9984 14.2682 16.7848 14.1862C16.5508 14.0978 16.3007 14.0538 16.0487 14.0566C15.7804 14.0566 15.5364 14.0998 15.3167 14.1862C15.1028 14.2681 14.9111 14.3942 14.7554 14.5553C14.5998 14.7149 14.4799 14.9106 14.3957 15.1425C14.3121 15.3738 14.27 15.6351 14.2694 15.9264C14.2694 16.2173 14.3115 16.4781 14.3957 16.7089C14.4794 16.9386 14.5993 17.1338 14.7554 17.2945C14.9105 17.4547 15.0976 17.5769 15.3167 17.6612C15.5364 17.7465 15.7804 17.7892 16.0487 17.7892C16.3191 17.7892 16.5645 17.7465 16.7848 17.6612C17.004 17.5769 17.1908 17.4547 17.3453 17.2945C17.4992 17.1338 17.6182 16.9386 17.7025 16.7089C17.7872 16.4781 17.8293 16.2173 17.8288 15.9264ZM20.8703 20.1736C20.9094 20.1736 20.9409 20.1847 20.9648 20.2068C20.9763 20.218 20.9853 20.2313 20.9913 20.2458C20.9974 20.2603 21.0003 20.2758 21 20.2914V20.5H19.0476V20.3822C19.0488 20.3269 19.0728 20.2742 19.1145 20.2352L20.0514 19.3461C20.1289 19.2713 20.1997 19.1994 20.2638 19.1304C20.3274 19.0619 20.3818 18.9926 20.427 18.9225C20.4716 18.853 20.5062 18.7826 20.5307 18.7115C20.5548 18.6372 20.5672 18.56 20.5675 18.4823C20.5688 18.4096 20.5548 18.3374 20.5265 18.2697C20.5024 18.2123 20.465 18.1607 20.4169 18.1189C20.3688 18.077 20.3113 18.0459 20.2488 18.0279C20.1146 17.9874 19.9703 17.9879 19.8364 18.0295C19.7169 18.0677 19.6152 18.144 19.5486 18.2452C19.5161 18.2966 19.4927 18.3527 19.4792 18.4112C19.463 18.456 19.441 18.486 19.4131 18.5013C19.3852 18.5166 19.3459 18.5208 19.2952 18.5139L19.1053 18.4823C19.1242 18.3569 19.1616 18.2455 19.2174 18.148C19.272 18.0516 19.3415 17.9702 19.4257 17.9038C19.5093 17.839 19.6047 17.7892 19.7118 17.7544C19.8194 17.7207 19.9359 17.7039 20.0614 17.7039C20.1852 17.7039 20.3007 17.721 20.4077 17.7552C20.5107 17.7855 20.6056 17.8363 20.686 17.9042C20.7664 17.9721 20.8304 18.0555 20.8737 18.1488C20.9199 18.2512 20.9427 18.3616 20.9406 18.4728C20.9406 18.5761 20.9244 18.6715 20.8921 18.7589C20.8595 18.8477 20.8151 18.9321 20.7599 19.0103C20.7041 19.0903 20.6397 19.1683 20.5667 19.2442C20.4936 19.3201 20.4164 19.3967 20.335 19.4742L19.5629 20.2179C19.6175 20.2042 19.6727 20.1931 19.7285 20.1847C19.7842 20.1762 19.8381 20.172 19.8899 20.172H20.8703V20.1736Z"
                      fill="#0E0E0F"
                    />
                  </svg>
                  <p className="text-base font-normal from-neutral-400 leading-normal tracking-tight">
                    CO2 Saved
                  </p>
                </div>
                <p className="mt-3 text-fontCustom font-normal from-neutral-500 text-3xl text-right">
                  23 ppm
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-[5%]">
            <div className="w-[85%] lg:w-[70%]">
              <div className="flex flex-col h-full border border-custombordercolor rounded-customBorderRounded px-4 py-2">
                <div className="flex flex-wrap items-center justify-between w-full gap-2 md:gap-4 flex-grow">
                  {["Today", "7 Days", "14 Days", "1 Month", "3 Months"].map(
                    (range) => (
                      <button
                        key={range}
                        className={`flex-1 min-w-[60px] text-sm md:text-base font-normal text-neutral-700 cursor-pointer px-1 md:px-2 py-1 rounded-full hover:bg-hoverFontColor transition-colors ${
                          selecteddatetime === range
                            ? "bg-hoverFontColor"
                            : "bg-transparent"
                        }`}
                        onClick={() => setselecteddatetime(range)}
                      >
                        {range}
                      </button>
                    )
                  )}
                  <div
                    className="bg-calendarWrapperColor rounded-full p-2 md:p-3 cursor-pointer hover:bg-hoverFontColor transition-colors"
                    onClick={handleIconClick}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1029_2811)">
                        <path
                          d="M18.233 2.35041L13.523 2.35043V1.17808C13.523 0.853079 13.2598 0.589844 12.9348 0.589844C12.6098 0.589844 12.3465 0.853079 12.3465 1.17808V2.35014H7.64064V1.17808C7.64064 0.853079 7.37741 0.589844 7.05241 0.589844C6.72741 0.589844 6.46417 0.853079 6.46417 1.17808V2.35014H1.76241C1.1127 2.35014 0.585938 2.8769 0.585938 3.52661V18.2325C0.585938 18.8822 1.1127 19.409 1.76241 19.409H18.233C18.8827 19.409 19.4095 18.8822 19.4095 18.2325V3.52661C19.4095 2.87718 18.8827 2.35041 18.233 2.35041ZM18.233 18.2325H1.76241V3.52661H6.46417V4.11925C6.46417 4.44424 6.72741 4.70749 7.05241 4.70749C7.37741 4.70749 7.64064 4.44424 7.64064 4.11925V3.5269H12.3465V4.11955C12.3465 4.44455 12.6098 4.70778 12.9348 4.70778C13.2598 4.70778 13.523 4.44455 13.523 4.11955V3.5269H18.233V18.2325Z"
                          fill="#0E0E0F"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_1029_2811">
                          <rect
                            width="18.8235"
                            height="18.8235"
                            fill="white"
                            transform="translate(0.585938 0.587891)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <input
                      type="date"
                      ref={dateInputRef}
                      className="absolute opacity-0 w-0 h-0"
                      onChange={handleChangeInputDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div ref={dropdownRef} className="w-[15%] lg:w-[25%]">
              <div
                className="flex items-center border border-custombordercolor rounded-customBorderRounded px-4 py-2 h-full cursor-pointer"
                onClick={handleButtonClickedPopupOpen}
              >
                <p className="text-base from-neutral-400 font-normal">
                  Selected Locations : {selectedAddressesCount}
                </p>
              </div>
              {isOpen && (
                <ul className="absolute mt-1 w-full border border-custombordercolor rounded-customBorderRounded bg-white z-10 overflow-hidden py-4">
                  {locations.map((location) => (
                    <li
                      key={location}
                      className="px-4 py-2 hover:bg-hoverFontColor cursor-pointer"
                      onClick={() => handleSelect(location)}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <p className="from-neutral-500 text-lg ml-[0.25%] text-left mt-14">
            {selectedDateValue}
          </p>
          <div className="flex justify-around">
            <div className="w-3/4 justify-start">
              <EChartsReact
                option={getChartOptions()}
                style={{ height: 400 }}
              />
            </div>
            <div className="grid grid-cols-2 gap-[7%] mb-20">
              <div className="rounded-lg p-2  bg-countContainerOneColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  Total Units
                </p>
                <p className="flex justify-end font-medium text-right text-2xl from-neutral-500  mt-8">
                  {totalConsumption}
                </p>
                <div className="flex flex-1 mt-1 items-center justify-end gap-[2%] ">
                  <div className="">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-2"
                    >
                      <rect
                        x="0.4"
                        y="0.4"
                        width="13.2"
                        height="13.2"
                        rx="6.6"
                        stroke="#1FBF77"
                        stroke-width="0.8"
                      />
                      <path
                        d="M7.70513 6.27324H8.81065L7.42195 8.70292L7.42194 8.70291L7.42002 8.70635L6.5466 10.27L6.62975 8.93029L6.69351 8.15975L6.72934 7.72676H6.29487H5.18935L6.57805 5.29708L6.57806 5.29709L6.57998 5.29365L7.4534 3.72998L7.37025 5.06971L7.30649 5.84025L7.27066 6.27324H7.70513Z"
                        stroke="#1FBF77"
                        stroke-width="0.8"
                      />
                    </svg>
                  </div>
                  <h2 className=" text-customParagraphColor text-sm from-neutral-600 pb-2 font-medium">
                    {totalConsumptionSaved} Saved
                  </h2>
                </div>
              </div>
              <div className="rounded-lg p-2 bg-countContainerTwoColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  Current Consumption
                </p>
                <p className="flex justify-end text-right text-2xl from-neutral-500 font-medium  mt-2">
                  {currentConsumption}
                </p>
                <div className="flex flex-1 mt-1 items-center justify-end gap-[2%]">
                  <div className="mt-0.3">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.4"
                        y="0.4"
                        width="13.2"
                        height="13.2"
                        rx="6.6"
                        stroke="#FFB478"
                        stroke-width="0.8"
                      />
                      <path
                        d="M7.70513 6.27324H8.81065L7.42195 8.70292L7.42194 8.70291L7.42002 8.70635L6.5466 10.27L6.62975 8.93029L6.69351 8.15975L6.72934 7.72676H6.29487H5.18935L6.57805 5.29708L6.57806 5.29709L6.57998 5.29365L7.4534 3.72998L7.37025 5.06971L7.30649 5.84025L7.27066 6.27324H7.70513Z"
                        stroke="#FFB478"
                        stroke-width="0.8"
                      />
                    </svg>
                  </div>
                  <p className=" text-customParagraphTwoColorModified text-sm font-medium from-neutral-600">
                    {currentConsumptionSaved} Saved
                  </p>
                </div>
              </div>
              <div className="rounded-lg p-2 bg-countContainerTwoColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  Electricity bill
                </p>
                <p className="flex justify-end text-right text-2xl from-neutral-500 mt-8 font-medium">
                  {electricityBill}
                </p>
                <div className="flex flex-1 mt-1 items-center justify-end gap-[2%]">
                  <div className="mt-0.3">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.4"
                        y="0.4"
                        width="13.2"
                        height="13.2"
                        rx="6.6"
                        stroke="#F5A463"
                        stroke-width="0.8"
                      />
                      <path
                        d="M5.36364 4H9L8.63636 4.66667H7.45091C7.62545 4.86 7.75636 5.08667 7.83273 5.33333H9L8.63636 6H7.90909C7.8639 6.41554 7.66694 6.80492 7.35013 7.10501C7.03332 7.40509 6.61523 7.59831 6.16364 7.65333V7.66667H5.90909L8.09091 10H7.18182L5 7.66667V7H5.90909C6.54909 7 7.08 6.56667 7.16727 6H5L5.36364 5.33333H7.05818C6.85455 4.94 6.41818 4.66667 5.90909 4.66667H5L5.36364 4Z"
                        fill="#F5A463"
                      />
                    </svg>
                  </div>
                  <p className=" text-customParagraphTwoColorModified text-sm from-neutral-600 font-medium">
                    {electricityBillSaved} Saved
                  </p>
                </div>
              </div>
              <div className="rounded-lg p-2 bg-countContainerOneColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  CO2 saved
                </p>
                <p className="flex justify-end text-right text-2xl font-medium from-neutral-500 mt-14">
                  {co2Saved}
                </p>
              </div>
              <div className="rounded-lg p-2 bg-countContainerThreeColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  Avg Temp
                </p>
                {/* <div className="flex flex-1"> */}
                <p className="flex justify-end text-right text-2xl font-medium from-neutral-500 mt-14 mr-2">
                  {averageTemperature}
                </p>
              </div>
              <div className="rounded-lg p-2 bg-countContainerFourthColor min-w-40 min-h-32">
                <p className="flex justify-start text-left font-normal from-neutral-400 ml-2 text-base">
                  AQI
                </p>
                <div className="flex flex-col">
                  <p className="flex justify-end text-right text-2xl font-medium from-neutral-500 mt-9">
                    {aqi}
                  </p>
                  <p className="font-normal from-neutral-400 text-sm text-right">
                    Moderate
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="my-[1%] mx-[0.80%] w-[80%] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <AddressPopup
                displayModal={showModal}
                handleOpenModal={handleButtonClickedPopupOpen}
                handleCloseModal={handleButtonClickedPopupClose}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Analytics;
