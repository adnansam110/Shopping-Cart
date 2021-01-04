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