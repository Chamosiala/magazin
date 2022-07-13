import { Link, Select, Tbody, Td, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { OrderDetails, useSetOrderStatusMutation } from "../generated/graphql";

interface OrdersTableBodyProps {
  orders: OrderDetails[];
}

export const OrdersTableBody: React.FC<OrdersTableBodyProps> = ({ orders }) => {
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(0);
  const [, setOrderStatus] = useSetOrderStatusMutation();
  const change = (event) => {
    console.log("hello");
    setOrderStatus({
      orderId: orderIdToUpdate,
      orderStatus: event.target.value,
    });
  };

  return (
    <Tbody>
      {orders.map((order) =>
        !order ? (
          <Tr>Nicio comanda</Tr>
        ) : (
          <Tr key={order.id}>
            <Td>
              <NextLink
                href="/employee/order/[id]"
                as={`/employee/order/${order.id}`}
              >
                <Link>{order.id}</Link>
              </NextLink>
            </Td>
            <Td>
              <NextLink
                href="/employee/admin/user/[id]"
                as={`/employee/admin/user/${order.userId}`}
              >
                <Link>{order.userId}</Link>
              </NextLink>
            </Td>
            <Td>{order.total} lei</Td>
            <Td>
              <Select
                placeholder={order.status}
                onClick={() => {
                  setOrderIdToUpdate(order.id);
                }}
                onChange={change}
              >
                <option value="In asteptare">In asteptare</option>
                <option value="In lucru">In lucru</option>
                <option value="In curs de livrare">In curs de livrare</option>
                <option value="Finalizata">Finalizata</option>
                <option value="Anulata">Anulata</option>
              </Select>
            </Td>
          </Tr>
        )
      )}
    </Tbody>
  );
};
