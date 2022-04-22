import { Menu, MenuButton } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<AddIcon />}
        variant="outline"
        onClick={() => router.push("/")}
      />
    </Menu>
  );
};

export default NavBar;
