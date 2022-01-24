import { Input, InputGroup, IconButton } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import { useStore } from "../../contexts/Store";
import { SetStateAction, useState } from "react";

export const DashboardInput = () => {
  const { filterProducts } = useStore();

  const [search, setSearch] = useState("");
  return (
    <InputGroup
      display={["none", "none", "none", "inherit"]}
      w="280px"
      padding="5px"
      border="2px solid"
      borderRadius="5px"
      borderColor="gray.100"
      bgColor=""
    >
      <Input
        value={search}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setSearch(e.target.value)
        }
        fontSize="xs"
        placeholder="Digitar Pesquisa"
        border="none"
        _focus={{ boxShadow: "none" }}
      />

      <IconButton
        onClick={() => filterProducts(search)}
        aria-label="Search products"
        icon={<FaSearch color="white" />}
        bgColor="green.100"
        _hover={{ bgColor: "green.50" }}
        _active={{ bgColor: "green.50" }}
      />
    </InputGroup>
  );
};
