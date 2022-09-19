const listItems = document.querySelector(".listItems");
const btn = document.querySelector(".list__btn");
const listItem = document.querySelector(".list__input--item");
const listPrice = document.querySelector(".list__input--price");
const listQuality = document.querySelector(".list__input--quality");
const budget = document.querySelector(".budget");
const itms = document.querySelector(".listItem");

let price;
let total = [];
// Adding an Item list
const displayList = () => {
  const list = listItem.value;

  price = +listPrice.value;

  price > 0 && total.push(price);

  const html = `
     <div class="items">
          <div class="items__items">
            <li class="items__item"><i class="fa-solid fa-check"></i>${list}</li>
            
          </div>

          <div class="item__details">
          <p class="items__price">$${price}</p>
            <button class="sub">-</button><button class="add">+</button>

            <button class="delete">Remove</button>
          </div>
        </div>
      </div>
  
  `;
  listItem.value = "";
  listPrice.value = "";
  listItem.focus();
  listItems.insertAdjacentHTML("afterbegin", html);

  let tot = budget.textContent.includes("$")
    ? +budget.textContent.slice(1)
    : +budget.textContent;
  tot += price;

  budget.textContent = `$${tot}`;
  console.log("button totalllllllllll", total);
};

btn.addEventListener("click", displayList);

function calcPrice(e) {
  e.preventDefault();

  let tot = budget.textContent.includes("$")
    ? +budget.textContent.slice(1)
    : +budget.textContent;

  //Increasing the quantity of an item
  if (e.target.closest(".add")) {
    const amount =
      +e.target.previousElementSibling.previousElementSibling.textContent.slice(
        1
      );
    tot += amount;

    amount > 0 && total.push(amount);
    budget.textContent = `$${tot}`;
    console.log("add totalllllllllll", total);
  }

  //Reducing the quantity of an item
  if (e.target.closest(".sub")) {
    const amount = +e.target.previousElementSibling.textContent.slice(1);
    const item = e.target.parentElement.parentElement;
    tot -= amount;
    tot >= 0 && (budget.textContent = `$${tot}`);
    // budget.textContent = `$${tot}`;

    // console.log("total1", total);
    let num = total.filter((num) => num === amount);
    if (total.includes(amount) && !(num.length > 1)) item.remove();
    total.splice(total.indexOf(amount), 1);
    // total.includes(amount) && num.length > 1
    //   ? console.log(total.splice(total.indexOf(amount), 1))
    //   : item.remove();

    console.log(" subbb totalpppppppppppp", total);
  }

  //Delete an Item and  update the prices
  if (e.target.closest(".delete")) {
    const amount =
      +e.target.parentElement.firstElementChild.textContent.slice(1);

    total = total.filter((mov) => mov != amount);
    const balance = total.reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
    budget.textContent = `$${balance}`;
    e.target.parentElement.parentElement.remove();
  }
}

listItems.addEventListener("click", calcPrice);

let movs = [200, 200];
let moves = movs.filter((mov) => mov === 100);
console.log(moves.splice(moves.indexOf(200), 1));
// movs = movs.filter((mov) => mov != 100);

// movs.includes(100)
//   ? console.log(movs.splice(movs.indexOf(100), 1))
//   : console.log("bes");

// let mov = movs.splice(0, 1);
console.log("moves, moves", moves);
console.log(movs.length);
// console.log(mov);
