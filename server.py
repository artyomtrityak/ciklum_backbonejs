import tornado.ioloop
import tornado.web
import simplejson

from users import UsersFactory, User, Skills

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open("index.html").read())

class CiklumersList(tornado.web.RequestHandler):

    def get(self):
        role = self.get_argument('role', None)
        search = self.get_argument('search', None)
        page_num = int(self.get_argument('page', 0))

        result_users = USERS.get_users(role, search, page_num)
        self.write(simplejson.dumps(result_users))

class Ciklumer(tornado.web.RequestHandler):
    def get(self):
        pass

    def post(self):
        pass

    def put(self, user_id):
        result = USERS.update_user(user_id, simplejson.loads(self.request.body))
        self.write(simplejson.dumps(result))

    def delete(self):
        pass

if __name__ == "__main__":
    USERS = UsersFactory()

    application = tornado.web.Application([
        #Just return index page
        (r"/", MainHandler),

        #RESTful backbone app
        (r"/ciklumers", CiklumersList),
        (r"/ciklumers/([0-9]+)", Ciklumer),

        #Static files processing
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "./public"}),
    ])

    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()