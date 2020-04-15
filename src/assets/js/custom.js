$(document).on('ready', function () {
  // scroll_Jquery
  $(window).on("load", function () {
    if ($('.scroll_more').length) {
      $(".scroll_more").mCustomScrollbar({
        setWidth: false,
        setHeight: false,
        setTop: 0,
        setLeft: 0,
        axis: "y",
        scrollbarPosition: "inside",
        scrollInertia: 950,
        autoDraggerLength: true,
        autoHideScrollbar: false,
        autoExpandScrollbar: false,
        alwaysShowScrollbar: 0,
        snapAmount: null,
        snapOffset: 0
      });
    }
  });
  $(document).on('click', '.menu', function () {
    $('.navigation').slideToggle();
  });

  //progressbar
  if ($(document).find("#progressbar").length) {
    var dataValue = $(document).find("#progressbar").data("value");
    $(document).find("#progressbar").progressbar({
      value: dataValue
    });
  }

  // Tab event
  $(document).on('click', '.left_link a', function () {
    var tb_show = $(this).data('tab');
    $(this).parents('.landscape_tab').find('.left_link a').removeClass('active');
    $(this).addClass('active');
    $(this).parents('.landscape_tab').find('[class^="tab_tb"]').css('display', 'none');
    $(this).parents('.landscape_tab').find('.' + tb_show).css('display', 'block');


  });

	/*----------------------------------------------
		 -----------List Page plus minus function --------------------
		 -------------------------------------------------*/
  $(document).on('click', '.plus', function () {
    $(this).parent('.product-regulator').find('.output').html(function (i, val) {
      return val * 1 + 1
    });
  });
  $(document).on('click', '.minus', function () {
    var ab = $(this).parent('.product-regulator').find('.output').html();
    if (1 <= ab) {
      $(this).parent('.product-regulator').find('.output').html(function (i, val) {
        return val * 1 - 1
      });
    }
  });
  // Types Of Certificates Event
  $(document).on('click', '.certificate_click_js', function () {
    $(this).toggleClass('active');
    //	setTimeout(function(){
    if (!$(this).hasClass('active')) {
      $(document).find('.mt-space').css('display', 'none');
      $(document).find('.rightbar_block').css('display', 'block');

    }
    else {
      var tab = $(this).data('tab');
      $('.mt-space,.rightbar_block').hide();
      $('.' + tab).css('display', 'block');

    }
    //	},5000)
    $(this).next().slideToggle();
    $(this).parent().siblings('.haitability_step').find('.show_residenial').slideUp();
    $(this).parent().siblings('.haitability_step').find('.certificate_click ').removeClass('active');

    // right_bar Event


  })

  ///jQuery time
  var current_fs, next_fs, previous_fs;

  $(".next_btn_js").on('click', function () {
    current_fs = $(this).parents('.disable_allbox');
    next_fs = $(this).parents('.disable_allbox ').next();
    next_fs.addClass('active_block ');
    current_fs.removeClass('active_block');

    // progressbar
    var dataValue = $("#progressbar").data("value");
    var data_plus = dataValue + 12.5;
    var dataValue = $("#progressbar").data("value", data_plus);
    $("#progressbar").progressbar({
      value: data_plus
    });
  });

  $(".back_btn").on('click', function () {
    current_fs = $(this).parents('.disable_allbox');
    previous_fs = $(this).parents('.disable_allbox ').prev();
    previous_fs.addClass('active_block ');
    current_fs.removeClass('active_block');

    // progressbar
    var dataValue = $("#progressbar").data("value");
    var data_plus = dataValue - 12.5;
    var dataValue = $("#progressbar").data("value", data_plus);
    $("#progressbar").progressbar({
      value: data_plus
    });
  });

  $(".info-icon").on('click', function () {
    $('.tooltiptext').toggleClass('active');
  });

  // pop-up
  $('.step7').each(function () {
    $(this).find('.pop-click').click(function () {
      $('.pop-up').css('display', 'block');
      $('.pop-up-bg').css('display', 'block');


    })
  })

  $('.step7').each(function () {
    $(this).find('.btn').click(function () {
      $('.pop-up').css('display', 'none');
      $('.pop-up-bg').css('display', 'none');
    })
  })

  $('.step7').each(function () {
    $(this).find('.pop-up-bg').click(function () {
      $('.pop-up').css('display', 'none');
      $('.pop-up-bg').css('display', 'none');
    })
  })




});



$(document).ready(function () {

  $(document).on('ready', function () {
    $('.process-page').hide();
    $('#what').show();
    $('.tabber-list li').click(function () {
      $('.tabber-list li').removeClass('active')
      var z = $(this).attr('data-id');
      $('.process-page').hide();
      $('#' + z).show();
      $(this).addClass('active')

    })


    // property page css and table list start



    $(".top-header").each(function () {
      $(this).find(".side-menu-icon").click(function () {
        $(".property.side-nav").toggleClass("side-slide");
        $(".top-search").toggleClass("main-slide");
      })
    })


    //   menu css
    $(".procees-logo").find(".menu").click(function () {
      $(".tabber-list").slideToggle()
    })


    // inspection j query
    $(".inspection-taber").hide();
    $("#inspection").show();
    $(".inspection-inner").find("a").click(function () {
      $("a").removeClass("ins-active");
      $(".inspection-taber").hide();
      var z = $(this).attr("data-id");
      $("#" + z).show();
      $(this).addClass("ins-active")
      return false;

    })


    // certificate toggel j query

    $(".certificate-toggel").click(function () {
      $(this).siblings(".toggel-this").slideToggle()
      $(this).toggleClass("move-it")
    })
  })

});



// property page css and table list end


//   page e property



