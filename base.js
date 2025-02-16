

var whdef = 100 / 750;
var wH = window.innerHeight;
var wW = window.innerWidth;
var rem = wW * whdef;
$('html').css('font-size', rem + "px");

function isNotANumber(inputData) { 
　　if (parseFloat(inputData).toString() == "NaN") { 
　　　　return false; 
　　} else { 
　　　　return true; 
　　} 
}
$(document).ready(function () {


    

    // 首页-行情.html
    $(window).scroll(function () {
        if ($(window).scrollTop() > $('header').height()) {
            $('header').removeClass('fff');
            $('header .back_btn img').attr('src', '/public/images/back.png');
            $('.header_market').addClass('scroll');
        } else {
            $('header').addClass('fff');
            $('header .back_btn img').attr('src', '/public/images/back_w.png');
            $('.header_market').removeClass('scroll');
        }
    })
    $('.market_tab li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
        $('.market_tab_con').eq($(this).index()).addClass('active').siblings('.market_tab_con').removeClass('active');
    })

    // 首页-行情-详情-涨.html
    $('.cycle_tab_list li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
    })

    $('.cearing_time_list li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
    })

    $('.investment_amount_list_all li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
    })

    $('.market_footer button').click(function () {
        $('.rose_mask').show();
        $('.order_popup').slideDown(200);
    })
    $('.order_popup_title img,.order_popup .btn,.rose_mask').click(function () {
        $('.rose_mask').hide();
        $('.order_popup').slideUp(200);
    })

    // 充值.html
    $('.choose_amount_list li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
        $('#payam').val($(this).text());
    })

    $('.choose_way_list li').click(function () {
        $(this).addClass('on').siblings('li').removeClass('on');
    })


});