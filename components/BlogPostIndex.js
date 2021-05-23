import { useRouter } from "next/router";
import Link from 'next/link'
import styles from "../styles/Home.module.css";

const BlogPostIndex = ({ mappedPosts }) => {
    const router = useRouter();
  if (mappedPosts.length) {
    return mappedPosts.map((post, index) => {
      return (
        <Link href={`/posts/${post.slug.current}`}><div key={index} className={styles.post}>
          <h3>{post.title}</h3>
          <img className={styles.mainImage} src={post.mainImage} />
        </div>
        </Link>
      );
    });
  }
  return <>No Posts Yet</>;
};

export default BlogPostIndex;
