import { useContext, useEffect } from "react";
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
import MyContext from "../useContext/MyContext";

const EditSaleOrderModal = () => {
  const {
    register,
    handleSubmit,
    onEditSubmit,
    errors,
    setValue,
    isEditOpen,
    onEditClose,
    editData
  } = useContext(MyContext);

  useEffect(() => {
    if (isEditOpen && editData) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
      });
    }
  }, [isEditOpen, editData, setValue]);

  return (
    <Modal isOpen={isEditOpen} onClose={onEditClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onEditSubmit)}>
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
                Update Order
              </Button>
              <Button onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default  EditSaleOrderModal;
