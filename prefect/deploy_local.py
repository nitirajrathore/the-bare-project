from pathlib import Path
from prefect import flow
from hello_world import hello

# inspired from 
if __name__ == "__main__":
    hello.from_source(
        source=Path(__file__).parent,
        entrypoint="hello_world.py:hello",
    ).deploy(
        name="deploy-local-storage",
        work_pool_name="my-work-pool",
    )

# prefect deployment run 'hello-world/deploy-local-storage'

# prefect worker start --pool 'local'
