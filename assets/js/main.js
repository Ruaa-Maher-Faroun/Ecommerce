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
    const categories = await getCategories();
    const result = categories.map((cat)=>{
        return `<div class="category">
                    <a href="categoryDetail.html?category=${cat}"><h4>${cat}</h4></a>
                    
                </div>
        `
    }).join(' ');
    document.querySelector(".categories .row").innerHTML = result;
    
};

const getProducts = async(pageNum) => {
    const skip = (pageNum - 1) * 10;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    return data;
};

const displayProducts = async(pageNum=1) => {
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    let data;
    try{
    data = await getProducts(pageNum);
    
    const result = data.products.map((prod) => {
        return `<div class="product">
        <img src="${prod.thumbnail}" class="images" alt="${prod.description}" />
            <h3>${prod.title}</h3>
            <p class="desc">${prod.description}</p>
            <p><span>${prod.category} ${prod.price}</span></p>
            </div>`
    }).join('  ');
    document.querySelector(".products .row").innerHTML = result;
    modal();

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

function modal(){
    const modal = document.querySelector(".modal");
    const rightBtn = document.querySelector(".right-btn");
    const leftBtn = document.querySelector(".left-btn");
    const closeBtn = document.querySelector(".close-btn");
    const images = Array.from(document.querySelectorAll(".images"));
    let curImgInd = 0;
    images.forEach((img)=>{
        img.addEventListener("click", (event) => {
            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src", event.target.src);
            const currentImg = event.target;
            curImgInd = images.indexOf(currentImg);
        });
    });
    
    //close button
    closeBtn.addEventListener("click", () => {
        modal.classList.add("d-none");
    });
    //right button
    rightBtn.addEventListener("click",()=>{
        curImgInd++;
        if(curImgInd == images.length){
            curImgInd = 0;
            
        }
        const src = images[curImgInd].src;
        modal.querySelector("img").setAttribute("src", src);

    });
    //left button
    leftBtn.addEventListener("click", ()=>{
        curImgInd--;
        if(curImgInd < 0){
            curImgInd = images.length - 1;
        }
        const src = images[curImgInd].src;
        modal.querySelector("img").setAttribute("src", src);
    });

    document.addEventListener("keydown", (e)=>{


        if(e.code=="Escape"){
            modal.classList.add("d-none");
        }else if(e.code=="ArrowRight"){
            curImgInd++;
            if(curImgInd == images.length){
                curImgInd = 0;
                
            }
            const src = images[curImgInd].src;
            modal.querySelector("img").setAttribute("src", src);
    
        }else if(e.code=="ArrowLeft"){
            curImgInd--;
            if(curImgInd < 0){
                curImgInd = images.length - 1;
            }
            const src = images[curImgInd].src;
            modal.querySelector("img").setAttribute("src", src);
        
        }
    });
 

}
displayCategories();
displayProducts();
