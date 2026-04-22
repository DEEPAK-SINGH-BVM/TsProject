import { BrowserRouter, Routes ,Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/PrivateRoute.jsx";
import Dashboard  from "./pages/Dashboard.jsx";

function App() {
  return <div>
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
