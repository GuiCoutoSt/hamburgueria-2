import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { useCart } from "../../contexts/Cart";

interface IProductsProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface IProduct {
  product: IProductsProps;
}

export const ProductCard = ({ product }: IProduct) => {
  const { addToCart, cart, increaseQuantity } = useCart();

  const toast = useToast();

  return (
    <Box
      minW="260px"
      border="2px solid"
      borderColor="gray.100"
      borderRadius="5px"
      m={["10px 10px", "10px 10px", "20px 20px", "none", "none"]}
      _focus={{ borderColor: "green.100" }}
      _hover={{
        borderColor: "green.100",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <Flex
        justifyContent="center"
        w="100%"
        padding="15px 0"
        borderTopRadius="4px"
        bgColor="gray.50"
      >
        <Image src={product.image} alt="product" h="150px" />
      </Flex>
      <Box mt="10px" padding="15px">
        <Stack spacing={5}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text fontSize="xs" color="gray.300">
            {product.category}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="green.100">
            R$ {product.price.toFixed(2)}
          </Text>
          <Button
            onClick={() => {
              if (cart.some((item) => item.id === product.id)) {
                increaseQuantity(product);
                toast({
                  title: "Quantidade alterada!",
                  description: "Quantidade alterada com sucesso",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                });
              } else {
                addToCart(product);
                toast({
                  title: "Produto adicionado!",
                  description: "O produto foi adicionado ao carrinho",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                });
              }
            }}
            w="fit-content"
            bgColor="gray.100"
            color="white"
            _hover={{ bgColor: "green.100" }}
            _active={{ bgColor: "green.100" }}
          >
            Adicionar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
