//EXTRA: He intentado poner los products en un JSON, pero me daba problema de CORS y permisos de live server. Mejor lo dejo así.

var products = [
    {
        id: 1,
        name: 'Cooking Oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant Cupcake Mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id === id) {
            const checkIfProductExist = cart.find(item => item.id === id);
            if (checkIfProductExist) {
                checkIfProductExist.quantity += 1;
            } else {
                let addedProduct = { ...products[index], quantity: 1 };
                cart.push(addedProduct)
                //console.log('Producto añadido al carrito:', addedProduct);
            }
            break;
        }
    }
    //console.log(cart);
    calculateTotal(cart)
    updateCartCount();
    changeColorCounter()
}



// Exercise 2
function cleanCart() {
    cart = [];
    printCart();
    updateCartCount();
    changeColorCounter()
}

// Exercise 3
function calculateTotal() {
    let totalPrice = 0;

    for (let index = 0; index < cart.length; index++) {
        totalPrice += cart[index].price * cart[index].quantity;
    }
    //console.log('Este es el precio sumado de todos los productos en el carrito: ' + totalPrice);
}



// Exercise 4
function applyPromotionsCart() {

    let totalPrice = 0;

    for (let product of cart) {
        let subTotal = product.price * product.quantity;

        if (product.id === 1 && product.quantity >= 3) {
            subTotal = subTotal * 0.80;
        }

        else if (product.id === 3 && product.quantity >= 10) {
            subTotal = subTotal * 0.70;
        }

        product.subtotalWithDiscount = subTotal;
        totalPrice += subTotal;
    }

    document.getElementById('total_price').textContent = totalPrice.toFixed(2);
}

// Exercise 5
function printCart() {

    const cartList = document.getElementById('cart_list');
    const totalPriceElement = document.getElementById('total_price');

    cartList.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(function (product, index) {
        let subTotal = product.price * product.quantity;
        let discountSubTotal = subTotal;

        if (product.id === 1 && product.quantity >= 3) {
            const discount = 0.20;
            discountSubTotal = subTotal * (1 - discount);
        } else if (product.id === 3 && product.quantity >= 10) {
            const discount = 0.30;
            discountSubTotal = subTotal * (1 - discount);
        }

        totalPrice += discountSubTotal;

        const row = document.createElement('tr');

        //se crea dinámicamente en la modal
        row.innerHTML = `
            <th scope="row">${product.name}</th>
            <td>$${product.price.toFixed(2)}</td>
            <td><span>${product.quantity}</span></td>
            <td>$${discountSubTotal.toFixed(2)}</td> <!-- Mostrar el total con descuento -->
            <td><button class="btn btn-restar" data-index="${index}">
                <img src="images/rest-item.png" alt="Restar" class="restar-icon">
            </button><td>
        `;

        cartList.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.querySelectorAll(".btn-restar").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}


// ** Nivell II **

// Exercise 7
function removeFromCart(index) {
    let product = cart[index];

    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart.splice(index, 1);
    }

    applyPromotionsCart();
    printCart();
    updateCartCount();
    changeColorCounter()

}

function open_modal() {
    printCart();
}

// Exercici 8 (EXTRA)
function updateCartCount() {
    let totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById("count_product").textContent = totalQuantity;
}

// Exercici 8 (EXTRA)
function goCheckout() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'No hay productos en el carrito!',
            text: 'Anímate y añade alguno ;)',
            showConfirmButton: true,
            timer: 5000,
            color: '#721c24',
            timerProgressBar: true,
        });
    } else {
        window.location.href = "checkout.html";
    }
}

// Exercici 8 (EXTRA)
function changeColorCounter() {

    let totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

    var buttonElement = document.getElementById("cartButton");
    var countElement = document.getElementById("count_product");

    countElement.textContent = totalQuantity;

    if (totalQuantity >= 1) {
        if (buttonElement) {
            buttonElement.classList.remove("btn-secondary");
            buttonElement.classList.add("btn-success");
        }
        if (countElement) {
            countElement.classList.remove("text-secondary");
            countElement.classList.add("text-success");
        }
    } else {
        if (buttonElement) {
            buttonElement.classList.remove("btn-success");
            buttonElement.classList.add("btn-secondary");
        }
        if (countElement) {
            countElement.classList.remove("text-success");
            countElement.classList.add("text-secondary");
        }
    }
}
