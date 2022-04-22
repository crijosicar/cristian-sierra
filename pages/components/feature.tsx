import { Box, Heading, Text } from "@chakra-ui/react";

interface FeaturePage {
  title: string;
  desc: string;

  [index: string]: any;
}

const Feature = ({ title, desc, ...rest }: FeaturePage) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading as="a" color="teal.400" href="#" fontWeight="bold" fontSize="xl">
        {title}
      </Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};

export default Feature;
