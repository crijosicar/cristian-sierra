import { Container, useBreakpointValue, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const location = useBreakpointValue({ base: "center", md: "right" });

  return (
    <Container maxW="container.lg" as="nav">
      <Image
        alignSelf={location}
        onClick={() => router.push("/")}
        boxSize="200px"
        src="./1.svg"
        alt="Cristian Sierra"
      />
    </Container>
  );
};

export default NavBar;
