from rest_framework import serializers

from .models import UserProgress


class UserProgressSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="lesson.course_id", read_only=True)
    lesson_title = serializers.CharField(source="lesson.title", read_only=True)

    class Meta:
        model = UserProgress
        fields = ("id", "lesson", "lesson_title", "course_id", "completed_at")
        read_only_fields = ("completed_at",)


class MarkCompletedSerializer(serializers.Serializer):
    lesson_id = serializers.IntegerField()
