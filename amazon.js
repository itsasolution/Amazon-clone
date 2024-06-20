
let menuel = document.querySelector(".menu")

menuel.addEventListener("click", function () {

    menuel.classList.toggle("menu-repl");
    document.querySelector(".options").classList.toggle("options-repl");
});



const items = [
    {
        id: '001',
        imageList: ['samsung.jpg','samsung1.jpg','samsung2.jpg','samsung3.jpg'],
        company: 'Samsung',
        item_name: 'Samsung Galaxy S20 Ultra',
        desc:"samsung galaxy s20 ultra with 120mp camera, fast charge,long lasting battery,1 year warranty",
        original_price: 60000,
        current_price: 54499,
        discount_percentage: 42,
        rating: {
            stars: 4.5,
            count: 1400,
        },
    },
    {
        id: '009',
        imageList: ['laptop.jpg','laptop1.jpg','laptop2.jpg','laptop3.jpg'],
        company: 'Lenovo',
        item_name: 'Lenovo  Idaeapad 14',
        desc:"Lenovo IdeaPad 1 14 Laptop, 14.0 HD Display, Intel Celeron N4020, 4GB RAM, 64GB Storage, Intel UHD Graphics 600, Win 11 in S Mode, Cloud Grey",
        original_price: 50000,
        current_price: 40999,
        discount_percentage: 22,
        rating: {
            stars: 4.0,
            count: 400,
        },
    },

    {
        id: '002',
        imageList: ['box5_image.jpg','makeup1.jpg','makeup2.jpg'],
        company: 'Nykka',
        item_name: 'Cosmstics and makeup kit',
        desc: 'Women Padded Halter Neck Cosmstics and makeup kit,with lipstick and mosturiser',
        original_price: 2599,
        current_price: 1507,
        discount_percentage: 42,
        rating: {
            stars: 4.3,
            count: 24,
        },
    },
    {
        id: '003',
        imageList: ['airpods2.jpg','airpod1.jpg','airpods.jpg','airpods3.jpg'],
        company: 'Apple',
        item_name: 'Apple Airpods pro',
        desc: 'Apple Airpods pro with 20 hours playback, white color, noise cancellation and bass boosted',
        original_price: 15999,
        current_price: 12999,
        discount_percentage: 10,
        rating: {
            stars: 4.7,
            count: 249,
        },
    },
    {
        id: '004',
        imageList: ['nike.jpg','nike1.jpg','nike2.jpg'],
        company: 'ADIDAS',
        item_name: 'Nike sports shoes',
        desc: 'Nike sports shoes comfortable and premium, sports avalaible in black, red and blue ',
        original_price: 9999,
        current_price: 6999,
        discount_percentage: 30,
        rating: {
            stars: 4.5,
            count: 1000,
        },
    },
    {
        id: '005',
        imageList: ['mini.jpg','mini1.jpg','mini2.jpg','mini3.jpg','mini4.jpg'],
        company: 'Mini Cooper',
        item_name: 'All new Mini Roadster',
        desc: 'The All new BMW Mini Cooper Roadster with 2.0 liter Turbo charged petrol engine, top speed 235 Km/h,available in multicolor',
        original_price: 5100000,
        lakh:"lakh",
        current_price: 4900000,
        discount_percentage: 15,
        rating: {
            stars: 4.6,
            count: 3500,
        },
    },
    {
        id: '006',
        imageList: ['tesla2.jpg','tesla.jpg','tesla1.jpg'],
        company: 'Tesla',
        item_name: 'Men ',
        desc: 'Tesla X series Electric car with top speed 230Km/h , with Air suspansion which give you extra comfortable ',
        original_price: 8000000,
        lakh:"lakh",
        current_price: 7700000,
        discount_percentage: 20,
        rating: {
            stars: 4.8,
            count: 100,
        },
    },
    {
        id: '007',
        imageList: ['box2_image.jpg'],
        company: 'The Indian Garage Co',
        item_name: 'Men Slim Fit Regular Shorts',
        desc: 'Men Slim Fit Regular Shorts',
        original_price: 1599,
        current_price: 639,
        discount_percentage: 60,
        rating: {
            stars: 4.2,
            count: 388,
        },
    },
    {
        id: '008',
        imageList: ['box3_image.jpg'],
        company: 'Nivea',
        item_name: 'Men Fresh Deodrant 150ml',
        desc: 'Men Fresh Deodrant 150ml',
        original_price: 285,
        current_price: 142,
        discount_percentage: 50,
        rating: {
            stars: 4.2,
            count: 5200,
        },
    }
];


function shop() {
    let shopcont = document.querySelector(".shop");

    // for cart page if not found the shop container return  ## because cart.js also uses this code
    if (!shopcont)
        return;

    let temp = "";
    items.forEach(item => {
        // here item is arr[i] = {all ele} we can use it as item.key

        temp += `<div class="purchase">
        <a onclick = add_to_page_setup(${item.id}) href="page.html" > <div class="pur-img-cont" >
        <div class="img" style="background-image:url('images/${item.imageList[0]}');"></div>
        </div></a>
        <div class="pur-cont">
            <p class="rat">${item.rating.stars}⭐ | ${item.rating.count}</p>
            <h4>${item.company}</h4>
            <p class="desc">${item.item_name}</p>
            <p class="price">Rs. ${item.current_price}<span class="actual">Rs. ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span> </p>
            <button onclick="addTobag(${item.id})">Add To Bag</button>
        </div>
    </div>`
        //  we cannot access or push object in array directly 
    });
    shopcont.innerHTML = temp;
}


let cart = []

function addTobag(itemid) {
    // for duplicate elements no more repeatationF
    cart = cart.filter(id => id != itemid);

    cart.push(itemid);
    localStorage.setItem("cartkey", JSON.stringify(cart));
    displaycartcount();

    let add_popup = document.querySelector(".add-cart-popup");
    add_popup.style.transform = "translateY(0)";
    setTimeout(() => {
        add_popup.style.transform = "translateY(400%)";
    }, 1500);

}

let itemcount = document.getElementById("cart-items");
let sideCartItem = document.querySelector(".side-cart");

function displaycartcount() {

    let cartstr = localStorage.getItem("cartkey");
    // if nothing(undefined) in localStorage then assign empty cart
    cart = cartstr ? JSON.parse(cartstr) : []

    // beacuse on refresh cart = []

    if (cart.length) {
        itemcount.style.visibility = "visible";
        sideCartItem.style.visibility = "visible";
        itemcount.textContent = cart.length;
        sideCartItem.textContent = cart.length;
    }
    else{
        itemcount.style.visibility = "hidden";
        sideCartItem.style.visibility = "hidden";
    }
}

// page setup 
function add_to_page_setup(itemid){
    localStorage.setItem("page_itemId",JSON.stringify(itemid));
    // saved in local storage now can accesible by page.js 
}


function onload() {
    displaycartcount();
    shop();
}

onload();
