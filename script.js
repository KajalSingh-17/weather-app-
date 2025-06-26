const URL = "https://v6.exchangerate-api.com/v6/b7020e3bd9cfb6c860f6e2bd/latest/";
let from = document.querySelector("#fromSel");
let to = document.querySelector("#toSel");
let whole = document.querySelectorAll(".whole select");
let amt = document.querySelector("#inpN");
let resp = document.querySelector("#exchangeVal");
let btn = document.querySelector("#exc-btn");

for (let select of whole) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;

    if (currCode === "USD" && select.name === "from") {
      newOption.selected = "selected";
    } else if (currCode === "INR" && select.name === "to") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let flag = element.value;
  let countryCode = countryList[flag];
  let flagimg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flagimg;
};

const updateRate = async () => {
  let fromVal = from.value;
  let toVal = to.value;
  let amtVal = amt.value;

  if (amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }

  const response = await fetch(`${URL}${fromVal}`);
  const data = await response.json();
  const rate = data.conversion_rates[toVal];
  const finalRate = (amtVal * rate).toFixed(2);

  resp.innerText = `${amtVal} ${fromVal} = ${finalRate} ${toVal}`;
};

amt.addEventListener("change", updateRate);
from.addEventListener("change", updateRate);
to.addEventListener("change", updateRate);
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateRate();
});
window.addEventListener("load", () => {
  updateRate();
});
