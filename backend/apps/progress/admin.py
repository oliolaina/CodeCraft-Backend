from django.contrib import admin

from .models import UserProgress


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "lesson", "completed_at")
    list_filter = ("lesson__course",)
    search_fields = ("user__username", "lesson__title")
