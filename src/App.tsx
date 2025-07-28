import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import RequestPasswordResetPage from "./Pages/RequestPasswordResetPage";
import { fetchUserSession } from "./redux/slices/AuthSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/hooks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserSession());
  }, [dispatch])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/request-password-reset" element={<RequestPasswordResetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
