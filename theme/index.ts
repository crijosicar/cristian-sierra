import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import styles from "./styles";

const config: ThemeConfig = {
  initialColorMode: 'system',
}

const overrides = {
  styles,
  config
};

export default extendTheme(overrides);
