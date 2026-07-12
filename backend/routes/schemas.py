from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

# Creates a new issue with required fields
class CreateTask(BaseModel):
    
    title: str = Field(min_length=2, max_length=100, example="Issue Title")
    taskdate: date
    dateindex: int
    

# Want every field to be optional for update, so that user can update any field they want
class update_tasks(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=100, example="Issue Title")

class user_response(BaseModel):
    id: int
    title: str
    taskdate: date
    dateindex: int
    class Config:
        from_attributes = True