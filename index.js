let title = document.querySelector("#title");
let price = document.querySelector("#price");
let tax = document.querySelector("#tax");
let ads = document.querySelector("#ads");
let disc = document.querySelector("#disc");
let total = document.querySelector(".total");
let count = document.querySelector("#count");
let catg = document.querySelector("#catg");
let submit = document.querySelector("#submit");
let Search = document.querySelector("#Search");
let SearchItems = document.querySelector(".searchitems");
let searchTitle = document.querySelector("#searchTitle");
let searchcategory = document.querySelector("#searchcategory");
let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let clrearInputs = document.querySelectorAll(".clear");
let TextError = document.querySelector(".Error");
let giveTotalPrice = document.querySelector(".giveTotal");
let tbody = document.querySelector("tbody");
let DeleateAll = document.querySelector(".DeleateAll");
let PriceEnd = 0;
let DataSearch = [];
let stateSearch = "bytitle";
let stateSubmit = false;
let indexUpdated = -1;

let Data = JSON.parse(localStorage.getItem("data"));
if (Data == null) Data = [];

function drawItems() {
  tbody.innerHTML = null;
  if (Data.length > 0) {
    DeleateAll.style.display = "block";
    DeleateAll.innerHTML = `Delete All Element : ${Data.length}`;
  } else {
    DeleateAll.style.display = "none";
  }
  let index = 0;
  Data.forEach((ele) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr>
    <td>${(ele.id = ++index)}</td>
    <td>${ele.title.toLowerCase()}</td>
    <td>${ele.price}</td>
    <td>${ele.taxes}</td>
    <td>${ele.ads}</td>
    <td>${ele.discount}</td>
    <td>${ele.Total}</td>
    <td>${ele.category.toLowerCase()}</td>
    <td><button index=${
      ele.id
    } class="update" onclick="updateData(this)">update</button></td>
    <td><button index=${
      ele.id
    } class="delete" onclick="deleteItem(this)">delete</button></td>
</tr>`;
    tbody.appendChild(tr);
  });
}

window.onload = drawItems;
let valTitle, valCount, valCateg, valPrice, valTax, valAds, valDisc;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  valTitle = title.value.trim("");
  valCount = count.value.trim("") || 1;
  valCateg = catg.value.trim("");
  valPrice = price.value.trim("");
  valTax = tax.value.trim("");
  valAds = ads.value.trim("");
  valDisc = disc.value.trim("");
  if (
    valTitle == "" ||
    valPrice == "" ||
    valTax == "" ||
    valAds == "" ||
    valCateg == "" ||
    valDisc == ""
  ) {
    TextError.style.display = "block";
  } else {
    TextError.style.display = "none";
    clrearInputs.forEach((ele) => (ele.value = ""));
    total.textContent = "total: ";
    total.style.backgroundColor = "red";

    if (!stateSubmit) {
      for (let i = 0; i < valCount; i++) {
        let obj = {
          id: Data.length + 1,
          title: valTitle,
          price: valPrice,
          taxes: valTax,
          ads: valAds,
          discount: valDisc,
          Total: PriceEnd.toFixed(2),
          category: valCateg
        };
        Data.push(obj);
      }
    } else {
      Data[indexUpdated - 1].title = valTitle;
      Data[indexUpdated - 1].price = valPrice;
      Data[indexUpdated - 1].tax = valTax;
      Data[indexUpdated - 1].ads = valAds;
      Data[indexUpdated - 1].disc = valDisc;
      Data[indexUpdated - 1].Total = PriceEnd.toFixed(2);
      Data[indexUpdated - 1].category = valCateg;
    }

    count.style.display = "block";
    submit.setAttribute("value", "Create");
    localStorage.setItem("data", JSON.stringify(Data));
    drawItems(indexUpdated);
  }
});

function showPrice() {
  let valPrice = price.value.trim("");
  let valTax = tax.value.trim("");
  let valAds = ads.value.trim("");
  let valDisc = disc.value.trim("");
  let valueTotal = +valPrice + +valTax + +valAds;
  valueTotal -= (valDisc / 100) * valueTotal;
  total.textContent = `Total: ${valueTotal.toFixed(2)}`;
  total.style.backgroundColor = "green";
  return valueTotal;
}

giveTotalPrice.addEventListener("keyup", function () {
  PriceEnd = showPrice();
});

//=====================

//=====================
DeleateAll.onclick = function () {
  Data = [];
  localStorage.setItem("data", JSON.stringify(Data));
  drawItems();
};
//==========================

SearchItems.addEventListener("click", function (e) {
  if (e.target.id == "searchTitle") {
    stateSearch = "bytitle";
  } else {
    stateSearch = "bycategory";
  }
  if (Search.value.trim() === "") {
    Search.focus();
    Search.placeholder = "Add item to search";
  }

  DrawSearchData(stateSearch);
});

Search.onkeyup = function () {
  DrawSearchData();
};

function DrawSearchData() {
  tbody.innerHTML = "";
  if (stateSearch == "bytitle") {
    Data.forEach((ele) => {
      if (
        ele.title.toLowerCase().includes(Search.value.toLowerCase().trim(""))
      ) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ele.id}</td>
            <td>${ele.title.toLowerCase()}</td>
            <td>${ele.price}</td>
            <td>${ele.taxes}</td>
            <td>${ele.ads}</td>
            <td>${ele.discount}</td>
            <td>${ele.Total}</td>
            <td>${ele.category.toLowerCase()}</td>
            <td><button index=${
              ele.id
            } class="update" onclick="updateData(this)">update</button></td>
            <td><button index=${
              ele.id
            } class="delete" onclick="deleteItem(this)">delete</button></td>
          `;
        tbody.appendChild(tr);
      }
    });
  } else {
    Data.forEach((ele) => {
      if (
        ele.category.toLowerCase().includes(Search.value.toLowerCase().trim(""))
      ) {
        let tr = document.createElement("tr");
        tbody.innerHTML = "";
        tr.innerHTML = `
            <td>${ele.id}</td>
            <td>${ele.title.toLowerCase()}</td>
            <td>${ele.price}</td>
            <td>${ele.taxes}</td>
            <td>${ele.ads}</td>
            <td>${ele.discount}</td>
            <td>${ele.Total}</td>
            <td>${ele.category.toLowerCase()}</td>
            <td><button index="${
              ele.id
            }" class="update" onclick="updateData(this)">update</button></td>
            <td><button index=${
              ele.id
            } class="delete" onclick="deleteItem(this)">delete</button></td>
          `;
        tbody.appendChild(tr);
      }
    });
  }
}

function updateData(obj) {
  // Extract Data
  stateSubmit = true;
  console.log(obj);
  let index = obj.getAttribute("index");
  indexUpdated = index;

  title.value = `${Data[+index - 1].title}`;
  price.value = `${Data[+index - 1].price}`;
  tax.value = `${Data[+index - 1].taxes}`;
  ads.value = `${Data[+index - 1].ads}`;
  disc.value = `${Data[+index - 1].discount}`;
  total.innerHTML = `Total: ${Data[+index - 1].Total}`;

  catg.value = `${Data[+index - 1].category}`;
  count.style.display = "none";
  submit.setAttribute("value", "update");

  showPrice();
}

function deleteItem(obj) {
  console.log(obj);
  let index = obj.getAttribute("index");
  console.log(index);
  Data.splice(+index - 1, 1);
  localStorage.setItem("data", JSON.stringify(Data));
  drawItems();
}
