
// we can use cart array it anywhere if the container js file linked in html page
let deliveryCharge = 40;
let cartItemsObj = [];

function loadcartitems() {
    // if cart[]= itemid matched with items.id then push it into cartitems using map
    cartItemsObj = cart.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id)
                return items[i];
        }
    });
    console.log(cartItemsObj);
}

let itemCont = document.querySelector(".item-cont");

function displayCartItmes() {
    let tmp = "";
    cartItemsObj.forEach(function (item) {
        tmp +=
            `<div class="items">
                <a onclick = add_to_page_setup(${item.id}) href="page.html"><div class="image"><img src='images/${item.imageList[0]}'  alt="image"></div></a>
                <h4>${item.company}</h4>
                <p class="product">${item.item_name}</p>
                <p class="price">Rs ${item.current_price} <span class="actual">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}%)</span>
                </p>
                <p style="font-size: 14.5px;margin-top:10px;color:green;">7 days return available</p>
                <p class="delivery">delivery by <span style="color:green;">10 nov 2023</span></p>
                <button id="remove" onclick="remove(${item.id})">Remove</button>
            </div>`
    });

    if (tmp == "")
        tmp = `Your Cart is Empty`;

    itemCont.innerHTML = tmp;
}

let remove_pop = document.querySelector(".remove-cart-popup");
function remove(itemId) {
    // filtering or removing ele from cart= id #### MODIFIES THE ACTUAL ARRAY FILTER

    // arr.filter(func) || func(val)  auto take arr[i] one ele 
    // cart = cart.filter(function (cartid) {
    //     return itemId != cartid;
    // }); 
    cart = cart.filter(id => id != itemId);

    // also updating in localstorage, cartitem count, update cart item container
    localStorage.setItem("cartkey", JSON.stringify(cart));
    displaycartcount(); // update cart[]
    loadcartitems();
    displayCartItmes();
    updatePrices();

    remove_pop.style.transform = "translateY(0)";
    setTimeout(() => { remove_pop.style.transform = "translateY(300%)"; }
        , 2000)
}

let final;
let pricecont = document.querySelector(".order-cont");
function updatePrices() {
    let countitem = cartItemsObj.length;
    let discount = total = currPrice = final = 0;

    // if cartItemssObj becomes empty it will not execute below code hence we have update MRPS
    if (!cartItemsObj.length) {
        countitem = discount = total = currPrice = final = 0;
        pricecont.innerHTML = `
        <p>price details(${countitem} items)</p>
        <div class="mrp-cont">
            <div class="d total-mrp">
                <span>Total MRP</span>
                <span> ₹${total}</span>
            </div>
            <div class="d discount-mrp">
                <span>Discount</span>
                <span> - ₹${discount}</span>
            </div>
            <div class="d delv-charges">
                <span>Delivery charge</span>
                <span>₹${0}</span>
            </div>
            <div class="line"></div>
            <div class="d total-amt">
                <span>Total Amount</span>
                <span>Rs. ${final}</span>
            </div>
            <button id="place-order">Place Order</button>
    </div>`
    }

    cartItemsObj.forEach(cartitem => {

        total += cartitem.current_price;
        discount += cartitem.original_price - cartitem.current_price;
        currPrice += cartitem.current_price;
    });
    final = deliveryCharge + currPrice;

    cartItemsObj.forEach((item) => {
        pricecont.innerHTML = `
            <p>price details(${countitem} items)</p>
            <div class="mrp-cont">
                <div class="d total-mrp">
                    <span>Total MRP</span>
                    <span> ₹${total}</span>
                </div>
                <div class="d discount-mrp">
                    <span>Discount</span>
                    <span> - ₹${discount}</span>
                </div>
                <div class="d delv-charges">
                    <span>Delivery charge</span>
                    <span>₹${deliveryCharge}</span>
                </div>
                <div class="line"></div>
                <div class="d total-amt">
                    <span>Total Amount</span>
                    <span>Rs. ${final}</span>
                </div>
                <button id="place-order" action="done.html">Place Order</button>
        </div>`
    });
}


function onload() {
    loadcartitems();
    displayCartItmes();
    updatePrices();
}
onload();

// _____________________________________place order
const orderpage = document.querySelector(".order-page-cont")
const amount = document.querySelector(".amount")

document.getElementById("place-order").addEventListener("click", () => {
    orderpage.classList.add("order-page-cont-repl")
    amount.textContent = `${final}/-`


    let timeout = setTimeout(() => {
        orderpage.classList.remove("order-page-cont-repl")
    }, 6000);

    document.querySelector(".close-btn").addEventListener("click", () => {
        orderpage.classList.remove("order-page-cont-repl")
        clearTimeout(timeout)
    })
})

