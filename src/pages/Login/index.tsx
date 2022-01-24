import { Button, Flex, Grid, Text, VStack, useToast } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../contexts/Auth";

import { Input } from "../../components/Form";
import { SideInfo } from "../../components/SideInfo";

interface ISignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const toast = useToast();

  const history = useHistory();

  const { signIn } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: yupResolver(schema),
  });

  const submit = (data: ISignInData) => {
    console.log(data);
    signIn(data)
      .then((_) => {
        toast({
          title: "Login realizado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Email ou senha inválidos",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
      <Flex
        w={["400px", "400px", "800px"]}
        flexDirection={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          onSubmit={handleSubmit(submit)}
          as="form"
          w={["380px", "380px", "380px", "400px"]}
          border="2px solid"
          borderColor="gray.100"
          borderRadius="5px"
          padding="20px"
        >
          <VStack spacing={4}>
            <Text w="100% " fontSize="xl" fontWeight="bold" textAlign="left">
              Login
            </Text>
            <Input
              name="email"
              label="Email"
              error={errors.email?.message}
              placeholder="Insira seu email"
              register={register}
            />
            <Input
              name="password"
              label="Senha"
              error={errors.password?.message}
              type="password"
              placeholder="******"
              register={register}
            />
            <Button
              type="submit"
              w="100%"
              fontSize="sm"
              bgColor="green.100"
              color="white"
              _hover={{ bgColor: "green.50" }}
              _active={{ bgColor: "green.50" }}
            >
              Logar
            </Button>
            <Text w="220px" fontSize="xs" textAlign="center" color="grey.100">
              Crie sua conta para saborear muitas delícias e matar sua fome
            </Text>
            <Button
              w="100%"
              fontSize="sm"
              bgColor="gray.100"
              color="gray.300"
              _hover={{ bgColor: "gray.300", color: "gray.100" }}
              onClick={() => history.push("/signup")}
            >
              {" "}
              Cadastrar
            </Button>
          </VStack>
        </Grid>
        <SideInfo />
      </Flex>
    </Flex>
  );
};
