from django.contrib import admin
from .models import News, ContactMessage  # استيراد الموديلات

# تسجيل الجداول لتظهر في لوحة التحكم
admin.site.register(News)
admin.site.register(ContactMessage)
from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
