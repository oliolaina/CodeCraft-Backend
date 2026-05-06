from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.courses.models import Course, Lesson

from .models import UserProgress
from .serializers import MarkCompletedSerializer, UserProgressSerializer


class UserProgressListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = UserProgress.objects.filter(user=request.user).select_related("lesson", "lesson__course")
        course_id = request.query_params.get("course")
        if course_id:
            queryset = queryset.filter(lesson__course_id=course_id)
        serializer = UserProgressSerializer(queryset, many=True)
        return Response(serializer.data)


class MarkLessonCompletedView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MarkCompletedSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lesson = get_object_or_404(Lesson, pk=serializer.validated_data["lesson_id"])
        progress, created = UserProgress.objects.get_or_create(user=request.user, lesson=lesson)
        code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(UserProgressSerializer(progress).data, status=code)


class CourseProgressPercentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        course = get_object_or_404(Course, pk=course_id)
        percent = UserProgress.course_completion_percent(request.user, course)
        return Response({"course_id": course.id, "completion_percent": percent})
