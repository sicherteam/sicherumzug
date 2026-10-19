(() => {
  'use strict';
  const form=document.getElementById('parking-form');if(!form)return;
  const result=document.getElementById('parking-result'),error=document.getElementById('parking-error');
  const cities={
    wien:{name:'Wien',url:'https://www.wien.gv.at/amtswege/kurzfristige-halteverbotszone-bewilligung',text:'Für kurzfristige Ladezonen nennt die Stadt Wien mindestens zehn Werktage Antragsvorlauf. Der Bescheid muss vor der Aufstellung vorliegen. Die Schilder sind mindestens 24 Stunden vor Beginn aufzustellen; die Bestätigung und Dokumentation richten sich nach den städtischen Vorgaben.'},
    linz:{name:'Linz',url:'https://egov.linz.at/bbv/start.do?generalid=BAU_ST',text:'Das Linzer Formular umfasst auch straßenpolizeiliche Maßnahmen für Übersiedlungen. Es nennt mindestens 14 Werktage Vorlauf und weist auf die individuelle Prüfung hin. Klären Sie mit dem Magistrat, welche Maßnahmen für Ihren Ladeplatz erforderlich sind.'},
    graz:{name:'Graz',url:'https://www.graz.at/cms/beitrag/10211793/7932131/Sonstige_Ausnahmegenehmigungen.html',text:'Das Straßenamt Graz informiert über Ausnahmegenehmigungen, etwa für eingeschränkte Zufahrten oder bestehende Halteverbote. Eine solche Ausnahme ist nicht automatisch eine reservierte Zone. Fragen Sie nach dem passenden Verfahren für Ihre konkrete Ladestelle und nach dem nötigen Vorlauf.'},
    salzburg:{name:'Salzburg',url:'https://secure.stadt-salzburg.at/',text:'Prüfen Sie den passenden Amtsweg bei der Stadt Salzburg. Ladebereich, Zufahrt und etwaige Einschränkungen müssen getrennt geklärt werden. Dieses Tool gibt für Salzburg keine pauschale Antragsfrist oder Gebühr vor.'},
    other:{name:'Ihre Gemeinde',url:'https://www.oesterreich.gv.at/',text:'Wenden Sie sich an die für Ihre Ladestelle zuständige Stadt oder Gemeinde. Fragen Sie nach Halteverbotszone, Zufahrtsbeschränkungen, Schildern, Unterlagen und aktuellen Gebühren. Wiener und Linzer Fristen gelten nicht automatisch an Ihrem Standort.'}
  };
  const checked=id=>document.getElementById(id).checked;
  const field=id=>document.getElementById(id).value.trim();
  form.addEventListener('input',()=>{result.hidden=true;error.hidden=true;});
  form.addEventListener('reset',()=>{result.hidden=true;error.hidden=true;});
  form.addEventListener('submit',event=>{
    event.preventDefault();error.hidden=true;
    const date=field('parking-date'), today=new Date();today.setHours(0,0,0,0);
    const parsed=new Date(date+'T12:00:00');const iso=parsed.getFullYear()+'-'+String(parsed.getMonth()+1).padStart(2,'0')+'-'+String(parsed.getDate()).padStart(2,'0');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(parsed.getTime())||iso!==date||parsed<today||parsed.getFullYear()>today.getFullYear()+5||!form.checkValidity()){
      error.textContent='Bitte einen gültigen Ladetag ab heute innerhalb der nächsten fünf Jahre und gegebenenfalls eine Länge von 1 bis 100 Metern eingeben.';error.hidden=false;result.hidden=true;form.reportValidity();return;
    }
    const city=cities[field('parking-city')]||cities.other, access=field('parking-access'),side=field('parking-side'),length=field('parking-length'),time=field('parking-time');
    const days=Math.round((Date.UTC(parsed.getFullYear(),parsed.getMonth(),parsed.getDate())-Date.UTC(today.getFullYear(),today.getMonth(),today.getDate()))/86400000);
    document.getElementById('parking-summary').textContent=city.name+' · '+side+' · '+parsed.toLocaleDateString('de-AT')+(time?' · '+time:'')+(length?' · gewünschter Bereich: '+length+' m':'');
    document.getElementById('parking-timing').textContent=(days===0?'Der Ladetag ist heute.':'Bis zum Ladetag sind es '+days+' Kalendertage.')+' Das ist keine Berechnung einer behördlichen Frist. Feiertage, Werktage und Bearbeitung müssen Sie mit der zuständigen Stelle prüfen.';
    document.getElementById('parking-local').textContent=city.text;
    const source=document.getElementById('parking-source');source.href=city.url;source.textContent=city.name==='Ihre Gemeinde'?'Österreichisches Behördenportal: zuständige Stelle suchen':'Offizielle Information: '+city.name;
    const tasks=[
      ['Zufahrt, Fahrzeugabmessungen, Ladezeit und Trageweg mit dem Transportbetrieb abstimmen.',checked('parking-route')],
      [access==='private'?'Erlaubnis für die private Fläche mit Eigentümer oder Hausverwaltung klären. Tragfähigkeit, Einfahrt und nötige öffentliche Zufahrt prüfen.':'Prüfen lassen, ob eine bewilligte Zone oder eine andere Verkehrsmaßnahme für den Straßenraum nötig ist.',false],
      ['Verfahren, Vorlauf und erforderliche Unterlagen bei der zuständigen Stelle prüfen.',checked('parking-authority')],
      ['Festlegen, wer Antrag, Schilder, Aufstellung, Bestätigung und Abbau übernimmt.',checked('parking-responsible')],
      ['Erforderliche Bewilligung erhalten und Zeitraum, Fläche sowie Bedingungen kontrollieren.',checked('parking-permit')],
      ['Behördenkosten, Schilder und Organisationskosten im Angebot getrennt klären.',false],
      ['Den zweiten Standort gesondert vorbereiten. Terminänderungen auch für die Ladezone abstimmen.',false]
    ];
    const list=document.getElementById('parking-tasks');list.replaceChildren();tasks.forEach(([text,done])=>{const li=document.createElement('li');li.className='tool-task';const label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span');input.type='checkbox';input.checked=done;span.className='tool-task-text';span.textContent=text;label.append(input,span);li.append(label);list.append(li);});
    const q=new URLSearchParams({service:'umzug',tool:'halteplatz',from:location.pathname,preferred_date:date,tool_summary:'Ladeplatz-Vorbereitung: '+city.name+', '+side+', '+date+(length?', gewünschte Länge '+length+' m':'')+'. Zufahrt und behördliche Bedingungen persönlich prüfen. Keine Reservierung durch das Tool.'});document.getElementById('parking-enquiry').href='/angebot/?'+q+'#angebot-form';
    result.hidden=false;result.focus();
  });
})();
