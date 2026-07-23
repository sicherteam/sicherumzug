---
layout: default
title: "Entrümpelung in Wien & Österreich"
seo_title: "Entrümpelung Standorte Wien & Österreich | Sicher Team"
description: "Alle Standortseiten von Sicher Team – Schwerpunkt Wien, dazu Hubs in Niederösterreich, Burgenland, Steiermark, Kärnten, Oberösterreich und Salzburg."
permalink: /bezirke/
kicker: "Standorte"
---
{% include breadcrumbs.html %}
<section class="bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl">
      <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">{{ page.kicker }}</p>
      <h1 class="mt-3 text-4xl font-black text-primary">Wien bleibt Kerngebiet – Österreichweit planbar</h1>
      <p class="mt-4 text-lg text-text-light">
        Über 80&nbsp;% unserer Einsätze finden in Wien statt – deshalb bleiben dort Teams, Lager und Halteverbotsmaterialien stationiert. Für Kund:innen mit
        Objekten in Niederösterreich, Burgenland, Steiermark, Kärnten, Oberösterreich oder Salzburg fahren dieselben Profis hinaus, damit Sie keine neuen
        Dienstleister suchen müssen. Wählen Sie Ihr Bundesland, entdecken Sie die jeweiligen Bezirksseiten und fordern Sie ein maßgeschneidertes Angebot an.
      </p>
      <p class="mt-3 text-base text-text-light">
        Wenn Sie direkt eine <a href="{{ '/leistungen/raeumung/' | relative_url }}" class="font-semibold text-primary hover:underline">Entrümpelung Wien zum Fixpreis</a> buchen möchten, führt unsere Leistungsseite sofort zu Preisen, Ablauf und Kontakt.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href="{{ '/angebot/' | relative_url }}" class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-light">
          Kostenloses Angebot anfordern
        </a>
        <a href="tel:{{ site.phone | replace: ' ', '' }}" class="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-base font-semibold text-primary hover:bg-primary/5">
          <span class="material-symbols-outlined mr-2 text-base">call</span>
          {{ site.phone }}
        </a>
      </div>
    </div>
  </div>
</section>
<section class="bg-background-light py-16">
  <div class="container mx-auto px-4">
    <div class="flex flex-col gap-3 text-center">
      <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Bundesland wählen</p>
      <h2 class="text-3xl font-extrabold text-primary">Standort auswählen & Details öffnen</h2>
      <p class="text-base text-text-light">Zuerst Wien, dann Niederösterreich, Burgenland, Steiermark, Kärnten, Oberösterreich und Salzburg – innerhalb jedes Bundeslands finden Sie unsere Bezirks- und Regionsseiten.</p>
    </div>
    <div class="mt-10 rounded-3xl bg-white p-6 shadow-lg">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary-accent">Meistgesuchte Bezirke</p>
      <p class="mt-2 text-base text-text-light">Diese Seiten decken Suchanfragen wie „Entrümpelung 1180 Wien“ oder „Wohnungsräumung 1210“ ab – direkt verlinkt, damit Sie ohne Umwege zum passenden Angebot kommen.</p>
      <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {% assign hot_districts = "
          haushaltsaufloesung-1170-wien:Entrümpelung 1170 Wien,
          haushaltsaufloesung-1180-wien:Entrümpelung 1180 Wien,
          haushaltsaufloesung-1190-wien:Döbling & Grinzing,
          haushaltsaufloesung-1210-wien:Floridsdorf & Donauraum,
          haushaltsaufloesung-1220-wien:Donaustadt & Seestadt,
          haushaltsaufloesung-klosterneuburg:Klosterneuburg & Ölberg
        " | split: "," %}
        {% for entry in hot_districts %}
        {% assign parts = entry | split: ":" %}
        {% assign slug = parts[0] | strip %}
        {% assign label = parts[1] | default: slug %}
        <a href="{{ '/leistungen/' | append: slug | append: '/' | relative_url }}" class="flex items-center justify-between rounded-2xl border border-gray-200 bg-background-light px-4 py-3 text-left text-primary transition hover:border-primary hover:bg-white">
          <span class="text-base font-semibold">{{ label | strip }}</span>
          <span class="material-symbols-outlined text-primary">north_east</span>
        </a>
        {% endfor %}
      </div>
    </div>
    {% assign states = site.states | default: site.collections.states.docs %}
    {% if states == nil %}
    {% assign states = '' | split: '' %}
    {% endif %}
    {% assign states = states | sort: 'order' %}
    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      {% for state in states %}
      {% assign locations = site.districts | where: 'state', state.slug | sort: 'title' %}
      <article class="flex h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary">{{ state.kicker | default: 'Bundesland' }}</p>
          <h3 class="mt-2 text-xl font-bold text-primary">Entrümpelung in {{ state.title }}</h3>
          <p class="mt-2 text-sm text-text-light">{{ state.description }}</p>
          <ul class="mt-4 space-y-1 text-sm text-primary max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            {% for location in locations %}
            <li>
              <a href="{{ location.url | relative_url }}" class="inline-flex items-center gap-1 hover:underline">
                <span>{{ location.footer_title | default: location.title }}</span>
                <span class="material-symbols-outlined text-base">north_east</span>
              </a>
            </li>
            {% endfor %}
          </ul>
        </div>
        <a href="{{ state.url | relative_url }}" class="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          Bundesland-Seite öffnen
        </a>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
<section class="bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="space-y-4">
        <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Serviceversprechen</p>
        <h2 class="text-3xl font-extrabold text-primary">Fixpreis + Wertanrechnung für jeden Bezirk</h2>
        <p class="text-base text-text-light">
          Egal ob Dachgeschoss am Spittelberg, Atelier in der Neubaugasse oder Villa in Grinzing – wir kombinieren lokale Logistik mit transparenten Preisen,
          kümmern uns um Halteverbotszonen und rechnen verwertbare Gegenstände an.
        </p>
        <ul class="space-y-2 text-sm text-text-light">
          <li>✔️ Gratis Erstbesichtigung & schriftliches Angebot vor Ort</li>
          <li>✔️ Behördenwege & Halteverbotszonen inklusive</li>
          <li>✔️ Wertanrechnung für Antiquitäten, Technik oder Sammlungen</li>
          <li>✔️ besenreine Hinterlassung mit Protokoll für Hausverwaltungen</li>
        </ul>
      </div>
      <div class="rounded-3xl bg-background-light p-8 shadow-xl">
        <p class="text-l font-semibold uppercase tracking-[0.3em] text-primary-accent">Schnelle Anfrage</p>
        <h3 class="mt-3 text-2xl font-extrabold text-primary">Noch nicht sicher, welcher Bezirk passt?</h3>
        <p class="mt-2 text-sm text-text-light">
          Beschreiben Sie kurz Ihr Objekt – wir ordnen es zu und melden uns mit einem Terminvorschlag.
        </p>
        <div class="mt-6">
          {% include quote-form.html %}
        </div>
      </div>
    </div>
  </div>
</section>
