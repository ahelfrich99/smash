ID = 'id'
USERNAME = 'username'
FIRST_NAME = 'first_name'
LAST_NAME = 'last_name'
EMAIL = 'email'
PROFILE_IMG = 'profile_img'


class Account:
    def __init__(self, account: dict):
        self.user_id = int(account[ID])
        self.username = account[USERNAME]
        self.first_name = account[FIRST_NAME]
        self.last_name = account[LAST_NAME]
        self.email = account[EMAIL]
        self.profile_img = account[PROFILE_IMG]

    def to_string(self):
        print(self.user_id)
        print(self.username)
        print(self.first_name)
        print(self.last_name)
        print(self.email)
        print(self.profile_img)
