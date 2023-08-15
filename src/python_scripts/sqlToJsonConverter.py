import json
from aws_s3_handler import check_file_url


def convert_to_json(records, headers, time_index=-1, img_index=-1):
    data = []
    for row in records:
        if time_index != -1:
            row = list(row)
            row[time_index] = row[time_index].strftime("%Y-%m-%d %H:%M:%S")
        # if img_index != -1:
        #     row = list(row)
        #     row[img_index] = check_file_url(row[img_index])
        data.append(dict(zip(headers, row)))
    return json.dumps(data)

# def convert_to_json_posts(records, header):
#     data = []
#     for row in records:
#         row_data = list(row)
#         # Convert datetime object to string
#         row_data[INDEX_OF_CREATED_AT] = row_data[INDEX_OF_CREATED_AT].strftime("%Y-%m-%d %H:%M:%S")
#         # Convert row to a dictionary
#         data.append(dict(zip(header, row_data)))
#     return json.dumps(data)

# import json
# import threading
#
#
# def convert_to_json(records, headers, time_index=-1, img_index=-1):
#     def process_row(row):
#         if time_index != -1:
#             row = list(row)
#             row[time_index] = row[time_index].strftime("%Y-%m-%d %H:%M:%S")
#         if img_index != -1:
#             row = list(row)
#             row[img_index] = check_file_url(row[img_index])
#         return dict(zip(headers, row))
#
#     data = []
#
#     def worker(records_chunk):
#         for row in records_chunk:
#             data.append(process_row(row))
#
#     # Determine the number of threads (adjust this based on your dataset size and CPU cores)
#     num_threads = 4
#
#     if len(records) < num_threads:
#         worker(records)
#         return json.dumps(data)
#
#     # Split the records into chunks for parallel processing
#     records_chunks = [records[i:i + len(records) // num_threads] for i in
#                       range(0, len(records), len(records) // num_threads)]
#
#     threads = []
#     for chunk in records_chunks:
#         thread = threading.Thread(target=worker, args=(chunk,))
#         thread.start()
#         threads.append(thread)
#
#     # Wait for all threads to complete
#     for thread in threads:
#         thread.join()
#
#     return json.dumps(data)
