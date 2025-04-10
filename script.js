let equal_pressed = 0;
let button_input = document.querySelectorAll(".input-button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let percent = document.getElementById("percent");
let scientificFunctionClicked = false;
window.onload = () => {
  input.value = "";
};
button_input.forEach((button_class) => {
  button_class.addEventListener("click", () => {
    if (equal_pressed == 1) {
      input.value = "";
      equal_pressed = 0;
    }
    input.value += button_class.value;
  });
});

percent.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
  let val = input.value;
  let num = [];
  for (let i = val.length - 1; i >= 0; i--) {
    if (/[0-9]/.test(val[i])) {
      input.value = input.value.substr(0, i);
      num.unshift(val[i]);
    } else {
      break;
    }
  }
  input.value += parseInt(num.join("")) / 100;
});

equal.addEventListener("click", () => {
  if (!scientificFunctionClicked) {
    equal_pressed = 1;
    let inp_val = input.value;
    try {
      let solution = eval(inp_val);
      if (Number.isInteger(solution)) {
        input.value = solution;
      } else {
        input.value = solution.toFixed(2);
      }
    } catch (err) {
      alert("Error");
    }
  } else {
    let resultArray = input.value.match(/^([a-z]+)\((.+)\)$/)?.slice(1);
    const [method, value] = resultArray;
    calculateSciFunction(method, value);
  }
  scientificFunctionClicked = false;
});

clear.addEventListener("click", () => (input.value = ""));
backspace.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});

function calculateSciFunction(func, value) {
  let result;
  let expressionArray = value.split("+").map(parseFloat);
  const inputValue = expressionArray.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  switch (func) {
    case "sin":
      result = Math.sin(inputValue);
      break;
    case "cos":
      result = Math.cos(inputValue);
      break;
    case "tan":
      result = Math.tan(inputValue);
      break;
    case "e":
      result = Math.exp(inputValue);
      break;
    case "log":
      result = Math.log(inputValue);
      break;
    default:
      break;
  }

  if (result !== undefined) {
    input.value = result.toFixed(2);
  } else {
    alert("Invalid Input");
  }
}

/* SIN FUNCTION */
document.getElementById("sin").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = "sin(" + input.value + ")";
});

/* COS FUNCTION */
document.getElementById("cos").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = "cos(" + input.value + ")";
});

/* TAN FUNCTION */
document.getElementById("tan").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = "tan(" + input.value + ")";
});

/* EULER FUNCTION */
document.getElementById("e").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = "e(" + input.value + ")";
});

/* LOG FUNCTION */
document.getElementById("log").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = "log(" + input.value + ")";
});

/* PI */
document.getElementById("pi").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value = 3.14;
});

/* EXPONENT FUNCTION */
document.getElementById("pow").addEventListener("click", () => {
  if (input.value) {
    input.value = Math.pow(input.value, 2);
  } else {
    input.value = Math.pow(0, 2);
  }
});

document.getElementById("dec-binary").addEventListener("click", () => {
  let val = input.value.trim();
  if (val === "") return;
  // Check if the input is a binary number (only 0s and 1s)
  if (/^[01]+$/.test(val)) {
    // Binary to Decimal
    input.value = parseInt(val, 2); // base 2
  } else if (/^\d+(\.\d+)?$/.test(val)) {
    // Decimal to Binary (ignore decimals)
    input.value = parseInt(val, 10).toString(2);
  } else {
    alert("Invalid input for conversion.");
  }
});
