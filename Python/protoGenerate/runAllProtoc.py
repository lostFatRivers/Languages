#coding: utf8
import os
import re
import sys
import os.path

from configclass import Config

configINIFile = "config.ini"

noteList = ["var jspb = require('google-protobuf')", "var goog = jspb", "goog.object.extend(exports, proto)"]

def getConfigArgs():
    root_dir = Config(configINIFile).get("protoconfig", "root_dir")
    proto_dir = Config(configINIFile).get("protoconfig", "proto_dir")
    js_out_dir = Config(configINIFile).get("protoconfig", "js_out_dir")
    java_out_dir = Config(configINIFile).get("protoconfig", "java_out_dir")
    return root_dir, proto_dir, js_out_dir, java_out_dir

def changeJsFileContent(filePath):
    readFileContent = ""
    writeFileContent = ""
    with open(filePath, 'r') as f:
        readFileContent = f.read()
		
    #处理require
    reRst = re.findall(r"(var .*?_pb = require\('\./.*?_pb\.js'\);)", readFileContent)

    for item in noteList:
        changeAfter = "//{0}".format(item)
        writeFileContent = readFileContent.replace(item, changeAfter)
        readFileContent = writeFileContent

    #处理require
    for item in reRst:
        itemCut = item.split('=')
        writeFileContent = readFileContent.replace(item, "{0} = proto;".format(itemCut[0]))
        readFileContent = writeFileContent

    with open(filePath, 'w') as f:
        f.write(writeFileContent)


if __name__ == "__main__":
    root_dir, proto_dir, js_out_dir, java_out_dir = getConfigArgs()
    if len(sys.argv) == 2:
        target_proto_file = sys.argv[1]
    else:
        target_proto_file = ""
    print "{0}/{1}".format(os.getcwd(), root_dir)
    isFalse = False
    for dirpath, sub_dirs, filenames in os.walk(root_dir):
        if target_proto_file != "":
            filenames = [target_proto_file + '.proto']
        print 'proto files: ', filenames
        print ''
        for eachName in filenames:
            protoc_command = "protoc -I=" + proto_dir + " --java_out=" + java_out_dir + " --js_out=import_style=commonjs,binary:" + js_out_dir + " " + proto_dir + "/" + eachName
            print protoc_command
            result = os.system(protoc_command)
            if result != 0:
                print eachName + " error. result:" + str(result)
                isFalse = True
                break
            #注销js部分
            jsFileName = eachName.split('.')[0]+"_pb.js"
            jsFilePath = '{0}/{1}'.format(js_out_dir, jsFileName)
            if not os.path.exists(jsFilePath):
                print "WARNING: js文件不存在: {0}".format(jsFilePath)
                continue
            changeJsFileContent(jsFilePath)

    if isFalse:
        sys.exit(1)