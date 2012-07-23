from random import choice, shuffle, randint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, or_
from sqlalchemy.orm import sessionmaker, relationship

Engine = create_engine('sqlite:///ciklumers2.db', echo=True)
Base = declarative_base(Engine)
Metadata = Base.metadata

class UsersFactory(object):
    rows_per_request = 20

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

    def __init__(self):
        self.session = sessionmaker(bind=Engine)()

    def get_users(self, role, search, page):
        start = self.rows_per_request * page
        end = start + self.rows_per_request
        query = self.session.query(User)#.order_by(User.name)
        if search:
            query = query.filter(or_(
                User.name.startswith(search),
                User.project.startswith(search),
                User.position.startswith(search),
                Skills.skill==search
            ))
        if role and role != "All":
            query = query.filter(User.position == role)

        return self.transform_to_dict(query[start:end])

    def transform_to_dict(self, users):
        return [
            dict(
                id=user.id,
                name=user.name,
                avatar=user.avatar,
                project=user.project,
                position=user.position,
                skills=[usr_skill.skill for usr_skill in user.skills]
            )
            for user in users
            if user.name is not None
        ]

    def generate_users(self, count):
        for i in range(count):
            self.session.add(self.create_random_user())
        self.session.commit()

    def create_random_user(self):
        shuffle(self.skills)
        avatar_id = randint(0, len(self.names)-1)
        usr = User(
            name=self.names[avatar_id],
            avatar=self.avatars[avatar_id],
            project=choice(self.projects),
            position=choice(self.positions),
        )
        for sk_name in self.skills[:randint(1,4)]:
            usr.skills.append(Skills(skill=sk_name))
        return usr

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    avatar = Column(String)
    project = Column(String, index=True)
    position = Column(String, index=True)
    skills = relationship("Skills", backref="users")

    def __init__(self, name, avatar, project, position):
        self.name = name
        self.avatar = avatar
        self.project = project
        self.position = position

    def __repr__(self):
        return "<User(%s, %s, %s) " % (self.name, self.position, self.project)

class Skills(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('users.id'))
    skill = Column(String)

if __name__ == '__main__':
    Base.metadata.create_all(Engine)
    UsersFactory().generate_users(50)