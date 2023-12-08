import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = useLoaderData();
  const navigate = useNavigate();
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
    navigate("/login");
    await customFetch.get("/auth/logout");
    toast.success("Logging Out...");
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
