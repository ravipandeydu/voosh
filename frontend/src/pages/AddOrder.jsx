import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../Redux/order/order.actions";

const AddOrder = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const { loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [subTotal, setSubTotal] = useState(0);

  function handleAddOrder(e) {
    e.preventDefault();
    try {
      dispatch(
        postOrder(token, {
          userId: user._id,
          phone_number: user.phone_number,
          sub_total: subTotal,
        })
      ).then(() => {
        navigate("/order");
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Box align={"center"}>
      <Heading my={"40px"}>Add Order</Heading>
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Sub Total</FormLabel>
          <Input
            value={subTotal}
            onChange={(e) => setSubTotal(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          {loading ? (
            <Button
              isLoading
              loadingText="Loading"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="end"
            >
              Add
            </Button>
          ) : (
            <Button variant="solid" colorScheme="blue" onClick={handleAddOrder}>
              Add
            </Button>
          )}
        </CardFooter>
      </Card>
      {error ? <Box>Something Went Wrong</Box> : ""}
    </Box>
  );
};

export default AddOrder;
