import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useState } from "react";
import { useProductsQuery } from "../generated/graphql";
import { Pagination } from "./Pagination";
import { ProductsTableBody } from "./ProductsTableBody";

interface ProductsTableProps {}

export const ProductsTable: React.FC<ProductsTableProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const [{ data, fetching }] = useProductsQuery({ variables: { limit: 10 } });
  // const [, deleteuser] = useDeleteuserMutation();

  let body = null;
  let pagination = null;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (fetching) {
    body = <Tr>loading...</Tr>;
  } else if (!data?.products) {
    body = <Tr>no data.orders</Tr>;
  } else {
    body = <ProductsTableBody products={currentProducts} />;
    pagination = (
      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={data!.products.length}
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
            <Th>Nume</Th>
            <Th>SKU</Th>
            <Th>Pret</Th>
          </Tr>
        </Thead>
        {body}
      </Table>
      {pagination}
    </>
  );
};
