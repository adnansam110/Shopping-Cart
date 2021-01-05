if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else
{
    ready();
}

function ready() {


        var removeCartButton=document.getElementsByClassName('btn-danger');

        for (var i=0; i<removeCartButton.length;i++)
        {
            var button = removeCartButton[i];
            button.addEventListener('click', removeCartItem);
                //console.log('clicked');
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input');
        for (var i=0; i<quantityInputs.length;i++)
        {
            var input = quantityInputs[i];
            input.addEventListener('change', updateQuantity);
        }

        var addToCartButton = document.getElementsByClassName('shop-item-button');
        for (var i = 0; i<addToCartButton.length; i++)
        {
            var button = addToCartButton[i];
            button.addEventListener('click', addToCartClicked);
        }
       var purchaseBtn = document.getElementsByClassName('btn-purchase')[0];
       purchaseBtn.addEventListener('click', itemPurchased);
}
function itemPurchased(){
    
    
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if (cartItems.childElementCount == 0)
    {
        alert("Please add some Items to cart");
    }
    else
    {   
        alert("Thankyou For Your Purchase");
        while (cartItems.hasChildNodes())
        {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal();
    }
    
}
function addToCartClicked(e)
{
    var button = e.target;
    var shopItem = button.parentElement.parentElement;
    var title= shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSource = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addToCart(title, price, imgSource);
    updateCartTotal();
}
function addToCart(title, price, imgSource)
{   
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems= document.getElementsByClassName('cart-items')[0];
    var cartItemname = document.getElementsByClassName('cart-item-title');
    for (var i = 0; i<cartItemname.length; i++)
    {
        if(cartItemname[i].innerText == title)
        {
            alert("This item is already added to the cart!");
            return;
        }
    }
    var cartItemContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSource}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartItemContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateQuantity);
}


function removeCartItem(e){
        var buttonClicked= e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}

function updateQuantity(e)
{
    var input = e.target;
    if(isNaN(input.value) || input.value<1)
    {
        input.value = 1;
    }
    updateCartTotal();
}


function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total= 0;

    for(var i=0; i<cartRows.length;i++)
    {
        var cartRow= cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
