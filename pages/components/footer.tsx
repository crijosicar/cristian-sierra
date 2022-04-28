import { Center, Container, Stack, Text } from "@chakra-ui/react";
import Social from "./social";

const Footer = () => {
  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack spacing={{ base: "4", md: "5" }}>
        <Social />
        <Center>
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()} Cristian Sierra. All rights
            reserved.
          </Text>
        </Center>
      </Stack>
    </Container>
  );
};

export default Footer;