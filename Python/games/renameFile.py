import os




rootPath = 'E:/fag/head'

# 把目录下的文件重命名, 保留原来后缀, 命名规则: parent + 010 + index;
def renameImage(path, num):
    prePath = path[0: - len(path.split('/')[-1])]
    preName = path.split('/')[-2]
    suff = path.split('.')[-1]
    if os.path.isdir(path):
        dirs = os.listdir(path)
        index = 1
        for eachFile in dirs:
            renameImage(path + "/" + eachFile, index)
            index += 1
    elif os.path.isfile(path):
        newDir = prePath + preName + "010" + str(num) + "." + suff
        print "rename image oldName:" + path + " newName:" + newDir
        os.rename(path, newDir)
    else:
        print "it's a special file(socket,FIFO,device file)"

renameImage(rootPath, 1)