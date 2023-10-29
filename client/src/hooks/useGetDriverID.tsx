import React from "react";

export const useGetDriverID = () => {
  return window.localStorage.getItem("userID");
};
