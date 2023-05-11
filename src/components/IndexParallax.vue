<template>
  <div class="parallax-header" style="height: 100vh">
    <div class="parallax">
      <div class="layer parallax-layer" data-speed="-0.7" style="background: url(&quot;https://andyhardy.co/assets/img/landscape_background_small.jpg&quot;) center center / cover; transform: translate3d(0px, 0px, 0px);"></div>
      <div class="layer parallax-layer fade-in appear" data-speed="-0.5" style="background: url(&quot;https://andyhardy.co/assets/img/landscape_andy.png&quot;) center center / cover; transform: translate3d(0px, 0px, 0px);">      </div>
      <div class="layer parallax-layer" data-speed="-0.2" style="background: url(&quot;https://andyhardy.co/assets/img/landscape_mountain_small.png&quot;) center center / cover; transform: translate3d(0px, 0px, 0px);"></div>
    </div>
    <div class="bottom-fade"></div>
    <div class="location">
      <svg width="22" height="22"><g transform="translate(1 1)" stroke="#000" stroke-width="1.5" fill="none" fill-rule="evenodd"><path d="M14.2 5.8l-2.1 6.3-6.3 2.1 2.1-6.3z"></path><circle cx="10" cy="10" r="10"></circle></g></svg>
      <EditableText element="span" string-key="index_parallax_left_text" model-value="37.8136° S, 144.9631° E"/>
    </div>
    <div class="right-bottom-text">
      <EditableText element="span" string-key="index_parallax_right_text" model-value="Creating films in Melbourne / Byron Bay"/>
    </div>
  </div>
</template>

<script setup>
import 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js';
import EditableText from "@/components/EditableText.vue";

$(window).scroll(function() {
  let scrollTop = $(window).scrollTop();
  $('.parallax-layer').each(function() {
    let layer = $(this);
    let dataSpeed = layer.data('speed');
    let offsetY = -(scrollTop * dataSpeed);
    let translate = 'translate3d(0, ' + offsetY + 'px, 0)';
    layer.css('-webkit-transform', translate);
    layer.css('-moz-transform', translate);
    layer.css('-ms-transform', translate);
    layer.css('-o-transform', translate);
    layer.css('transform', translate);
  })
});
</script>