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
Check this example.
