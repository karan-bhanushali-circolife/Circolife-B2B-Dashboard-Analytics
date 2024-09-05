import { useState, useEffect, useContext } from "react";
import { AddressContext } from "./AddressContext";
const AddressPopup = ({
  displayModal,
  handleDisplayModal,
  handleCloseModal,
}) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [customSelect, setCustomSelect] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState({});
  // const [selectedAddressesCount, setSelectedAddressesCount] = useState("");
  const { selectedAddressesCount, setSelectedAddressesCount } =
    useContext(AddressContext);
  const userAddresses = [
    {
      id: "100",
      userAddress:
        "1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "101",
      userAddress:
        "2nd Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "102",
      userAddress:
        "3rd Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "103",
      userAddresses:
        "Flat-100  1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue",
    },
    {
      id: "104",
      userAddress:
        "Flat-101 1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "105",
      userAddress:
        "Flat-102 Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "106",
      userAddress:
        "Flat-103 1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
    {
      id: "107",
      userAddress:
        "Flat-104 1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
    },
  ];
  const [matchingUserAddress, setMatchingUserAddress] = useState(userAddresses);
  const [maxSelectedAddress, setMaxSelectedAddress] = useState(
    userAddresses.length
  );
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setCustomSelect(false);
    const newSelectedAddresses = {};
    userAddresses.forEach((address) => {
      newSelectedAddresses[address.id] = isChecked;
    });
    setSelectedAddresses(newSelectedAddresses);
    // setSelectedAddressesCount(selectedAddresses.length());
    setSelectedAddressesCount(Object.keys(selectedAddresses).length);
    // if (selectedAddresses.length() === 0) {
    if (Object.keys(selectedAddresses).length === 0) {
      setSelectedAddresses("Null");
    }
    // } else if (selectedAddressesCount === maxSelectedAddress) {
    else if (selectedAddressesCount === maxSelectedAddress) {
      setSelectedAddressesCount("All");
    } else {
      // setSelectedAddressesCount(selectedAddresses.length());
      setSelectedAddressesCount(Object.keys(selectedAddresses).length);
    }
  };

  const handleCustomSelect = (e) => {
    const isChecked = e.target.checked;
    setCustomSelect(isChecked);
    setSelectAll(false);
    setSelectedAddresses({});
    setSelectedAddressesCount("Null");
  };

  const handleAddressSelect = (id) => {
    setSelectedAddresses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    const allSelected = userAddresses.every(
      (address) => selectedAddresses[address.id] || address.id === id
    );

    setSelectAll(allSelected);
    setCustomSelect(!allSelected);
  };
  const handleInputChangeAddress = (e) => {
    const input = e.target.value;
    setLocationQuery(input);

    if (input.length > 0) {
      const filtered = userAddresses.filter((order) =>
        order.userAddress?.toLowerCase().includes(input.toLowerCase())
      );
      setMatchingUserAddress(filtered);
    } else {
      setMatchingUserAddress(userAddresses);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="rounded-xl bg-background w-[60%] h-[75%] border m-[20%] max-w-[90%] max-h-[90%] p-8">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search location"
            value={locationQuery}
            onChange={handleInputChangeAddress}
            // className="w-full py-4 px-16 pr-20 border placeholder:text-subtext rounded-full border-gray-300 text-base bg-background outline-primary"
            className="w-full py-4 px-14 pr-20 border border-borderborder rounded-full bg-background outline-primary placeholder:font-extralight font-extralight text-sm appearance-none"
          />
          {/* className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none ml-2" */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none ml-2"
          >
            <g clip-path="url(#clip0_972_5167)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.62694 1.83301C8.38449 1.83311 7.16007 2.13034 6.05584 2.69989C4.95162 3.26945 3.99961 4.09481 3.27924 5.10712C2.55887 6.11942 2.09103 7.28933 1.91476 8.51921C1.73848 9.7491 1.85888 11.0033 2.2659 12.1772C2.67293 13.3511 3.35478 14.4106 4.25458 15.2674C5.15437 16.1242 6.246 16.7534 7.43841 17.1025C8.63082 17.4516 9.88942 17.5104 11.1092 17.2742C12.329 17.0379 13.4746 16.5134 14.4504 15.7443L17.7981 19.092C17.971 19.259 18.2025 19.3514 18.4429 19.3493C18.6832 19.3472 18.9132 19.2508 19.0831 19.0808C19.2531 18.9109 19.3495 18.681 19.3516 18.4406C19.3536 18.2003 19.2613 17.9687 19.0943 17.7958L15.7466 14.4482C16.6523 13.2992 17.2162 11.9185 17.3738 10.4641C17.5314 9.00964 17.2763 7.54019 16.6378 6.22393C15.9993 4.90766 15.0031 3.79775 13.7632 3.02122C12.5234 2.24469 11.0899 1.83291 9.62694 1.83301ZM3.66861 9.62467C3.66861 8.04443 4.29636 6.5289 5.41376 5.4115C6.53117 4.29409 8.04669 3.66634 9.62694 3.66634C11.2072 3.66634 12.7227 4.29409 13.8401 5.4115C14.9575 6.5289 15.5853 8.04443 15.5853 9.62467C15.5853 11.2049 14.9575 12.7204 13.8401 13.8379C12.7227 14.9553 11.2072 15.583 9.62694 15.583C8.04669 15.583 6.53117 14.9553 5.41376 13.8379C4.29636 12.7204 3.66861 11.2049 3.66861 9.62467Z"
                fill="#A49F9F"
              />
            </g>
            <defs>
              <clipPath id="clip0_972_5167">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <button
            className="rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 text-primary border-primary border-2 py-1 px-4 mr-2"
            onClick={handleCloseModal}
          >
            Done
          </button>
        </div>
        <div className="flex flex-row my-[1.60%] gap-16">
          <div className="flex flex-row gap-3.5">
            <input
              type="checkbox"
              id="selectAllCheckbox"
              name="selectAllCheckbox"
              className="w-6 h-6 rounded-none border"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <p for="myCheckbox" className="text-neutral-400 text-base">
              Select all
            </p>
          </div>
          <div className="flex flex-row gap-3.5">
            <input
              type="checkbox"
              id="customCheckbox"
              name="customCheckbox"
              className="w-6 h-6 rounded-none border"
              checked={customSelect}
              onChange={handleCustomSelect}
            />
            <p for="myCheckbox" className="text-neutral-400 text-base">
              Custom
            </p>
          </div>
        </div>
        {/* <div className="grid grid-cols-4 gap-4 p-4"> */}
        <div className="grid grid-cols-4 gap-4">
          {/* {userAddresses.map((address) => ( */}
          {matchingUserAddress.map((address) => (
            <div
              key={address.id}
              className="flex flex-row items-start space-x-2"
            >
              <input
                type="checkbox"
                id={`checkbox-${address.id}`}
                name={`checkbox-${address.id}`}
                className="w-6 h-6 mt-1 rounded-none flex-shrink-0"
                checked={selectedAddresses[address.id] || false}
                onChange={() => handleAddressSelect(address.id)}
              />
              <div className="border-2 p-2 rounded-lg bg-background w-full h-48 overflow-hidden flex flex-col">
                <p className="text-base text-servicetext font-normal text-left flex-grow overflow-hidden">
                  {address.userAddress || address.userAddresses}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AddressPopup;
