from django.db import models
import folium
from folium import plugins
import os
import json
import string
import numpy as np
import pandas as pd
import datetime as dt
import shutil as sh
import requests
from datetime import datetime
from jinja2 import Template
from folium.map import Layer


class MapPrep(models.Model):

    def update_map(self):
        """Updates map file when needed"""

        # Get the turnstile data from the MTA site
        # url = f'http://web.mta.info/developers/data/nyct/turnstile/turnstile_{dt.datetime.now().strftime("%y%m%d")}.txt'
        # url = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_190608.txt'
        # r = requests.get(url, allow_redirects=True)
        # open('subway/turnstile.csv', 'wb').write(r.content)

        # # Get the data for the subway lines
        # url = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_190608.txt'
        # r = requests.get(url, allow_redirects=True)
        # open('turnstile.csv', 'wb').write(r.content)

        exist = os.path.exists(os.path.join('', f'backend/subway/final.csv'))
        exist = False
        if(not exist):
            # Read the stations info
            stations = pd.read_csv(
                os.path.join('', 'backend/subway/Stations.csv'))

            # Rename the column names to match the MTA data columns
            stations.rename(columns={'GTFS Latitude': 'LATITUDE',
                                     'GTFS Longitude': 'LONGITUDE'}, inplace=True)

            # Read the turnstile data
            turnstile_data = pd.read_csv(
                os.path.join('', 'backend/subway/turnstile.csv'))

            turnstile_data.rename(
                columns={turnstile_data.columns[10]: 'EXITS', 'C/A': 'CA'}, inplace=True)

            # Merge the station data with the turnstile data
            merged_df = pd.DataFrame.merge(turnstile_data, stations,
                                           on="STATION", how="inner")

            # Drop empty rows from the data frame
            merged_df = merged_df.dropna()

            # Get the relevant columns from our merged table
            df = merged_df[['STATION', 'ENTRIES', 'EXITS',
                            'LATITUDE', 'LONGITUDE', 'TIME', 'DATE', 'CA', 'UNIT', 'SCP']]
            # Write it to a csv file fo debug
            df.to_csv("backend/subway/merged_df.csv")
            # Create array with just the unique station names
            unique_stations_array = df.STATION.unique()

            # Create array with just the unique dates
            dates = df.DATE.unique()

            row_list = []
            row = []

            tstart = datetime.now()
            for station in unique_stations_array:

                # Get all rows that have the given station name
                # record_station = df.query(f'STATION == "{station}"')
                record_station = df[df.STATION == station]

                if(record_station.empty):
                    continue

                # Store the latitude and longitude of the station
                latitude = record_station.iloc[0]['LATITUDE']
                longitude = record_station.iloc[0]['LONGITUDE']

                for date in dates:
                    total_entries = 0
                    total_exits = 0
                    record_date = record_station[record_station.DATE == date]
                    # record_date = record_station.query(f'DATE == "{date}"')
                    if(record_date.empty):
                        continue
                    # for ca in cas:
                    #     record_ca = record_date[record_date.CA == ca]
                    #     if(record_ca.empty):
                    #         continue
                    units = record_date.UNIT.unique()  # Remote Unit for a station
                    for unit in units:
                        # record_unit = record_ca[record_ca.UNIT == unit]
                        record_unit = record_date[record_date.UNIT == unit]
                        # record_unit = record_date.query(f'UNIT == "{unit}"')

                        if(record_unit.empty):
                            continue
                        scps = record_unit.SCP.unique()  # Subunit channel position
                        for scp in scps:
                            record_scp = record_unit[record_unit.SCP == scp]
                            # record_scp = record_unit.query(f'SCP == "{scp}"')

                            if(record_scp.empty):
                                continue
                            # Sort the entries from low to high
                            # vals = record_scp.ENTRIES.sort_values(
                            #     ascending=True)

                            # Calculate the total entries
                            # total_entries += vals.iloc[-1] - vals.iloc[0]
                            total_entries += record_scp.ENTRIES.max() - record_scp.ENTRIES.min()

                            # Sort the exits from low to high
                            # vals = record_scp.EXITS.sort_values(
                            #     ascending=True)

                            # Calculate the total exits
                            # total_exits += vals.iloc[-1] - vals.iloc[0]
                            total_exits += record_scp.EXITS.max() - record_scp.EXITS.min()

                    # Create new row of data
                    # Station, Entries, Exits, Latitude, Longitude, Time
                    row = [station, total_entries,
                           total_exits, latitude, longitude, date]

                    # Add row to running list
                    row_list.append(row)
            print(f"Analyzed Dataframe: {datetime.now() - tstart}")
            final_df = pd.DataFrame(
                row_list, columns=['Station', 'Entries', 'Exits', 'Latitude', 'Longitude', 'Date'])
            final_df.to_csv("backend/subway/final.csv")
        else:
            final_df = pd.read_csv(os.path.join(
                '', f'backend/subway/final.csv'))

        hm_with_time_entries = []
        hm_with_time_exits = []
        date_index = []
        dates = final_df.Date.unique()
        for index, date in enumerate(dates):
            # Create the time index array
            date_index.append(str(date))

            # Rows for given date
            record = final_df[final_df.Date == date]

            # Normalize the data between 0 and 1
            max_entries = record.Entries.max()
            min_entries = record.Entries.min()
            max_exits = record.Exits.max()
            min_exits = record.Exits.min()

            # Could do this step in the assign below, but this is clearer
            norm_entries = record.Entries.apply(
                lambda x: ((x-min_entries)/(max_entries-min_entries)))
            norm_exits = record.Exits.apply(
                lambda x: ((x-min_exits)/(max_exits-min_exits)))

            # Get Relevant columns
            hm_df = record[['Latitude', 'Longitude']]
            # Update the Entries column with the normalized values
            hm_df = hm_df.assign(Entries=norm_entries)
            # Add the df to the master list
            hm_with_time_entries.append(hm_df.values.tolist())

            # Get Relevant columns
            hm_df = record[['Latitude', 'Longitude']]
            # Update the Exits column with the normalized values
            hm_df = hm_df.assign(Exits=norm_exits)
            # Add the df to the master list
            hm_with_time_exits.append(hm_df.values.tolist())

        ##### Create the map object with basic layers #####
        m = folium.Map(location=[40.743132, -73.918435],
                       zoom_start=11, name='NYC Subway Data', width='100%', height=500)

        # Apply Heat Map of entries into station
        folium.plugins.HeatMapWithTime(
            hm_with_time_entries, index=date_index, radius=25, control=True, name='Entries').add_to(m)
        # Apply Heat Map of exits into station
        HeatMapWithTimeAdditional(
            hm_with_time_exits, radius=25, control=True, name='Exits', show=False).add_to(m)

        # Create dataframe of subway lines
        lines = os.path.join('', 'backend/subway/SubwayLines.geojson')
        # Add the subway lines
        folium.GeoJson(lines, name='Subway Lines').add_to(m)

        # Add layer control to the map - only add this after all layers
        # have been created and added to the map
        folium.LayerControl().add_to(m)

        # Save the new map to the templates folder
        m.save(os.path.join('', f'backend/subway/templates/heatmap.html'))

    @property
    def map_is_current(self):
        "Indicates whether the map is up to date or if new data has been posted"
        # Currently the only data we are getting is the MTA Turnstile data
        # New data is posted every Saturday so if today is Sunday and we haven't created a new map
        # then we need to update

        if dt.datetime.now().weekday() == 6:
            # Today is Sunday, check the html file to see if we have already updated
            last_sunday = dt.datetime.now() - dt.timedelta(days=7)
            # Format to YYMMDD
            last_sunday = last_sunday.strftime("%y%m%d")
            last_sunday_exists = os.path.isfile(os.path.join(
                '', f'subway/index_{last_sunday}.html'))

            today = dt.datetime.now().strftime("%y%m%d")
            today_exists = os.path.isfile(
                os.path.join('', f'subway/templates/index_{today}.html'))

            if today_exists or last_sunday_exists:
                # We've already updated the map so no need to do it again
                return True
            else:
                # Haven't updated yet
                return False
        # No new data so we are current
        return True


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
