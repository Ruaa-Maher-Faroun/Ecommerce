const getProductsFromCategory = async() => {
    const params = new URLSearchParams(window.location.search).get('category'); 
    const {data} = await axios.get(`https://dummyjson.com/products/category/${params}`);
   
    
    return data;
};


const displayProductsfromCategory = async() => {
    const {products} = await getProductsFromCategory();
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

displayProductsfromCategory();