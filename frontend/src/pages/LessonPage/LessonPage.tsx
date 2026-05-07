import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { CodeBlock } from '../../components/code-block';
import { Heading, Text } from '../../components/typography';
import { Button } from '../../components/button';
import { TaskBlock } from '../../components/task-block';
import styles from '../page.module.css';
import {
  getLesson,
  listTasks,
  listProgress,
  markLessonCompleted,
  getCourse
} from '../../api/coursesApi';
import type { Lesson, Task } from '../../api/types';

function renderContentParagraphs(content: string) {
  const parts = content.split(/\n\n+/).filter(Boolean);
  return parts.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n');
      const langLine = lines[0].replace(/^```/, '').trim();
      const end = lines.findIndex((l, i) => i > 0 && l.trim() === '```');
      const code =
        end > 0 ? lines.slice(1, end).join('\n') : lines.slice(1).join('\n').replace(/```$/, '');
      const language = langLine || 'python';
      return (
        <div key={index} className={styles.block}>
          <CodeBlock code={code.trim()} language={language} />
        </div>
      );
    }
    return (
      <div key={index} className={styles.block}>
        <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{trimmed}</Text>
      </div>
    );
  });
}

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<number>>(new Set());
  const [markMsg, setMarkMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const id = Number(lessonId);

  const refreshProgress = useCallback(async (courseId: number) => {
    try {
      const progress = await listProgress(courseId);
      setCompletedLessonIds(new Set(progress.map((p) => p.lesson)));
    } catch {
      setCompletedLessonIds(new Set());
    }
  }, []);

  useEffect(() => {
    if (!lessonId || Number.isNaN(id)) {
      navigate('/catalog');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const l = await getLesson(id);
        if (cancelled) return;
        setLesson(l);
        const [ts, course] = await Promise.all([listTasks(id), getCourse(l.course)]);
        if (cancelled) return;
        setTasks(ts);
        setCourseTitle(course.title);
        await refreshProgress(l.course);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Ошибка загрузки урока');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId, id, navigate, refreshProgress]);

  const isCompleted = lesson ? completedLessonIds.has(lesson.id) : false;

  const handleMarkCompleted = async () => {
    if (!lesson) return;
    try {
      await markLessonCompleted(lesson.id);
      setMarkMsg('Урок отмечен как пройденный.');
      await refreshProgress(lesson.course);
    } catch (e) {
      setMarkMsg(e instanceof Error ? e.message : 'Не удалось сохранить прогресс');
    }
  };

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
        </main>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
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
          <Text>Загрузка урока…</Text>
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
        <div className={styles.lessonHeader}>
          <Heading size={1} style={{ margin: '30px 0' }}>
            {lesson.title}
          </Heading>
          <Text style={{ lineHeight: '40px', margin: '0' }}>Курс: {courseTitle}</Text>
          {isCompleted && (
            <Text
              color='#00F0B1'
              style={{ lineHeight: '40px', border: '#00F0B1 2px solid', padding: '4px 12px' }}
            >
              Урок пройден
            </Text>
          )}
        </div>

        {renderContentParagraphs(lesson.content)}

        {tasks.map((task) => (
          <TaskBlock
            key={task.id}
            task={task}
            language='python'
            onSolved={() => refreshProgress(lesson.course)}
          />
        ))}

        <div style={{ margin: '32px 0' }}>
          <Button label='Отметить урок пройденным' sizeType='little' onClick={handleMarkCompleted} />
          {markMsg && <Text style={{ marginTop: 12 }}>{markMsg}</Text>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonPage;
