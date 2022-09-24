const calculatorButtons = document.querySelector(".buttons");
const resultScreen = document.querySelector(".result-screen");

const state = {
  firstValue: "0",
  secondValue: null,
  isSecondValue: false,
  operator: null,
};

const calculateScreen = () => {
  resultScreen.value = state.firstValue;
};

calculateScreen();

calculatorButtons.addEventListener("click", (e) => {
  const target = e.target;

  if (
    target.value === "+" ||
    target.value === "-" ||
    target.value === "*" ||
    target.value === "/"
  ) {
    state.isSecondValue = true;
    state.operator = target.value;
  } else if (target.classList.contains("number")) {
    resultScreen.value === "0" ? (resultScreen.value = "") : null;

    if (!state.isSecondValue) {
      resultScreen.value += target.value;
      state.firstValue = resultScreen.value;
    } else if (state.isSecondValue) {
      resultScreen.value = state.secondValue;
      resultScreen.value += target.value;
      state.secondValue = resultScreen.value;
    }
  } else if (target.classList.contains("equals")) {
    calculateValues();
  } else if (target.classList.contains("clear")) {
    clearValues();
  } else if (target.classList.contains("change")) {
    changeValues();
  } else if (target.value === "%") {
    state.operator = target.value;
    calculateValues();
  } else if (target.value === ".") {
    changeFloat();
    console.log(".");
  }
});

const changeFloat = () => {
  !state.isSecondValue ? (resultScreen.value += ".") : null;

  if (state.isSecondValue) {
    state.secondValue += ".";
    resultScreen.value = state.secondValue;
  }
};

const calculateValues = () => {
  let result = eval((state.firstValue += state.operator + state.secondValue));
  state.secondValue = null;
  resultScreen.value = result;
  if (state.operator === "%") {
    result = eval(state.firstValue / 100);
    resultScreen.value = result;
  }
};

const clearValues = () => {
  state.firstValue = "0";
  state.secondValue = null;
  state.operator = null;
  state.isSecondValue = false;
  resultScreen.value = "0";
};

const changeValues = () => {
  if (resultScreen.value > 0 && !state.isSecondValue) {
    state.firstValue = "-" + resultScreen.value;
    resultScreen.value = state.firstValue;
  } else {
    state.secondValue = resultScreen.value;
  }
};
