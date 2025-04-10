let equal_pressed = 0;
let button_input = document.querySelectorAll(".input-button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let percent = document.getElementById("percent");

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
  input.value = input.value
  .replace(/sin\(/g, "Math.sin(")
  .replace(/cos\(/g, "Math.cos(")
  .replace(/tan\(/g, "Math.tan(")
  .replace(/log\(/g, "Math.log(")
  .replace(/sqrt\(/g, "Math.sqrt(")
  .replace(/\^/g, "**");

  input.value=eval(input.value);
});

clear.addEventListener("click", () => (input.value = ""));
backspace.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});

/* SIN FUNCTION */
document.getElementById("sin").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value += "sin(";
});

/* COS FUNCTION */
document.getElementById("cos").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value += "cos(";
});

/* TAN FUNCTION */
document.getElementById("tan").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value += "tan(";
});

/* EULER FUNCTION */
document.getElementById("e").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value += "e(";
});

/* LOG FUNCTION */
document.getElementById("log").addEventListener("click", () => {
  scientificFunctionClicked = true;
  input.value += "log(";
});

/* PI */
document.getElementById("pi").addEventListener("click", () => {
  input.value += 3.14;
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

/* SQUARE ROOT FUNCTION */
document.getElementById("square-root").addEventListener("click", () => {
    if (input.value) {
      input.value = Math.sqrt(input.value);
    }   else {
      input.value = Math.sqrt(0);
    }
});

/* EXPONENT FUNCTION */

document.getElementById("pow").addEventListener("click", () => {
  input.value += "^";
});
