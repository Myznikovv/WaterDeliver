var cart = {}; //корзина
var count=0;

$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    $('.send-mail').on('click',sendEmail);
    checkCart();
    showCart(); //вывожу товары на страницу

    function showCart() {
        if ($.isEmptyObject(cart)) {
            var out='';
            var print='';
             out += 'Корзина пустая,вернитесь на главную страницу';
            out+='<div class="line-cart line"></div> ';
            out += '<br>';
            out+='<h4><strong> Итоговая цена :</strong> 0 рублей</h4>';
            out+='<br>';
            print+=0;
            $('#my-cart').html(out);
            $('.main-prise').html(print);
            $('.get-back').on('click',function(){
                window.location.href = $(this).attr('url');
            });

        } else {
            var out = '';
            var count=0;
            var print1='';
            for (var key in cart) {
                out += '<div class="cart-blocks">';
                out += '<div class="row">';
                out += '<div class="col-lg-3 col-sm-3">';
                out += '<div class="photo">';
                out += '<button  class="delete btn " data-art="' + key + '">x</button>';
                out += '<img class="cart-photos" src="' + goods[key].image + '" >';
                out += '</div>';
                out += '</div>';
                out += '<div class="col-lg-9 col-sm-8">';
                out += '<div class="cart-text">';
                out += goods[key].name;
                out += '<p>Артикул товара : '+key+'</p>';
                out += '<button class="minus btn "  data-art="' + key + '">-</button>';
                out += '<text> Количество товара: '+cart[key]+' </text>';
                out += '<button class="plus btn " data-art="' + key + '">+</button>';
                out += '<div class="cost"> Цена :'+cart[key] * goods[key].cost+'</div>' ;
                out += '<br>';
                out += '</div>';
                out += '</div>';
                out += '</div>';
                out += '</div>';
                count+=cart[key] * goods[key].cost;
            }
           out+='<div class="line-cart line"></div> ';
            out += '<br>';
            out+='<h4><strong> Итоговая цена :</strong> '+count+'  рублей</h4>';
            print1+=count;
            $('.main-prise').html(print1);
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
            $('.get-back').on('click',function(){
                window.location.href = $(this).attr('url');
            });
        }
    }
    function plusGoods(){
        var article=$(this).attr('data-art');
        cart[article]++;
        saveCartToLS();
        showCart();
    }
    function minusGoods(){
        var article= $(this).attr('data-art');
        if(cart[article]>1 )cart[article]--;
        else delete cart[article];
        saveCartToLS();
        showCart();
    }
    function deleteGoods(){
        var article = $(this).attr('data-art');
        delete cart[article];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }
});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}

function sendEmail(){
    var out='';
    var name =$('#name').val();
    var mail =$('#mail').val();
    var phone =$('#phone').val();
    if (name!='' && mail!=''&& mail!=' ' && phone!='' && phone!=' '){
        if ($.isEmptyObject(cart)){
            alert('Корзина пуста');
        }else{
            alert('Заказ отправлен');
            cart={};
            count=0;
            saveCartToLS();//сохраняю корзину в localStorage
            if ($.isEmptyObject(cart)) {
                var out ='';
                out+='Корзина пустая,вернитесь на главную страницу';
                out+='<div class="line-cart line"></div> ';
                out += '<br>';
                out+='<h4><strong> Итоговая цена :</strong> 0 рублей</h4>';
                out+='<br>';
                var print2='0';
                $('.main-prise').html(print2);
                $('#my-cart').html(out);
                $('.get-back').on('click',function(){
                    window.location.href = $(this).attr('url');
                });
                location.reload();
            }
            else {
                alert('Повторите заказ');
            }
        }
    }else{
        alert('Заполните поля');
    }
}