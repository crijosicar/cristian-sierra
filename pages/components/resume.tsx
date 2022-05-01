import { Box, Button, Center, useBreakpointValue } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const GetResumeBtn = ({ resumeUrl }: { resumeUrl: string }) => {
  const variant = useBreakpointValue({ base: "solid", md: "outline" });

  return (
    <Box>
      <Center>
        <Button
          target={"_blank"}
          as="a"
          href={resumeUrl}
          rightIcon={<ArrowDownIcon />}
          colorScheme="teal"
          size="md"
          border="2px"
          variant={variant}
        >
          Obtain Cristian&apos;s Resume
        </Button>
      </Center>
    </Box>
  );
};

export default GetResumeBtn;
