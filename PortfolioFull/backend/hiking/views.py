from django.shortcuts import render


def index(request):
    return render(request, 'hiking/index.html')
