const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

});


describe('unroll', () => {
  it('should return an empty array if the input square is empty', () => {
    const emptySquare = [];
    const result = unroll(emptySquare);
    expect(result).toEqual([]);
  });

  it('should correctly unroll a square with a single element', () => {
    const singleElementSquare = [[42]];
    const result = unroll(singleElementSquare);
    expect(result).toEqual([42]);
  });

  it('should correctly unroll a square with multiple elements', () => {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    const result = unroll(square);
    expect(result).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });
});
