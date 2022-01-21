import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
// Since we're reading in a file, the type system has no idea what's in there,
// so we need a runtime check,
// for that we'll want an invariant method to make runtime checks

import invariant from "tiny-invariant";
// can use any markdown parser but this is easy
import { marked } from "marked";
import postSlug from "./routes/posts/$slug";

export type Post = {
  slug: string;
  title: string;
};

type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

// relative to the server output not the source
const postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  console.log({ attributes }, { body });

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

export async function getPosts() {
  // returns the files from the filepath
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    // map over files
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);
  return getPost(post.slug);
}
