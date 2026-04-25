from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls), # لوحة تحكم الإدارة الجاهزة
    path('', include('main.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# تغيير العنوان المتصدر في صفحة الدخول
admin.site.site_header = "لوحة تحكم الهير الشرقية"

# تغيير عنوان التبويب في المتصفح
admin.site.site_title = "إدارة مشروع الهير"

# تغيير النص الترحيبي في الصفحة الرئيسية للإدارة
admin.site.index_title = "مرحباً بك في نظام إدارة المحتوى"

