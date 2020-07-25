from django.db import models
from django import forms
from django.urls import reverse


class Image(models.Model):
    # Model representing an image file contained in a portfolio section
    # ADD VALIDATION TO ENSURE THAT ASPECT RATIO IS 3x2 or 2x3 IF USING AS A HOME PAGE SHOWCASE IMAGE!!!!! 
    PORTFOLIO_SECTIONS=[
        ('home', 'Home'),
        ('colorFilm', '35mm Color'),
        ('bwFilm', '35mm BW'),
        ('music', 'Music'),
        ('prof_pic', 'Profile Picture'),
    ]

    # Image absolute url is derived from here (Image.picture.url)
    picture = models.ImageField(upload_to='pictures/', height_field='height', width_field='width', null=True)

    # Text to be shown when cursor hovers over image
    alt_text = models.CharField(max_length=200, null=True)

    # Width and Height of the image derived from Image.picture
    width = models.PositiveIntegerField(blank=True, null=True, editable=False, default=0)
    height = models.PositiveIntegerField(blank=True, null=True, editable=False, default=0)

    # Section of the site that the uploaded image should live in
    portfolio_section = models.CharField(max_length=100, choices=PORTFOLIO_SECTIONS)
    
    # Integer for ordering images
    priority = models.IntegerField()

    # Each section of the portfolio will have one image that displays on the home page. 
    # Clicking the image will open up the corresponding portfolio of images. 
    is_showcase_image = models.BooleanField(default=False)

    class Meta:
            ordering: ["priority"]
            
    def __str__(self):
        return self.alt_text

    def is_landscape(self):
        return self.width > self.height

    

class About(models.Model):
    prof_pic = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    body = models.TextField()
    def __str__(self):
        return ("About Page")