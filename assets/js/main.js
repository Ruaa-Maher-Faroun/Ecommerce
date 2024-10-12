const getCategories = async() => {
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
};

const displayCategories = async() => {
    const categories = await getCategories();
    const result = categories.map((cat)=>{
        return `<div class="category">
                    <a href="categoryDetail.html?category=${cat}"><h4>${cat}</h4></a>
                    
                </div>
        `
    }).join(' ');
    document.querySelector(".categories .row").innerHTML = result;
    
};

const getProducts = async() => {
    const {data} = await axios.get(`https://dummyjson.com/products`);
    return data;
};

const displayProducts = async() => {
    const {products} = await getProducts();
    
    const result = products.map((prod) => {
        return `<div class="product">
        <img src="${prod.thumbnail}" alt="${prod.description}" />
            <h3>${prod.title}</h3>
            <p class="desc">${prod.description}</p>
            <p><span>${prod.category} ${prod.price}</span></p>
            </div>`
    }).join('  ');
    document.querySelector(".products .row").innerHTML = result;
};
displayCategories();
displayProducts();
