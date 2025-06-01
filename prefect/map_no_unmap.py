from prefect import flow, task, unmapped

@task
def sum_plus(x, myint):
    print(f"Adding {myint} to {x}")
    return x + myint

@flow
def sum_it(numbers, iterable):
    futures = sum_plus.map(numbers, iterable)
    return futures.result()

resulting_sum = sum_it([4, 5, 6], [1, 2, 3])
print(resulting_sum)  