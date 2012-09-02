import tornado.ioloop
import tornado.web
import simplejson

from users import UsersFactory, User, Skills

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        #yeah, i know
        self.write(open("index.html").read())

class Ciklumer(tornado.web.RequestHandler):
    def get(self):
        role = self.get_argument('role', None)
        search = self.get_argument('search', None)
        page_num = int(self.get_argument('page', 0))
        result_users = USERS.get_users(role, search, page_num)
        self.write(simplejson.dumps(result_users))

    def post(self):
        result = USERS.new_user(simplejson.loads(self.request.body))
        self.write(simplejson.dumps(result))

    def put(self, user_id):
        result = USERS.update_user(user_id, simplejson.loads(self.request.body))
        self.write(simplejson.dumps(result))

    def delete(self, user_id):
        USERS.delete_user(user_id)
        self.write("1")

if __name__ == "__main__":
    USERS = UsersFactory()

    application = tornado.web.Application([
        #Just return index page
        (r"/", MainHandler),

        #RESTful backbone app
        (r"/ciklumers", Ciklumer),
        (r"/ciklumers/([0-9]+)", Ciklumer),

        #Static files processing
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "./public"}),
    ])

    application.listen(9998)
    tornado.ioloop.IOLoop.instance().start()
