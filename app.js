// This here Update the total Prices
let totalPrice = 0;
const updateTotalPrice = () => {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerHTML = `
        <div class=" pr-5 text-right font-bold text-lg mt-2">
            Total: <i class="fa-solid fa-bangladeshi-taka-sign"></i>${totalPrice}
        </div>
    `;
};
updateTotalPrice();

// this is all categories load
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.categories))
}

const allPlants = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const treeCards = document.getElementById('tree-cards');
        treeCards.innerHTML = ''; 

        const treesBtn = document.getElementById('trees-btn');
        treesBtn.classList.add('active')
        displayPlants(data.plants)
    })
}
const displayPlants = (plants) =>{
    const allPlants = document.getElementById('all-plants');
    allPlants.innerHTML = "";
    plants.forEach(element => {
        const treeCards = document.getElementById('tree-cards')
        const div = document.createElement('div');
        div.innerHTML = `
                    <div class="bg-white p-3 rounded-xl space-y-3 ">
                        <img class=" object-cover h-50 w-full rounded-md" src="${element.image}" alt="">
                        <h2 onclick="modalLoad(${element.id})" class="font-semibold text-xl cursor-pointer">${element.name}</h2>
                        <p class=" h-[6rem] line-clamp-4">${element.description}</p>
                        <div class="w-full flex justify-between items-center"><span
                                class="bg-[#dcfce7] text-[#15803d] py-1.5 px-3 rounded-xl font-medium">${element.category}</span>
                            <p class="font-bold lg"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${element.price}</span>
                            </p>
                        </div>
                        <button class="bg-[#15803d] w-full text-white py-2 px-2.5 rounded-3xl cursor-pointer hover:scale-105 duration-150 add-Cart">Add to
                            Cart</button>
                    </div>
        `
        treeCards.append(div);
        const addButton = div.querySelector('.add-Cart');
        addButton.addEventListener('click', () => {
    alert(`${element.name} Tree has been Added to the Cart.`);

    const addCart = document.getElementById('cart-area');

    const cart = document.createElement('div');
    cart.classList.add('cart-item'); 

    cart.innerHTML = `
        <div class="flex justify-between items-center py-2 px-3 bg-gray-50 mb-2 rounded-md">
            <div>
                <h1 class="font-semibold">${element.name}</h1>
                <span>${element.price} Taka</span>
            </div>
            <div class="remove-cart">
                <i class="fa-solid fa-xmark cursor-pointer text-red-500 hover:text-red-700"></i>
            </div>
        </div>
    `;

    addCart.appendChild(cart);

    totalPrice += parseInt(element.price);
    updateTotalPrice();

    // Remove item
    const removeBtn = cart.querySelector('.remove-cart');
    removeBtn.addEventListener('click', () => {
        cart.remove();
        totalPrice -= parseInt(element.price);
        updateTotalPrice();
    });
});

        
    })
    
}
allPlants()

const removeActive = ()=>{
    const btn = document.querySelectorAll('.btns');
    btn.forEach(btn => btn.classList.remove('active') )
}


// this is Categories cards
const loadCards = (id)=>{
    manageSpiner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const activeBtn = document.getElementById(`categories-btn-${id}`)
        activeBtn.classList.add('active')

        displayCards(data.plants)
    })

}

const displayCards = (cards)=> {

    // get the container
    const treeCards = document.getElementById('tree-cards');
    treeCards.innerHTML = ''; 
    cards.forEach(element => {
        const div = document.createElement('div');

        div.innerHTML = `
        
                    <div class="bg-white p-3 rounded-xl space-y-3">
                        <img class=" object-cover h-50 w-full rounded-md" src="${element.image}" alt="">
                        <h2 onclick="modalLoad(${element.id})" class="font-semibold text-xl cursor-pointer">${element.name}</h2>
                        <p class=" h-[6rem] line-clamp-4">${element.description}</p>
                        <div class="w-full flex justify-between items-center"><span
                                class="bg-[#dcfce7] text-[#15803d] py-1.5 px-2 rounded-2xl font-noraml">${element.category}</span>
                            <p class="font-bold py-3 lg"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${element.price}</span>
                            </p>
                        </div>
                        <button class="bg-[#15803d] w-full text-white py-2 px-2.5 rounded-3xl cursor-pointer hover:scale-105 duration-150 add-Cart">Add to
                            Cart</button>
                    </div>
        
        `
        treeCards.append(div);
        const addButton = div.querySelector('.add-Cart');

    addButton.addEventListener('click', () => {
    alert(`${element.name} Tree has been Added to the Cart.`);

        
    const addCart = document.getElementById('cart-area');

    const cart = document.createElement('div');
    cart.classList.add('cart-item'); 

    cart.innerHTML = `
        <div class="flex justify-between items-center py-2 px-3 bg-gray-50 mb-2 rounded-md">
            <div>
                <h1 class="font-semibold">${element.name}</h1>
                <span>${element.price} Taka</span>
            </div>
            <div class="remove-cart">
                <i class="fa-solid fa-xmark cursor-pointer text-red-500 hover:text-red-700"></i>
            </div>
        </div>
    `;

    addCart.appendChild(cart);

    totalPrice += parseInt(element.price);
    updateTotalPrice();

    // Remove item
    const removeBtn = cart.querySelector('.remove-cart');
    removeBtn.addEventListener('click', () => {
        cart.remove();
        totalPrice -= parseInt(element.price);
        updateTotalPrice();
    });

});


        manageSpiner(false); 
    });

}

const displayAllCategories = (categories) => {

    // get the container
    const categoriesContainer = document.getElementById('categories-container');

    // get every categories
    for(let category of categories){
        const ul = document.createElement('ul');
        ul.innerHTML = `
            <button id="categories-btn-${category.id}" onclick='loadCards("${category.id}")' class="p-1 w-full  hover:bg-green-600 duration-100 my-1 text-left btns">${category.category_name}</button>
        `;
        categoriesContainer.append(ul)

    }

}
loadCategories();

// This is modal
const modalLoad = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url);
    const info = await res.json();
    displayModal(info.plants);
}
const displayModal = (plant)=> {
    const deatailsBox = document.getElementById('modal-container');
    deatailsBox.innerHTML = `
        <div>
            <h2 class="font-semibold text-xl">${plant.name}</h2>
            <img src="${plant.image}" class="rounded-md object-cover h-40 w-full my-1" src="" alt="">
            <h3 class="font-semibold">Category: <span class="font-normal">${plant.category}</span> </h3>
            <h5 class="font-semibold">Price: <i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${plant.price}</span></h5>
            <div><span class="font-semibold">Description: </span> <p class="font-normal inline">${plant.description}</p></div>
        </div>
    `
    document.getElementById('my_modal_5').showModal();
    
}

// Spniner 

const manageSpiner = (status)=>{
    if(status == true){
        document.getElementById('spniner').classList.remove('hidden');
        document.getElementById('tree-cards').classList.add('hidden');
    }
    else{
        document.getElementById('tree-cards').classList.remove('hidden');
        document.getElementById('spniner').classList.add('hidden');
    }

};





