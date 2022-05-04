import { useEffect, useState } from "react";

export const useResumeUrl = (): string => {
  const [resumeUrl, setSocialNetworks] = useState<string>("");

  useEffect(() => {
    const fetchSocialNetworks = async () => {
      const aboutData = await fetch(`${process.env.apiURL}/api/about`);
      const parsedAboutData = await aboutData.json();

      setSocialNetworks(parsedAboutData.resumeUrl);
    }

    fetchSocialNetworks().catch(console.error);
  }, []);

  return resumeUrl;
}
