module.exports = function() {
  'use strict';
  var animation = animation || {};
  return animation = {
    init: function() {
      window.controller = new ScrollMagic.Controller();

      //------------------------------//

      var animation1 = new TimelineMax()
          .add([
          TweenMax.from(".header .navbar", 1.2, {
              autoAlpha: 0, y:20, ease:Power0.ease, force3D:true
              }),
          TweenMax.from(".spotlight .l-title", 1, {
            autoAlpha: 0, delay:.5, ease:Power0.ease, force3D:true
            }),
          TweenMax.staggerFrom( '.spotlight .l-title > span', 1.3, { autoAlpha: 0, y: 40, delay:1.1}, .1, 0 ),
          TweenMax.from(".spotlight .l-more", 1.2, {
              autoAlpha: 0, scale: .7, y: 30, delay:1.4, ease:Power0.ease,force3D:true
              })
          
      ]);
      var scene1 = new ScrollMagic.Scene({
        triggerElement: ".spotlight",
        triggerHook: "onEnter",
        reverse: false
      })
      .setTween(animation1)
      .addTo(controller);


      //------------------------------//

      var animation2 = new TimelineMax()
        .add([
        TweenMax.from(".why-us .l-title", 1.5, {
            autoAlpha: 0, x:60, ease:Power0.ease,force3D:true
            }),
        TweenMax.from(".why-us .l-next__text", .6, {
            autoAlpha: 0, scale:.7,delay:1.3,ease:Power0.ease,force3D:true
            }),
        TweenMax.from(".why-us .l-next__line", 1, {
            autoAlpha: 0, height: 0, delay:1.8,ease:Power0.easeIn,force3D:true
            }),
        TweenMax.from(".why-us__block", 1.2, {
            autoAlpha: 0, y:100, delay:2, ease:Power0.easeIn,force3D:true
            }),
        TweenMax.from(".why-us__info", .9, {
          autoAlpha: 0, scale:.7, delay:2.5, ease:Power0.easeIn,force3D:true
          })
      ]);
      var scene2 = new ScrollMagic.Scene({
        triggerElement: ".blz.why-us",
        triggerHook: 1,
        duration: '100%'
      })
      .setTween(animation2)
      .addTo(controller);


      //------------------------------//

      var animation3 = new TimelineMax()
        .add([
        TweenMax.from(".products .l-title", 1.5, {
            autoAlpha: 0, x:60, ease:Power0.ease,force3D:true
            }),
        TweenMax.from(".products .l-next__text", .6, {
            autoAlpha: 0, scale:.7,delay:1.6,ease:Power0.ease,force3D:true
            }),
        TweenMax.from(".products .l-next__line", 1, {
            autoAlpha: 0, height: 0, delay:1.8,ease:Power0.easeIn,force3D:true
            }),
        TweenMax.from(".products__block", 1.2, {
            autoAlpha: 0, y:-80, delay:2, ease:Power0.easeIn,force3D:true
            }),
        TweenMax.from(".products__img", .8, {
          autoAlpha: 0, scale:.8, delay:2.5, ease:Power0.easeIn,force3D:true
          }),
        TweenMax.from(".products__link", .9, {
          autoAlpha: 0, y:100, delay:2.8, ease:Power0.easeIn,force3D:true
          }),
        TweenMax.from(".products__link .l-more", .9, {
          autoAlpha: 0, scale:.8, delay:3.5, ease:Power0.easeIn,force3D:true
          })
      ]);
      var scene3 = new ScrollMagic.Scene({
        triggerElement: ".blz.products",
        triggerHook: 1,
        duration: '130%'
      })
      .setTween(animation3)
      .addTo(controller);

      //------------------------------//

      var animation4 = new TimelineMax()
        .add([
        TweenMax.from(".brands .l-title", 1.5, {
            autoAlpha: 0, x:-60, ease:Power0.ease,force3D:true
            }),
        TweenMax.from(".brand__logos", .6, {
            autoAlpha: 0, y: -50, delay:1.3,ease:Power0.ease,force3D:true
            }),
        TweenMax.staggerFrom( '.brand__logos .brand__item', 1.3, { autoAlpha: 0, scale: .6, delay:2}, .1, 0 ),
      ]);
      var scene4 = new ScrollMagic.Scene({
        triggerElement: ".blz.brands",
        triggerHook: 1,
        duration: '100%'
      })
      .setTween(animation4)
      .addTo(controller);

      //------------------------------//

      var animation5 = new TimelineMax()
        .add([
        TweenMax.from(".team .l-title", 1.5, {
            autoAlpha: 0, x:-50, ease:Power0.ease,force3D:true
          }),
        TweenMax.from(".team .l-next__text", .6, {
            autoAlpha: 0, scale:.7,delay:1.5,ease:Power0.ease,force3D:true
          }),
        TweenMax.from(".team .l-next__line", 1.2, {
            autoAlpha: 0, height: 0, delay:1.8,ease:Power0.easeIn,force3D:true
          }),
        TweenMax.from(".team_highlight", 1.2, {
            autoAlpha: 0, y:-100, delay:2, ease:Power0.easeIn,force3D:true
          }),
        TweenMax.staggerFrom( '.team_list > ul > li', 1.3, { autoAlpha: 0, scale: .8, delay:2.8}, .1, 0 )
      ]);
      var scene5 = new ScrollMagic.Scene({
        triggerElement: ".blz.team",
        triggerHook: 1,
        duration: '90%'
      })
      .setTween(animation5)
      .addTo(controller);

       //------------------------------//

       var animation6 = new TimelineMax()
       .add([
        TweenMax.from(".find-us .l-title", 1.5, {
          autoAlpha: 0, x:-50, ease:Power0.ease,force3D:true
        }),
        TweenMax.from(".find-us__block", 1.2, {
          autoAlpha: 0, y:100, delay:1, ease:Power0.easeIn,force3D:true
        }),
        TweenMax.from(".find-us__pin", 1, {autoAlpha: 0, scale:.7, y:20,ease:Power0.easeIn, delay:2})
      ]);
     var scene6 = new ScrollMagic.Scene({
       triggerElement: ".blz.find-us",
       triggerHook: 1,
       duration: '110%'
     })
     .setTween(animation6)
     .addTo(controller);


     //------------------------------//

     var animation7 = new TimelineMax()
      .add([
        TweenMax.from(".footer__block", 1, {
          autoAlpha: 0, y:-50, ease:Power0.ease,force3D:true
        }),
        TweenMax.from(".footer__nav", 1, {
          autoAlpha: 0, y:-50, ease:Power0.ease,force3D:true
        })
      ]);
      var scene7 = new ScrollMagic.Scene({
        triggerElement: ".blz.footer",
        triggerHook: 1
      })
      .setTween(animation7)
      .addTo(controller);

    }
  }
}

