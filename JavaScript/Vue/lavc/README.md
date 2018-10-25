# lavc

> Lashouwan Vue client project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 模块
- node模块的规范 commonjs
- cmd seajs amd require
- esmodule 基于 ES6
  - 如何定义模块 (一个js就是一个模块)
  - 如何导出模块 (export)
  - 如何使用模块 (import)


## less
项目用到less
```
npm install less less-loader axios vuex bootstrap
```

- mock 模拟数据
- api 所有接口
- base 基础组件
- components 页面组件

## 组件
全局组件: 使用 Vue.component(组件名, 组件对象) 注册的组件就是全局组件
局部组件: 放在 vm.components 中的组件就是局部组件

### 组件的参数
在组件标签里使用 :参数名= 方式, 在组件对象中, 用 'props:{参数名}' 来接收参数,
props 中可以参数进行校验, 如:
```
props: {
  参数名: {
    type: 类型,
    default: 默认值
  }
}
```
子组件不能修改 props里的属性值, 只能用 data() 或者 computed 转成局部数据;
computed: {
  d1() { return 参数名 }
}

### 组件内的标签
组件标签内可以有别的标签, 需要在组件模板内加上 <slot></slot> 标签, slot标签有名字,
默认插入到 name=default 的slot内,

### ref(获取真实dom)
通过ref, 父可以直接拿到子组件的数据和方法

### 组件缓存
如果组件切换频繁, 可以将组建缓存起来 <keep-alive> 标签

### 数据加载
vm.nextTick() 可以解决子组件数据异步加载, 父组件调用不及时的问题





