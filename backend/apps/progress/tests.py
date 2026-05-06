from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.courses.models import Course, Lesson

User = get_user_model()


class ProgressApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="u1", password="pass12345")
        self.course = Course.objects.create(title="Python", description="")
        self.lesson1 = Lesson.objects.create(course=self.course, title="L1", content="c1", order=1)
        self.lesson2 = Lesson.objects.create(course=self.course, title="L2", content="c2", order=2)
        self.client.force_authenticate(self.user)

    def test_mark_completed_and_percent(self):
        mark_response = self.client.post(
            reverse("progress-mark-completed"), {"lesson_id": self.lesson1.id}, format="json"
        )
        self.assertIn(mark_response.status_code, (status.HTTP_201_CREATED, status.HTTP_200_OK))

        percent_response = self.client.get(reverse("progress-course-percent", kwargs={"course_id": self.course.id}))
        self.assertEqual(percent_response.status_code, status.HTTP_200_OK)
        self.assertEqual(percent_response.data["completion_percent"], 50)
