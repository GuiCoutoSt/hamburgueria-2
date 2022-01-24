import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";

import { FaTrash } from "react-icons/fa";

import { useCart } from "../../contexts/Cart";

interface ICartModalProps {
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
}

export const DashboardCartModal = ({
  isCartOpen,
  onCartOpen,
  onCartClose,
}: ICartModalProps) => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    removeFromCart,
    clearCart,
  } = useCart();
  return (
    <>
      <Modal isOpen={isCartOpen} onClose={onCartClose}>
        <ModalOverlay />
        <ModalContent maxW={["350px", "350px", "500px", "500px"]}>
          <ModalHeader
            bgColor="green.100"
            color="white"
            borderRadius="5px 5px 0 0"
          >
            Carrinho de Compras
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody padding="50px">
            {cart.length > 0 ? (
              <Flex flexDirection="column">
                {cart.map((item) => (
                  <Flex key={item.id} justifyContent="space-between" m="10px 0">
                    <Box
                      w="80px"
                      padding="5px"
                      borderRadius="5px"
                      bgColor="gray.100"
                    >
                      <Image src={item.image} />
                    </Box>
                    <Flex
                      flexDirection="column"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      w="60%"
                    >
                      <Text fontSize="xl" fontWeight="bold">
                        {item.name}
                      </Text>
                      <Flex justifyContent="center" alignItems="center">
                        <Button
                          onClick={() => decreaseQuantity(item)}
                          h="30px"
                          borderRadius="0"
                          fontSize="xs"
                          bgColor="gray.100"
                          color="red.50"
                        >
                          -
                        </Button>
                        <Text
                          h="30px"
                          padding="5px 10px"
                          border="1px solid"
                          fontSize="xs"
                          borderColor="gray.100"
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          onClick={() => increaseQuantity(item)}
                          h="30px"
                          borderRadius="0"
                          fontSize="xs"
                          bgColor="gray.100"
                          color="red.50"
                        >
                          +
                        </Button>
                      </Flex>
                    </Flex>
                    <Box
                      onClick={() => removeFromCart(item)}
                      _hover={{ cursor: "pointer" }}
                    >
                      <FaTrash color="#e0e0e0" size={18} />
                    </Box>
                  </Flex>
                ))}

                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  borderTop="1px solid"
                  borderTopColor="gray.100"
                  mt="10px"
                  padding="5px 0"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    Total
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="gray.300">
                    R$ {cartTotal().toFixed(2)}
                  </Text>
                </Flex>

                <Button onClick={clearCart} w="100%" mt="20px">
                  Remover Todos
                </Button>
              </Flex>
            ) : (
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  Sua sacola está vazia :(
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Adicione itens
                </Text>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
