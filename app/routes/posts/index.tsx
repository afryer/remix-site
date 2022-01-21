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
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

