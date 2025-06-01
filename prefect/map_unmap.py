from prefect import flow, task, unmapped

@task
def sum_plus(x, static_iterable):
    return x + sum(static_iterable)

@flow
def sum_it(numbers, static_iterable):
    futures = sum_plus.map(numbers, unmapped(static_iterable))
    return futures.result()

resulting_sum = sum_it([4, 5, 6], [1, 2, 3])
assert resulting_sum == [10, 11, 12]