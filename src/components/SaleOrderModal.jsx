import { useContext } from "react";
import { useEffect } from "react";
import React from "react";
import MyContext from "../useContext/MyContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000).toString();
};

const SaleOrderModalForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isOpen,
    onOpen,
    onClose,
  } = useContext(MyContext);
  useEffect(() => {
    if (isOpen) {
      const randomId = generateRandomId();
      setValue("order_id", randomId);
    }
  }, [isOpen, setValue]);

  return (
    <>
      <Button onClick={onOpen} my="10px">
        Create Sale Order
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  {...register("name", { required: true })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  {...register("quantity", { required: true, min: 1 })}
                />
                {errors.quantity && (
                  <p>Quantity is required and must be at least 1</p>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...register("price", { required: true, min: 0 })}
                />
                {errors.price && (
                  <p>Price is required and must be at least 0</p>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Invoice No.</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter invoice no."
                  {...register("invoice_no", { required: true })}
                />
                {errors.invoice_no && <p>Invoice no. is required</p>}
              </FormControl>

              <FormControl>
                <FormLabel>Invoice Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Select invoice date"
                  {...register("invoice_date", { required: true })}
                />
                {errors.invoice_date && <p>Invoice date is required</p>}
              </FormControl>

              <FormControl>
                <Checkbox {...register("paid", { required: false })}>
                  Paid
                </Checkbox>
              </FormControl>

              <ModalFooter>
                <Button type="submit" colorScheme="blue">
                  Create Order
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaleOrderModalForm;
