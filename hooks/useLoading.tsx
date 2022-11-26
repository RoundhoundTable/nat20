import { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider";

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context)
    throw new Error("useLoading can only be used inside LoadingProvider");

  return context;
};

export default useLoading;
