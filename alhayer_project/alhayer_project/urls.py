from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns # استيراد نظام اللغات

# 1. الروابط التي لا تحتاج لترجمة أو بادئة (مثل ar/ أو en/)
urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')), # رابط محرك تغيير اللغة
]

# 2. الروابط التي تدعم اللغات (تظهر بـ /ar/ أو /en/)
# نضع الروابط الأساسية هنا "فقط" لضمان عدم التضارب
urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    prefix_default_language=True # اختياري: لجعل الرابط يظهر فيه /ar/ حتى في اللغة الافتراضية
)

# 3. روابط الملفات المرفوعة (Media) والصور الثابتة
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# --- تخصيص لوحة تحكم الإدارة ---
admin.site.site_header = "لوحة تحكم الهير الشرقية"
admin.site.site_title = "إدارة مشروع الهير"
admin.site.index_title = "مرحباً بك في نظام إدارة المحتوى"
