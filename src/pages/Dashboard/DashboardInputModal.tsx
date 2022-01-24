import {
  Modal,
  ModalContent,
  InputGroup,
  Input,
  IconButton,
} from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

import { useStore } from "../../contexts/Store";

import { SetStateAction, useState } from "react";

interface IModalProps {
  isSearchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

export const DashboardInputModal = ({
  isSearchOpen,
  onSearchOpen,
  onSearchClose,
}: IModalProps) => {
  const { filterProducts } = useStore();

  const [search, setSearch] = useState("");
  return (
    <>
      <Modal isOpen={isSearchOpen} onClose={onSearchClose}>
        <ModalContent w="fit-content">
          <InputGroup
            display={["inherit", "inherit", "inherit", "none"]}
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
        </ModalContent>
      </Modal>
    </>
  );
};
