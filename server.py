import tornado.ioloop
import tornado.web
import simplejson

import users

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open("index.html").read())

class CiklumersList(tornado.web.RequestHandler):
    def get(self):
        new_users = USERS.generate_users(10)
        self.write(simplejson.dumps(new_users.values()))

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