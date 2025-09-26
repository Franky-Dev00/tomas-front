import NavBar from "@/compoments/nav-bar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
