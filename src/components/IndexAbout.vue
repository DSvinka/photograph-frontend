<template>
  <section class="about">
    <div class="background-image" style="background: url('https://andyhardy.co/media/pages/home/d9587b1b9c-1631837366/andy-about-bg-2160x1200.jpg') center center; background-size: cover;"></div>
    <div class="bottom-fade"></div>
    <div class="wrap-text">
      <EditableText element="p" class="p-text" string-key="index_about_text_1" model-value="<strong>Awkward introduction? Clammy handshake? Nah, let’s go in for a virtual bear hug and a quick two-minute spiel about who I am, because who I am is your new hyper-talented mate – a creative director and visual connoisseur with a background and degree in commercial and photojournalistic photography.</strong>'"/>
      <EditableText element="p" class="p-text" string-key="index_about_text_2" model-value="As a multidisciplinary visual creator, I have a keen focus on film and an insatiable obsession with storytelling. I started out shooting weddings, where I learned the mystic and lesser-studied art of making people feel comfortable in front of a camera; from there I branched out into commercial work before founding my own production company, (derived from the origin of the word ‘FEELING’...you feel?)."/>
      <EditableText element="p" class="p-text" string-key="index_about_text_3" model-value="Collaboration is the lifeblood of the moving image and a large part of why I adore what I do. Our team learned so much through creating content for top-tier clients that we felt downright professorial and accepted our humble duty to share the fēlan genius with the masses. Corduroy jackets and mismatched elbow patches donned, we created Moments in a Minute – a complete guide to creating meaningful, impactful content that grabs people by the eyeballs for sixty seconds and refuses to let go."/>
      <EditableText element="p" class="p-text" string-key="index_about_text_4" model-value="I love creating films in Melbourne, Sydney, all over Australia and the rest of the world. However, I also teach, work on live stream events, capture commercial and wedding photography and anything else with a heart that beats to the rhythm of filmmaking. And for the next few months I’m a Byron Bay commercial director, focused on creating awesome content for a dazzling array of clients."/>
      <EditableText element="p" class="p-text" string-key="index_about_text_5" model-value="So that’s Andy in a nutshell. If you want to learn more about me (especially how I ended up inside a gigantic nut), take a peek around the rest of my site."/>
    </div>
  </section>
</template>

<script>

import {defineComponent} from "vue";
import EditableText from "@/components/EditableText.vue";

export default defineComponent({
  components: {EditableText}
})
</script>