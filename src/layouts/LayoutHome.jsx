import { Outlet } from "react-router-dom";

function LayoutHome() {
  return (
    <div className="w-1/2 mx-auto">  
         <Outlet />
    </div>
  );
};

export default LayoutHome;
