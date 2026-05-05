from django.db import models

from apps.courses.models import Course, Lesson


class UserProgress(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="progress_entries")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="progress_entries")
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "lesson")
        ordering = ("-completed_at",)
        indexes = [
            models.Index(fields=("user", "lesson")),
        ]

    def __str__(self):
        return f"{self.user.username} -> {self.lesson_id}"

    @classmethod
    def course_completion_percent(cls, user, course: Course):
        total_lessons = course.lessons.count()
        if total_lessons == 0:
            return 0
        completed_lessons = cls.objects.filter(user=user, lesson__course=course).count()
        return int((completed_lessons / total_lessons) * 100)
