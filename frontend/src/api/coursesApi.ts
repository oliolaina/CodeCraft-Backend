import { apiRequest, fetchAllPages } from './client';
import type {
  Course,
  CourseCompletion,
  Lesson,
  Paginated,
  Task,
  TaskCheckResponse,
  UserProgress
} from './types';

export async function listCourses(): Promise<Course[]> {
  return fetchAllPages<Course>('/api/courses/');
}

export async function getCourse(id: number): Promise<Course> {
  return apiRequest<Course>(`/api/courses/${id}/`);
}

export async function listLessons(courseId: number): Promise<Lesson[]> {
  return fetchAllPages<Lesson>(`/api/lessons/?course_id=${courseId}`);
}

export async function getLesson(id: number): Promise<Lesson> {
  return apiRequest<Lesson>(`/api/lessons/${id}/`);
}

export async function listTasks(lessonId: number): Promise<Task[]> {
  return fetchAllPages<Task>(`/api/tasks/?lesson_id=${lessonId}`);
}

export async function checkTaskAnswer(taskId: number, answer: string): Promise<TaskCheckResponse> {
  return apiRequest<TaskCheckResponse>(`/api/tasks/${taskId}/check/`, {
    method: 'POST',
    body: JSON.stringify({ answer })
  });
}

export async function listProgress(courseId?: number): Promise<UserProgress[]> {
  const suffix = courseId != null ? `?course=${courseId}` : '';
  const data = await apiRequest<UserProgress[] | Paginated<UserProgress>>(`/api/progress/${suffix}`);
  if (Array.isArray(data)) return data;
  return data.results;
}

export async function markLessonCompleted(lessonId: number): Promise<UserProgress> {
  return apiRequest<UserProgress>('/api/progress/mark_completed/', {
    method: 'POST',
    body: JSON.stringify({ lesson_id: lessonId })
  });
}

export async function getCourseCompletionPercent(courseId: number): Promise<CourseCompletion> {
  return apiRequest<CourseCompletion>(`/api/progress/course/${courseId}/`);
}
