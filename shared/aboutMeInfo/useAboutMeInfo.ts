import { useEffect, useState } from "react";
import { About } from "../../pages/about";

export const useAboutMeInfo = (): About | undefined => {
  const [aboutMeInfo, setAboutMeInfo] = useState<About>();

  useEffect(() => {
    const fetchAboutMeInfo = async () => {
      const aboutData = await fetch(`${process.env.apiURL}/api/about`);
      const aboutMeInfo = await aboutData.json();

      setAboutMeInfo(aboutMeInfo);
    };

    fetchAboutMeInfo().catch(console.error);
  }, []);

  return aboutMeInfo;
};
