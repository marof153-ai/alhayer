from django.db import models

class News(models.Model):  # تأكد أن الكلمة تبدأ بحرف N كبير
    title = models.CharField(max_length=200, verbose_name="العنوان")
    content = models.TextField(verbose_name="المحتوى")
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="الاسم")
    email = models.EmailField(verbose_name="البريد الإلكتروني")
    message = models.TextField(verbose_name="الرسالة")
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"رسالة من {self.name}"
