import { Table, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useState } from "react";
import { useUsersQuery } from "../generated/graphql";
import { Pagination } from "./Pagination";
import { UsersTableBody } from "./UsersTableBody";

interface UsersTableProps {}

export const UsersTable: React.FC<UsersTableProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [{ data, fetching }] = useUsersQuery({ variables: { limit: 10 } });
  // const [, deleteuser] = useDeleteuserMutation();

  let body = null;
  let pagination = null;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (fetching) {
    body = <Tr>loading...</Tr>;
  } else if (!data?.users) {
    body = <Tr>no data.users</Tr>;
  } else {
    body = <UsersTableBody users={currentUsers} />;
    pagination = (
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={data!.users.length}
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
            <Th>Alias</Th>
            <Th>Nume</Th>
            <Th>Permisiune</Th>
          </Tr>
        </Thead>
        {body}
      </Table>
      {pagination}
    </>
  );
};
