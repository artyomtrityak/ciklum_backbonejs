import uuid
from random import choice, shuffle, randint

class Users(object):
    users=dict()

    avatars = [
        'http://level2.ciklum.net/images/contacts/Artem_Trityak_4156.jpg',
        'http://level2.ciklum.net/images/contacts/Yuri_Sklyar_4157.jpg',
        'http://level2.ciklum.net/images/contacts/Saltovets_Konstiantyn_4220.jpg',
        'http://level2.ciklum.net/images/contacts/Dmitry_Nefedchenko_3247.jpg',
        'http://level2.ciklum.net/images/contacts/Eugene_Turovskiy_3488.jpg',
        'http://level2.ciklum.net/images/contacts/Bistrov_Igor_4613.jpg',
        'http://level2.ciklum.net/images/contacts/Igor_Braginsky_4364.jpg',
        'http://level2.ciklum.net/images/contacts/Vyacheslav_Medvedev_3487.jpg',
        'http://level2.ciklum.net/images/contacts/Grigoriy_Piskun_3050.jpg',
        'http://level2.ciklum.net/images/contacts/Kaleshnyk_Arseniy_3594.jpg',
        'http://level2.ciklum.net/images/contacts/Pavel_Zhelnov.jpg',
        'http://level2.ciklum.net/images/contacts/Gennadiy_Vyaznikov_3169.jpg',
    ]
    names = [
        'Artyom Trityak',
        'Yuri Sklyar',
        'Saltovets Konstiantyn',
        'Dmitry Nefedchenko',
        'Eugene Turovskiy',
        'Igor Bistrov',
        'Igor Braginsky',
        'Vyacheslav Medvedev',
        'Grigoriy Piskun',
        'Kaleshnyk Arseniy',
        'Pavel Zhelnov',
        'Gennadiy Vyaznikov',
    ]
    projects = [
        'Connex.io',
        'Westwing',
        'Treasury Intelligence Solutions',
        'Team Online',
        'Vertica',

    ]
    skills = ["Python", 'JavaScript', 'Java', 'C++', 'Objective-C', 'C#', 'PHP', 'Erlang']
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
        avatar_id = randint(0, len(self.names)-1)
        user_id = str(uuid.uuid4())
        return user_id, dict(
            name = self.names[avatar_id],
            avatar = self.avatars[avatar_id],
            project = choice(self.projects),
            position = choice(self.positions),
            skills = self.skills[:randint(1,4)],
            id = user_id
        )

