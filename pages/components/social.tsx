import { Box, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";

interface SocialPage {
  includeLabels?: boolean;
}

const Social = ({ includeLabels = false }: SocialPage) => {
  return (
    <Stack justify="center" direction="row" align="center">
      <ButtonGroup variant="ghost">
        <Box>
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/crijosicar/"
            target={"_blank"}
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          {includeLabels && "LinkedIn"}
        </Box>
        <Box>
          <IconButton
            as="a"
            href="https://github.com/crijosicar"
            target={"_blank"}
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          {includeLabels && "Github"}
        </Box>
        <Box>
          <IconButton
            as="a"
            href="https://twitter.com/crijosicar"
            target={"_blank"}
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
          {includeLabels && "Twitter"}
        </Box>
        {includeLabels && (
          <Box>
            <IconButton
              as="a"
              href="mailto:csierrac09@gmail.com"
              target={"_blank"}
              aria-label="E-Mail me"
              icon={<FaMailBulk fontSize="1.25rem" />}
            />
            {includeLabels && "Mail"}
          </Box>
        )}
      </ButtonGroup>
    </Stack>
  );
};

export default Social;
