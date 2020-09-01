from django.db import models
import os
import json

import folium
from folium import plugins

import numpy as np
import pandas as pd

from jinja2 import Template
from folium.map import Layer


class MapPrep(models.Model):
    """Updates map file when needed"""

    @property
    def is_up_to_date(self):

        return True

    def __normalize_entries__(self, record):
        # Normalize the data between 0 and 1
        max_entries = record.entries.max()
        min_entries = record.entries.min()

        # Could do this step in the assign below, but this is clearer
        norm_entries = record.entries.apply(
            lambda x: ((x-min_entries)/(max_entries-min_entries)))

        # Get Relevant columns
        hm_df = record[['gtfs_latitude', 'gtfs_longitude']]
        # Update the Entries column with the normalized values
        hm_df = hm_df.assign(entries=norm_entries)

        return hm_df.values.tolist()

    def __normalize_exits__(self, record):
        # Normalize the data between 0 and 1
        max_exits = record.exits.max()
        min_exits = record.exits.min()

        # Could do this step in the assign below, but this is clearer
        norm_exits = record.exits.apply(
            lambda x: ((x-min_exits)/(max_exits-min_exits)))

        # Get Relevant columns
        hm_df = record[['gtfs_latitude', 'gtfs_longitude']]
        # Update the Exits column with the normalized values
        hm_df = hm_df.assign(exits=norm_exits)

        return hm_df.values.tolist()

    def __read_station_data__(self):
        pd.read_csv(os.path.join('', 'backend/subway/Stations.csv'))

    def update_map(self):
        #### Structure data for heatmap objects ####
        station_data = pd.read_csv(os.path.join(
            '', 'backend/subway/body.csv'), dtype={'complex_id': 'string'})

        # Drop rows with empty station names
        station_data['stop_name'].replace('', np.nan, inplace=True)
        station_data.dropna(subset=['stop_name'], inplace=True)

        # For entries/exits with no value, use 0
        station_data['entries'].replace(np.nan, 0, inplace=True)
        station_data['exits'].replace(np.nan, 0, inplace=True)

        # stop_names = station_data.stop_name.unique()
        date_index = []
        dates = station_data.date.unique()
        hm_with_time_entries = []
        hm_with_time_exits = []
        # print(dates)

        for date in dates:
            # Create the time index array
            date_index.append(str(date))

            # Rows for given date
            record = station_data[station_data.date == date]

            hm_with_time_entries.append(self.__normalize_entries__(record))
            hm_with_time_exits.append(self.__normalize_exits__(record))

        # print(hm_with_time_entries)

        #### Create map object ####
        m = folium.Map(location=[40.743132, -73.918435],
                       zoom_start=11,
                       name='NYC Subway Data',
                       width='100%',
                       height=500)

        # Apply Heat Map of entries into station
        folium.plugins.HeatMapWithTime(
            hm_with_time_entries, index=date_index, radius=25, control=True, name='Entries').add_to(m)
        # Apply Heat Map of exits into station
        HeatMapWithTimeAdditional(
            hm_with_time_exits, radius=25, control=True, name='Exits', show=False).add_to(m)

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


class HeatMapWithTimeAdditional(Layer):
    # Adds an additional HeatMapWithTime layer to the map and uses the existing play/pause control
    # Found this code from the folium github issues tab
    #  https://github.com/python-visualization/folium/issues/1062
    _template = Template("""
        {% macro script(this, kwargs) %}
            var {{this.get_name()}} = new TDHeatmap({{ this.data }},
                {heatmapOptions: {
                    radius: {{this.radius}},
                    minOpacity: {{this.min_opacity}},
                    maxOpacity: {{this.max_opacity}},
                    scaleRadius: {{this.scale_radius}},
                    useLocalExtrema: {{this.use_local_extrema}},
                    defaultWeight: 1,
                    {% if this.gradient %}gradient: {{ this.gradient }}{% endif %}
                }
            }).addTo({{ this._parent.get_name() }});
        {% endmacro %}
    """)

    def __init__(self, data, name=None, radius=15,
                 min_opacity=0, max_opacity=0.6,
                 scale_radius=False, gradient=None, use_local_extrema=False,
                 overlay=True, control=True, show=True):
        super(HeatMapWithTimeAdditional, self).__init__(
            name=name, overlay=overlay, control=control, show=show
        )
        self._name = 'HeatMap'
        self.data = data

        # Heatmap settings.
        self.radius = radius
        self.min_opacity = min_opacity
        self.max_opacity = max_opacity
        self.scale_radius = 'true' if scale_radius else 'false'
        self.use_local_extrema = 'true' if use_local_extrema else 'false'
        self.gradient = gradient
