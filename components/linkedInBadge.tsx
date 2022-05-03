import Script from "next/script";
import { AspectRatio } from "@chakra-ui/react";

const LinkedInBadge = () => {
  return (
   <>
     <AspectRatio maxW='400px' ratio={4 / 3}>
       <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark"
            data-type="HORIZONTAL" data-vanity="crijosicar" data-version="v1"><a
         className="badge-base__link LI-simple-link" href="https://ca.linkedin.com/in/crijosicar?trk=profile-badge">Cristian
         José Sierra Cardenas</a>
       </div>
     </AspectRatio>
     <Script src="https://platform.linkedin.com/badges/js/profile.js" />
   </>
  );
};

export default LinkedInBadge;
