import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import LayoutRequireAuth from "./layouts/LayoutRequireAuth";
import LayoutContainer from "./layouts/LayoutContainer";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Order from "./routes/Order";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import Not404 from "./routes/Not404";
import OrderForm from "./components/OrderForm";
import ButtonLoading from "./components/ButtonLoading";
import Branches from "./routes/Branches";
import AddBranch from "./routes/AddBranch";


const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return (
      <div className="container">
      <ButtonLoading text="Cargando...." className="w-1/2 mx-auto"/>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />} >
          <Route index element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<OrderForm />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/add" element={<AddBranch />} />
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
