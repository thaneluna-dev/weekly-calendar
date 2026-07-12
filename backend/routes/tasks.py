
from fastapi import APIRouter, Depends, HTTPException, status
from backend.routes.schemas import CreateTask, user_response
from backend.routes.storage import get_db
from sqlalchemy.orm import Session
from backend.models.tasksmodels import Tasks

#!SECTION The APIS to integrate into application to call on fastapi server and store the tasks

router = APIRouter(
    prefix="/api/v1/tasks", tags=["tasks"],
    responses={404: {"description": "Not found"}})

@router.get("/", response_model=list[user_response])
async def get_tasks(db:Session=Depends(get_db)):
    return db.query(Tasks).all()

@router.post("/createtasks", response_model=user_response, status_code=status.HTTP_201_CREATED)
async def create_tasks(task: CreateTask, db:Session=Depends(get_db)):
    new_task = Tasks(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# Update method for Tasks
@router.put("/updatetasks/{task_id}", response_model=user_response)
async def update_tasks(task_id: int, updated_task: CreateTask, db: Session = Depends(get_db)):
    task = db.query(Tasks).filter(Tasks.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tasks not found for date")
    
    for key, value in updated_task.dict().items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)
    return task