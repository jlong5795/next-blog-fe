import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import BlogPostIndex from "../components/BlogPostIndex";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "gktcz0d7",
        dataset: "production",
      });

      setMappedPosts(
        posts.map((post) => {
          return {
            ...post,
            mainImage: imgBuilder.image(post.mainImage).width(500).height(200),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <h1>Welcome to my Blog!</h1>
        <h3>Recent Posts:</h3>
        <div className={styles.feed}>
          <BlogPostIndex mappedPosts={mappedPosts} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post"]');
  const url = `https://gktcz0d7.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};
