from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.python import PythonOperator

default_args = {

  'owner':'nitiraj',
  'retries':5,
  'retry_delay': timedelta(minutes=2)
}


def greet():
  print("Hello World")

def greetSomeone(name, age):
  print(f"Hello {name}. And I am {age} years old")


def get_name():
  return "nitiraj"


with DAG(
  dag_id='python_operator_dag3',
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
    op_kwargs={'name':'nitiraj', 'age':20}
  )

  task3 = PythonOperator(
    task_id='third_task',
    python_callable=get_name
  )
  
  task1 >> task2 >> task3
