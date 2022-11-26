import { createContext, ReactNode, useState } from "react";
import { ILoadingContext } from "../interfaces/context";
import LoadingSpinner from "../components/LoadingSpinner";

export const LoadingContext = createContext<ILoadingContext | null>(null);

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => setLoading(!loading);

  const value = {
    toggleLoading,
    loading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {loading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
