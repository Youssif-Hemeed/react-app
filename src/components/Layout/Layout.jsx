import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <Outlet />
      </div>

      <div>
        <Offline>
          <div className="network">
            <i className="fas fa-wifi pe-2"></i>
            You Are Offline (Check Your Connection)
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  );
}
