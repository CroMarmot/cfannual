#!/usr/bin/env sh

######################################################################
# @author      : cromarmot (yexiaorain@gmail.com)
# @file        : update
# @created     : 星期一 12月 30, 2019 21:07:45 CST
#
# @description : 
######################################################################

yarn generate && cd dist && git init && git remote add origin git@github.com:CroMarmot/cfannual.git && git checkout -b gh-pages && git add . && git commit -m "update by script" && git push origin gh-pages -f

