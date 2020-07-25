from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('colorFilm/', views.colorFilm, name='colorFilm'),
    path('bwFilm/', views.bwFilm, name='bwFilm'),
    path('music/', views.music, name='music'),
    path('about/', views.about, name='about'),
]
