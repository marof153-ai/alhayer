from django.shortcuts import render, redirect
from .models import News, ContactMessage  # أضف الموديل الجديد هنا
from django.contrib import messages

def home(request):
    if request.method == "POST":
        # سحب البيانات من النموذج
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        messages.success(request, f'شكراً لك يا {name}، تم استلام رسالتك بنجاح!')
        # حفظها في قاعدة البيانات
        ContactMessage.objects.create(name=name, email=email, message=message)

        # إعادة توجيه لنفس الصفحة لمنع تكرار الإرسال
        return redirect('home')

    news_list = News.objects.all().order_by('-date_posted')
    return render(request, 'home.html', {'news_list': news_list})
