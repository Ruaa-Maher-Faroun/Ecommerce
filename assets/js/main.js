const getCategories = async() => {
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
};

const displayCategories = async() => {
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
        const categories = await getCategories();
        const result = categories.map((cat)=>{
            return `<div class="category">
            <a href="categoryDetail.html?category=${cat}"><h4>${cat}</h4></a>
            
            </div>
            `
        }).join(' ');
        document.querySelector(".categories .row").innerHTML = result;
        
    }catch(e){
        document.querySelector(".categories .row").innerHTML = "<h1>Error Loading</h1>";
        
    }finally{
        loader.classList.remove('active');

    }
    
};

const getProducts = async(pageNum) => {
    const skip = (pageNum - 1) * 10;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    return data;
};

const displayProducts = async(pageNum=1) => {
    console.log(pageNum);
    
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    let data;
    try{
    data = await getProducts(pageNum);
    
    const result = data.products.map((prod) => {
        return `<div class="product">
        <img src="${prod.thumbnail}" alt="${prod.description}" />
            <h3>${prod.title}</h3>
            <p class="desc">${prod.description}</p>
            <p><span>${prod.category} ${prod.price}</span></p>
            </div>`
    }).join('  ');
    document.querySelector(".products .row").innerHTML = result;


}catch(e){
    document.querySelector(".products .row").innerHTML = "<h1>Error Loading</h1>";
    
}finally{
    loader.classList.remove('active');

}

let numberofPages = Math.ceil(data.total / 10);
let paginationLink = ``;

if(pageNum === 1){
    paginationLink = `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
}else{
    paginationLink = `<li class="page-item"><button class="page-link" onclick=displayProducts(${parseInt(pageNum)-1})>&laquo;</button></li>`;

}

for (let i = 1; i <= numberofPages; i++) {
    paginationLink += `<li class="page-item ${i == pageNum?'active':''}"><button class="page-link" onclick=displayProducts(${i})>${i}</button></li>`;
    
}
if(pageNum === numberofPages){
    paginationLink += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
}else{
    paginationLink += `<li class="page-item"><button class="page-link" onclick=displayProducts(${parseInt(pageNum)+1})>&raquo;</button></li>`;

}


document.querySelector('.pagination').innerHTML = paginationLink;
};

window.onscroll = () => {
    const nav = document.querySelector(".header");
    const category = document.querySelector(".categories");
  
    if(window.scrollY > category.offsetTop){
        nav.classList.add("scrollNavBar");
        
    }else{
        nav.classList.remove("scrollNavBar");

    }
    
};

const countDown = () => {
    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const day = Math.floor(distance / 86400000);
    const hours = Math.floor( (distance %86400000) / 3600000);
    const minutes = Math.floor((distance %(1000*60*60) )/60000);
    const seconds =  Math.floor((distance %(60*1000)) / 1000);
    document.querySelector(".day").textContent = day;
    document.querySelector(".hour").textContent = hours;
    document.querySelector(".minute").textContent = minutes;
    document.querySelector(".second").textContent = seconds;
};

setInterval(() => {
    countDown();
    
}, 1000);
displayCategories();
displayProducts();