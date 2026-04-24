from django.db import models

class News(models.Model):
    title = models.CharField(max_length=200, verbose_name="العنوان")
    content = models.TextField(verbose_name="المحتوى")
    # إضافة الحقل الجديد هنا
    image = models.ImageField(upload_to='news_images/', verbose_name="صورة الخبر", blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "خبر"
        verbose_name_plural = "الأخبار"

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="الاسم")
    email = models.EmailField(verbose_name="البريد الإلكتروني")
    message = models.TextField(verbose_name="الرسالة")
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"رسالة من {self.name}"
