$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carusel/row_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carusel/row_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }    
            } 
        ]      
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // $('.catalog-item__link').each(function(i){
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });
    // $('.catalog-item__back').each(function(i){
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });
    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn('slow');

    });
        $('.modal__close').on('click', function(){
            $('.overlay, #consultation, #thank, #order').fadeOut('slow');
        });

    $('.button_catalog').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    }); 

        function valideForms(form){
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                      },
                    phone: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: {
                        required: "Пожалуйста, введите Ваше имя",
                        minlength: jQuery.validator.format("Введите минмум {0} символа!")
                      },
                    phone: "Пожалуйста, введите Ваш телефон",
                    email: {
                      required: "Пожалуйста, введите Ваш E-mail",
                      email: "Ваш E-mail должен быть в формате name@domain.com"
                    }
                  }
            });

        };

        valideForms('#consultation-form');
        valideForms('#consultation form');
        valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-9999");
    $(window).scroll(function(){
        if ($(this).scrollTop()>1000){
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thank').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
    

  });
