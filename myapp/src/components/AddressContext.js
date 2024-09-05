import React from "react";

export const AddressContext = React.createContext();

export const AddressProvider = ({ children }) => {
  const [selectedAddressesCount, setSelectedAddressesCount] =
    React.useState("");

  return (
    <AddressContext.Provider
      value={{ selectedAddressesCount, setSelectedAddressesCount }}
    >
      {children}
    </AddressContext.Provider>
  );
};
