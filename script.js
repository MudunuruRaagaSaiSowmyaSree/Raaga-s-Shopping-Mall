const products=[
{name:"Black Classic",price:500,img:"./images/black.jpg"},
{name:"White Casual",price:450,img:"./images/white.jpg"},
{name:"Red Sport",price:600,img:"./images/redsport.jpg"},
{name:"Blue Style",price:550,img:"./images/navyblue.jpg"},
{name:"Green Casual",price:480,img:"./images/greencasual.jpg"},
{name:"Yellow Fashion",price:470,img:"./images/yellow.jpg"},
{name:"Grey Style",price:520,img:"./images/greystyle.jpg"},
{name:"Orange Trend",price:510,img:"./images/orange.jpg"},
{name:"Pink Fashion",price:530,img:"./images/pinkfashion.jpg"},
{name:"Sky Blue",price:490,img:"./images/skyblue.jpg"},
{name:"Purple Style",price:560,img:"./images/purplestyle.jpg"},
{name:"Modern Black",price:600,img:"./images/modernblack.jpg"}
]

let cart=[]
let currentProduct=null

let grid=document.getElementById("productGrid")

products.forEach((p,i)=>{
grid.innerHTML+=`
<div class="card" onclick="openProduct(${i})">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
</div>`
})

function show(page){
document.querySelectorAll(".page").forEach(p=>p.style.display="none")
document.getElementById(page).style.display="block"
}

function goHome(){
show("home")
}

function openProduct(i){
currentProduct=products[i]
document.getElementById("pName").innerText=currentProduct.name
document.getElementById("pImg").src=currentProduct.img
document.getElementById("pPrice").innerText="Price ₹"+currentProduct.price
show("productPage")
}

function addToCart(){
let item=cart.find(x=>x.name===currentProduct.name)

if(item){
item.qty++
}else{
cart.push({...currentProduct,qty:1})
}

updateCart()
alert("Added to cart")
}

function updateCart(){
document.getElementById("cartCount").innerText=
cart.reduce((sum,i)=>sum+i.qty,0)
}

function openCart(){
show("cartPage")

let table=document.getElementById("cartTable")

table.innerHTML=`<tr>
<th>Item</th>
<th>Price</th>
<th>Qty</th>
<th>Remove</th>
</tr>`

let total=0

cart.forEach((item,i)=>{
total+=item.price*item.qty

table.innerHTML+=`
<tr>
<td>${item.name}</td>
<td>₹${item.price}</td>
<td>
<input type="number" value="${item.qty}" min="1"
onchange="changeQty(${i},this.value)">
</td>
<td>
<button onclick="removeItem(${i})">❌</button>
</td>
</tr>`
})

document.getElementById("totalPrice").innerText="Total: ₹"+total
}

function changeQty(i,q){
cart[i].qty=parseInt(q)
openCart()
updateCart()
}

function removeItem(i){
cart.splice(i,1)
openCart()
updateCart()
}

function checkout(){
show("loadingPage")
setTimeout(generateBill,2000)
}

function generateBill(){
show("billPage")

let div=document.getElementById("billItems")
div.innerHTML=""

let total=0

cart.forEach(item=>{
div.innerHTML+=`<p>${item.name} x ${item.qty} - ₹${item.price*item.qty}</p>`
total+=item.price*item.qty
})

document.getElementById("billTotal").innerText="Total Bill : ₹"+total

cart=[]
updateCart()
}