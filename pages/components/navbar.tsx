import { useRouter } from "next/router";
import { Box, Code } from "@chakra-ui/react";

const NavBar = () => {
  const router = useRouter();

  return (
    <Box p={4}>
      <Code
        as="a"
        href="/"
        onClick={() => router.push("/")}
        children="<Cristian />"
      />
    </Box>
  );
};

export default NavBar;
