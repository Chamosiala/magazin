import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useState } from "react";
import { useOrdersQuery } from "../generated/graphql";
import { OrdersTableBody } from "./OrdersTableBody";
import { Pagination } from "./Pagination";

interface OrdersTableProps {}

export const OrdersTable: React.FC<OrdersTableProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  const [{ data, fetching }] = useOrdersQuery({ variables: { limit: 10 } });
  // const [, deleteuser] = useDeleteuserMutation();

  let body = null;
  let pagination = null;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = data?.orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (fetching) {
    body = <Tr>loading...</Tr>;
  } else if (!data?.orders) {
    body = <Tr>no data.orders</Tr>;
  } else {
    body = <OrdersTableBody orders={currentOrders} />;
    pagination = (
      <Pagination
        itemsPerPage={ordersPerPage}
        totalItems={data!.orders.length}
        paginate={paginate}
      />
    );
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Utilizator</Th>
            <Th>Subtotal</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        {body}
      </Table>
      {pagination}
    </>
  );
};
