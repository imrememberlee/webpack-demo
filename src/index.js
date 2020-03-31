/*
 * @Description: 头部注释
 * @Author: mengbin.li
 * @Date: 2020-03-30
 * @LastEditors: mengbin.li
 * @LastEditTime: 2020-03-31
 */
import './index.less';
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