from rest_framework.routers import DefaultRouter

from .views import CourseViewSet, LessonViewSet, TaskViewSet

router = DefaultRouter()
router.register("courses", CourseViewSet, basename="courses")
router.register("lessons", LessonViewSet, basename="lessons")
router.register("tasks", TaskViewSet, basename="tasks")

urlpatterns = router.urls
