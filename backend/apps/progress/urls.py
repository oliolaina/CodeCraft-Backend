from django.urls import path

from .views import CourseProgressPercentView, MarkLessonCompletedView, UserProgressListView


urlpatterns = [
    path("", UserProgressListView.as_view(), name="progress-list"),
    path("mark_completed/", MarkLessonCompletedView.as_view(), name="progress-mark-completed"),
    path("course/<int:course_id>/", CourseProgressPercentView.as_view(), name="progress-course-percent"),
]
