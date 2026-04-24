from django.contrib import admin
from .models import News, ContactMessage  # استيراد الموديلات

# تسجيل الجداول لتظهر في لوحة التحكم
admin.site.register(News)
admin.site.register(ContactMessage)
