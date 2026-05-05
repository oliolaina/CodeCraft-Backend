from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Course, Lesson, Task
from .serializers import (
    CourseSerializer,
    LessonSerializer,
    TaskCheckSerializer,
    TaskReadSerializer,
    TaskSerializer,
)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AdminWritePermission]


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.select_related("course").all()
    serializer_class = LessonSerializer
    permission_classes = [AdminWritePermission]

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get("course_id")
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.select_related("lesson").all()
    permission_classes = [AdminWritePermission]

    def get_queryset(self):
        queryset = super().get_queryset()
        lesson_id = self.request.query_params.get("lesson_id")
        if lesson_id:
            queryset = queryset.filter(lesson_id=lesson_id)
        return queryset

    def get_serializer_class(self):
        if self.action in ("list", "retrieve") and not (
            self.request.user.is_authenticated and self.request.user.is_admin
        ):
            return TaskReadSerializer
        return TaskSerializer

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def check(self, request, pk=None):
        task = self.get_object()
        serializer = TaskCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answer = serializer.validated_data["answer"].strip()
        is_correct = answer == task.correct_answer.strip()
        return Response({"task_id": task.id, "is_correct": is_correct}, status=status.HTTP_200_OK)
