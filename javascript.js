function setValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerHTML = value;
}

function setSuccessOrDangeClass(elementId, value) {
  const element = document.getElementById(elementId);
  if (value > 0) {
    element.classList.add("text-success");
    let text = element.innerHTML;
    text = "+" + text;
    element.innerHTML = text;
    element.classList.remove("text-danger");
  } else {
    element.classList.add("text-danger");
    element.classList.remove("text-success");
  }
}

// https://stackoverflow.com/a/10601315/5960190
function intToString(value) {
  var suffixes = ["", "K", "M", "B", "T"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

function callGetQuoate() {
  const symbolInput = document.getElementById("symbolInput").value;

  getQuote(symbolInput)
    .then((data) => {
      console.log("data => ", data);
      if (data && data.Status === "SUCCESS") {
        document.getElementById("resultDiv").style.display = "inline";
        document.getElementById("errorDiv").style.display = "none";

        setValue("name", data.data.Name);
        setValue("symbol", data.data.Symbol);
        setValue("lastPrice", data.data.LastPrice);

        setValue("change", data.data.Change.toFixed(2));
        setSuccessOrDangeClass("change", data.data.Change);

        setValue("changePercent", data.data.ChangePercent.toFixed(2));
        setSuccessOrDangeClass("changePercent", data.data.ChangePercent);

        setValue("timeStamp", data.data.Timestamp);
        setValue("low", data.data.Low);
        setValue("open", data.data.Open);
        setValue("volume", intToString(data.data.Volume));
        setValue("marketCap", intToString(data.data.MarketCap));
      }
    })
    .catch((error) => {
      console.log("error => ", error);
      setValue("error", error.Message);
      document.getElementById("errorDiv").style.display = "inline";
      document.getElementById("resultDiv").style.display = "none";
    });
}
