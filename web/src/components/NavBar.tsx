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
  // const [{ data: cartData, fetching: cartFetching }] = useCartItemsQuery({
  //   pause: isServer(),
  //   variables: { limit: 50 },
  // });
  let body = null;

  // useEffect(() => {
  //   console.log(cartData?.cartItems.length);
  // }, [cartData]);

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/user/details">
          <Link mr={2} color="white">
            {data.me.username}
          </Link>
        </NextLink>
        <Button
          onClick={() => {
            logout();
          }}
          mr={2}
          isLoading={logoutFetching}
          variant="link"
          color={"#F7F6F1"}
        >
          Logout
        </Button>
        <NextLink href="/cart/products">
          <Link color={"accent"}>Cart</Link>
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="primary" p={4} ml={"auto"}>
      <Box mr={"auto"}>
        <NextLink href="/">
          <Link mr={2} color="white" textColor={"lightFont"}>
            Magazin
          </Link>
        </NextLink>
      </Box>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
