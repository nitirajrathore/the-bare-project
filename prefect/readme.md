## Install
[Install Prefect - Prefect](https://docs.prefect.io/v3/get-started/install)

```
pip install -U prefect
```
```
pip install -U prefect-client
```

### install prefect server (OSS)

start prefect server on local with
```
source venv/bin/activate

export PREFECT_API_URL="http://192.168.1.170:4200/api"

prefect server start --background

```

## TODO: start prefect in cluster ?? like many workers etc.


## To run a flow directly
```
export PREFECT_API_URL="http://192.168.1.170:4200/api"
uv run hello_world.py
```

## To create a deployment
Check this example. deploy_github.py and deploy_local.py in this folder and others in https://docs.prefect.io/v3/examples/deployments

just run the deployment python scripts to create a deployment.

```
export PREFECT_API_URL="http://192.168.1.170:4200/api"
python deploy_local.py
python deploy_github.py
```

## Start worker
The below command will start a worker on the machine in which you are running this command.
It should have pre-requisites software installed to download and run the flow. Like for github deployment it should have git. I think if flow needs tesseraact etc then that should be already installed in that worker.
```
export PREFECT_API_URL="http://192.168.1.170:4200/api"
prefect worker start --pool 'my-work-pool'
```

## Run deployment

```
export PREFECT_API_URL="http://192.168.1.170:4200/api"
prefect deployment run 'hello/github-hello-deployment'
```

## Rate limit

### Create global limit
```
prefect gcl create github-api --limit 60 --slot-decay-per-second 0.016
```

### use in task / flow
```
rate_limit("github-api")
httpx.get(f"https://api.github.com/repos/{github_repo}").json()

```


## Retries in tasks
```
@task(    retries=3,
)
```

## Caching 
```
@task(
    cache_policy=INPUTS,
    cache_expiration=timedelta(days=1)
)
```

## Dask

For local machine dask parallelization
```
pip install prefect_dask
```

## Creating Dask clusters
### Method 1 : Commandline 

Start scheduler
```
dask-scheduler
```

Start first worker
```
dask-worker tcp://192.168.1.12:8786
```

Start second worker
```
dask-worker tcp://192.168.1.12:8786
```

In python create a client

```
from dask.distributed import Client

client = Client("tcp://192.168.1.12:8786")
```



