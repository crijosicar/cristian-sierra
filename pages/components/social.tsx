import { ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Social = () => {
  return (
    <Stack justify="center" direction="row" align="center">
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/crijosicar/"
          target={"_blank"}
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="https://github.com/crijosicar"
          target={"_blank"}
          aria-label="GitHub"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="https://twitter.com/crijosicar"
          target={"_blank"}
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  );
};

export default Social;
