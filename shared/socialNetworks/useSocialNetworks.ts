import { useEffect, useState } from "react";
import { Social } from "../../pages/about";

export const useSocialNetworks = (): Social=> {
  const [socialNetworks, setSocialNetworks] = useState<Social>({
    "linkedin": "",
    "twitter": "",
    "email": "",
    "github": ""
  });

  useEffect(() => {
    const fetchSocialNetworks = async () => {
      const aboutData = await fetch(`${process.env.apiURL}/api/about`);
      const socialNetworks = await aboutData.json();

      setSocialNetworks(socialNetworks);
    }

    fetchSocialNetworks().catch(console.error);
  }, []);

  return socialNetworks;
}
