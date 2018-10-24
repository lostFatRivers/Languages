## 前端路由

用于多页面
spa - single page application

vue + vue-router

## 初始化:
npm init
npm install vue vue-router axios jquery bootstrap animate.css

## 前后端分离
后端只负责提供数据, 跳转等逻辑前端自己处理,
### 方式
. hash模式      开发时使用, 不会导致404, 不支持seo
. h5 history.pushState      线上使用

## vue-cli
- 全局生成vue项目的脚手架

```
npm install vue-cli -g
vue init webpack <项目名>
cd 项目名字
npm install
npm run dev
```