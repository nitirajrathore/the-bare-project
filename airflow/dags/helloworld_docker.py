from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.docker.operators.docker import DockerOperator
from airflow.providers.standard.operators.empty import EmptyOperator as DummyOperator

default_args = {
    'owner': 'airflow',
    'description': 'A simple hello world DAG with Docker',
    'depend_on_past': False,
    'start_date': datetime(2025, 5, 23),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

with DAG(
    dag_id = 'hello_world_docker',
    default_args=default_args,
    schedule="0 0 * * *",
    catchup=False,
) as dag:

    start = DummyOperator(task_id='start')
    
    hello_task = DockerOperator(
        task_id='hello_world_docker_task',
        image='python:3.9-slim',
        container_name='hello_world_container',
        api_version='auto',
        auto_remove='always',
        command='python -c "print(\'Hello World from Docker!\')"',
        # docker_url='unix://var/run/docker.sock',
        docker_url='tcp://192.168.1.11:2375',
        network_mode='bridge',
    )
    
    end = DummyOperator(task_id='end')
    
    start >> hello_task >> end