import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Index from "./components/index";
import DieticianPage from "./components/DieticianPage";
import GymBuddyPage from "./components/GymBuddyPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dietician" element={<DieticianPage />} />
          <Route path="/gym-buddy" element={<GymBuddyPage />} />
          
        </Routes>
      </AppLayout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;