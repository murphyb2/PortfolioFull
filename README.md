# Development Portfolio
Django project to centralize and showcase all my personal software projects. Updates and streamlines an old version of the project to the newest React version which eliminates lifecycle methods through utilization of hooks.
All of the Django projects are were reconfigured to be included in this project so that I only need to spin up one EC2 instance on Amazon Web Services. This cuts my monthly bill in half! The performance difference at this point is nominal and this design decision is simply to save money. 

Apps include:
* Django Rest Framework backend and React/Redux front end composing the main website/project
* Data visualization project using data from the NYC Subway system using Django and folium
* Django Rest Framework and ReactJS/Redux application which fetches and displays hiking trails near a user defined location
* Photo site to showcase my best photography using Django and vanilla HTML/CSS/JS
 
### Prerequisites

See requirements.txt in this repository.

## Deployment

This web app is deployed using Amazon Web Services tools. 
Namely:
* Elasic Beanstalk
* RDS (MySQL)
* S3

## Key Technologies

* [Django](https://www.djangoproject.com/) - The web framework used
* [Django Rest Framework](https://www.django-rest-framework.org/) - The REST API framework used
* [ReactJS](https://reactjs.org/) - Used to build the front end
* [Google Developer Tools](https://developers.google.com/) - Used Maps and GeoCode APIs
* [folium](https://github.com/python-visualization/folium) - Data visualization tools for Subway data app

## Versioning

I use [GitHub](https://github.com/murphyb2/Portfolio) for versioning. 

## Authors

* **Bryan Murphy** - *Initial work* - [murphyb2](https://github.com/murphyb2)

## Acknowledgments

* [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) - Brad's content was immensely helpful in helping me get up to speed with the basics of web development
