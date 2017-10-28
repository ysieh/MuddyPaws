function Item(type, size, color, count){
    this.type = type;
    this.size = size;
    this.color = color;
    this.count = count;
}

function updateCart(cart){
    var len = cart.length;
    var cartTotal = 0;
    for (let i = 0; i < len; i++){
        cartTotal = cartTotal + cart[i].count;
    }
    return cartTotal;
}

function updateCartText(cart){
    var len = cart.length;
    var cartString = "";

    console.log("in updatecarttext");

    for (let i=0; i<len; i++) {
        console.log("in the for loop");
        var cartStringType =  cart[i].type;
        var cartStringSize = "Size: " + cart[i].size;
        var cartStringColor = "Color: " + cart[i].color;
        var cartStringQuantity = "Quantity: " + (cart[i].count).toString();
        console.log(cartStringType);
        console.log(cartStringSize);
        console.log(cartStringColor);
        console.log(cartStringQuantity);
        
        var txt1 = $("<h3></h3>").text(cartStringType);
        var txt2 = $("<li></li>").text(cartStringSize);
        var txt3 = $("<li></li>").text(cartStringColor);
        var txt4 = $("<li></li>").text(cartStringQuantity);
        var button = $("<button>Remove Item</button>");
        $(".cartList").append(txt1, txt2, txt3, txt4, button);


        $(button).attr("id", 'removeButton' + i);  
        $(button).addClass("removeButton");

        $(button).on('click', function(){
            cart.splice(i, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });   
    }
    return cartString;
}

var type = ["catHarness", "dogHarness", "harnessStorage", "petGPS"];
var sizes = ["tiny", "small", "medium", "large"];
var colors = ["strawberry", "blackberry", "crazyberry", "camouflage", "nightMoon", "fireOrange"]; 

var cart = [];

/*** Document Load ***/
$(document).ready(function() {
    console.log("your code is running!");
    savedCart = JSON.parse(sessionStorage.getItem("cart"));
    if (savedCart == null){
        console.log('theres nothing in session storage');
        cart = [];
    }
    else {
        cart = savedCart;
        $("#cartList").text(updateCartText(cart));
    }

    $("#cartValue").text(updateCart(cart)); 
    var i = 0;
    var len = cart.length;
     
    /* Updating the cart */
    var currSize = "Tiny";
    var currColor = "Strawberry";
    var currType = "Cat Harness";
    var currItem = new Item(currType, currSize, currColor, 1);

    $(".catHarness").on("click", function(){
        currType = "Cat Harness";
    });

    $(".dogHarness").on("click", function(){
        currType = "Dog Harness";
    });

    $(".harnessStorage").click(function(){
        currType = "Harness Storage"
    });

    $(".petGPS").click(function(){
        currType = "Pet GPS"
    });

    $("#large-size").click(function(){
        currSize = "Large";
        console.log("large size");
    });

    $("#medium-size").click(function(){
        currSize = "Medium";
    });

    $("#small-size").click(function(){
        currSize = "Small"
    });

    $("#tiny-size").click(function(){
        currSize = "Tiny"
    });

    $("#straw-color").click(function(){
        currColor = "Strawberry";
        console.log('this is the strawberry one');
        $("#catHarnessImg").attr("src", "images/strawberrycatharness.png");
    });

    $("#black-color").click(function(){
        currColor = "Blackberry";
        $('#catHarnessImg').attr('src', 'images/blackberrycatharness.jpg');
    });

    $("#crazy-color").click(function(){
        currColor = "Crazyberry";
        $('#catHarnessImg').attr('src', 'images/crazyberrycatharness.png');
    });

    $("#camo-color").click(function(){
        currColor = "Camouflage";
        $('#catHarnessImg').attr('src', 'images/camouflagecatharness.png');
    });

    $("#night-color").click(function(){
        currColor = "Night Moon";
        $('#catHarnessImg').attr('src', 'images/nightmooncatharness.jpg');
    });

    $("#fire-color").click(function(){
        currColor = "Fire Orange";
        $('#catHarnessImg').attr('src', 'images/fireorangecatharness.png');
    });

    $("#add-to-cart").click(function(){
        /* First check if the current item is already in the cart */
        newItem = true;
        currItem = new Item(currType, currSize, currColor, 1);
        if (cart.length==0) {
            cart.push(currItem);
            console.log("adding first item to cart");
            console.log(currItem);
        }
        else {
            let len = cart.length
            for (let j = 0; j<len; j++){
                console.log(j);
                /* If it is in the cart, add one to its count */
                if (cart[j].type == currItem.type && 
                    cart[j].size == currItem.size && 
                    cart[j].color == currItem.color) {
                    cart[j].count = cart[j].count + 1;
                    newItem = false;
                    console.log("updating item in cart");
                }
            }
            /* If it's not in the cart, add the item to the cart*/
            console.log("exited for loop");
            if (newItem){
                cart.push(currItem);
            }
        }
        /* Update cart number */

        $("#cartValue").text(updateCart(cart)); 
        $("#cartList").text(updateCartText(cart));

        console.log(cart);
        jsonCart = JSON.stringify(cart);
        sessionStorage.setItem("cart", jsonCart);
        console.log("this is the end");
    });

});