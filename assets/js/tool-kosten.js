(() => {
  'use strict';
  const root = document.getElementById('cost-tool'); if (!root) return;
  const form = root.querySelector('form'); const result = root.querySelector('#cost-result');
  const field = name => form.elements.namedItem(name);
  const baseRates = {small:320, medium:520, large:850};
  const params = new URLSearchParams(location.search);
  const volume = Number(params.get('volume'));
  let carriedVolume = Number.isFinite(volume) && volume > 0 && volume <= 1000 ? volume : null;
  if (carriedVolume) { const note = root.querySelector('#cost-volume'); note.hidden=false; note.textContent='Ihre Volumenplanung: ca. ' + carriedVolume.toLocaleString('de-AT') + ' m³. Das Volumen wird in die Anfrage übernommen. Der Wiener Orientierungswert beruht weiterhin auf der gewählten Haushaltsgröße.'; }
  const selection = name => field(name).selectedOptions[0].textContent;
  function hideResult() {result.hidden=true;}
  form.addEventListener('input',hideResult); form.addEventListener('change',hideResult);
  form.addEventListener('submit',event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const origin=field('origin').value.trim(), destination=field('destination').value.trim();
    const isVienna = text => !text || /(?:^|\s)wien(?:$|\s)/i.test(text) || /\b1(?:0[1-9]|1[0-9]|2[0-3])0\b/.test(text);
    const canEstimate=field('service').value==='umzug' && field('route').value==='wien' && Object.hasOwn(baseRates,field('size').value) && !field('special').checked && isVienna(origin) && isVienna(destination);
    const items=[];
    if (canEstimate) {
      const base=baseRates[field('size').value];
      items.push(['Haushaltsgröße im bisherigen Modell',base]);
      const access=Math.max(Number(field('origin_floor').value),Number(field('destination_floor').value));
      if (access) items.push(['Höhere Zugangsstufe, einmal angesetzt',access]);
      if(field('pack').checked)items.push(['Einpackservice & Kartons, bisheriger Ansatz',80]);
      if(field('assembly').checked)items.push(['De- und Remontage, bisheriger Ansatz',90]);
      if(field('parking').checked)items.push(['Halteverbotszone, bisheriger Wiener Ansatz',110]);
      const total=items.reduce((sum,item)=>sum+item[1],0);
      const fmt=new Intl.NumberFormat('de-AT',{style:'currency',currency:'EUR',maximumFractionDigits:0});
      root.querySelector('#cost-price').textContent=fmt.format(Math.max(150,Math.round(total*.9)))+' bis '+fmt.format(Math.round(total*1.1));
      root.querySelector('#cost-result-title').textContent='Orientierung für Ihren Wiener Umzug';
      root.querySelector('#cost-result-description').textContent='Dieser Bereich reproduziert die Größen- und Zusatzansätze des bisherigen Rechners. Er ist keine Bestätigung aktueller Tarife und kein verbindliches Angebot.';
      root.querySelector('#cost-source-note').textContent='Quelle: bisheriger Sicher-Team-Rechner, abgerufen am 11.10.2026. Dessen Modell verwendet ±10 %; das ist keine statistisch abgesicherte Preisspanne. Umsatzsteuer war dort nicht separat ausgewiesen. Den zu zahlenden Gesamtbetrag und alle Leistungen bitte im schriftlichen Angebot bestätigen lassen.';
    } else {
      root.querySelector('#cost-price').textContent='Persönliche Einschätzung nötig';
      root.querySelector('#cost-result-title').textContent='Ihre Angaben für das Umzugsangebot';
      root.querySelector('#cost-result-description').textContent='Für diese Strecke, Leistung oder Zugangssituation reicht das bisherige Wiener Rechenmodell nicht aus. Ihre Angaben sind jetzt für eine persönliche Kostenanfrage zusammengestellt.';
      root.querySelector('#cost-source-note').textContent='Umfang, Transportstrecke, Zugänge und gewünschte Leistungen bestimmen den Preis. Eine Wertanrechnung setzt die Prüfung der Gegenstände voraus und wird nicht automatisch abgezogen.';
    }
    const breakdown=root.querySelector('#cost-breakdown');breakdown.replaceChildren();
    for(const [label,value]of items){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value.toLocaleString('de-AT')+' €';breakdown.append(dt,dd);}
    const extras=[['pack','Einpackservice'],['assembly','Möbelmontage'],['parking','Ladeplatz prüfen'],['special','Besondere Stücke/Zugänge'],['credit','Wertanrechnung prüfen']].filter(([key])=>field(key).checked).map(([,label])=>label);
    const lines=['Leistung: '+selection('service'),'Strecke: '+selection('route'),'Start: '+(origin||'noch offen'),'Ziel: '+(destination||'noch offen'),'Umfang: '+selection('size'),'Zugang Start: '+selection('origin_floor'),'Zugang Ziel: '+selection('destination_floor')];
    if(field('date').value)lines.push('Wunschtermin: '+field('date').value);
    if(carriedVolume)lines.push('Volumenplanung: ca. '+carriedVolume+' m³');
    lines.push('Zusatzarbeiten: '+(extras.join(', ')||'keine gewählt'));
    if(canEstimate)lines.push('Bisheriger Rechner-Richtwert: '+root.querySelector('#cost-price').textContent+'; kein verbindliches Angebot');
    const summary=root.querySelector('#cost-summary');summary.replaceChildren();const list=document.createElement('ul');for(const line of lines){const li=document.createElement('li');li.textContent=line;list.append(li);}summary.append(list);
    const query=new URLSearchParams({service:field('service').value==='raeumung'?'raeumung':'umzug',from:'/umzugskosten-rechner/',tool:'kosten',tool_summary:lines.join('\n').slice(0,3000)});
    if(origin)query.set('origin',origin);if(destination)query.set('destination',destination);if(field('date').value)query.set('preferred_date',field('date').value);
    root.querySelector('#cost-quote').href='/angebot/?'+query.toString()+'#angebot-form';
    result.hidden=false;result.focus();result.scrollIntoView({block:'start',behavior:'auto'});
  });
  root.querySelector('#cost-reset').addEventListener('click',()=>{form.reset();result.hidden=true;carriedVolume=null;root.querySelector('#cost-volume').hidden=true;field('service').focus();});
  root.querySelector('#cost-print').addEventListener('click',()=>window.print());
})();
