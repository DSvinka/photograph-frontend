<template>
  <section class="portfolio fade-in appear">
    <div class="wrap">
      <a href="/portfolio" class="single-image portrait animatelink" style="background: url('https://andyhardy.co/media/pages/home/c863ad0fa3-1631837366/derby-mountain-biking-tasmania-mtb-500x620.jpg') center center; background-size: cover;">
        <div class="overlay"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,12a11.6,11.6,0,0,1-10,6A11.6,11.6,0,0,1,2,12,11.6,11.6,0,0,1,12,6,11.6,11.6,0,0,1,22,12Z" fill="none" stroke="#fff" stroke-width="1.5"></path><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.5"></circle></svg>
      </a>
      <a href="/portfolio" class="single-image landscape animatelink" style="background: url('https://andyhardy.co/media/pages/home/d2e9535027-1631837366/aerial-macedon-drone-620x420.jpg') center center; background-size: cover;">
        <div class="overlay"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,12a11.6,11.6,0,0,1-10,6A11.6,11.6,0,0,1,2,12,11.6,11.6,0,0,1,12,6,11.6,11.6,0,0,1,22,12Z" fill="none" stroke="#fff" stroke-width="1.5"></path><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.5"></circle></svg>
      </a>
      <a href="/portfolio" class="single-image landscape animatelink" style="background: url('https://andyhardy.co/media/pages/home/c869ba7372-1631837366/canada-banff-exploring-mountain-620x420.jpg') center center; background-size: cover;">
        <div class="overlay"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,12a11.6,11.6,0,0,1-10,6A11.6,11.6,0,0,1,2,12,11.6,11.6,0,0,1,12,6,11.6,11.6,0,0,1,22,12Z" fill="none" stroke="#fff" stroke-width="1.5"></path><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.5"></circle></svg>
      </a>
      <a href="/portfolio" class="single-image portrait animatelink" style="background: url('https://andyhardy.co/media/pages/home/6976e8603b-1631837366/sarah-west-coast-usa-500x620.jpg') center center; background-size: cover;">
        <div class="overlay"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,12a11.6,11.6,0,0,1-10,6A11.6,11.6,0,0,1,2,12,11.6,11.6,0,0,1,12,6,11.6,11.6,0,0,1,22,12Z" fill="none" stroke="#fff" stroke-width="1.5"></path><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.5"></circle></svg>
      </a>
    </div>
    <div class="wrap-text">
      <EditableText element="button" class="bottom-link animatelink" @clicked="$router.push('portfolio')" string-key="index_portfolio_button" model-value="Посмотреть портфолио"/>
      <svg width="16" height="16"><g stroke="#FFF" fill="none" fill-rule="evenodd"><path d="M9.414 2.343L15.071 8l-5.657 5.657M15.071 8H.93"></path></g></svg>
    </div>
  </section>
</template>

<script>
import EditableText from "@/components/EditableText.vue";

export default {
  name: "IndexPortfolio",
  components: {EditableText}
}
</script>