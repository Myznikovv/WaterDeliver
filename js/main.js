
var cart = {};//Массив с моей корзиной

$('document').ready(function(){
 loadGoods();
 checkCart();
// showMiniCart() ;
$().slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});

$('.swiper-wrapper').slick({
    arrows:true,
    dots:true,
    slidesToShow:3,
    autoplay:true,
    speed:1000,
    autoplaySpeed:800,
    responsive:[
        {
            breakpoint: 768,
            settings: {
                slidesToShow:2
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow:1
            }
        }
    ]
});



});



function checkCart(){
    //проверка корзины в локал сторэйдж
    if(localStorage.getItem('cart') != null){
        cart =JSON.parse(localStorage.getItem('cart'));
    }
}

$('.registration').on('click',function() {
    $('.popup').fadeIn();
});
$('.popup-close').on('click',function() {
    $('.popup').fadeOut();
});
$('.popup-btn').on('click',function() {
    $('.popup').fadeOut();
    window.location.href = $(this).attr('url');
    location.reload();
});

/*function showMiniCart(){
    //Показываю содержимое корзины
    var out ='';
    for (var w in cart){
        out += 'Количество товара данного артикула '+w + ' === '+cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}*/


function loadGoods(){
    //Загрузка товаров
   $.getJSON('goods.json',function(data){
    let out= '';
    let outMain = '';
    let index = 0;
    for (let key in data){
        
        out+='<div class="single-goods col-lg-3">';
        out+='<img class="img-goods" src="'+data[key].image+'">';
        out+='<h4>'+data[key]['name']+'</h4>';
        out+='<b class="cost">Цена: '+data[key]['cost']+' р.</b>';
        //out+='<p>'+data[key].description +'</p>';  раскомментировав можно добавить описание 
        out+="<br/>";
        out+='<button url="cart.html" class="btn button btn-goods-to-cart" data-art="'+key+'" >Добавить в корзину</button>'
        out+='</div>';
        if(index < 3){
            outMain=out;
        }
        index ++;
    }
    $('.goods').html(outMain);
    $('.shop-cart').html(out);
    $('button.btn-goods-to-cart').on('click',addToCart);
       $('.btn-goods-to-cart').on('click',changeLocation);
       $('.shop').on('click',changeLocation);
 })
    function  changeLocation(){
        window.location.href = $(this).attr('url');
    }
    function addToCart(){
       //Добавляю товар в корзину
        var article= $(this).attr('data-art');
        if (cart[article] != undefined){
            cart[article]++;
        }else
            {
               cart[article]=1;
            }
        localStorage.setItem('cart',JSON.stringify(cart) );
        //showMiniCart();
    }

}
