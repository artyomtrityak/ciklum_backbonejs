import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open("index.html").read())

class CiklumersList(tornado.web.RequestHandler):
    def get(self):
        self.write('ok')

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