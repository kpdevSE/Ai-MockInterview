import React from "react";
import HeaderComponent from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <HeaderComponent />
      <div className="mx-5 md:mx-20 lgmx-36">{children}</div>
    </div>
  );
}

export default DashboardLayout;
