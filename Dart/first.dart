import 'dart:io';

main(List<String> args) {
  MyHttpService.startup();
}

class PlayerManager {
  Future<String> call(String message) async {
    return "Good";
  }
  void printAll() async {
    var list = [];
    for (var i = 0; i < 1000; i++) {
      list.add(i);
    }
    await for (var i in Stream.fromIterable(list)) {
      print(i);
    }
  }
}

class MyHttpService {
  static void startup() async {
    var server = await HttpServer.bind('127.0.0.1', 8070);
    await for (var request in server) {
      request.response
        ..write('Hello world')
        ..close();
    }
  }
}