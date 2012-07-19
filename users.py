import uuid
from random import choice, shuffle, randint

class Users(object):
    users=dict()

    avatars = [
        'http://level2.ciklum.net/images/contacts/Artem_Trityak_4156.jpg',
        'http://level2.ciklum.net/images/contacts/Yuri_Sklyar_4157.jpg',
        'http://level2.ciklum.net/images/contacts/Evgeny_Savitsky_4353.jpg',
        'http://level2.ciklum.net/images/contacts/Oleg_Zhavoronkin.jpg',
        'http://level2.ciklum.net/images/contacts/Saltovets_Konstiantyn_4220.jpg'
    ]
    names = [
        'Artyom Trityak',
        'Saltovets Konstiantyn',
        'Yuri Sklyar',
        'Valentin Rogovskiy',
        'Alexey Galiullin',
        'Evgeniy Yurkov',
        'Oleg Tovsty',
    ]
    projects = [
        'Connex.io',
        'Westwing',
        'TIS',
        'Team Online'
    ]
    skills = ['PHP', "Python", 'JavaScript', 'Java', 'C++', 'Objective-C']
    positions = ['Developer', 'Team Lead', 'QA', 'Manager', ]

    def generate_users(self, count):
        users = dict()
        for i in range(count):
            uid, data = self.create_random_user()
            users[uid] = data
        self.users.update(users)
        return users

    def create_random_user(self):
        shuffle(self.skills)
        user_id = str(uuid.uuid4())
        return user_id, dict(
            name = choice(self.names),
            avatar = choice(self.avatars),
            project = choice(self.projects),
            position = choice(self.positions),
            skills = self.skills[:randint(1,4)],
            id = user_id
        )

