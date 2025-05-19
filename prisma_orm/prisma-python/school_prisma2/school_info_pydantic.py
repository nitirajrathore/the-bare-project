from typing import Dict, List, Optional
from pydantic import BaseModel, Field



class SportFacilityModel(BaseModel):
    name: str = Field(description="Name of the sport for which this facility is available")
    description: Optional[str] = Field(default=None, description="Description of the sports facility including metrics, size, capacity, etc.")


class ManagementPersonModel(BaseModel):
    name: str = Field(description="Name of the management person")
    position: Optional[str] = Field(default=None, description="Position or role in the school management")


class InfrastructureFacilityModel(BaseModel):
    name: str = Field(description="Name of the infrastructure facility")
    description: Optional[str] = Field(default=None, description="Description of the infrastructure facility including capacity, features, etc.")


class OtherFacilityModel(BaseModel):
    name: str = Field(description="Name of the facility")
    description: Optional[str] = Field(default=None, description="Description of the facility and its features")


class LabModel(BaseModel):
    name: str = Field(description="Name of the `subject` or `topic` for which this laboratory is available")
    description: Optional[str] = Field(default=None, description="Description of the lab including count, capacity, features, etc.")


class SchoolInfoModel(BaseModel):
    school_name: Optional[str] = Field(None, description="Full name of the school")
    city: Optional[str] = Field(None, description="City where the school is located")
    state: Optional[str] = Field(None, description="State in India where the school is situated")
    locality: Optional[str] = Field(None, description="Specific area or neighborhood within the city")
    school_type: Optional[str] = Field(None, description="Public/Government, Private, or International")
    board_affiliation: Optional[str] = Field(None, description="CBSE, ICSE, State Board, IB, Cambridge, or other")
    establishment_year: Optional[int] = Field(None, description="Year the school was founded")
    website: Optional[str] = Field(None, description="Official website URL")
    contact_phone: List[str] = Field(default_factory=list, description="List of Phone numbers of the school")
    contact_email: Optional[str] = Field(None, description="Email address")
    school_address: Optional[str] = Field(None, description="Complete physical address of the school premises.")
    other_office_addresses: List[str] = Field(
        default_factory=list,
        description="List of other office addresses of the school if any. This is not the same as the school address"
    )
    grade_levels: Optional[str] = Field(None, description="Classes offered (e.g., Nursery to Class 12)")
    medium_instruction: Optional[str] = Field(None, description="Primary language of instruction, eg. English, Hindi, Tamil etc.")
    teacher_student_ratio: Dict[str, str] = Field(
        default_factory=dict,
        description="Number of students per teacher, as a map of class/grade to ratio, if exact classes cannot be infered then use 'all' as key"
    )
    campus_size: Optional[str] = Field(None, description="Total area of the school campus in acres")
    annual_fees: Dict[str, str] = Field(
        default_factory=dict,
        description="Approximate total yearly fees in INR, as a map of grade/class to fee amount, if exact classes cannot be infered then use 'all' as key"
    )
    sports_facilities: List[SportFacilityModel] = Field(
        default_factory=list,
        description="List of sports available with details about facilities"
    )
    labs: List[LabModel] = Field(
        default_factory=list,
        description="List of labs available with details about count, capacity, and features. Eg. Science lab, Computer lab, Chemistry lab etc."
    )
    school_infrastructure: List[InfrastructureFacilityModel] = Field(
        default_factory=list,
        description="List of infrastructure facilities like auditoriums, assembly halls, libraries, etc."
    )
    cocurricular: Dict[str, str] = Field(
        default_factory=dict,
        description="Arts, music and other cocurricular activities with their facilities. Use `subject` or `topic` in lowercase as key and `description` as value"
    )
    achievements: List[str] = Field(
        default_factory=list,
        description="Recent achievements of school in an anonymous way (without including names of students, teachers, etc.)"
    )
    accolades: List[str] = Field(
        default_factory=list,
        description="Accreditations, certificates or recognitions received by the school"
    )
    special_needs: List[str] = Field(
        default_factory=list,
        description="Facilities provided for students with special needs or disabilities"
    )
    transportation: Optional[str] = Field(
        None,
        description="Transportation facilities like buses, vans etc and locations covered"
    )
    other_facilities: List[OtherFacilityModel] = Field(
        default_factory=list,
        description="Additional facilities provided by the school which are not covered elsewhere"
    )
    performance: List[str] = Field(
        default_factory=list,
        description="Latest academic results or achievements in various exams and competitions"
    )
    alumni: List[str] = Field(
        default_factory=list,
        description="Notable alumni of the school at recognized positions"
    )
    visits: List[str] = Field(
        default_factory=list,
        description="Prominent people who have visited the school"
    )
    tours: List[str] = Field(
        default_factory=list,
        description="School tours, expeditions, or field trips to national or international places"
    )
    career_counselling: Optional[str] = Field(
        None,
        description="Career counseling facilities provided by the school"
    )
    school_timings: Dict[str, str] = Field(
        default_factory=dict,
        description="School timings by class/grade as key and value as timing, if no specific class can be inferered then use 'all' as key"
    )
    misc: List[str] = Field(
        default_factory=list,
        description="Any special information about the school not covered elsewhere."
    )
    management: List[ManagementPersonModel] = Field(
        default_factory=list,
        description="List of key management personnel with their positions"
    )