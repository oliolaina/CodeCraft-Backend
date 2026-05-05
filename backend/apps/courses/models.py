from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.title


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=255)
    content = models.TextField()
    order = models.PositiveIntegerField(default=1, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("order", "id")
        unique_together = ("course", "order")

    def __str__(self):
        return f"{self.course.title} / {self.title}"


class Task(models.Model):
    TYPE_CHOICES = (
        ("test", "Test"),
        ("text", "Text"),
        ("code", "Code"),
    )

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="tasks")
    question = models.TextField()
    task_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="text")
    correct_answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return f"Task #{self.id} ({self.task_type})"
