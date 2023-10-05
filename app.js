const products=[];

function GetProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        data.forEach(product => {
            products.push(product);
            document.querySelector('.all-products').innerHTML += getData(product)
        })
    })
    .catch(error => console.log(error)) 
    
}
GetProducts();


const categories=[];

function GetCategories() {
    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        data.forEach(cat => {
            categories.push(cat);
            document.querySelector('#category').innerHTML += getData2(cat)
        })
    })
    .catch(error => console.log(error)) 
    
}
GetCategories();

function getData2(categori) {
    return `
    <option value="${categori}">${categori}</option>
    `
}

function getData(product) {
    return `
    <div class="col-lg-3 col-6">
        <div class="card">
            <img src=${product.image} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="category">${product.category}</p>
            <span class="price">${product.price}</span>
            </div>
        </div>
    </div>
    `
}





const input = document.querySelector('#product-input')
let searchfiltered=products;
input.onkeyup = function() {
    let value = this.value
    searchfiltered = products.filter(prod => prod.title.toLowerCase().includes(value.toLowerCase()))
    document.querySelector('.all-products').innerHTML = ''
    searchfiltered.forEach(prod => {
        document.querySelector('.all-products').innerHTML += getData(prod)
        
    })
    if(searchfiltered.length === 0) {
        document.querySelector('.alert').classList.remove('d-none')
    }
    else{
        document.querySelector('.alert').classList.add('d-none')
    }
    
    
}
let category_select = document.querySelector('#category')

category_select.onchange = (e) => {
    const filtered = searchfiltered.filter(product => product.category === e.target.value)
    console.log(filtered);

    if(e.target.value !== "jewelery" && e.target.value !== "men's clothing"  && e.target.value !== "women's clothing" && e.target.value !== "electronics") {
        document.querySelector('.all-products').innerHTML = ''
        products.forEach(product => {
            document.querySelector('.all-products').innerHTML += getData(product)
        })
    }

    else{
        document.querySelector('.all-products').innerHTML = ''
    filtered.forEach(product => {
        document.querySelector('.all-products').innerHTML += getData(product)
    })
    }
    
}
