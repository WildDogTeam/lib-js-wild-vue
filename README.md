# WildVue [![CircleCI](https://circleci.com/gh/WildDogTeam/lib-js-wild-vue.svg?style=svg)](https://circleci.com/gh/WildDogTeam/lib-js-wild-vue) [![npm package](https://img.shields.io/npm/v/wildvue.svg)](https://www.npmjs.com/package/wildvue) [![coverage](https://img.shields.io/codecov/c/github/vuejs/wildvue.svg)](https://codecov.io/github/vuejs/wildvue)

Vue.js 与野狗的绑定插件

## 安装

1. 如果使用`<script>` 全局引入： 如果`Vue` 存在会自动安装。

  ``` html
  <head>
    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>
    <!-- Wilddog -->
    <script src="https://cdn.wilddog.com/sdk/js/2.0.0/wilddog.js"></script>
    <!-- WildVue -->
    <script src="https://cdn.wilddog.com/libs/wild-vue/1.1.0/wildvue.min.js"></script>
  </head>
  ```

2. 在模块化环境中，比如CommonJS

  ``` bash
  npm install vue wilddog wildvue --save
  ```

  ``` js
  var Vue = require('vue')
  var WildVue = require('wildvue')
  var wilddog = require('wilddog')
  // 在模块化环境中需要使用 user 安装
  Vue.use(WildVue)
  ```

## 使用

``` js
var wilddogApp = wilddog.initializeApp({ ... })
var sync = wilddogApp.sync()
var vm = new Vue({
  el: '#demo',
  wilddog: {
    //简单语法
    //默认作为数组绑定
    anArray: sync.ref('url/to/my/collection'),
    // 也可以绑定一个查询
    // anArray: sync.ref('url/to/my/collection').limitToLast(25)
    // 完整语法
    anObject: {
      source: new Wilddog('url/to/my/object'),
      // 可选，作为对象绑定
      asObject: true,
      // 可选，提供一个回调
      cancelCallback: function () {}
    }
  }
})
```

``` html
<div id="demo">
  <pre>{{ anObject | json }}</pre>
  <ul>
    <li v-for="item in anArray">{{ item.text }}</li>
  </ul>
</div>
```

上面的例子会绑定一个Vue实例的`anObject` 和 `anArray` 到相应的 Wilddog 数据源。另外，Vue实例也可以使用 `$wilddogRefs` property：

``` js
// add an item to the array
vm.$wilddogRefs.anArray.push({
  text: 'hello'
})
```

另外，你也可以使用 `$bindAsObject` 或 `$bindAsArray` 方法绑定一个Wildog ref：

``` js
vm.$bindAsObject('user', myWilddogRef.child('user'))
vm.$bindAsArray('items', myWilddogRef.child('items').limitToLast(25))
```

## 数据归一化

### 数组绑定

在绑定数组中的每一条记录中都会包含一个 `.key` property,用来表示这条记录的key。 所以，如果你有书记在 `/items/-Jtjl482BaXBCI7brMT8/` ， 这条记录会存在一个 `.key:"-Jtjl482BaXBCI7brMT8"`。
如果value是简单数据类型（boolean,string,number）会保存在`.value` property 中。如果value 是对象，value对象中每个property 都会直接存放在记录中：

``` json
{
  "items": {
    "-Jtjl482BaXBCI7brMT8": 100,
    "-Jtjl6tmqjNeAnQvyD4l": {
      "first": "fred",
      "last": "Flintstone"
    },
    "-JtjlAXoQ3VAoNiJcka9": "foo"
  }
}
```

The resulting bound array stored in `vm.items` will be:

``` json
[
  {
    ".key": "-Jtjl482BaXBCI7brMT8",
    ".value": 100
  },
  {
    ".key": "-Jtjl6tmqjNeAnQvyD4l",
    "first": "Fred",
    "last": "Flintstone"
  },
  {
    ".key": "-JtjlAXoQ3VAoNiJcka9",
    ".value": "foo"
  }
]
```

## 贡献

Clone the repo, then:

```bash
$ npm install    # install dependencies
$ npm test       # run test suite with coverage report
$ npm run dev    # watch and build dist/wildvue.js
$ npm run build  # build dist/wildvue.js and wildvue.min.js
```
## License

[MIT](http://opensource.org/licenses/MIT)