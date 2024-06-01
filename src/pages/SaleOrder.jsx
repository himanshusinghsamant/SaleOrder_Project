import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const SaleOrder = ({setAuthenticated}) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('authenticated');
    navigate('/login');
    setAuthenticated(null)
  }

  return (
    <div>
      <Box p={"50px"} w="100vw">
        <Flex>
          <Button onClick={handleLogout} bg={'red'} color='white' my={'10px'} variant="solid">
            LogOut
          </Button>
        </Flex>

        <Flex border={"1px solid gray"} p={5} justifyContent="space-between">
          <Flex wrap={"wrap"} gap={3} w="30%" justifyContent="space-between">
            <NavLink to={"activesaleorders"}>
              <Button colorScheme="teal" variant="solid">
                Active Sale Orders
              </Button>
            </NavLink>
            <NavLink to={"completedsaleorders"}>
              <Button colorScheme="teal" variant="solid">
                Completed Sale Orders
              </Button>
            </NavLink>
          </Flex>
          <NavLink to={"saleordermodal"}>
            <Button colorScheme="teal" variant="solid">
              + Sale Order
            </Button>
          </NavLink>
        </Flex>

        <Outlet />
      </Box>
    </div>
  );
};

export default SaleOrder;
