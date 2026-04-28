from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
path('contact/', views.home, name='contact'),
path('services/', views.services_view, name='services'),
path('about/', views.about_view, name='about'),
path('gallery/', views.gallery_view, name='gallery'),





]
