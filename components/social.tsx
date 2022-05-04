import { Box, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";
import { useAboutMeInfo } from "../shared/aboutMeInfo/useAboutMeInfo";

const Social = () => {
  const aboutMeInfo = useAboutMeInfo();

  return (
    <Stack justify="center" direction="row" align="center">
      <ButtonGroup variant="ghost">
        {aboutMeInfo?.social.linkedin && (
          <Box as="a" href={aboutMeInfo?.social.linkedin} target={"_blank"}>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            {"LinkedIn"}
          </Box>
        )}
        {aboutMeInfo?.social.github && (
          <Box as="a" href={aboutMeInfo?.social.github} target={"_blank"}>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            {"Github"}
          </Box>
        )}
        {aboutMeInfo?.social.twitter && (
          <Box as="a" href={aboutMeInfo?.social.twitter} target={"_blank"}>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
            {"Twitter"}
          </Box>
        )}
        {aboutMeInfo?.social.email && (
          <Box
            as="a"
            href={`mailto:${aboutMeInfo?.social.email}`}
            target={"_blank"}
          >
            <IconButton
              aria-label="E-Mail me"
              icon={<FaMailBulk fontSize="1.25rem" />}
            />
            {"Mail"}
          </Box>
        )}
      </ButtonGroup>
    </Stack>
  );
};

export default Social;
