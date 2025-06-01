import random
from dataclasses import dataclass

from prefect import flow, task
from prefect.futures import PrefectFuture, wait

@dataclass
class Dataset:
    name: str

@dataclass
class ModelConfig:
    name: str

@task(task_run_name="train on {dataset.name} with {model_config.name}")
def train_model(dataset: Dataset, model_config: ModelConfig) -> dict:
    return {
        "dataset": dataset.name,
        "model": model_config.name,
        "score": random.random(),
    }

@flow
def evaluate_models(datasets: list[Dataset], model_configs: list[ModelConfig]):
    all_futures: list[PrefectFuture[dict[str, object]]] = []
    for dataset in datasets:
        futures = train_model.map(
            dataset=dataset,
            model_config=model_configs,
        )
        all_futures.extend(futures)

    results = [future.result() for future in wait(all_futures).done]

    print(f"\nBest model: {max(results, key=lambda r: r['score'])}")

evaluate_models(
    datasets=[
        Dataset("customers"), Dataset("products"), Dataset("orders")
    ],
    model_configs=[
        ModelConfig("random_forest"), ModelConfig("gradient_boosting")
    ],
)