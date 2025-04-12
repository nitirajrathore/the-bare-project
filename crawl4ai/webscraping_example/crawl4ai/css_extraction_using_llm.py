from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from crawl4ai import LLMConfig

html = "<div class='product'><h2>Gaming Laptop</h2><span class='price'>$999.99</span></div>"

schema = JsonCssExtractionStrategy.generate_schema(
    html=html,
    llm_config=LLMConfig(provider="openai/gpt-40mini", api_token="") 
)

# schema = JsonCssExtractionStrategy.generate_schema(
#     html=html,
#     llm_config=LLMConfig(provider="ollama/llama3.3", api_token=None),
# )

strategy = JsonCssExtractionStrategy(schema)
