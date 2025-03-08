## install libs 

### core langchain libs
```
pip install -U langchain langchain-openai
```

### more core libs
```
pip install --quiet --upgrade langchain-text-splitters langchain-community langgraph
```

### llm model support
```
pip install -qU "langchain[openai]"
```

### Embedding model support
```
pip install -qU langchain-openai
```

### vector 

```
pip install -qU langchain-core
```

### for generating reqs
```
pip install pipreqsnb
```

#### generate reqs.txt
```
pipreqsnb . 
```

### install reqs 
```
pip install -r requirements.txt
```