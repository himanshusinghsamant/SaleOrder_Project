import React, { useState } from "react";
import MyContext from "./MyContext";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@chakra-ui/react";

const MyProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleToggleClick = () => {
    setToggle(!toggle);
  };

  const onSubmit = (data) => {
    setFormData((prev) => [...prev, data]);
    onClose();
    alert('Your Order is successfully created for checking active order go to the (active sale orders) ! ')
    reset();
  };

  const onEditSubmit = (data) => {
    setFormData((prev) => prev.map(item => item.order_id === data.order_id ? data : item));
    onEditClose();
    alert('Data is successfully updated ! check your (active sale orders)')
  };

  const handle_OrderDone = () => {
    const prevData = localStorage.getItem('storedData');
    let parsedPrevData = [];

    if (prevData) {
      try {
        parsedPrevData = JSON.parse(prevData);
      } catch (error) {
        console.error('Error parsing stored data', error);
      }
    }

    const updatedData = [...new Set([...parsedPrevData, ...formData])];
    localStorage.setItem('storedData', JSON.stringify(updatedData));

    setFormData([])
    alert('Your Order is completed, check (completed sale orders) !')
  };

  return (
    <MyContext.Provider
      value={{
        toggle,
        handleToggleClick,
        register,
        handleSubmit,
        onSubmit,
        onEditSubmit,
        errors,
        setValue,
        formData,
        isOpen,
        onClose,
        onOpen,
        isEditOpen,
        onEditOpen,
        onEditClose,
        setEditData,
        editData,
        handle_OrderDone
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
