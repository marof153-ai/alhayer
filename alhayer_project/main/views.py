from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.translation import gettext as _
from .models import News, ContactMessage
from .models import News, ContactMessage, Project

# دالة الصفحة الرئيسية
def home(request):
    if request.method == "POST":
        # استقبال البيانات من نموذج HTML
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # حفظ الرسالة في قاعدة البيانات
        ContactMessage.objects.create(name=name, email=email, message=message)

        # إظهار رسالة نجاح
        success_msg = _('شكراً لك يا %(name)s، تم استلام رسالتك بنجاح!') % {'name': name}
        messages.success(request, success_msg)
        return redirect('home')  # يفضل استخدام redirect بعد الـ POST لتجنب تكرار الإرسال

    # جلب الأخبار لعرضها في الصفحة الرئيسية
    news_list = News.objects.all().order_by('-date_posted')[:3]

    # 🟢 التصحيح هنا: غيرناه من 'main/index.html' إلى 'home.html' ليتطابق مع صورتك
    return render(request, 'home.html', {'news_list': news_list})


# دالة صفحة الخدمات المستقلة
def services_view(request):
    return render(request, 'services.html')

def about_view(request):
    return render(request, 'about.html')

def gallery_view(request):
    projects = Project.objects.all().order_by('-created_at') # جلب كل المشاريع من الأحدث للأقدم
    return render(request, 'gallery.html', {'projects': projects})

