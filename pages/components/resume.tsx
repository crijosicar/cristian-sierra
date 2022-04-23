import { Box, Button, Center } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const GetResumeBtn = () => {
  return (
    <Box>
      <Center>
        <Button
          rightIcon={<ArrowDownIcon />}
          colorScheme="teal"
          variant="outline"
          size="md"
          border="2px"
        >
          Obtain Cristian's Resume
        </Button>
      </Center>
    </Box>
  );
};

export default GetResumeBtn;
