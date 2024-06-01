import React from "react";
import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Box
} from "@chakra-ui/react";

const CompletedSaleOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing stored data", error);
      }
    }
  }, []);

  const clearOrders = () => {
    localStorage.removeItem("storedData");
    setData([]);
  };

  return (
    <div>
      <div>
        <TableContainer my={20}>
          <Box mb={"10px"}>
            <Button onClick={clearOrders} color={"white"} bg={"red"}>
              Clear Orders
            </Button>
          </Box>
          <Table variant="simple">
            <TableCaption>Completed sale order details</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Customer Name</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Invoice_Number</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length !== 0 ? (
                data.map((item) => (
                  <Tr key={item.order_id}>
                    <Td>{item.order_id}</Td>
                    <Td>{item.name}</Td>
                    <Td isNumeric>{item.price}-/Rs</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>{item.invoice_no}</Td>
                    <Td>{item.invoice_date}</Td>
                  </Tr>
                ))
              ) : (
                <Text m="10px" color="red">
                  Nothing to show! Go to the +saleOrder for adding orders.
                </Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CompletedSaleOrders;
