import os
import numpy as np
import pandas as pd
import datetime as dt
from datetime import datetime

# Read the stations info
stations = pd.read_csv(
    'C:/Users/Bryan/Documents/GitHub/PortfolioFull/PortfolioFull/backend/subway/Stations.csv')

# Rename the column names to match the MTA data columns
stations.rename(columns={'GTFS Latitude': 'LATITUDE',
                         'GTFS Longitude': 'LONGITUDE'}, inplace=True)

print(stations.head())

# Read the turnstile data
turnstile_data = pd.read_csv(
    'c:/Users/Bryan/Documents/GitHub/PortfolioFull/PortfolioFull/backend/subway/turnstile.csv')

turnstile_data.rename(
    columns={turnstile_data.columns[10]: 'EXITS', 'C/A': 'CA'}, inplace=True)

# Merge the station data with the turnstile data
merged_df = pd.DataFrame.merge(stations, turnstile_data,
                               on="STATION", how="inner")

# Drop empty rows from the data frame
merged_df = merged_df.dropna()
# merged_df = merged_df.drop_duplicates(subset="STATION")


# Get the relevant columns from our merged table
df = merged_df[['STATION', 'ENTRIES', 'EXITS',
                'LATITUDE', 'LONGITUDE', 'TIME', 'DATE', 'CA', 'UNIT', 'SCP']]
# Write it to a csv file fo debug
df.to_csv("c:/Users/Bryan/Documents/GitHub/PortfolioFull/PortfolioFull/backend/subway/merged_df.csv")

# Create array with just the unique stations based on their lat lon coords
# Consider Chambers St station: there are three entrances so if we just iterated
# through using station name, we would get the same sum of entries/exits added
# together three times creating a false outlier. The same data is used for
# each station.
# unique_stations_array = df.STATION.unique()
unique_stations_array = ['CHAMBERS ST', '8 AV']

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
                # Filter again by latitude

                if(record_scp.empty):
                    continue
                lats = record_scp.LATITUDE.unique()

                # for lat in lats:

                # Calculate the total entries
                total_entries += record_scp.ENTRIES.max() - record_scp.ENTRIES.min()

                # Calculate the total exits
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
final_df.to_csv(
    "c:/Users/Bryan/Documents/GitHub/PortfolioFull/PortfolioFull/backend/subway/data_test.csv")
