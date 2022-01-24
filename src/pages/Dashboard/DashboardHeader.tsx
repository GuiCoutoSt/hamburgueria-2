import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { DashboardInput } from "./DashboardInput";

import LogoSecundary from "../../assets/logo-secundary.svg";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

import { useDisclosure } from "@chakra-ui/react";
import { DashboardInputModal } from "./DashboardInputModal";
import { DashboardCartModal } from "./DashboardCartModal";

import { useCart } from "../../contexts/Cart";
import { useAuth } from "../../contexts/Auth";

export const DashboardHeader = () => {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const { cart } = useCart();
  const { signOut } = useAuth();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="80px"
      padding={["0 15px", "0 15px", "0 15px", "0 80px"]}
      bgColor="gray.50"
    >
      <Image src={LogoSecundary} w="200px" />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w={["100px", "100px", "100px", "380px"]}
      >
        <DashboardInput />
        <Box
          onClick={onSearchOpen}
          display={["inherit", "inherit", "inherit", "none"]}
          _hover={{ cursor: "pointer" }}
        >
          <FaSearch size={20} color="#828282" />
        </Box>

        <Box position="relative">
          <Box onClick={onCartOpen} _hover={{ cursor: "pointer" }}>
            <MdShoppingCart size={25} color="#828282" />
          </Box>

          <Text
            w="15px"
            h="15px"
            position="absolute"
            top="-10%"
            left="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
            bgColor="green.100"
            color="white"
            fontSize="xs"
            fontWeight="black"
          >
            {cart.length}
          </Text>
        </Box>
        <Box onClick={signOut} _hover={{ cursor: "pointer" }}>
          <GoSignOut size={20} color="#828282" />
        </Box>
      </Flex>
      <DashboardInputModal
        isSearchOpen={isSearchOpen}
        onSearchOpen={onSearchOpen}
        onSearchClose={onSearchClose}
      />
      <DashboardCartModal
        isCartOpen={isCartOpen}
        onCartOpen={onCartOpen}
        onCartClose={onCartClose}
      />
    </Flex>
  );
};
