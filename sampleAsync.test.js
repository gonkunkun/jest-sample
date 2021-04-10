const forEach = (items, callback) => {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}


const mockCallback = jest.fn((x) => 42 + x)
forEach([0, 1], mockCallback)

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2)

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0)

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1)

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42)

// mockプロパティ
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]

// function はちょうど 1 回だけ呼ばれた
expect(someMockFunction.mock.calls.length).toBe(1);

// 関数の 1 回目の呼び出しの 1 番目の引数は 'first arg' だった
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 関数の 1 回目の呼び出しの 2 番目の引数は 'second arg' だった
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 関数の 1 回目の呼び出しの返り値は 'return alue' だった
expect(someMockFunction.mock.results[0].value).toBe('return value');

// この関数はちょうど 2 回インスタンス化された
expect(someMockFunction.mock.instances.length).toBe(2);

// この関数の 1 回目のインスタンス化で返されたインスタンスは、
// `name` プロパティを持っており、その値は 'test' であった
expect(someMockFunction.mock.instances[0].name).toEqual('test');

// モックの戻り値
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true


// モックの戻り値
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]


// モジュールのモック
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;

// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});


// 実装を完全にモック化する
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42


// 何回もモック化する
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false


// モジュールモックを一部、実装が動くようにする
// https://jestjs.io/ja/docs/bypassing-module-mocks