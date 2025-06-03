import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

export function useQueryErrorHandling(client: QueryClient) {
  useEffect(() => {
    const unsubscribe = client.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.query.state.error) {
        const error = event.query.state.error;

        let errorMessage = "An unexpected error occurred while fetching data.";

        if (axios.isAxiosError(error)) {
          const axiosError = error as import("axios").AxiosError;
          if (axiosError.response) {
            errorMessage =
              (axiosError.response.data as { message?: string })?.message ||
              `Server Error: ${axiosError.response.status}`;
          } else if (axiosError.request) {
            errorMessage =
              "Network Error: Please check your internet connection.";
          } else {
            errorMessage = `Request Error: ${axiosError.message}`;
          }
        } else if (error instanceof Error) {
          errorMessage = `Error: ${error.message}`;
        }

        toast.error(errorMessage);
      }
    });

    return () => unsubscribe();
  }, [client]);
}
