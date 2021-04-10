const sum = require("./sum")

test("adds 1 + 2 to equal 3", () => {
  // === を使用して厳密に等価であることを確認
  expect(sum(1, 2)).toBe(3)
})

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
        // notの比較も出来る
      expect(a + b).not.toBe(0)
    }
  }
})

test("object assignment", () => {
  const data = { one: 1 }
  data["two"] = 2
  //  toEqual は、オブジェクトまたは配列のすべてのフィールドを再帰的にチェックします。
  expect(data).toEqual({ one: 1, two: 2 })
})

test("null", () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test("zero", () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})

test("two plus two", () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2
  //expect(value).toBe(0.3);         このように書くと、丸め込み誤差が原因で期待通りに動作しない
  expect(value).toBeCloseTo(0.3) // これならば正しく動く
})

test("there is no I in team", () => {
    // 正規表現でマッチ
  expect("team").not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  // 正規表現でマッチ
  expect("Christoph").toMatch(/stop/)
})

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
]

test("the shopping list has milk on it", () => {
    // 配列に含むかどうかをマッチ
  expect(shoppingList).toContain("milk")
  expect(new Set(shoppingList)).toContain("milk")
})


// 例外を投げるかどうかを確認
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK")
}
test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK")
  expect(() => compileAndroidCode()).toThrow(/JDK/)
})