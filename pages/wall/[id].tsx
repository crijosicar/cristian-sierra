import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Post: NextPage = () => {
  const router = useRouter();
  const [postId, setPostId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) return null;
      setPostId(id.toString());
    }
  }, [router.isReady]);

  return <p>Post: {postId}</p>;
};

export default Post;
