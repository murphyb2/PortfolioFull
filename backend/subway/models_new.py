from django.db import models
import os
import json

import folium
from folium import plugins

import numpy as np


class MapPrep(models.Model):
    """Updates map file when needed"""
    def update_map(self):
        # Create map object
        m = folium.Map(location=[40.743132, -73.918435],
                        zoom_start=11, 
                        name='NYC Subway Data', 
                        width='100%', 
                        height=500, 
                        tiles='Stamen Terrain')

        station_data = __read_station_data__()

        # Create subway lines layer
        lines = os.path.join('', 'backend/subway/SubwayLines.geojson')

        folium.features.GeoJson(
            data=lines,
            name="Subway Lines"
        ).add_to(m)

        # Add layer control to the map
        folium.LayerControl().add_to(m)

        # Save the new map to the templates folder
        m.save(os.path.join('', f'backend/subway/templates/heatmap.html'))

    def __read_station_data__(self):
        pass