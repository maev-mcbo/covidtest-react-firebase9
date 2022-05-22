import { UserContext } from "./context/UserProvider";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import LayoutContainer from "./layouts/LayoutContainer";
import LayoutRequireAuth from "./layouts/LayoutRequireAuth";

import ButtonLoading from "./components/buttons/ButtonLoading";
import OrderForm from "./components/OrderForm";

import OrderDetails from "./routes/OrderDetails";
import Dashboard from "./routes/Dashboard";
import AddBranch from "./routes/AddBranch";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import Branches from "./routes/Branches";
import Profile from "./routes/Profile";
import Not404 from "./routes/Not404";
import Order from "./routes/Order";
import Login from "./routes/Login";
import Home from "./routes/Home";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return (
      <div className="container">
        <div className="w-1/2 mx-auto">
          <ButtonLoading text="Cargando...." />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />

        <Route path="/" element={<LayoutRequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<OrderForm />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/add" element={<AddBranch />} />
          <Route path="/order/orderdetail/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/" element={<LayoutContainer />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<Not404 />} />
      </Routes>
    </>
  );
};

export default App;
