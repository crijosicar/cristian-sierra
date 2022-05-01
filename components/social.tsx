import { Box, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";

const Social = () => {
  return (
    <Stack justify="center" direction="row" align="center">
      <ButtonGroup variant="ghost">
        <Box as="a" href={"socialData.twitter"} target={"_blank"}>
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          {"LinkedIn"}
        </Box>
        <Box as="a" href={"socialData.twitter"} target={"_blank"}>
          <IconButton
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          {"Github"}
        </Box>
        <Box as="a" href={"socialData.twitter"} target={"_blank"}>
          <IconButton
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
          {"Twitter"}
        </Box>
        <Box as="a" href={`mailto:${"socialData.twitter"}`} target={"_blank"}>
          <IconButton
            aria-label="E-Mail me"
            icon={<FaMailBulk fontSize="1.25rem" />}
          />
          {"Mail"}
        </Box>
      </ButtonGroup>
    </Stack>
  );
};

export default Social;
