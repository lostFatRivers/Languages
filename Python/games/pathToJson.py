import os
import json


# {
#   head :{
#       man:{
#           1001:[], 1002:[]}, 
#       woman:{1001:[], 1002:[]}
#   }
# }

rootPath = 'E:/fag/head'

def cachePathName(path, result):
    keyName = path.split('/')[-1]
    if os.path.isdir(path):
        if (keyName not in result.keys()):
            result[keyName] = {}
        dirs = os.listdir(path)
        for eachFile in dirs:
            cachePathName(path + "/" + eachFile, result[keyName])
    elif os.path.isfile(path):
        if ('arr' not in result.keys()):
            result['arr'] = []
        result['arr'].append(keyName)
    else:
        lzs = []

result = {}
cachePathName(rootPath, result)
json_info = json.dumps(result, sort_keys=True, indent=2)
print str(json_info)
