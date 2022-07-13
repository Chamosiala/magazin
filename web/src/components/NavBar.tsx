import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  let employeePanel = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Intra in cont</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Cont nou</Link>
        </NextLink>
      </>
    );
  } else {
    employeePanel = (
      <Flex>
        {data.me.permission && (
          <NextLink href="/employee/">
            <Link mr={2} color="accent">
              Interfata angajati
            </Link>
          </NextLink>
        )}
      </Flex>
    );
    body = (
      <Flex>
        <NextLink href="/user/details">
          <Link mr={2} color="white">
            {data.me.username}
          </Link>
        </NextLink>
        <NextLink href="/">
          <Button
            onClick={() => {
              logout();
            }}
            mr={2}
            isLoading={logoutFetching}
            variant="link"
            color={"#F7F6F1"}
          >
            Log out
          </Button>
        </NextLink>
        <NextLink href="/cart/products">
          <Link textColor={"accent"}>Cos</Link>
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="primary" p={4} ml={"auto"}>
      <Flex mr={"auto"}>
        <NextLink href="/">
          <Link mr={2} color="white" textColor={"lightFont"}>
            Magazin
          </Link>
        </NextLink>
        {employeePanel}
      </Flex>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
