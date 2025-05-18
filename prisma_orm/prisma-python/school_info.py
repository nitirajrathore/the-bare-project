from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import json

from school_info_pydantic import SchoolInfoModel

# ----- Normal dataclass -----
@dataclass
class SportFacility:
    name: str
    description: Optional[str]

@dataclass
class Lab:
    name: str
    description: Optional[str]

@dataclass
class OtherFacility:
    name: str
    description: Optional[str]

@dataclass
class InfrastructureFacility:
    name: str
    description: Optional[str]

@dataclass
class ManagementPerson:
    name: str
    position: Optional[str]

@dataclass
class SchoolInfo:
    school_name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    locality: Optional[str] = None
    school_type: Optional[str] = None
    # TODO: Make it object, affliation and affiliation_number
    board_affiliation: Optional[str] = None
    establishment_year: Optional[int] = None
    website: Optional[str] = None
    contact_phone: Optional[List[str]] = None
    contact_email: Optional[str] = None
    school_address: Optional[str] = None
    other_office_addresses: Optional[List[str]] = None
    grade_levels: Optional[str] = None
    medium_instruction: Optional[str] = None
    # TODO: Make this object, total teahers count, total students count, total other staff count. 
    # explicitly mention, what teacher to student ratio is.
    # add teacher to section ratio. That seems to be a common thing.
    teacher_student_ratio: Optional[Dict[str, str]] = None
    campus_size: Optional[str] = None
    annual_fees: Optional[Dict[str, str]] = None
    sports_facilities: Optional[List[SportFacility]] = None
    labs: Optional[List[Lab]] = None
    school_infrastructure: Optional[List[InfrastructureFacility]] = None
    cocurricular: Optional[Dict[str, str]] = None
    achievements: Optional[List[str]] = None
    accolades: Optional[List[str]] = None
    special_needs: Optional[List[str] ]= None
    transportation: Optional[str] = None
    other_facilities: Optional[List[OtherFacility]] = None
    performance: Optional[List[str]] = None
    alumni: Optional[List[str]] = None
    visits: Optional[List[str]]= None
    tours: Optional[List[str]] = None
    career_counselling: Optional[str] = None
    school_timings: Optional[Dict[str, str]] = None
    misc: Optional[List[str]] = None
    management: Optional[List[ManagementPerson]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return asdict(self)
    
    @classmethod
    def merge(cls, *school_infos: 'SchoolInfo') -> 'SchoolInfo':
        """
        Merge multiple SchoolInfo objects into a single comprehensive object.

        Args:
            *school_infos: Multiple SchoolInfo objects to merge

        Returns:
            SchoolInfo: A new object with combined information from all inputs

        Notes:
            - None, null, or empty values are ignored
            - For string fields, unique values are concatenated with " | "
            - For list fields, unique items from all objects are combined
            - For dict fields, keys are combined and values are recursively merged
            - No values override others; everything is preserved if unique
        """
        if not school_infos:
            return cls()

        result = cls()

        def merge_dicts(dicts):
            merged = {}
            for d in dicts:
                for k, v in d.items():
                    if k not in merged:
                        merged[k] = v
                    else:
                        # Merge values for duplicate keys
                        prev = merged[k]
                        if isinstance(prev, dict) and isinstance(v, dict):
                            merged[k] = merge_dicts([prev, v])
                        elif isinstance(prev, list) and isinstance(v, list):
                            merged[k] = merge_lists([prev, v])
                        elif isinstance(prev, str) and isinstance(v, str):
                            merged[k] = merge_strings([prev, v])
                        else:
                            # Fallback: put both as list of unique values
                            merged[k] = merge_lists([[prev], [v]])
            return merged

        def merge_lists(lists):
            seen = set()
            merged = []
            for lst in lists:
                if not lst:
                    continue
                for item in lst:
                    # For dataclass objects with 'name', deduplicate by name
                    if hasattr(item, 'name'):
                        key = (type(item), getattr(item, 'name', None))
                        if key not in seen:
                            seen.add(key)
                            merged.append(item)
                    else:
                        # For primitives, deduplicate by value
                        if isinstance(item, (str, int, float, tuple)):
                            if item not in seen:
                                seen.add(item)
                                merged.append(item)
                        else:
                            # For other objects, deduplicate by id
                            key = id(item)
                            if key not in seen:
                                seen.add(key)
                                merged.append(item)
            return merged

        def merge_strings(strings):
            uniq = []
            seen = set()
            for s in strings:
                if s is None or s == "":
                    continue
                if s not in seen:
                    seen.add(s)
                    uniq.append(s)
            return " | ".join(uniq) if uniq else None

        for field_name, field_type in result.__annotations__.items():
            try:
                values = [getattr(info, field_name, None) for info in school_infos]
                # Remove None, empty string, and empty list/dict values
                values = [v for v in values if v not in (None, "", [], {})]
                
                if not values:
                    continue

                # Handle by type
                sample = values[0]
                # List of dataclass objects with 'name' field
                if field_name in (
                    'sports_facilities', 'labs', 'school_infrastructure', 'other_facilities', 'management'
                ):
                    merged = merge_lists(values)
                    setattr(result, field_name, merged if merged else None)
                # List of primitives
                elif field_name in (
                    'contact_phone','achievements', 'accolades', 'special_needs', 'performance', 'alumni', 'visits', 'tours', 'misc', 'other_office_addresses'
                ):
                    merged = merge_lists(values)
                    setattr(result, field_name, merged if merged else None)
                # Dict fields
                elif field_name in (
                    'teacher_student_ratio', 'annual_fees', 'cocurricular', 'school_timings'
                ):
                    merged = merge_dicts(values)
                    setattr(result, field_name, merged if merged else None)
                # String fields (including optional)
                elif isinstance(sample, str):
                    merged = merge_strings(values)
                    setattr(result, field_name, merged)
                # Int fields (use all unique, but if only one, just set it)
                elif isinstance(sample, int):
                    uniq = []
                    seen = set()
                    for v in values:
                        if v not in seen:
                            seen.add(v)
                            uniq.append(v)
                    setattr(result, field_name, uniq[0] if len(uniq) == 1 else uniq)
                # List of int/float/str
                elif isinstance(sample, list):
                    merged = merge_lists(values)
                    setattr(result, field_name, merged if merged else None)
                # Fallback: use last non-None value
                else:
                    setattr(result, field_name, values[-1])
                    
            except Exception as e:
                print(f"Error merging field '{field_name}': {e}")
                print(f"  Values: {values}")
                # Continue with other fields

        return result

    @classmethod
    def from_pydantic(cls, model: 'SchoolInfoModel') -> 'SchoolInfo':
        """
        Create a SchoolInfo object from a Pydantic SchoolInfoModel.
        
        Args:
            model: Pydantic model instance to convert
            
        Returns:
            A properly typed SchoolInfo object
        """
        result = cls()
        
        # Convert basic fields (strings, integers)
        for field in ['school_name', 'city', 'state', 'locality', 'school_type', 'board_affiliation', 
                     'establishment_year', 'website', 'contact_email', 'school_address', 
                     'grade_levels', 'medium_instruction', 'campus_size', 'transportation',
                     'career_counselling']:
            if hasattr(model, field) and getattr(model, field) is not None:
                setattr(result, field, getattr(model, field))
        
        # Convert list of strings fields
        for field in ['contact_phone', 'other_office_addresses', 'achievements', 'accolades',
                     'special_needs', 'performance', 'alumni', 'visits', 'tours', 'misc']:
            if hasattr(model, field) and getattr(model, field) is not None:
                setattr(result, field, getattr(model, field))
        
        # Convert dictionary fields
        for field in ['teacher_student_ratio', 'annual_fees', 'cocurricular', 'school_timings']:
            if hasattr(model, field) and getattr(model, field) is not None:
                setattr(result, field, getattr(model, field))
        
        # Convert complex object fields - SportFacility
        if model.sports_facilities:
            result.sports_facilities = []
            for item in model.sports_facilities:
                result.sports_facilities.append(SportFacility(
                    name=item.name,
                    description=item.description
                ))
        
        # Convert complex object fields - Lab
        if model.labs:
            result.labs = []
            for item in model.labs:
                result.labs.append(Lab(
                    name=item.name,
                    description=item.description
                ))
        
        # Convert complex object fields - InfrastructureFacility
        if model.school_infrastructure:
            result.school_infrastructure = []
            for item in model.school_infrastructure:
                result.school_infrastructure.append(InfrastructureFacility(
                    name=item.name,
                    description=item.description
                ))
        
        # Convert complex object fields - OtherFacility
        if model.other_facilities:
            result.other_facilities = []
            for item in model.other_facilities:
                result.other_facilities.append(OtherFacility(
                    name=item.name,
                    description=item.description
                ))
        
        # Convert complex object fields - ManagementPerson
        if model.management:
            result.management = []
            for item in model.management:
                result.management.append(ManagementPerson(
                    name=item.name,
                    position=item.position
                ))
        
        return result

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SchoolInfo':
        """
        Create a SchoolInfo object from a dictionary (TypedDict).
        
        Args:
            data: Dictionary containing school information
            
        Returns:
            A properly typed SchoolInfo object
        """
        result = cls()
        
        # Convert basic fields (strings, integers)
        for field in ['school_name', 'city', 'state', 'locality', 'school_type', 'board_affiliation', 
                     'establishment_year', 'website', 'contact_email', 'school_address', 
                     'grade_levels', 'medium_instruction', 'campus_size', 'transportation',
                     'career_counselling']:
            if field in data and data[field] is not None:
                setattr(result, field, data[field])
        
        # Convert list of strings fields
        for field in ['contact_phone', 'other_office_addresses', 'achievements', 'accolades',
                     'special_needs', 'performance', 'alumni', 'visits', 'tours', 'misc']:
            if field in data and data[field] is not None:
                setattr(result, field, data[field])
        
        # Convert dictionary fields
        for field in ['teacher_student_ratio', 'annual_fees', 'cocurricular', 'school_timings']:
            if field in data and data[field] is not None:
                setattr(result, field, data[field])
        
        # Convert complex object fields - SportFacility
        if 'sports_facilities' in data and data['sports_facilities']:
            result.sports_facilities = []
            for item in data['sports_facilities']:
                result.sports_facilities.append(SportFacility(
                    name=item.get('name', ''),
                    description=item.get('description')
                ))
        
        # Convert complex object fields - Lab
        if 'labs' in data and data['labs']:
            result.labs = []
            for item in data['labs']:
                result.labs.append(Lab(
                    name=item.get('name', ''),
                    description=item.get('description')
                ))
        
        # Convert complex object fields - InfrastructureFacility
        if 'school_infrastructure' in data and data['school_infrastructure']:
            result.school_infrastructure = []
            for item in data['school_infrastructure']:
                result.school_infrastructure.append(InfrastructureFacility(
                    name=item.get('name', ''),
                    description=item.get('description')
                ))
        
        # Convert complex object fields - OtherFacility
        if 'other_facilities' in data and data['other_facilities']:
            result.other_facilities = []
            for item in data['other_facilities']:
                result.other_facilities.append(OtherFacility(
                    name=item.get('name', ''),
                    description=item.get('description')
                ))
        
        # Convert complex object fields - ManagementPerson
        if 'management' in data and data['management']:
            result.management = []
            for item in data['management']:
                result.management.append(ManagementPerson(
                    name=item.get('name', ''),
                    position=item.get('position')
                ))
        
        return result

    @classmethod
    def from_json(cls, json_data: Dict[str, Any]) -> 'SchoolInfo':
        """
        Create a SchoolInfo object from a raw JSON dictionary.
        
        Note: This is functionally equivalent to from_dict() but provided
        for API clarity when creating from raw JSON data.
        
        Args:
            json_data: Dictionary parsed from JSON
            
        Returns:
            A properly typed SchoolInfo object
        """
        return cls.from_dict(json_data)

# Custom JSON encoder for our dataclasses
class SchoolInfoJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder for SchoolInfo and related classes."""
    
    def default(self, o):
        if hasattr(o, '__dataclass_fields__'):
            # This is a dataclass, use asdict() to convert it
            return asdict(o)
        
        # Try default serialization
        try:
            return super().default(o)
        except TypeError:
            # For other custom objects, return a string representation
            return str(o)