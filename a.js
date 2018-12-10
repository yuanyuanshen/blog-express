
function observe(value, cb) {
  Object.keys(value).forEach(key => {
    // console.log(value)
    // console.log(key)
    // console.log(value[key])
    // console.log(cb)
    defineReactive(value, key, value[key], cb)
  })
}

function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return val
    },
    set: newVal => {
      // obj[key] = newVal; 用这行代码 app.text2=""就会报错
      val = newVal; // 这行代码就是对的
      cb();/*订阅者收到消息的回调*/
    }
  })
}


class Dep {
  constructor () {
      this.subs = [];
  }

  // addSub (sub: Watcher) {
  //     this.subs.push(sub)
  // }

  // removeSub (sub: Watcher) {
  //     remove(this.subs, sub)
  // }
  /*Github:https://github.com/answershuto*/
  notify () {
      // stabilize the subscriber list first
      const subs = this.subs.slice()
      for (let i = 0, l = subs.length; i < l; i++) {
          subs[i].update()
      }
  }
}

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    debugger
    this.cb = cb;
    this.vm = vm;

    /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
    Dep.target = this;
    /*Github:https://github.com/answershuto*/
    /*触发渲染操作进行依赖收集*/
    this.cb.call(this.vm);
  }

  update() {
    this.cb.call(this.vm);
  }
}

/*代理*/
function _proxy(data) {
  const that = this;
  Object.keys(data).forEach(key => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return that._data[key];
      },
      set: function proxySetter(val) {
        that._data[key] = val;
      }
    })
  });
}

class Vue {
  constructor(options) {
    this._data = options.data
    _proxy.call(this, options.data);/*构造函数中*/
    observe(this._data, options.render)
    let watcher = new Watcher(this);
  }
}

let app = new Vue({
  el: '#app',
  data: {
    text: 'text111',
    text2: 'text222'
  },
  render() {
    console.log("render")
  }
})

console.log(app)