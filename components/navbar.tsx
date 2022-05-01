import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();

  return (
    <Container maxW="container.md" centerContent>
      <Image
        style={{ cursor: "pointer" }}
        width={"200px"}
        height={"200px"}
        onClick={() => router.push("/")}
        src="/1.svg"
        alt="Cristian Sierra"
      />
    </Container>
  );
};

export default NavBar;
