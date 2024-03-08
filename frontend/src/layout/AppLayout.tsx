import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Blog from "../pages/Blog";
import Blogs from "../pages/Blogs";
import AppBar from "../components/AppBar";
import { Publish } from "../pages/Publish";

export default function AppLayout() {
  const Layout = () => {
    return (
      <>
        <AppBar />
        <Outlet />
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Layout />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
