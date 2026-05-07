export interface UserProfile {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number;
  course: number;
  title: string;
  content: string;
  order: number;
  created_at: string;
}

export type TaskType = 'test' | 'text' | 'code';

export interface Task {
  id: number;
  lesson: number;
  question: string;
  task_type: TaskType;
  created_at: string;
  correct_answer?: string;
}

export interface UserProgress {
  id: number;
  lesson: number;
  lesson_title: string;
  course_id: number;
  completed_at: string;
}

export interface CourseCompletion {
  course_id: number;
  completion_percent: number;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface TaskCheckResponse {
  task_id: number;
  is_correct: boolean;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
