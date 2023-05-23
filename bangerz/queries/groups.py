from pydantic import BaseModel
from typing import List, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    group_name: str
    group_size: int
    picture_url: str
    description: str


class GroupOut(BaseModel):
    id: int
    group_name: str
    group_size: int
    picture_url: Optional[str]
    description: str


class GroupRepository(BaseModel):
    def create(self, group: GroupIn, group_name: str) -> GroupOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO groups
                        (group_name, group_size, picture_url, description)
                        VALUES
                        (%s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            group.group_name,
                            group.group_size,
                            group.picture_url,
                            group.description
                        ]
                    )
                    result = db.fetchone()
                    if result:
                        id = result[0]
                        return GroupOut(
                            id=id,
                            **group.dict()
                            )
                    else:
                        return Error(message="Could not create group")

        except Exception:
            return {"message": "Could not create group"}

    def get_all(self) -> List[GroupOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id, group_name, group_size, picture_url, description
                        FROM groups
                        ORDER BY group_name
                        """
                    )
                    return [
                        GroupOut(
                            id=res[0],
                            group_name=res[1],
                            group_size=res[2],
                            picture_url=res[3],
                            description=res[4]
                        ) for res in result
                    ]

        except Exception:
            return {"message": "Could not get group list"}

    def get_one(self, group_id: int) -> GroupOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        id, group_name, group_size, picture_url, description
                        FROM groups
                        WHERE id = %s
                        """,
                        [group_id]
                    )
                    data = db.fetchone()
                    if data:
                        return GroupOut(
                            id=data[0],
                            group_name=data[1],
                            group_size=data[2],
                            picture_url=data[3],
                            description=data[4]
                        )
                    else:
                        return Error(message="Could not find group")

        except Exception:
            return {"message": "Could not retrieve group info"}

    def delete(self, group_id: int, group_name: str) -> bool | Error:
        target_group = self.get_one(group_id)
        if target_group.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM groups
                            WHERE id = %s
                            """,
                            [
                                group_id
                            ]
                        ),
                        return True

            except Exception:
                return False

        return None

    def update(
        self,
        group_id: int,
        group: GroupIn,
        group_name: str
    ) -> GroupOut | Error:
        target_group = self.get_one(group_id)
        if target_group.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE groups
                            SET
                                group_name = %s,
                                group_size = %s,
                                picture_url = %s,
                                description = %s
                            WHERE id = %s
                            """,
                            [
                                group.group_name,
                                group.group_size,
                                group.picture_url,
                                group.description,
                                group_id
                            ]
                        )
                        return GroupOut(
                            id=group_id,
                            **group.dict()
                            )

            except Exception:
                return Error(message="Could not update group")
        else:
            return Error(message="Group not found or group name mismatch")
