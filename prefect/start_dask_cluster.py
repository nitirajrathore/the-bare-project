from dask.distributed import Client, LocalCluster

if __name__ == "__main__":
    # Create one cluster to be reused
    cluster = LocalCluster(n_workers=2, threads_per_worker=2)
    # Get client (if needed)
    client = cluster.get_client()

    print(f"Cluster started with address: {client.scheduler_info()['address']}")
    print(f"Number of workers: {client.ncores()}")
    print(f"Cluster dashboard link: {client.dashboard_link}")
    # Keep the script running to maintain the cluster
    try:
        print("Press Ctrl+C to stop the cluster.")
        while True:
            pass
    except KeyboardInterrupt:
        print("Stopping the cluster...")
        client.close()
        cluster.close()
        print("Cluster stopped.")
# This script starts a Dask LocalCluster and keeps it running.
# It can be used to run Dask tasks in a Prefect flow.
# The cluster can be reused across multiple flows or tasks.
