function Item(type, size, color, count){
    this.type = type;
    this.size = size;
    this.color = color;
    this.count = count;
}

function updateCartText(wishlist){
    var len = wishlist.length;
    for (let i=0; i<len; i++) {
        var wishlistStringType =  wishlist[i].type;
        var wishlistStringSize = "Size: " + wishlist[i].size;
        var wishlistStringColor = "Color: " + wishlist[i].color;
        var wishlistStringQuantity = "Quantity: " + (wishlist[i].count).toString();
        console.log(wishlistStringType);
        console.log(wishlistStringSize);
        console.log(wishlistStringColor);
        console.log(wishlistStringQuantity);
        console.log("we're updating the wishlist text");
        
        var txt1 = $("<h3></h3>").text(wishlistStringType);
        var txt2 = $("<li></li>").text(wishlistStringSize);
        var txt3 = $("<li></li>").text(wishlistStringColor);
        var txt4 = $("<li></li>").text(wishlistStringQuantity);
        var newLine = $("<br>");
        var button = $("<button>Remove</button>");
        $(".wishList").append(txt1, txt2, txt3, txt4, newLine, button);
        console.log(wishlistStringType, wishlistStringSize, wishlistStringColor, wishlistStringQuantity);

        $(button).attr("id", 'removeButton' + i);  
        $(button).addClass("removeButton");

        console.log(button);

        $(button).on('click', function(){
            wishlist.splice(i, 1);
            sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
            location.reload();
        });
    }
}

var type = ["catHarness", "dogHarness", "harnessStorage", "petGPS"];
var sizes = ["tiny", "small", "medium", "large"];
var colors = ["strawberry", "blackberry", "crazyberry", "camouflage", "nightMoon", "fireOrange"]; 

var wishlist = [];

/*** Document Load ***/
$(document).ready(function() {
    console.log("your code is running! for the wishlist");
    savedWishlist = JSON.parse(sessionStorage.getItem("wishlist"));
    if (savedWishlist == null){
        console.log('theres nothing in session storage');
        wishlist = [];
    }
    else {
        wishlist = savedWishlist;
        $("#wishList").text(updateCartText(wishlist));
    }

    var i = 0;
    var len = wishlist.length;
     
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

    $("#add-to-wish").click(function(){
        /* First check if the current item is already in the cart */
        newItem = true;
        currItem = new Item(currType, currSize, currColor, 1);
        if (wishlist.length==0) {
            wishlist.push(currItem);
            console.log("adding first item to wishlist");
            console.log(currItem);
        }
        else {
            let len = wishlist.length
            for (let j = 0; j<len; j++){
                console.log(j);
                /* If it is in the wishlist, add one to its count */
                if (wishlist[j].type == currItem.type && 
                    wishlist[j].size == currItem.size && 
                    wishlist[j].color == currItem.color) {
                    wishlist[j].count = wishlist[j].count + 1;
                    newItem = false;
                    console.log("updating item in wishlist");
                }
            }
            /* If it's not in the wishlist, add the item to the wishlist*/
            console.log("exited for loop");
            if (newItem){
                wishlist.push(currItem);
            }
        }
        /* Update wishlist number */
 
        $("#wishList").text(updateCartText(wishlist));

        console.log(wishlist);

        jsonWishlist = JSON.stringify(wishlist);
        sessionStorage.setItem("wishlist", jsonWishlist);
    });

});