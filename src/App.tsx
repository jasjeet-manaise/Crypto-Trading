import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQueryErrorHandling } from './hooks/useQueryErrorHandling';
import AppRoutes from './routes/AppRoutes';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error: unknown) => {
          let errorMessage = 'An unexpected error occurred during an operation.';

          if (axios.isAxiosError(error)) {
            const axiosError = error as import('axios').AxiosError;
            if (axiosError.response) {
              errorMessage =
                (axiosError.response.data as { message?: string })?.message ||
                `Server Error: ${axiosError.response.status}`;
            } else if (axiosError.request) {
              errorMessage = 'Network Error: Please check your internet connection.';
            } else {
              errorMessage = `Request Error: ${axiosError.message}`;
            }
          } else if (error instanceof Error) {
            errorMessage = `Error: ${error.message}`;
          }

          toast.error(errorMessage);
          console.error('Global Mutation Error:', error);
        },
      },
    },
  });

  useQueryErrorHandling(client);

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter basename="/Crypto-Trading">
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
