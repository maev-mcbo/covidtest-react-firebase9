import { Outlet } from "react-router-dom";

function LayoutContainer() {
  return (
    <div className="w-1/2 mx-auto">  
         <Outlet />
    </div>
  );
};

export default LayoutContainer;
