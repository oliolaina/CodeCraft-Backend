import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { LessonCard } from '../../components/lesson-card';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import { getCourse, getCourseCompletionPercent, listLessons } from '../../api/coursesApi';
import type { Course, Lesson } from '../../api/types';

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [percent, setPercent] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = Number(courseId);
    if (!courseId || Number.isNaN(id)) {
      navigate('/catalog');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [c, ls, pct] = await Promise.all([
          getCourse(id),
          listLessons(id),
          getCourseCompletionPercent(id).catch(() => null)
        ]);
        if (cancelled) return;
        setCourse(c);
        setLessons(ls);
        setPercent(pct?.completion_percent ?? null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Ошибка загрузки');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId, navigate]);

  if (error) {
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
          <Text>{error}</Text>
          <Link to='/catalog'>← К каталогу</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
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
          <Text>Загрузка курса…</Text>
        </main>
        <Footer />
      </div>
    );
  }

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
        <Heading size={1} style={{ margin: '24px 0' }}>
          {course.title}
        </Heading>
        {percent !== null && (
          <Text style={{ marginBottom: 16 }}>
            Прогресс по курсу: {percent}%
          </Text>
        )}
        <br />
        <Text style={{ lineHeight: 1.6, marginBottom: 24 }}>{course.description || 'Без описания'}</Text>
        <Heading size={2} color='#00F0B1' style={{ marginBottom: 16 }}>
          Уроки
        </Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              level='easy'
              description={`Урок ${lesson.order}`}
              to={`/lesson/${lesson.id}`}
            />
          ))}
        </div>
        {lessons.length === 0 && <Text>Пока нет уроков.</Text>}
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
