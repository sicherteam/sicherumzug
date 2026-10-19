(() => {
  'use strict';
  const form=document.querySelector('[data-addresses-tool]');if(!form)return;
  const result=document.getElementById('addresses-result'),container=document.getElementById('addresses-tasks'),progress=document.getElementById('addresses-progress'),notice=document.getElementById('addresses-notice'),noticeExport=document.getElementById('addresses-notice-export'),status=document.getElementById('addresses-status');
  const official='https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/1',after='https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/3/Seite.180520';
  const groups=[
    {title:'Wohnsitz und Versorgung',items:[
      ['Wohnsitzanmeldung und gegebenenfalls Abmeldung bei der zuständigen Stelle erledigen. Tatsächlichen Bezug der Unterkunft und geltende Fristen beachten.','https://www.oesterreich.gv.at/de/themen/persoenliche_dokumente_und_bestaetigungen/an__abmeldung_des_wohnsitzes/Seite.1180200'],
      ['Strom, Gas oder Fernwärme: Anbieter, Zählerstände und Vertragsbeginn bzw. Vertragsende an beiden Adressen abstimmen.','/ratgeber/strom-gas-ummelden-umzug-oesterreich/'],
      ['Telefon und Internet: neue Anschlussadresse und Verfügbarkeit beim Anbieter prüfen.',after],
      ['Änderung von Adresse oder Haushalt beim ORF-Beitrags Service prüfen.','https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/umzug/1/Seite.180406']
    ]},
    {title:'Geld, Versicherungen und Post',items:[
      ['Bank und relevante Versicherer über die neue Anschrift informieren. Haushaltsversicherung auf die neue Wohnung abstimmen.',official],
      ['Relevante Angaben beim Finanzamt sowie bei Kranken- oder Pensionsversicherung prüfen. Nicht jede Änderung verlangt dieselbe Mitteilung.',official],
      ['Nachsendeauftrag bei Bedarf gesondert bestellen. Er ersetzt die direkte Adressänderung bei Ihren Vertragspartnern nicht.','https://www.post.at/p/a/nachsenden'],
      ['Abos, Vereine, Jahreskarten, Bibliothek, Kirchenbeitragsstelle und regelmäßige Lieferungen prüfen.',after]
    ]},
    {title:'Für Ihren Haushalt ausgewählt',items:[
      ['Arbeitgeber über die neue Adresse informieren.',official,'employed'],
      ['Adressänderung beim AMS über den vorgesehenen Kanal melden.',official,'ams'],
      ['Bei selbstständiger Tätigkeit Finanzamt und gegebenenfalls Firmenbuch oder GISA prüfen. Zuständigkeit und besondere Fristen gesondert klären.',official,'selfemployed'],
      ['Kindergarten, Schule oder Hort kontaktieren und Anschrift bzw. mögliche Wechsel abstimmen.',official,'children'],
      ['Universität oder Fachhochschule und bei Bezug die Studienbeihilfenbehörde informieren.',official,'study'],
      ['Fahrzeug-Zulassung und Versicherung sowie eine eventuell nötige Parkberechtigung prüfen. Bei Kennzeichenänderung auch digitale Vignette prüfen.',after,'car'],
      ['Abmeldung und Anmeldung des Hundes mit den betroffenen Gemeinden klären.',after,'dog'],
      ['Erforderliche Adressänderung im Grundbuch mit der zuständigen Stelle prüfen.',official,'property']
    ]}
  ];
  function syncNotice(){noticeExport.textContent=notice.value;}
  function updateProgress(){const inputs=[...container.querySelectorAll('input[type=checkbox]')];progress.textContent=inputs.filter(input=>input.checked).length+' von '+inputs.length+' Aufgaben erledigt';}
  function buildNotice(){
    const clean=value=>String(value||'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim().slice(0,250);
    const date=form.elements.change_date.value;
    const display=date?date.split('-').reverse().join('.'):'[Datum]';
    return 'Betreff: Änderung meiner Anschrift\n\nSehr geehrte Damen und Herren,\n\nbitte aktualisieren Sie meine Anschrift ab '+display+'.\n\nBisherige Adresse:\n'+(clean(form.elements.old_address.value)||'[bisherige Adresse]')+'\n\nNeue Adresse:\n'+(clean(form.elements.new_address.value)||'[neue Adresse]')+'\n\nMeine Kunden- oder Vertragsnummer: [bei Bedarf ergänzen]\n\nBitte bestätigen Sie die Änderung. Falls Sie dafür weitere Angaben oder ein eigenes Formular benötigen, teilen Sie mir dies bitte mit.\n\nMit freundlichen Grüßen\n[Name]';
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;container.replaceChildren();
    groups.forEach(group=>{
      const items=group.items.filter(item=>!item[2]||form.elements[item[2]].checked);if(!items.length)return;
      const section=document.createElement('section');section.className='tool-task-group';const heading=document.createElement('h3');heading.textContent=group.title;const list=document.createElement('ul');list.className='tool-task-list';
      items.forEach(item=>{const row=document.createElement('li');row.className='tool-task';const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');input.type='checkbox';text.className='tool-task-text';text.textContent=item[0];label.append(input,text);const link=document.createElement('a');link.href=item[1];link.textContent=item[1].startsWith('/')?'Vorbereitung lesen':'Vorgaben bei der zuständigen Stelle prüfen';input.addEventListener('change',()=>{row.classList.toggle('is-complete',input.checked);updateProgress();});row.append(label,link);list.append(row);});section.append(heading,list);container.append(section);
    });notice.value=buildNotice();syncNotice();updateProgress();result.hidden=false;result.focus();result.scrollIntoView({block:'start',behavior:'auto'});status.textContent='Checkliste erstellt. Aufgaben abhaken und Nachricht vor dem eigenen Versand anpassen. Es wird nichts automatisch gemeldet oder gespeichert.';
  });
  form.addEventListener('input',()=>{if(!result.hidden){result.hidden=true;status.textContent='Angaben geändert. Bitte erstellen Sie die Checkliste erneut.';}});
  notice.addEventListener('input',syncNotice);
  document.getElementById('addresses-copy-notice').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(notice.value);status.textContent='Nachricht kopiert. Prüfen Sie Empfänger und Angaben vor dem Versand.';}catch(_){status.textContent='Kopieren ist nicht verfügbar. Markieren Sie den Text oder laden Sie Ihre Liste herunter.';}});
  document.getElementById('addresses-print').addEventListener('click',()=>window.print());
  document.getElementById('addresses-reset').addEventListener('click',()=>{form.reset();notice.value='';noticeExport.textContent='';container.replaceChildren();result.hidden=true;status.textContent='Alle Angaben und die Checkliste wurden gelöscht.';form.querySelector('input').focus();});
})();
