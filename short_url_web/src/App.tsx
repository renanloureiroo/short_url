import { QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Me } from "./pages/Me";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="me" element={<Me />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
