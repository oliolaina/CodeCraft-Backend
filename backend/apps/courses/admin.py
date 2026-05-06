from django.contrib import admin

from .models import Course, Lesson, Task


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_at", "updated_at")
    search_fields = ("title",)


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "course", "order", "created_at")
    list_filter = ("course",)
    search_fields = ("title", "course__title")


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "lesson", "task_type", "created_at")
    list_filter = ("task_type", "lesson__course")
    search_fields = ("question", "lesson__title")
