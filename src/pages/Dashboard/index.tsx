import { Button, Flex } from "@chakra-ui/react";
import { DashboardHeader } from "./DashboardHeader";

import { ProductCard } from "../../components/ProductCard";

import { useStore } from "../../contexts/Store";

export const Dashboard = () => {
  const { data, getProducts } = useStore();

  return (
    <>
      <DashboardHeader />

      <Flex
        w="100%"
        h="100%"
        mt={3}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          w="fit-content"
          maxW="1250px"
          flexWrap={["nowrap", "nowrap", "wrap", "wrap", "wrap"]}
          justifyContent={["flex-start", "flex-start", "center"]}
          overflow={["scroll", "", "", "", ""]}
          borderRightRadius="10px"
          sx={{
            "&::-webkit-scrollbar": {
              width: "5px",
              height: "2px",
              borderRadius: "8px",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {data.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Flex>
      </Flex>
      <Flex justifyContent="center" mt="20px">
        {data.length < 8 && data.length !== 0 && (
          <Button onClick={getProducts} bgColor="red.50" color="white">
            Voltar
          </Button>
        )}
      </Flex>
    </>
  );
};
