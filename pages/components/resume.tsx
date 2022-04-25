import { Box, Button, Center, useBreakpointValue } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const GetResumeBtn = () => {
  const variant = useBreakpointValue({ base: "solid", md: "outline" });

  return (
    <Box>
      <Center>
        <Button
          rightIcon={<ArrowDownIcon />}
          colorScheme="teal"
          size="md"
          border="2px"
          variant={variant}
        >
          Obtain Cristian's Resume
        </Button>
      </Center>
    </Box>
  );
};

export default GetResumeBtn;
