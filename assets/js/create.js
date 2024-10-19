const createProduct = document.querySelector(".createProduct");



createProduct.onsubmit = async(e) => {
    e.preventDefault();
    const title = document.querySelector(".title").value;
    const desc = document.querySelector(".desc").value;
    const {data} = await axios.post(`https://dummyjson.com/products/add`,{
        title,
        description: desc,

    });
    console.log(data);
    
};