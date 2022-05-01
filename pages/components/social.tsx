import { Box, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";
import { GetServerSideProps, NextPage } from "next";
import db from "../../utils/db";
import { AboutData } from "../about";

type SocialComponentProps = {
  socialData: AboutData;
};

const Social: NextPage<SocialComponentProps> = ({
  socialData,
}: SocialComponentProps) => {
  console.log(`Social => socialData => ${JSON.stringify(socialData)}`);

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

const getServerSideProps: GetServerSideProps = async () => {
  const aboutPageProps = await db.collection("about").get();
  const [socialData] = aboutPageProps.docs.map((doc) => doc.data());

  console.log(`getServerSideProps => socialData => ${socialData}`);

  return {
    props: {
      socialData: JSON.parse(JSON.stringify(socialData)),
    },
  };
};

export default Social;
