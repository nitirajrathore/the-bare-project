from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
  'owner':'nitiraj',
  'retries':5,
  'retry_delay': timedelta(minutes=2)
}
with DAG(
  dag_id='our_first_dag3',
  description='This is our first dag',
  start_date=datetime(2025, 3, 1),
  schedule_interval='@daily'
) as dag: 
  task1 = BashOperator(
    task_id='first_task',
    bash_command="echo hello world, this is the first task!"
  )

  task2 = BashOperator(
    task_id='second_task',
    bash_command="echo hello world from task#2"

  )

  task3 = BashOperator(
    task_id='third_task',
    bash_command="echo hello world from task#3"
  )


  # task1.set_downstream(task2)

  task1 >> task2
  task1 >> task3

  