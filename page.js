let item_cont = document.querySelector(".item-container");

add_to_page()

function add_to_page() {

    let imageList = [];
    let itemid = JSON.parse(localStorage.getItem("page_itemId"));

    items.forEach(item => {
        if (item.id == itemid) {

            imageList = item.imageList;
            console.log(imageList)

            item_cont.innerHTML = `
        <div class="image-cont">
            <div class="img-thumbs-cont">
                
            </div>
            <div>
                <img class="big-img" src="images/${item.imageList[0]}" alt="image">
            </div>
        </div>

        <div class="description">${item.desc}

            <p>Brand:${item.company}</p>
            <p>${item.rating.stars} <span class="star">☆☆☆☆☆</span> ${item.rating.count} ratings</p>
            <p>2k bought in last month</p>

            <hr>

            <div class="pric">Price: <span>₹${item.current_price}</span>
                <p class="discount">-${item.discount_percentage}% <span><s>MRP ${item.original_price}</s></span></p>
                <div>Available at a lower price from other sellers that may not offer free Prime shipping.</div>
            </div>
            <hr>
            <table>
        <tr>
            <th>Brand</td>
            <td>Lenovo</td>
        </tr>
        <tr>
            <th>Colour</td>
            <td>Silver</td>
        </tr>
        <tr>
            <th>Warranty</td>
            <td>2 Years</td>
        </tr>
    </table>

    <hr>
        </div>

        <div class="buy-cart">

            <div class="pric">₹<span>${item.current_price}</span></div>
            <p>
                FREE delivery <b> Monday , 18 December</b>. Details</p>
            <p>Or fastest delivery <b> Tomorrow, 17 December</b>.. Order within 2 hrs 6 mins. Details</p>

            <p class="in-stock">In stock</p>
            <p>Sold by Appario Retail Private Ltd and Fulfilled by Amazon.</p>

            <span for="">Quantity</span>
            <select name="quantity" id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <button class="add-to-cart" onclick=addTobag(${item.id})>Add to cart</button>

            <button class="buy-btn">Buy now</button>
            
             </div>

        </div>`
        }
    });

    let image_thumb = document.querySelector(".img-thumbs-cont");

    let inner = '';
    for (let i = 0; i < imageList.length; i++) {
        inner += `
        <div class="img-thumb" style="background-image: url(images/${imageList[i]});" onclick = addImage("${imageList[i]}")></div> `
    }
    image_thumb.innerHTML = inner;


    let add_btn = document.querySelector(".add-to-cart");
    add_btn.addEventListener("click", () => {
        add_btn.textContent = "Added to cart";
        add_btn.style.backgroundColor = "yellow"
    })
}

function addImage(image) {

    //                  here we used " imgagelist " so ensure that it treated as string
    // <div class="img-thumb"  onclick = addImage("${imageList[i]}")></div> `

    console.log(image)
    document.querySelector(".big-img").src = "images/" + image;
}