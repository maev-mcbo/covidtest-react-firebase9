import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
