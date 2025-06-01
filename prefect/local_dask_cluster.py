from prefect import flow, task
import dask.distributed 
from prefect.task_runners import ThreadPoolTaskRunner
from prefect_dask.task_runners import DaskTaskRunner
import time


# client = dask.distributed.Client("tcp://192.168.1.12:8786")
client = dask.distributed.Client("tcp://127.0.0.1:44955")


@task
def hello_local(name: str):
    time.sleep(2)
    print(f"Hello {name}!")


# Now use the dask_runner for both flows
@flow(task_runner=DaskTaskRunner(address=client.scheduler.address))
def concurrent_nested_flow():
    marvin = hello_local.submit("marvin")
    ford = hello_local.submit("ford")
    marvin.wait(), ford.wait()


@task
def hello_dask():
    print("Hello from Dask!")


@flow(task_runner=DaskTaskRunner(cluster=client.scheduler.address))
def dask_nested_flow():
    hello_dask.submit().wait()


@flow # This parent flow still uses ThreadPoolTaskRunner
def parent_flow():
    concurrent_nested_flow()
    dask_nested_flow()


if __name__ == "__main__":
    # Create one cluster to be reused
    
    parent_flow()
