let products = [];
let cart = [];
let totalAmount = 0;



let localStorageProducts = localStorage.getItem("cart");

localStorageProducts = JSON.parse(localStorageProducts);

if (localStorageProducts) {
  localStorageProducts.forEach(item => {

    cart.push(item)
    totalAmount += item.price;
  });
}



let cartElement = document.getElementById("cartProducts");
cartElement.addEventListener("click", showCart);

function openCart() {
  document.getElementById("cartOverlay").innerHTML = "";
  document.getElementById("bill").innerHTML = totalAmount;
  if (cart.length > 0) {
    cart.forEach((item) => {
      let miniproductHtml = `
         <div class="miniproducts shadow">
            <img class="shadow" src="${item.image_url}" alt="">
            <div class="details">
              <h4>${item.title}</h4>
              <p>₹ ${item.price}</p>
            </div>
          </div>`;

      document
        .getElementById("cartOverlay")
        .insertAdjacentHTML("beforeend", miniproductHtml);
    });
  }

}

function closeCart() {
  document.getElementsByClassName("closeCart");
}


fetch("./json/tryse.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    console.log(data);
    //here we will get all data

    data.featured.forEach((product) => {
      let productCardHtml = `
      <div class="col-md my-3">
          <div class="card card-featured shadow mx-auto" style="width: 10rem; height: 13rem;">
              <img src="${product.image_url}" class="card-img-top" alt="...">
              <div class="card-body">
                  <p class="card-text">Tshirt</p>
              </div>
          </div>
      </div>
        `;

      document
        .getElementById("featuredProducts")
        .insertAdjacentHTML("beforeend", productCardHtml);
    });

    data.newArrival.forEach((product) => {
      let rattingHtml = "";

      for (i = 0; i < product.ratting; i++) {
        rattingHtml += `<i class="fa fa-star"></i>`;
      }

      let productCardHtml = `
        <div class="col-md my-3">
          <div class="card card-new product-card shadow mx-auto" style="width: 12rem; height: 20rem">
              <img src="${product.image_url}" class="card-img-top" alt="..." ">
              <div class="card-body text-center">
                  <p class="card-text">${product.title}</p>
                  <p class="card-text rating">${rattingHtml}</p>
                  <p class="card-text">&#8377; ${product.price}</p>
                  <button class="btn btn-primary buy_button" id="${product.product_id}">Buy now</button>
              </div>
          </div>
        </div>
         `;

      document
        .getElementById("newArrival")
        .insertAdjacentHTML("beforeend", productCardHtml);
    });


    data.recentlyViewed.forEach((product) => {
      let rattingHtml = "";

      for (i = 0; i < product.ratting; i++) {
        rattingHtml += `<i class="fa fa-star"></i>`;
      }

      let productCardHtml = `
        <div class="col-md my-3">
          <div class="card card-new product-card shadow mx-auto" style="width: 12rem; height: 20rem">
              <img src="${product.image_url}" class="card-img-top" alt="..." ">
              <div class="card-body text-center">
                  <p class="card-text">${product.title}</p>
                  <p class="card-text rating">${rattingHtml}</p>
                  <p class="card-text">&#8377; ${product.price}</p>
                  <button class="btn btn-primary buy_button" id="${product.product_id}">Buy now</button>
              </div>
          </div>
        </div>
         `;

      document
        .getElementById("recentlyViewed")
        .insertAdjacentHTML("beforeend", productCardHtml);
    });
  })
  .then(() => {
    let buyButtons = document.querySelectorAll(".buy_button");
    buyButtons.forEach((btn) => {
      btn.addEventListener("click", buyFunction);
    });
  });


function buyFunction(e) {
  e.target.disabled = true;
  e.target.innerText = "in cart";

  let buyProduct = products.newArrival.find(
    (product) => product.product_id === e.target.id
  );
  if (!buyProduct) {
    buyProduct = products.recentlyViewed.find(
      (product) => product.product_id === e.target.id
    );
  }

  // buyProduct is the matched product
  cart.push(buyProduct);
  totalAmount += buyProduct.price;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("bill", totalAmount);
  document.getElementById("cartProducts").innerText = cart.length;
  openCart();
}


function showCart() {
  openCart();
}


// payment gateway functionality 

let checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", payment);

function payment() {
  var options = {
    "key": "rzp_test_clWGZ5uzxnh9vj", // Enter the Key ID generated from the Dashboard
    "amount": totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Tryse",
    "description": "Tryse transcation",
    "image": "https://i.ibb.co/2P0c1CK/logo.png",
    "handler": function (response) {
      // alert(`Payment of rupeese  ${totalAmount}`);
      var notyf = new Notyf();
      notyf.success('Your payment successfully');
      localStorage.removeItem("cart");
      localStorage.removeItem("bill");
      cart = [];
      totalAmount = 0;
      showCart()

      closeCart();

    },
    "notes": {
      "address": "Tryse pvt Ltd"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });


  document.getElementById('checkoutButton').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
  }
}