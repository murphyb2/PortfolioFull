from django.shortcuts import render
from .models import Image, About
from datetime import datetime


def index(request):
    """View function for home page of site."""

    # Filter all the images in the database for only those that are that are designated as showcase images.
    # img_gal = Image.objects.filter(portfolio_section='Home')
    img_gal = Image.objects.filter(is_showcase_image=True)
    currentYear = datetime.now().year
    context = {
        'title': 'Home',
        'img_gal': img_gal,
        'currentYear': currentYear,
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context)


def colorFilm(request):
    """View function for Color Film page of site."""

    # Filter all the images in the database for only those that are assigned to
    # the Color Film section.
    img_gal = Image.objects.filter(
        portfolio_section='colorFilm').order_by('priority')
    currentYear = datetime.now().year
    context = {
        'title': 'Color Film',
        'img_gal': img_gal,
        'currentYear': currentYear,
    }

    # Render the HTML template colorFilm.html with the data in the context variable
    return render(request, 'colorFilm.html', context)


def bwFilm(request):
    """View function for BW Film page of site."""

    # Filter all the images in the database for only those that are assigned to
    # the Color Film section.
    img_gal = Image.objects.filter(
        portfolio_section='bwFilm').order_by('priority')
    currentYear = datetime.now().year
    context = {
        'title': 'BW Film',
        'img_gal': img_gal,
        'currentYear': currentYear,
    }

    # Render the HTML template bwFilm.html with the data in the context variable
    return render(request, 'bwFilm.html', context)


def music(request):
    """View function for music page of site."""

    # Filter all the images in the database for only those that are assigned to
    # the Color Film section.
    img_gal = Image.objects.filter(
        portfolio_section='music').order_by('priority')
    currentYear = datetime.now().year
    context = {
        'title': 'Music',
        'img_gal': img_gal,
        'currentYear': currentYear,
    }

    # Render the HTML template music.html with the data in the context variable
    return render(request, 'music.html', context)


def about(request):
    """View function for about page of site."""

    # Filter all the images in the database for only those that are assigned to
    # be a profile
    # profile_pic = Image.objects.filter(portfolio_section='prof_pic')
    content = About.objects.all()
    currentYear = datetime.now().year
    context = {
        'title': 'About',
        'content': content,
        'currentYear': currentYear,
    }

    # Render the HTML template about.html with the data in the context variable
    return render(request, 'about.html', context)
