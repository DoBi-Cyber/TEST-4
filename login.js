import language from './language.js';
var currentLanguage = language[selectedLanguage];
$(function  () {
    
    var Isphone=false;
    const input = document.querySelector("#userphone");
    const iti = window.intlTelInput(input, {
        //excludeCountries: ["cn"],
        // allowDropdown: false,
        // autoPlaceholder: "off",
        // containerClass: "test",
        // countryOrder: ["jp", "kr"],
        // countrySearch: false,
        // customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        //   return "e.g. " + selectedCountryPlaceholder;
        // },
        // dropdownContainer: document.querySelector('#custom-container'),
        // excludeCountries: ["us"],
        // fixDropdownWidth: false,
        // formatAsYouType: false,
        // formatOnDisplay: false,
        // geoIpLookup: function(callback) {
        //   fetch("https://ipapi.co/json")
        //     .then(function(res) { return res.json(); })
        //     .then(function(data) { callback(data.country_code); })
        //     .catch(function() { callback(); });
        // },
        // hiddenInput: () => ({ phone: "phone_full", country: "country_code" }),
        // i18n: { 'de': 'Deutschland' },
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        //utilsScript: "/public/js/utils.js",
        // nationalMode: false,
        // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        // placeholderNumberType: "MOBILE",
        // showFlags: false,
        separateDialCode: true,
        // strictMode: true,
        // useFullscreenPopup: true,
        // validationNumberTypes: null,
    });
    var initialCountryData = iti.getSelectedCountryData();
    $("#country-code").val(initialCountryData.dialCode);
    
    $(input).on('countrychange', function() {
        var selectedCountryData = iti.getSelectedCountryData();
        var dialCode = selectedCountryData.dialCode;

        $("#country-code").val(dialCode);

        //console.log("Selected country code: " + dialCode);
    });
    
    $(input).on('blur', function() {
        
        if (iti.isValidNumber()) {
			Isphone=true; 
        }
    });
    
	$('#repassword').on('click', function(){
		parent.layer.msg(currentLanguage.login_reset,{icon:0,time:2000,shade:0.5});
  	});
  	$('#lang').on('click', function () {
        weui.picker([{
            label: 'English',
            value: 'en-us',
            image: '/public/images/en.png'
        }, {
            label: 'Español',
            value: 'es-es',
            image: '/public/images/es.png'
        }, {
            label: 'Português',
            value: 'pt-pt',
            image: '/public/images/pt.png'
        }, {
            label: '日本語',
            value: 'ja-jp',
            image: '/public/images/jp.png'
        }, {
            label: 'Русский язык',
            value: 'ru-ru',
            image: '/public/images/ru.png'
        }], {
            defaultValue: ['en-us'],
            confirmText:currentLanguage.confirmText,
            onConfirm: function (result) {
                $('#lang').html(result[0].label);
                $('#lang').css({'background':'url('+result[0].image+')  no-repeat left'})
                $(location).attr('href', '?lang='+result[0].value);
            },
            title: 'Language'
        });
    });
	layui.use('form', function(){
        var form = layui.form;
        form.verify({
			password: [
				/^[\S]{6,12}$/
				,currentLanguage.login_password
			]
		}); 
       
        $('#login_btn').on('click', function(data){
            form.submit('login', function(data){
                $('#login_btn').attr('disabled', true);
                $('#login_btn').val(currentLanguage.login_loading);
                $("#login_btn").css({ opacity: .4 });
                var username = encodeURIComponent($("#userphone").val());
                var password = encodeURIComponent($("#password").val());
                var url = encodeURIComponent($("#url").val());
                var country = encodeURIComponent($("#country-code").val());
                var loading = layer.msg(currentLanguage.login_loading, {icon: 16, shade: 0.5, time:2000});
                $.ajax({
                    type:'post',
                    url:"/login/login.html",
                    data: {
                        username: username,
                        upwd: password,
                        url: url,
                        country:country
                    },
                    dataType:'json',
                    timeout : 10000,
                    success:function(data){
                        if(data.type == 1){
                            layer.msg(data.data);
                            var redirecturl=decodeURIComponent(data.url);
                            //, url: urlconsole.log(redirecturl);
                            setTimeout(function() {
                            	window.location.href = redirecturl;
                            },1000 );
                        } else{
                            layer.msg(data.data, {icon: 2, shade: 0.5, time:2000});
                            setTimeout(function() {
                                $('#login_btn').removeAttr('disabled');
                                $('#login_btn').val(currentLanguage.login_botton);
                                $("#login_btn").css({ opacity:1 });
                            },1000 );
                            
                        }
                    },
                    error : function(XMLHttpRequest, textStatus,errorThrown){
                        $('#login_btn').removeAttr('disabled');
                        $('#login_btn').val(currentLanguage.login_botton);
                        $("#login_btn").css({ opacity:1 });
                        //console.log(XMLHttpRequest.status);
                        //console.log(XMLHttpRequest.readyState);
                        //console.log(XMLHttpRequest.statusText);
                        //console.log(textStatus);
                        //console.log(errorThrown);
                        layer.msg(currentLanguage.login_error, {icon: 2, shade: 0.8, time:2000});
                    }
                });  
            });
        })
	});
})