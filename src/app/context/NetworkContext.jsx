import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useNetworkToast = () => {
  const offlineToastId = useRef(null);

  useEffect(() => {


    const handleOffline = () => {
      offlineToastId.current = toast.error("Network error. Please check your internet connection", {
        autoClose: true,
        closeButton: true,
        pauseOnHover: true,
      });
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
};
