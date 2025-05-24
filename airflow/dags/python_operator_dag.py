from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator
# INFO: Old way of doing things. Airflow 2.0+ supports annotations to easily convert python function to task and flows.
default_args = {

  'owner':'nitiraj',
  'retries':5,
  'retry_delay': timedelta(minutes=2)
}


def greet():
  print("Hello World")

def greetSomeone(age, ti):
  first_name = ti.xcom_pull(task_ids='forth_task', key='first_name')
  last_name = ti.xcom_pull(task_ids='forth_task', key='last_name')
  print(f"Hello {first_name}, {last_name} . And I am {age} years old")


def get_name():
  return "rituraj"

def get_full_name(ti):
  first_name = ti.xcom_pull(task_ids='third_task')
  ti.xcom_push(key='first_name', value=first_name)
  ti.xcom_push(key='last_name', value='singh')

with DAG(
  dag_id='python_operator_dag7',
  description='This is our python operator dag',
  # start_date=datetime(2025, 3, 1),
  # schedule_interval='@daily'
) as dag:
  task1 = PythonOperator(
    task_id='first_task',
    python_callable=greet
  )

  task2 = PythonOperator(
    task_id='second_task',
    python_callable=greetSomeone,
    op_kwargs={'age':20}
  )

  task3 = PythonOperator(
    task_id='third_task',
    python_callable=get_name
  )

  task4 = PythonOperator(
    task_id='forth_task',
    python_callable=get_full_name
  )


  task1 >> task3 >> task4 >> task2 
