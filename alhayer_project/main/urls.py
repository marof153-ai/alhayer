from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
path('contact/', views.home, name='contact'),
path('services/', views.services_view, name='services_page'),
]
