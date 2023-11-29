import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Navbar, SmallSideBar } from "../components";

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  //Temp
  const user = { name: "Omar" };
  const [showSidebar, setSidebar] = useState(false);
  const [isDarkTheme, setDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const darkTheme = !isDarkTheme;
    setDarkTheme(darkTheme);
    document.body.classList.toggle("dark-theme", darkTheme);
    localStorage.setItem("darkTheme", darkTheme);
  };

  const toggleSidebar = () => {
    setSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const logoutUser = async () => {
    console.log("Logging Out...");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
