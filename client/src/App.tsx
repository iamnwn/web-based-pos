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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="customers" element={<Customers />} />
          <Route path="users" element={<Users />} />
          <Route path="store" element={<Store />} />
          <Route path="stores" element={<Stores />} />

          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="" element={<Navigate to="login" />} />
      </Routes>
    </Router>
  );
}

export default App;
