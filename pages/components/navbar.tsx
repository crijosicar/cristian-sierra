import { useRouter } from "next/router";
import { Container, Image } from "@chakra-ui/react";

const NavBar = () => {
  const router = useRouter();

  return (
    <Container
      maxW="container.lg"
      as="nav"
      role="contentinfo"
      py={{ base: "10", md: "10" }}
    >
      <Image
        backgroundColor={"white"}
        borderRadius="full"
        boxSize="150px"
        src="./sierraicon.PNG"
        alt="Cristian Sierra"
      />
    </Container>
  );
};

export default NavBar;
