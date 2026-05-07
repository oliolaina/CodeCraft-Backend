import styles from '../page.module.css';
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { BlogCard } from '../../components/blog-card';
import { Heading, Text } from '../../components/typography';

interface Blog {
  id: number;
  title: string;
  image: string;
  content: string;
  link: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    import('../../data/blogs.json').then((data) => {
      setBlogs(data.blogs);
    });
  }, []);

  return (
    <div className={styles.page}>
      <Header
        links={[
          { label: 'О проекте', to: '/#first' },
          { label: 'Блог', to: '/blog' },
          { label: 'Каталог', to: '/catalog' }
        ]}
        profileLink={{ label: 'Профиль', to: '/profile' }}
      />
      <main className={styles.main}>
        <Heading
          style={{
            color: '#00f0b1',
            margin: '32px 0 32px 5%',
            fontSize: '36px',
            fontFamily: 'monospace'
          }}
        >
          Блог
        </Heading>
        <Text
          style={{
            fontFamily: 'Comfortaa',
            color: '#BBFAE9',
            margin: '40px 0 40px 5%',
            lineHeight: '1.5'
          }}
        >
          Здесь Вы можете узнать последние новости из мира IT и почитать статьи о программировании.
        </Text>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, margin: '5% 0' }}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.content}
              image={blog.image}
              to={blog.link}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
