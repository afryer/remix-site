import { Link, useLoaderData, MetaFunction } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";

export const loader = () => {
  return getPosts();
};
export const meta: MetaFunction = () => {
  return {
    title: "Anthony Fryer - blog posts",
    description:
      "Anthony Fryer all the posts"
  };
};
export default function Posts() {
  // and this is the call for the data. 
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      {posts.map(post => (
        <div className="post-intro" key={post.slug}>
          <h2>
            <Link to={post.slug}>{post.title}</Link>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: post.teaser }} />
        </ div>
      ))}
    </div>
  );
}

