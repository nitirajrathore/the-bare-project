import asyncio
from prisma import Prisma
from school_info_pydantic import (
    SchoolInfoModel,
    SportFacilityModel,
    LabModel,
    ManagementPersonModel,
    InfrastructureFacilityModel,
    OtherFacilityModel,
)
from prisma.models import SchoolInfo


def to_pydantic_school(school) -> SchoolInfoModel:
    # Convert Prisma model instance to dict first

    school_dict = school.dict()
    return SchoolInfoModel(
        school_name=school_dict.get("school_name"),
        city=school_dict.get("city"),
        state=school_dict.get("state"),
        locality=school_dict.get("locality"),
        school_type=school_dict.get("school_type"),
        board_affiliation=school_dict.get("board_affiliation"),
        establishment_year=school_dict.get("establishment_year"),
        website=school_dict.get("website"),
        contact_phone=school_dict.get("contact_phone") or [],
        contact_email=school_dict.get("contact_email"),
        school_address=school_dict.get("school_address"),
        other_office_addresses=school_dict.get("other_office_addresses") or [],
        grade_levels=school_dict.get("grade_levels"),
        medium_instruction=school_dict.get("medium_instruction"),
        teacher_student_ratio=school_dict.get("teacher_student_ratio") or {},
        campus_size=school_dict.get("campus_size"),
        annual_fees=school_dict.get("annual_fees") or {},
        sports_facilities=[
            SportFacilityModel(**sf) for sf in (school_dict.get("sports_facilities") or [])
        ],
        labs=[
            LabModel(**lab) for lab in (school_dict.get("labs") or [])
        ],
        school_infrastructure=[
            InfrastructureFacilityModel(**infra) for infra in (school_dict.get("school_infrastructure") or [])
        ],
        cocurricular=school_dict.get("cocurricular") or {},
        achievements=school_dict.get("achievements") or [],
        accolades=school_dict.get("accolades") or [],
        special_needs=school_dict.get("special_needs") or [],
        transportation=school_dict.get("transportation"),
        other_facilities=[
            OtherFacilityModel(**of) for of in (school_dict.get("other_facilities") or [])
        ],
        performance=school_dict.get("performance") or [],
        alumni=school_dict.get("alumni") or [],
        visits=school_dict.get("visits") or [],
        tours=school_dict.get("tours") or [],
        career_counselling=school_dict.get("career_counselling"),
        school_timings=school_dict.get("school_timings") or {},
        misc=school_dict.get("misc") or [],
        management=[
            ManagementPersonModel(**m) for m in (school_dict.get("management") or [])
        ],
    )

async def main() -> None:
    db = Prisma()
    await db.connect()

    schools = await db.schoolinfo.find_many(
        include={
            'sports_facilities': True,
            'labs': True,
            'management': True,
            'school_infrastructure': True,
            'other_facilities': True
        }
    )
    for school in schools:
        print(type(school))
        # pydantic_school = to_pydantic_school(school)
        # print(pydantic_school.model_dump(mode='json'))

    await db.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
