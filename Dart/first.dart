//import 'dart:io';

main(List<String> args) {
  testDart();
}

void testDart() {
  constTest();
  tellMe();
  strTest();
}

var sayHello = (name) => "hello $name";
String sayHello2(name) {
  return "hello $name";
}

void constTest() {
  var callbacks = [];
  for (var i = 0; i < 3; i++) {
    callbacks.add(() => print("save $i"));
  }
  callbacks.forEach((e) => e());
}

void tellMe({String who: "no body", String where, String what, String when}) {
  print("$who tell me $what in $where at $when");
}

void strTest({a:"12", va:"sx"}) {
  String sa = "6212260200147623074";
  sa ..trim()
     ..toLowerCase()
     ..toUpperCase()
     ..replaceFirst("411522199010250016", "B");
  print(sa);
}