$(document).ready(function(){


  /* 웹사이트 보기 */
  let dataName = 'ace'
    $('#web_site .web_menu li').click(function(){
      let dataImg = $(this).attr('data-img');
      let dataSite = $(this).attr('data-site');
      dataName = $(this).attr('data-name');

      $('.show_box img').attr('src', dataImg);
      $('.btn_box .moveSite').attr('href', dataSite);
      $('.btn_box .working').attr('data-target', dataName);
      $('#web_site .notice .'+dataName).show().siblings().hide();

      $(this).addClass('on').siblings().removeClass('on');

      showBoxResetAnimation();

      noticeResetAnimation();

      return false;
     
    })

    /* web 애니메이션 재시작 */
    function showBoxResetAnimation() {
      const target =  $('.show_box')
      target.removeClass("on"),
      void target.outerWidth(),
      target.addClass("on");
      }

    /* notice 애니메이션 재시작 */
    function noticeResetAnimation() {
      const target =  $('.notice')
      target.removeClass("on"),
      void target.outerWidth(),
      target.addClass("on");
      }

    /* 작업과정 보기 */
    $('.btn_box .working').click(function(){
      $('.webs').fadeIn();
      $('.webs .'+dataName).show(400).siblings().hide();
      return false;
    })

    $('.webs').click(function(){
      $(this).fadeOut();
    })


    /* 팝업 원본 보기 */
    $('.popup_box li p').click(function(){
      let dataOrigin = $(this).attr('data-origin');
      $('.popups').fadeIn();
      $('.popups .'+dataOrigin).show(400).siblings().hide();
      return false;
    })
    $('.popups').click(function(){
      $(this).fadeOut();
    })


    /* 배너 원본 보기 */
    $('.banner_box li p').click(function(){
      let dataOrigin = $(this).attr('data-origin')
      $('.banners').fadeIn();
      $('.banners .'+dataOrigin).show(400).siblings().hide();
      return false;
    })
    $('.banners').click(function(){
      $(this).fadeOut();
    })



    /* 스크롤 시 효과들 */
    var scrT = $(window).scrollTop();
    var winH = $(window).height();
    
    function scrollAction(){
        if(scrT >= winH*2){
          chart()
          $('.chart p').fadeIn(500);
        }
        if(scrT < winH*1){
          $('.snb').hide()
          $('#introduce h1 .intro img').removeClass('on');
          $('#introduce .content_box1 .txt_1 p').removeClass('on');
          $('#introduce .content_box1 .txt_2 p').removeClass('on');
        } else {
          $('.snb').fadeIn()
          $('#introduce h1 .intro img').addClass('on');
          $('#introduce .content_box1 .txt_1 p').addClass('on');
          $('#introduce .content_box1 .txt_2 p').addClass('on');
        }
    }

    /* snb 색상 바꾸기 */
    function scrollSnbBlue(){
      let dataBlue = $('.snb li').attr('data-blue');
      let dataWhite = $('.snb li').attr('data-white');

      if(scrT >= winH*5 && scrT <= winH*6){
        $('.snb li .dot').css({'background': '#156da7'});
        $('.snb li a img').attr(src, dataBlue);
      } else {
        $('.snb li .dot').css({'background': '#fff'});
        $('.snb li a img').attr(src, dataWhite);
      }
    }




    scrollAction()

        
    let jiwoo = true;
    let changImg;
    $(window).scroll(function(){
        scrT = $(this).scrollTop();
        winH = $(this).height();

        scrollAction() 


        
        /* work 소제목 효과 */
        setTimeout(function(){
          if(scrT >= winH*3  && scrT <= winH*3.5){
            $('#web_site h2').addClass('on');
          } else {
            $('#web_site h2').removeClass('on');
          }

          if(scrT >= winH*4 && scrT <= winH*4.5){
            $('#popup h2').addClass('on');
          } else {
            $('#popup h2').removeClass('on');
          }

          if(scrT >= winH*5 && scrT <= winH*6){
            $('#banner h2').addClass('on');
          } else {
            $('#banner h2').removeClass('on');
          }
        }, 250);
        


        let sectionIndex
        /* 스크롤시 snb 반응 */
        $('.section').each(function(){
            let sectionTop = $(this).offset().top;
            let winH = $(window).outerHeight(true);
            sectionIndex

            if(scrT >= sectionTop && scrT < sectionTop + winH){
                sectionIndex = $(this).index();
                console.log(sectionIndex);

                $('.snb > li').find('.dot').css({opacity:1}).siblings().css({opacity:0})
                $('.snb > li').eq(sectionIndex).find('.dot').css({opacity:0}).siblings().css({opacity:1});
                

            }

            // if(scrT >= $('#banner').offset().top && scrT < $('#banner').offset().top+winH){
            //   $('.snb img').attr('src').replace('.png','_b.png');
            // }
           
        })


        

        if(sectionIndex == 5){
          if(jiwoo == true){
            jiwoo = false
            
              $('.snb li img').each(function(){
                  $(this).attr('src',$(this).attr('src').replace('.png','_b.png'));
                  console.log('dd',sectionIndex)
              })
            
          }
        } 
        else {
          jiwoo = true
          
            $('.snb li img').each(function(){
                $(this).attr('src',$(this).attr('src').replace('_b.png','.png'));
                console.log('dd',sectionIndex);            
            })
          
        }

    })

    

  
    /* snb */
    $('.snb > li').click(function(){
       let snbIndex = $(this).index();//snb index
       let sectionTop = $('.section').eq(snbIndex).offset().top;//y축 위치
       console.log('dd',sectionTop)
       
       if(scrT == 0){
        $('.snb').hide()
       }

       $('html').animate({scrollTop:sectionTop+'px'});
       return false;
    })
    
 

    /* 차트 */
    function chart(){
      $('.chart').easyPieChart({
        barColor: '#fff',
        trackColor: 'transparent',
        scaleColor: false,
        lineCap: 'round',
        lineWidth: 30,
        size: 200,
        animate: 1300,
        onStart: $.noop,
        onStop: $.noop
      });
    }


    $('.icando_box li').mouseover(function(){
      let dataEx = $(this).attr('data-ex');

      $('.explain ul li.'+dataEx).stop().fadeIn(300).siblings().hide()

    })
    $('.icando_box li').mouseleave(function(){
      $('.explain ul li').fadeOut(300)
    })




    /* 스크롤 자동 넘기기 */
    window.onload = function(){
        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;
        elm.forEach(function(item, index){
          item.addEventListener('mousewheel', function(event){
            event.preventDefault();
            let delta = 0;
  
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
  
            let moveTop = window.scrollY;
            let elmSelector = elm[index];
  
            // wheel down : move to next section
            if (delta < 0){
              if (elmSelector !== elmCount-1){
                try{
                  moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                }catch(e){}
              }
            }
            // wheel up : move to previous section
            else{
              if (elmSelector !== 0){
                try{
                  moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                }catch(e){}
              }
            }
  
            const body = document.querySelector('html');
            window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
          });
        });
      }

    
    
})