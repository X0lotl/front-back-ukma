let mas = [2, 3 ,4, 200, 400, 23, 71];

function maxNumberOfMassive(inputArray) {
    let maxValue = 0;
    for(let number of inputArray) {
        if(number > maxValue) {
            maxValue = number;
        }
    }

    return maxValue;
}

function maxNumberOfMassive2(inputArray) {
    return inputArray.reduce(
        (accumulator, currentValue) => {
          return (accumulator > currentValue ? accumulator : currentValue);
        }
      );
}

console.log(mas);
console.log(maxNumberOfMassive(mas));
console.log(maxNumberOfMassive2(mas));