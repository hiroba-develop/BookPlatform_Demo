import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const noHeaderPaths = ["/login", "/signup"];

  return (
    <div className="min-h-screen bg-background text-sub-2 flex flex-col">
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <main className="p-4 md:p-8 flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
