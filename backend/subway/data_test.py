import os
import numpy as np
import pandas as pd
import datetime as dt
from datetime import datetime

import folium
from folium import plugins

from jinja2 import Template
from folium.map import Layer


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


def __normalize_entries__(record, max_entries, min_entries):
    # Normalize the data between 0 and 1
    # max_entries = record.entries.max()
    # min_entries = record.entries.min()

    # Could do this step in the assign below, but this is clearer
    norm_entries = record.entries.apply(
        lambda x: ((x-min_entries)/(max_entries-min_entries)))

    # Get Relevant columns
    hm_df = record[['gtfs_latitude', 'gtfs_longitude']]
    # Update the Entries column with the normalized values
    hm_df = hm_df.assign(entries=norm_entries)
    # print(hm_df)

    return hm_df.values.tolist()


def __normalize_exits__(record, max_exits, min_exits):
    # Normalize the data between 0 and 1
    # max_exits = record.exits.max()
    # min_exits = record.exits.min()

    # Could do this step in the assign below, but this is clearer
    norm_exits = record.exits.apply(
        lambda x: ((x-min_exits)/(max_exits-min_exits)))

    # Get Relevant columns
    hm_df = record[['gtfs_latitude', 'gtfs_longitude']]
    # Update the Exits column with the normalized values
    hm_df = hm_df.assign(exits=norm_exits)

    return hm_df.values.tolist()


#### Structure data for heatmap objects ####
station_data = pd.read_csv(
    'c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/body.csv', dtype={'complex_id': 'string'})

# Drop rows with empty station names
station_data['stop_name'].replace('', np.nan, inplace=True)
station_data.dropna(subset=['stop_name'], inplace=True)

# For entries/exits with no value, use 0
station_data['entries'].replace(np.nan, 0, inplace=True)
station_data['exits'].replace(np.nan, 0, inplace=True)

station_data.to_csv(
    'c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/data_test.csv')

# stop_names = station_data.stop_name.unique()
date_index = []
dates = station_data.date.unique()
hm_with_time_entries = []
hm_with_time_exits = []
# print(dates)

max_entries = station_data.entries.max()
min_entries = station_data.entries.min()
max_exits = station_data.exits.max()
min_exits = station_data.exits.min()

for date in dates:
    # Create the time index array
    date_index.append(str(date))

    # Rows for given date
    record = station_data[station_data.date == date]

    hm_with_time_entries.append(
        __normalize_entries__(record, max_entries, min_entries))
    hm_with_time_exits.append(
        __normalize_exits__(record, max_exits, min_exits))


#### Create map object ####
m = folium.Map(location=[40.743132, -73.918435],
               zoom_start=11,
               name='NYC Subway Data',
               width='100%',
               height=500)

# Apply Heat Map of entries into station
folium.plugins.HeatMapWithTime(
    hm_with_time_entries, index=date_index, radius=25, control=True, name='Entries').add_to(m)

# # Apply Heat Map of exits into station
# HeatMapWithTimeAdditional(
#     hm_with_time_exits, radius=25, control=True, name='Exits', show=False).add_to(m)

# Create subway lines layer
# lines = os.path.join(
#     'c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/SubwayLines.geojson')

# folium.features.GeoJson(
#     data=lines,
#     name="Subway Lines"
# ).add_to(m)

# Add layer control to the map
# folium.LayerControl().add_to(m)

# Save the new map to the templates folder
m.save('c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/templates/heatmap.html')


######################################
# # Read the stations info
# stations = pd.read_csv(
#     'C:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/Stations.csv')

# # Rename the column names to match the MTA data columns
# stations.rename(columns={'GTFS Latitude': 'LATITUDE',
#                          'GTFS Longitude': 'LONGITUDE'}, inplace=True)

# # print(stations.head())

# # Read the turnstile data
# turnstile_data = pd.read_csv(
#     'c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/turnstile.csv')

# turnstile_data.rename(
#     columns={turnstile_data.columns[10]: 'EXITS', 'C/A': 'CA'}, inplace=True)

# # Merge the station data with the turnstile data
# merged_df = pd.DataFrame.merge(stations, turnstile_data,
#                                on="STATION", how="inner")

# # Drop empty rows from the data frame
# merged_df = merged_df.dropna()
# # merged_df = merged_df.drop_duplicates(subset="STATION")


# # Get the relevant columns from our merged table
# df = merged_df[['STATION', 'ENTRIES', 'EXITS',
#                 'LATITUDE', 'LONGITUDE', 'TIME', 'DATE', 'CA', 'UNIT', 'SCP']]
# # Write it to a csv file fo debug
# df.to_csv(
#     "c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/merged_df.csv")

# # Create array with just the unique stations based on their lat lon coords
# # Consider Chambers St station: there are three entrances so if we just iterated
# # through using station name, we would get the same sum of entries/exits added
# # together three times creating a false outlier. The same data is used for
# # each station.
# # unique_stations_array = df.STATION.unique()
# unique_stations_array = ['CHAMBERS ST', '8 AV']

# # Create array with just the unique dates
# dates = df.DATE.unique()

# row_list = []
# row = []

# tstart = datetime.now()

# for station in unique_stations_array:

#     # Get all rows that have the given station name
#     # record_station = df.query(f'STATION == "{station}"')
#     record_station = df[df.STATION == station]

#     if(record_station.empty):
#         continue

#     for date in dates:

#         record_date = record_station[record_station.DATE == date]
#         # record_date = record_station.query(f'DATE == "{date}"')
#         if(record_date.empty):
#             continue
#         # for ca in cas:
#         #     record_ca = record_date[record_date.CA == ca]
#         #     if(record_ca.empty):
#         #         continue

#         # Dictionary of unique coordinates for this station
#         # Returns only unique values by default
#         coords = pd.Series(record_date.LONGITUDE.values,
#                            index=record_date.LATITUDE).to_dict()

#         # Account for stations with multiple entrances
#         for lat, lon in coords.items():
#             total_entries = 0
#             total_exits = 0

#             record_coord = record_date[record_date.LATITUDE == lat]
#             # print(record_coord)
#             units = record_coord.UNIT.unique()  # Remote Unit for a station
#             for unit in units:
#                 # record_unit = record_ca[record_ca.UNIT == unit]
#                 record_unit = record_coord[record_coord.UNIT == unit]
#                 # record_unit = record_date.query(f'UNIT == "{unit}"')

#                 if(record_unit.empty):
#                     continue
#                 scps = record_unit.SCP.unique()  # Subunit channel position
#                 for scp in scps:
#                     record_scp = record_unit[record_unit.SCP == scp]
#                     # record_scp = record_unit.query(f'SCP == "{scp}"')

#                     # Calculate the total entries
#                     total_entries += record_scp.ENTRIES.max() - record_scp.ENTRIES.min()

#                     # Calculate the total exits
#                     total_exits += record_scp.EXITS.max() - record_scp.EXITS.min()

#             # Create new row of data
#             # Station, Entries, Exits, Latitude, Longitude, Time
#             row = [station, total_entries,
#                    total_exits, lat, lon, date]

#             # Add row to running list
#             row_list.append(row)
# print(f"Analyzed Dataframe: {datetime.now() - tstart}")
# final_df = pd.DataFrame(
#     row_list, columns=['Station', 'Entries', 'Exits', 'Latitude', 'Longitude', 'Date'])
# final_df.to_csv(
#     "c:/Users/Bryan/Documents/GitHub/PortfolioFull/backend/subway/data_test.csv")
