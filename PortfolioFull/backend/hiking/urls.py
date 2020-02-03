from django.urls import path
from . import views


# hiking/ already configured to path in ../PortfolioFull/urls.py
urlpatterns = [
    path('', views.index)
]
