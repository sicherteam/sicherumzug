---
layout: default
title: "Bewertungen & Erfahrungsberichte"
seo_title: "Sicher Team Bewertungen - Erfahrungen aus Wien & NÖ"
description: "Mehr als nur Sterne: Lesen Sie echte Erfahrungsberichte aus Wohnungsauflösungen, Firmenräumungen und Spezialfällen in Wien & Niederösterreich."
permalink: /bewertungen/
hero_preload: /topbg.webp
---
{% include breadcrumbs.html %}
{% assign testimonials = site.data.testimonials %}
{% assign review_count = testimonials | size %}
{% assign average_rating = 0 %}
{% if review_count > 0 %}
  {% assign rating_sum = 0 %}
  {% for testimonial in testimonials %}
    {% assign rating_sum = rating_sum | plus: testimonial.rating %}
  {% endfor %}
  {% assign average_rating = rating_sum | divided_by: review_count %}
{% endif %}
{% assign average_rating_display = average_rating | round: 1 %}

<section class="relative overflow-hidden bg-primary text-white">
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-3xl space-y-5">
      <p class="text-l font-semibold uppercase tracking-[0.4em] text-primary-accent">Bewertungen</p>
      <h1 class="text-4xl font-black leading-tight md:text-5xl">Das sagen Kund:innen über Sicher Team</h1>
      <p class="text-lg text-white/90">Transparente Erfahrungsberichte mit dokumentierten Fixpreisen, Wertanrechnung und besenreinen Übergaben in ganz Wien &amp; NÖ.</p>
      <div class="grid gap-4 rounded-2xl bg-white/10 p-6 text-sm font-semibold uppercase tracking-[0.2em] text-white md:grid-cols-2">
        <div>
          <p class="text-4xl font-black tracking-normal">{{ average_rating_display | replace: '.', ',' }}</p>
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-white/80">Durchschnitt</p>
        </div>
        <div>
          <p class="text-4xl font-black tracking-normal">{{ average_rating_display | replace: '.', ',' }} ★</p>
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-white/80">Google &amp; ProvenExpert</p>
        </div>
      </div>
      <div class="flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 sm:flex-row sm:items-center">
        <div class="inline-flex items-center gap-2">
          <span class="material-symbols-outlined text-base">verified</span>
          Fixpreis &amp; Wertanrechnung bestätigt
        </div>
        <div class="inline-flex items-center gap-2">
          <span class="material-symbols-outlined text-base">shield_with_heart</span>
          Voll versichert &amp; dokumentiert
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-white py-10">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center justify-center gap-4 text-l font-semibold uppercase tracking-[0.3em] text-primary">
      {% for badge in site.data.trust_bar %}
      <span class="rounded-full border border-primary/20 px-4 py-2 text-center">{{ badge.label }}</span>
      {% endfor %}
    </div>
  </div>
</section>

<section class="bg-background-light py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl">
      <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Bewertungen</p>
      <h2 class="mt-3 text-3xl font-extrabold text-primary">Authentische Erfahrungsberichte aus Wohnungs-, Haus- &amp; Firmenräumungen</h2>
      <p class="mt-4 text-base text-text-light">Jede Geschichte steht für eine erledigte Räumung mit fixiertem Zeitplan, dokumentierter Übergabe und sauberer Abrechnung. Filtern Sie direkt nach Ihrer Situation oder scrollen Sie durch alle Stimmen.</p>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      {% for testimonial in testimonials %}
      {% assign individual_rating = testimonial.rating | default: 5 %}
      <article class="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1 text-primary" role="img" aria-label="{{ individual_rating | replace: '.', ',' }} von 5 Sternen">
            {% for i in (1..5) %}
              {% if i <= individual_rating %}
              <span class="text-xl leading-none">★</span>
              {% else %}
              <span class="text-xl leading-none text-gray-200">★</span>
              {% endif %}
            {% endfor %}
          </div>
          <span class="text-sm font-semibold text-text-light">{{ individual_rating | replace: '.', ',' }}/5</span>
        </div>
        <p class="mt-4 flex-1 text-base text-text-light">“{{ testimonial.quote }}”</p>
        <div class="mt-5">
          <p class="text-base font-bold text-primary">{{ testimonial.name }}</p>
          <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="grid gap-12 lg:grid-cols-2">
      <div class="space-y-5">
        <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Warum das Feedback zählt</p>
        <h3 class="text-3xl font-extrabold text-primary">Jede Bewertung fließt in bessere Abläufe und transparente Angebote ein</h3>
        <p class="text-base text-text-light">Ob Dachbodenräumung, Büroauflösung oder Messie-Spezialfall – wir analysieren jedes Kundenfeedback und verbessern daraus Logistik, Wertanrechnung und Dokumentation. So stellen wir sicher, dass der nächste Einsatz noch reibungsloser abläuft.</p>
        <ul class="space-y-3 text-base text-text-light">
          <li class="flex items-start gap-3"><span class="material-symbols-outlined text-gray-800">check_circle</span><span>Verifizierte Teams vor Ort dokumentieren den Zustand vor &amp; nach der Räumung.</span></li>
          <li class="flex items-start gap-3"><span class="material-symbols-outlined text-gray-800">check_circle</span><span>Wertanrechnung und Entsorgung werden schriftlich bestätigt, kein Nachverhandeln.</span></li>
          <li class="flex items-start gap-3"><span class="material-symbols-outlined text-gray-800">check_circle</span><span>Terminfenster und Schlüsselübergaben werden protokolliert – ideal für Hausverwaltungen.</span></li>
        </ul>
      </div>
      <div class="rounded-3xl bg-background-light p-8 shadow-xl">
        <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Gratis Angebot</p>
        <h3 class="mt-3 text-2xl font-extrabold text-primary">Ersteinschätzung &amp; Fixpreis erhalten</h3>
        <p class="mt-2 text-sm text-text-light">Laden Sie Fotos hoch oder schildern Sie kurz den Umfang. Wir melden uns innerhalb eines Werktags.</p>
        <div class="mt-6">
          {% include quote-form.html %}
        </div>
      </div>
    </div>
  </div>
</section>

{% if review_count > 0 %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "{{ site.url }}{{ site.baseurl }}/#business",
  "name": "{{ site.brand_name }}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ average_rating | round: 1 }}",
    "reviewCount": "{{ review_count }}"
  }
}
</script>
{% endif %}
