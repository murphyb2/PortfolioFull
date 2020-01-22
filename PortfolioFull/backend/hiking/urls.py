from django.urls import path
from . import views

urlpatterns = [
    path('hiking/', views.index)
]
