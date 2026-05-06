from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Course, Lesson, Task

User = get_user_model()


class CoursesApiTests(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(username="admin", password="adminpass123", is_admin=True)
        self.student = User.objects.create_user(username="student", password="studentpass123")
        self.course = Course.objects.create(title="Django Base", description="desc")
        self.lesson = Lesson.objects.create(course=self.course, title="Intro", content="Content", order=1)
        self.task = Task.objects.create(lesson=self.lesson, question="2+2", task_type="test", correct_answer="4")

    def test_student_cannot_create_course(self):
        self.client.force_authenticate(self.student)
        response = self.client.post(reverse("courses-list"), {"title": "New", "description": ""}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_create_course(self):
        self.client.force_authenticate(self.admin_user)
        response = self.client.post(reverse("courses-list"), {"title": "New", "description": ""}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_task_answer_hidden_for_student(self):
        self.client.force_authenticate(self.student)
        response = self.client.get(reverse("tasks-detail", kwargs={"pk": self.task.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn("correct_answer", response.data)

    def test_task_check_endpoint(self):
        self.client.force_authenticate(self.student)
        response = self.client.post(
            reverse("tasks-check", kwargs={"pk": self.task.id}), {"answer": "4"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["is_correct"])
