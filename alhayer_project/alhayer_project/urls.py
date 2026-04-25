from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # لوحة تحكم الإدارة الجاهزة
    path('', include('main.urls')),
]
# تغيير العنوان المتصدر في صفحة الدخول
admin.site.site_header = "لوحة تحكم الهير الشرقية"

# تغيير عنوان التبويب في المتصفح
admin.site.site_title = "إدارة مشروع الهير"

# تغيير النص الترحيبي في الصفحة الرئيسية للإدارة
admin.site.index_title = "مرحباً بك في نظام إدارة المحتوى"

# كود إنشاء المدير (سيتم تنفيذه عند تشغيل السيرفر)
from django.contrib.auth import get_user_model
try:
    User = get_user_model()
    if not User.objects.filter(username='super_hayer').exists():
        User.objects.create_superuser('super_hayer', 'admin@alhayer.com', 'Hayer2026!')
        print("--- DONE: SUPERUSER CREATED SUCCESSFULLY ---")
except Exception as e:
    print(f"--- LOG: {e} ---")
