import tornado.ioloop
import tornado.web
import simplejson

import users

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open("index.html").read())

class CiklumersList(tornado.web.RequestHandler):
    count_per_request = 20;

    def get(self):
        role = self.get_argument('role', None)
        search = self.get_argument('search', None)
        page_num = int(self.get_argument('page', 0))

        result_users = USERS.get_users(page_num, self.count_per_request, role, search)
        self.write(simplejson.dumps(result_users))

class Ciklumer(tornado.web.RequestHandler):
    def get(self):
        self.write('ok')

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass

if __name__ == "__main__":
    USERS = users.Users()
    USERS.generate_users(100)

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