from rest_framework import serializers

from .models import Course, Lesson, Task


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ("id", "title", "description", "created_at", "updated_at")


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ("id", "course", "title", "content", "order", "created_at")


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "lesson", "question", "task_type", "correct_answer", "created_at")


class TaskReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "lesson", "question", "task_type", "created_at")


class TaskCheckSerializer(serializers.Serializer):
    answer = serializers.CharField(allow_blank=True)
