/*
 * @Description: 头部注释
 * @Author: mengbin.li
 * @Date: 2020-03-30
 * @LastEditors: mengbin.li
 * @LastEditTime: 2020-04-01
 */
import './index.less';

// 防止整个页面的刷新
if(module && module.hot) {
  module.hot.accept()
}

class Animal {
  constructor(name) {
      this.name = name;
  }
  getName() {
      return this.name;
  }
}

const dog = new Animal('dog');
console.log('aaa');