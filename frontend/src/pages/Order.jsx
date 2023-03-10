import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../Redux/order/order.actions";

const Order = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const loading = useSelector((state) => state.order.loading);
  const order = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(token, user._id));
  }, []);
  console.log(order);
  return (
    <Box>
      <Heading>Order</Heading>
      {order.length > 0 ? (
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Phone Number</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order?.map((ord) => (
                  <Tr>
                    <Td>{ord.phone_number}</Td>
                    <Td>{ord.sub_total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>
          You have no order{" "}
          <Button>
            <Link to={"/addorder"}>Click Here to Add Order</Link>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Order;
