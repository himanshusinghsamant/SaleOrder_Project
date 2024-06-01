import {
  TableContainer,
  Text,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useContext } from "react";
import MyContext from "../useContext/MyContext";
import EditSaleOrderModal from "../components/EditSaleOrderModal";

const ActiveSaleOrders = () => {
  const { formData, setEditData, onEditOpen, handle_OrderDone } =
    useContext(MyContext);

  const handleEditClick = (item) => {
    setEditData(item);
    onEditOpen();
  };

  return (
    <div>
      <Box mt={"20px"}>
        {formData.length > 0?
        <Button onClick={handle_OrderDone} color={"white"} bg={"green"}>
          Click For Order Done!
        </Button>:
        ""
        }
        
      </Box>
      <TableContainer my={20}>
        <Table variant="simple">
          <TableCaption>active sale order details</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Customer Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Invoice_Number</Th>
              <Th>Date</Th>
              <Th>Edit/View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {formData.length !== 0 ? (
              formData.map((item) => (
                <Tr key={item.order_id}>
                  <Td>{item.order_id}</Td>
                  <Td>{item.name}</Td>
                  <Td isNumeric>{item.price}-/Rs</Td>
                  <Td isNumeric>{item.quantity}</Td>
                  <Td isNumeric>{item.invoice_no}</Td>
                  <Td>{item.invoice_date}</Td>
                  <Td cursor="pointer" onClick={() => handleEditClick(item)}>
                    <BsThreeDots />
                  </Td>
                </Tr>
              ))
            ) : (
              <Text m="10px" color="orange">
                Order is not created ! Go to the +SaleOrder for adding orders.
              </Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <EditSaleOrderModal />
    </div>
  );
};

export default ActiveSaleOrders;
