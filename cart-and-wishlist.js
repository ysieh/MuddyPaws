/** cart.js, PUI Assignment 4, ysieh ***/

/* Make new instance of Item */
function Item(type, size, color, count){
    this.type = type;
    this.size = size;
    this.color = color;
    this.count = count;
}

/* Update the cart number that appears in the nav */
function updateCart(cart){
    var len = cart.length;
    var cartTotal = 0;
    for (let i = 0; i < len; i++){
        cartTotal = cartTotal + cart[i].count;
    }
    return cartTotal;
}

/* Update the text that appears in the shopping cart */
function updateCartText(cart){
    // For every item in the cart, create list item strings and a remove button with the item details
    // Then, append each of these list items and the button to the cartList class for cart.html
    var len = cart.length;
    for (let i=0; i<len; i++) {
        var cartStringType =  cart[i].type;
        var cartStringSize = "Size: " + cart[i].size;
        var cartStringColor = "Color: " + cart[i].color;
        var cartStringQuantity = "Quantity: " + (cart[i].count).toString();
        
        var txt1 = $("<h3></h3>").text(cartStringType);
        var txt2 = $("<li></li>").text(cartStringSize);
        var txt3 = $("<li></li>").text(cartStringColor);
        var txt4 = $("<li></li>").text(cartStringQuantity);
        var button = $("<button>Remove Item</button>");
        $(".cartList").append(txt1, txt2, txt3, txt4, button);

        // Making button attributes and functions
        // Remove items from the cart by splicing them out and storing the new cart in sessionStorage
        $(button).attr("id", 'removeButton' + i);  
        $(button).addClass("removeButton");

        $(button).on('click', function(){
            cart.splice(i, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });   
    }
}

/* Update the text that appears in the wishlist */
function updateWishlistText(wishlist){
    // For every item in the wishlist, create list item strings and a remove button with the item details
    // Then, append each of these list items and the button to the cartList class for cart.html
    var len = wishlist.length;
    for (let i=0; i<len; i++) {
        var wishStringType =  wishlist[i].type;
        var wishStringSize = "Size: " + wishlist[i].size;
        var wishStringColor = "Color: " + wishlist[i].color;
        var wishStringQuantity = "Quantity: " + (wishlist[i].count).toString();
        
        var txt1 = $("<h3></h3>").text(wishStringType);
        var txt2 = $("<li></li>").text(wishStringSize);
        var txt3 = $("<li></li>").text(wishStringColor);
        var txt4 = $("<li></li>").text(wishStringQuantity);
        var button = $("<button>Remove Item</button>");
        $(".wishList").append(txt1, txt2, txt3, txt4, button);

        // Making button attributes and functions
        // Remove items from the wishlist by splicing them out and storing the new wishlist in sessionStorage
        $(button).attr("id", 'removeButton' + i);  
        $(button).addClass("removeButton");

        $(button).on('click', function(){
            wishlist.splice(i, 1);
            sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
            location.reload();
        });   
    }
}

/*** Global Variables ***/
var type = ["catHarness", "dogHarness", "harnessStorage", "petGPS"];
var sizes = ["tiny", "small", "medium", "large"];
var colors = ["strawberry", "blackberry", "crazyberry", "camouflage", "nightMoon", "fireOrange"]; 
// Make an empty global list
var cart = [];
var wishlist = [];

/*** Document Load ***/
$(document).ready(function() {
    // Check if there is a saved cart by loading out of storage. If no saved cart, make cart = []
    savedCart = JSON.parse(sessionStorage.getItem("cart"));
    if (savedCart == null){
        cart = [];
    }else {
        cart = savedCart;
        $("#cartList").text(updateCartText(cart));
    }

    $("#cartValue").text(updateCart(cart)); 

    savedWishlist = JSON.parse(sessionStorage.getItem("wishlist"));
    if (savedWishlist == null){
        wishlist = [];
    }else {
        wishlist = savedWishlist;
        $("#wishList").text(updateWishlistText(wishlist));
    }

    var i = 0;
    var len = cart.length;
     
    /* Updating the cart */
    var currSize = "Tiny";
    var currColor = "Strawberry";
    var currType = "Cat Harness";
    var currItem = new Item(currType, currSize, currColor, 1); // new instance of Item that will be updated 

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

    /*** Add to cart function ***/
    $("#add-to-cart").click(function(){
        /* First check if the current item is already in the cart */
        newItem = true;
        currItem = new Item(currType, currSize, currColor, 1);
        if (cart.length==0) {
            cart.push(currItem);
        }
        else {
            let len = cart.length
            for (let j = 0; j<len; j++){
                /* If it is in the cart, add one to its count */
                if (cart[j].type == currItem.type && 
                    cart[j].size == currItem.size && 
                    cart[j].color == currItem.color) {
                    cart[j].count = cart[j].count + 1;
                    newItem = false;
                }
            }
            /* If it's not in the cart, add the item to the cart*/
            if (newItem){
                cart.push(currItem);
            }
        }
        /* Update cart number */
        $("#cartValue").text(updateCart(cart)); 
        $("#cartList").text(updateCartText(cart));

        /* Save cart to session storage */
        jsonCart = JSON.stringify(cart);
        sessionStorage.setItem("cart", jsonCart);
    });


    $("#add-to-wish").click(function(){
        /* First check if the current item is already in the cart */
        newItem = true;
        currItem = new Item(currType, currSize, currColor, 1);
        if (wishlist.length==0) {
            wishlist.push(currItem);
        }
        else {
            let len = wishlist.length
            for (let j = 0; j<len; j++){
                /* If it is in the cart, add one to its count */
                if (wishlist[j].type == currItem.type && 
                    wishlist[j].size == currItem.size && 
                    wishlist[j].color == currItem.color) {
                    wishlist[j].count = wishlist[j].count + 1;
                    newItem = false;
                }
            }
            /* If it's not in the cart, add the item to the cart*/
            if (newItem){
                wishlist.push(currItem);
            }
        }
        /* Update cart number */
        $("#wishList").text(updateWishlistText(wishlist));

        /* Save cart to session storage */
        jsonWishlist = JSON.stringify(wishlist);
        sessionStorage.setItem("wishlist", jsonWishlist);
    });

});