const unroll = (square) => {
    const result = [];
  
    let top = 0;
    let bottom = square.length - 1;
    let left = 0;
    let right = square[0].length - 1;
    let direction = 0;
  
    while (top <= bottom && left <= right) {
      if (direction === 0) {
        for (let i = left; i <= right; i++) {
          result.push(square[top][i]);
        }
        top++;
      } else if (direction === 1) {
        for (let i = top; i <= bottom; i++) {
          result.push(square[i][right]);
        }
        right--;
      } else if (direction === 2) {
        for (let i = right; i >= left; i--) {
          result.push(square[bottom][i]);
        }
        bottom--;
      } else if (direction === 3) {
        for (let i = bottom; i >= top; i--) {
          result.push(square[i][left]);
        }
        left++;
      }
  
      direction = (direction + 1) % 4;
    }
  
    return result;
  };
  
  const square = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  
  const unrolledArray = unroll(square);
  console.log(unrolledArray);