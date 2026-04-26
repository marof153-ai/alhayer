from django.shortcuts import render, redirect
from .models import News, ContactMessage  # أضف الموديل الجديد هنا
from django.contrib import messages

from django.utils.translation import gettext as _  # استيراد أداة الترجمة
from django.contrib import messages


def home(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # استخدام _() وتمرير المتغير باستخدام القالب %(name)s
        success_msg = _('شكراً لك يا %(name)s، تم استلام رسالتك بنجاح!') % {'name': name}
        messages.success(request, success_msg)

        ContactMessage.objects.create(name=name, email=email, message=message)
        return redirect('home')

    news_list = News.objects.all().order_by('-date_posted')
    return render(request, 'home.html', {'news_list': news_list})


def services_view(request):
    return render(request, 'services.html')
