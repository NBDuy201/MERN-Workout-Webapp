import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      staleTime: 4 * (60 * 1000), // 4 minutes
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
