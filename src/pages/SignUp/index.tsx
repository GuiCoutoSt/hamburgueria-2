import { Button, Flex, Grid, Text, VStack, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Form";
import { SideInfo } from "../../components/SideInfo";

import { Link } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCallback } from "react";

import { api } from "../../services/api";

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignUp = () => {
  const toast = useToast();

  const schema = yup.object().shape({
    name: yup.string().required("Por favor, informe seu nome"),
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    password: yup.string().required("Senha é obrigatória"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Senhas não conferem"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: yupResolver(schema),
  });

  const submit = useCallback(async ({ name, email, password }: ISignUpData) => {
    api
      .post("/register", {
        name,
        email,
        password,
      })
      .then(() => {
        toast({
          title: "Cadastro realizado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Ops, algo deu errado!",
          description: "Tente novamente mais tarde...",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
      <Flex
        w={["400px", "400px", "800px"]}
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <SideInfo />
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
            <Flex w="100%">
              <Text w="100% " fontSize="xl" fontWeight="bold" textAlign="left">
                Cadastro
              </Text>
              <Link
                href="/"
                w={["55%", "55%", "55%", "50%"]}
                fontSize="xs"
                outline="none"
              >
                Retomar para o login
              </Link>
            </Flex>

            <Input
              name="name"
              label="Nome"
              error={errors.name?.message}
              placeholder="Insira seu nome"
              register={register}
            />
            <Input
              name="email"
              label="Email"
              error={errors.email?.message}
              type="email"
              placeholder="Seu melhor email"
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
            <Input
              name="password-confirmation"
              label="Confirmar Senha"
              error={errors.passwordConfirmation?.message}
              type="password"
              placeholder="******"
              register={register}
            />
            <Button
              type="submit"
              w="100%"
              fontSize="sm"
              bgColor="gray.100"
              color="gray.300"
              _hover={{ bgColor: "gray.300", color: "gray.100" }}
            >
              {" "}
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
