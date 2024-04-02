import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
}
