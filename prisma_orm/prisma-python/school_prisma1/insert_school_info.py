import asyncio
from prisma import Prisma
from school_info_pydantic import SchoolInfoModel, SportFacilityModel, ManagementPersonModel, InfrastructureFacilityModel, OtherFacilityModel, LabModel
from prisma.types import SchoolInfoCreateInput
from prisma import fields

async def main() -> None:
    db = Prisma()
    await db.connect()


    schoolInfoPydantic = SchoolInfoModel(
        school_name="ABC School",
        city="New York",
        state="NY",
        locality="Downtown",
        school_type="Private",
        board_affiliation="CBSE",
        establishment_year=2000,
        website="www.abcschool.com",
        contact_phone=["1234567890", "0987654321"],
        contact_email="someemail@gmail.com",
        school_address="123 Main St, Downtown, NY",
        other_office_addresses=["456 Elm St, Downtown, NY"],
        grade_levels="Nursery to Class 12",
        medium_instruction="English",
        teacher_student_ratio={"all": "1:20"},
        campus_size="5 acres",
        annual_fees={"all": "50000"},
        sports_facilities=[
            SportFacilityModel(
                name="Football",
                description="Full-size football field with goalposts"
            ),
            SportFacilityModel(
                name="Basketball",
                description="Indoor basketball court with seating"
            )   
        ], 
        management=[
            ManagementPersonModel(
                name="John Doe",
                position="Principal"
            ),
            ManagementPersonModel(
                name="Jane Smith",
                position="Vice Principal"
            )
        ],
        school_infrastructure=[
            InfrastructureFacilityModel(
                name="Library",
                description="Well-stocked library with reading area"
            ),
            InfrastructureFacilityModel(
                name="Computer Lab",
                description="30 computers with internet access"
            )
        ],
        transportation="Available",
        career_counselling="Available",
        other_facilities=[
            OtherFacilityModel(
                name="Cafeteria",
                description="Spacious cafeteria serving healthy meals"
            ),
            OtherFacilityModel(
                name="Auditorium",
                description="Large auditorium for events and functions"
            )
        ],
        labs=[
            LabModel(
                name="Science Lab",
                description="Fully equipped science lab with safety measures"
            ),
            LabModel(
                name="Computer Lab",
                description="30 computers with internet access"
            )
        ],
    )


    # Convert to Prisma input format
    prisma_input = convert_to_prisma_input(schoolInfoPydantic)
    
    # Create the record using the converted input
    user = await db.schoolinfo.create(data=prisma_input)

    await db.disconnect()

def convert_to_prisma_input(pydantic_model: SchoolInfoModel) -> SchoolInfoCreateInput:
    """
    Convert a SchoolInfoModel (Pydantic model) to a SchoolInfoCreateInput for Prisma ORM.
    """
    data_dict = pydantic_model.model_dump(mode='json')

    # Convert JSON fields to fields.Json
    json_fields = ['teacher_student_ratio', 'annual_fees', 'cocurricular', 'school_timings']
    for field in json_fields:
        if field in data_dict:
            value = data_dict[field]
            # If the value is None, set as None, else wrap in fields.Json
            data_dict[field] = fields.Json(value) if value is not None else None

    # For complex nested structures, transform according to Prisma schema requirements
    if 'sports_facilities' in data_dict:
        data_dict['sports_facilities'] = {
            "create": [
                {"name": facility["name"], "description": facility["description"]}
                for facility in data_dict['sports_facilities']
            ]
        }

    if 'labs' in data_dict:
        data_dict['labs'] = {
            "create": [
                {"name": lab["name"], "description": lab["description"]}
                for lab in data_dict['labs']
            ]
        }

    if 'management' in data_dict:
        data_dict['management'] = {
            "create": [
                {"name": person["name"], "position": person["position"]}
                for person in data_dict['management']
            ]
        }

    if 'school_infrastructure' in data_dict:
        data_dict['school_infrastructure'] = {
            "create": [
                {"name": infra["name"], "description": infra["description"]}
                for infra in data_dict['school_infrastructure']
            ]
        }

    if 'other_facilities' in data_dict:
        data_dict['other_facilities'] = {
            "create": [
                {"name": facility["name"], "description": facility["description"]}
                for facility in data_dict['other_facilities']
            ]
        }

    # Return as SchoolInfoCreateInput
    return SchoolInfoCreateInput(**data_dict)

if __name__ == '__main__':
    asyncio.run(main())

