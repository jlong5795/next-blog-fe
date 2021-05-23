import { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import styles from '../../styles/Post.module.css'

import NavBar from '../../components/NavBar'

export const Post = ({ body, image, title }) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId: 'gktcz0d7',
            dataset: 'production'
        });

        setImageUrl(imgBuilder.image(image))
    }, [image])

  return (
      <div>
          <div className={styles.main}>
            <NavBar />
            <h1>{title}</h1>
            {imageUrl && <img src={imageUrl} className={styles.mainImage} />}
            <div className={styles.body}>
                <BlockContent blocks={body} />
            </div>
          </div>
      </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    notFound: true;
  }

  const query = encodeURIComponent(`*[ _type == 'post' && slug.current == '${pageSlug}' ]`);
  const url = `https://gktcz0d7.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    notFound: true;
  }

  return {
    props: {
      body: post.body,
      image: post.mainImage,
      title: post.title,
    },
  };
};

export default Post;
