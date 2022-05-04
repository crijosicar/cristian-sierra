import { Box, Button, Center, useBreakpointValue } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useAboutMeInfo } from "../shared/aboutMeInfo/useAboutMeInfo";

const GetResumeBtn = () => {
  const aboutMeInfo = useAboutMeInfo();
  const variant = useBreakpointValue({ base: "solid", md: "outline" });

  return (
    <Box>
      <Center>
        <Button
          target={"_blank"}
          as="a"
          href={aboutMeInfo?.resumeUrl}
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
