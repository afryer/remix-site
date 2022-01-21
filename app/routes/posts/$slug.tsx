import { useLoaderData, MetaFunction } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";

// type params coming from LoaderFunction which comes from react-router-dom
// 
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

const metaData = () => {
  const posts = useLoaderData();
  console.log(posts);
  return posts;
};

export const meta: MetaFunction = (metaData) => {
  console.log(metaData.data.title);
  return {
    title: `${metaData.data.title} - AnthonyFryer.com`,
    description:
      `${metaData.data.title} - AnthonyFryer.com`
  };
};

export default function postSlug() {
  const post = useLoaderData();
  return (
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  );
};
