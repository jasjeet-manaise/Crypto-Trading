import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter basename="/Crypto-Trading">
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
