import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Link,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  useCreateUserPermissionMutation,
  useDeleteUserPermissionMutation,
  User,
} from "../generated/graphql";

interface UsersTableBodyProps {
  users: User[];
}

export const UsersTableBody: React.FC<UsersTableBodyProps> = ({ users }) => {
  const [, createUserPermission] = useCreateUserPermissionMutation();
  const [, deleteUserPermission] = useDeleteUserPermissionMutation();

  return (
    <>
      <Tbody>
        {users!.map((user) =>
          !user ? (
            <Tr>Niciun utilizator</Tr>
          ) : (
            <>
              <Tr key={user.id}>
                <Td>
                  <NextLink
                    href="/employee/admin/user/[id]"
                    as={`/employee/admin/user/${user.id}`}
                  >
                    <Link>{user.id}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink
                    href="/employee/admin/user/[id]"
                    as={`/employee/admin/user/${user.id}`}
                  >
                    <Link>{user.username}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink
                    href="/employee/admin/user/[id]"
                    as={`/employee/admin/user/${user.id}`}
                  >
                    <Link>
                      {user.firstName} {user.lastName}
                    </Link>
                  </NextLink>
                </Td>
                <Td>{user.permission}</Td>
                <Flex>
                  <Button
                    bgColor="primary"
                    mr={2}
                    as={Link}
                    onClick={() => {
                      user.permission = "angajat";
                      createUserPermission({
                        userId: user.id,
                        permission: "angajat",
                      });
                    }}
                  >
                    Desemneaza angajat
                  </Button>
                  <Button
                    colorScheme="red"
                    mr={2}
                    as={Link}
                    onClick={() => {
                      user.permission = "";
                      deleteUserPermission({
                        userId: user.id,
                      });
                    }}
                  >
                    Revoca permisiunea
                  </Button>
                  <IconButton
                    mr={2}
                    colorScheme="red"
                    onClick={() => {
                      // deleteuser({ id: user.id });
                    }}
                    aria-label="Delete user"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Tr>
            </>
          )
        )}
      </Tbody>
    </>
  );
};
