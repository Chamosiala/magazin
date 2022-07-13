import { Button, Flex, List, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: Function;
}

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex mt={5} width="inherit">
      <List>
        {pageNumbers.map((number) => (
          <ListItem key={number} display={"inline"}>
            <Button onClick={() => paginate(number)}>{number}</Button>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
