"use client";
import { Provider } from "react-redux";
import ReactQueryProviders from "@/utils/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ui/errorBoundary";
import { store } from "@/ReduxToolkit/store";
import { useNetworkToast } from "@/app/context/NetworkContext";

export default function ClientProviders({ children }) {

  useNetworkToast();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastContainer limit={1} />
        <ReactQueryProviders>
          {children}
        </ReactQueryProviders>
      </Provider>
    </ErrorBoundary>
  );
}
