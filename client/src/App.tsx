import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Sales from "./pages/Sales";
import Store from "./pages/Store";
import Stores from "./pages/Stores";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="home" element={<Home />}>
          <Route
            element={
              <RequireAuth allowedRoles={["admin", "manager", "salesmen"]} />
            }>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["salesmen"]} />}>
            <Route path="sales" element={<Sales />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={["admin", "manager", "salesmen"]} />
            }>
            <Route path="invoices" element={<Invoices />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={["admin", "manager", "salesmen"]} />
            }>
            <Route path="customers" element={<Customers />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="users" element={<Users />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["manager"]} />}>
            <Route path="store" element={<Store />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="stores" element={<Stores />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="products" element={<Products />} />
          </Route>

          <Route path="home" element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="" element={<Navigate to="login" />} />
      </Routes>
    </Router>
  );
}

export default App;
