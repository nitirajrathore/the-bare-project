from prefect import flow

# Source for the code to deploy (here, a GitHub repo)
SOURCE_REPO="https://github.com/nitirajrathore/the-bare-project.git"

if __name__ == "__main__":
    flow.from_source(
        source=SOURCE_REPO,
        entrypoint="prefect/hello_world.py:hello", # Specific flow to run
    ).deploy(
        name="github-hello-deployment",
        work_pool_name="my-work-pool",
        cron="0 * * * *",  # Run every hour
    )