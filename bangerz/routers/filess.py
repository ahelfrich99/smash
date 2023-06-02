from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, Response
from typing import Union
from queries.filess import FileIn, FileOut, FileRepository, Error

router = APIRouter()


@router.post("/files", response_model=Union[FileOut, Error])
async def create_file(
    file: UploadFile = File(...),
    repo: FileRepository = Depends()
):
    file_data = await file.read()
    file_type = "image" if file.filename.split('.')[-1] in ["jpg", "jpeg", "png"] else "music"
    created_file = repo.create(FileIn(file_type=file_type), file_data)

    if isinstance(created_file, Error):
        raise HTTPException(status_code=500, detail=created_file.message)

    return created_file

@router.get("/files/{file_id}", response_model=Union[FileOut, Error])
async def get_file(
    file_id: int,
    repo: FileRepository = Depends()
):
    retrieved_file = repo.get_one(file_id)

    if isinstance(retrieved_file, Error):
        raise HTTPException(status_code=404, detail=retrieved_file.message)

    return retrieved_file
