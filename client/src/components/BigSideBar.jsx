import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";

export const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSideBar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
