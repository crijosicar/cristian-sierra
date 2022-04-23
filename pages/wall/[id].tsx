import { useRouter } from "next/router";
import { NextPage } from "next";

const Post: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};

export default Post;
