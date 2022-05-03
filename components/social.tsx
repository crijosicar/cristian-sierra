import { Box, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";
import { useSocialNetworks } from "../shared/socialNetworks/useSocialNetworks";

const Social = () => {
  const socialNetworks = useSocialNetworks();

  return (
    <Stack justify="center" direction="row" align="center">
      <ButtonGroup variant="ghost">
        {socialNetworks.linkedin && <Box as="a" href={socialNetworks.linkedin} target={"_blank"}>
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          {"LinkedIn"}
        </Box>
        }
        {socialNetworks.github && <Box as="a" href={socialNetworks.github} target={"_blank"}>
          <IconButton
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          {"Github"}
        </Box>
        }
         {socialNetworks.twitter && <Box as="a" href={socialNetworks.twitter} target={"_blank"}>
          <IconButton
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
          {"Twitter"}
        </Box> }
         {socialNetworks.email && <Box as="a" href={`mailto:${socialNetworks.email}`} target={"_blank"}>
          <IconButton
            aria-label="E-Mail me"
            icon={<FaMailBulk fontSize="1.25rem" />}
          />
          {"Mail"}
        </Box> }
      </ButtonGroup>
    </Stack>
  );
};

export default Social;
