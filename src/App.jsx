import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ActiveSaleOrders from "./pages/ActiveSaleOrders";
import CompletedSaleOrders from "./pages/CompletedSaleOrders";
import SaleOrder from "./pages/SaleOrder";
import SaleOrderModal from "./components/SaleOrderModal";
import { useContext, useState } from "react";
import MyContext from "./useContext/MyContext";
import { Box } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";


function App() {
  const { toggle, handleToggleClick } = useContext(MyContext);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  return (
    <div
      style={{
        backgroundColor: toggle ? "black" : "",
        height: "100vh",
        color: toggle ? "white" : "",
        position:'relative'
      }}
    >
      <Box pos={'absolute'} top="10px" right={'15px'} my="10px" w={"30px"} onClick={handleToggleClick}>
        {!toggle ? (
          <MdDarkMode cursor={"pointer"} fontSize={"30px"} />
        ) : (
          <CiLight cursor={"pointer"} fontSize={"30px"} />
        )}
      </Box>
      <Routes>
        {!authenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/saleorder" />} />
            <Route
              path="/saleorder"
              element={<SaleOrder setAuthenticated={setAuthenticated} />}
            >
              <Route path="" element={<Navigate to="activesaleorders" />} />
              <Route path="activesaleorders" element={<ActiveSaleOrders />} />
              <Route
                path="completedsaleorders"
                element={<CompletedSaleOrders />}
              />
              <Route path="saleordermodal" element={<SaleOrderModal />} />
            </Route>
            <Route path="*" element={<Navigate to="/saleorder" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
