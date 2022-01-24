import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PrimaryLogo from "../../assets/logo-primary.svg";

import { FiShoppingBag } from "react-icons/fi";

export const SideInfo = () => {
  return (
    <Flex w={["380px", "380px", "380px", "350px"]} flexDirection="column">
      <Image src={PrimaryLogo} alt="Logo" w="220px" />
      <Flex
        border="2px solid"
        borderColor="gray.100"
        borderRadius="5px"
        padding="15px"
        margin="20px 0"
      >
        <Box padding="20px" borderRadius="5px" bgColor="green.50">
          <FiShoppingBag size={20} style={{ color: "#219653" }} />
        </Box>
        <Text fontSize="sm" ml="4">
          A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b>{" "}
          ingredientes.
        </Text>
      </Flex>
    </Flex>
  );
};
