import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogOut";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar h-dvh bg-black w-[120px] outline outline-gray-500 outline-[1px]">
      <div className="brand text-center py-3 text-2xl text-slate-400  font-bold outline outline-gray-500 outline-[1px]">
        DEV <br /> POS
      </div>
      <div className="menu grid gap-5 py-5 text-center ">
        <Link to={"/home/dashboard"}>
          <Button
            variant={
              location.pathname === "/home/dashboard" ? "default" : "ghost"
            }
            className="w-[100px] h-[50px]">
            Dashboard
          </Button>
        </Link>

        {auth?.userRole === "salesmen" ? (
          <Link to={"/home/sales"}>
            <Button
              variant={
                location.pathname === "/home/sales" ? "default" : "ghost"
              }
              className=" w-[100px] h-[50px]">
              Sales
            </Button>
          </Link>
        ) : null}
        <Link to={"/home/invoices"}>
          <Button
            variant={
              location.pathname === "/home/invoices" ? "default" : "ghost"
            }
            className=" w-[100px] h-[50px]">
            Invoices
          </Button>
        </Link>
        <Link to={"/home/customers"}>
          <Button
            variant={
              location.pathname === "/home/customers" ? "default" : "ghost"
            }
            className=" w-[100px] h-[50px]">
            Customers
          </Button>
        </Link>
        {auth?.userRole === "manager" ? (
          <Link to={"/home/store"}>
            <Button
              variant={
                location.pathname === "/home/store" ? "default" : "ghost"
              }
              className=" w-[100px] h-[50px]">
              Store
            </Button>
          </Link>
        ) : null}
        {auth?.userRole === "admin" ? (
          <>
            <Link to={"/home/stores"}>
              <Button
                variant={
                  location.pathname === "/home/stores" ? "default" : "ghost"
                }
                className=" w-[100px] h-[50px]">
                Stores
              </Button>
            </Link>
            <Link to={"/home/products"}>
              <Button
                variant={
                  location.pathname === "/home/products" ? "default" : "ghost"
                }
                className=" w-[100px] h-[50px]">
                Products
              </Button>
            </Link>
            <Link to={"/home/users"}>
              <Button
                variant={
                  location.pathname === "/home/users" ? "default" : "ghost"
                }
                className=" w-[100px] h-[50px]">
                Users
              </Button>
            </Link>
          </>
        ) : null}

        <Button onClick={signOut}>Sign out</Button>
      </div>
    </nav>
  );
};

export default Sidebar;
