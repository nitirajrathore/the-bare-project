from pydantic import BaseModel

class Person(BaseModel):
    name: str
    email: str

# For Pydantic v2:
schema = Person.model_json_schema()

# Save as JSON
import json
with open('person.schema.json', 'w') as f:
    json.dump(schema, f, indent=2)
