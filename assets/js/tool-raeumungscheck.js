(() => {
  'use strict';const form=document.getElementById('clearance-check-form');if(!form)return;
  const result=document.getElementById('clearance-check-result'),error=document.getElementById('clearance-check-error');
  const field=id=>document.getElementById(id).value, checked=id=>document.getElementById(id).checked;
  form.addEventListener('input',()=>{result.hidden=true;error.hidden=true;});form.addEventListener('reset',()=>{result.hidden=true;error.hidden=true;});
  form.addEventListener('submit',event=>{
    event.preventDefault();const rooms=Number(field('clearance-rooms'));if(!Number.isInteger(rooms)||rooms<1||rooms>50){error.textContent='Bitte 1 bis 50 Räume oder Bereiche eingeben.';error.hidden=false;result.hidden=true;form.reportValidity();return;}error.hidden=true;
    const summary=field('clearance-object')+', '+rooms+' Räume / Bereiche. Umfang: '+field('clearance-amount')+'. Zugang: '+field('clearance-access')+'.';document.getElementById('clearance-check-summary').textContent=summary;
    const value=field('clearance-value');document.getElementById('clearance-check-value').textContent=value==='yes'?'Sie möchten eine mögliche Anrechnung besprechen. Zustand: '+field('clearance-condition')+'. Ob und in welcher Höhe Stücke anrechenbar sind, lässt sich erst nach Prüfung des konkreten Bestands und des Räumungsaufwands feststellen.':value==='no'?'Sie haben derzeit keine Stücke zur Anrechnung genannt. Eine Wertanrechnung ist deshalb nicht eingeplant. Prüfen Sie zunächst den Räumungsumfang und das Angebot.':'Die Verwertbarkeit ist noch offen. Eine mögliche Anrechnung wird getrennt vom Räumungsaufwand geprüft. Der Check nimmt keinen Wert und keine kostenlose Räumung an.';
    const tasks=['Für jeden Bereich festhalten, was wegkommt, transportiert wird oder bleibt.','Etagen, Liftmaße, Tragewege, Ladeplatz und Termin beschreiben.','Besichtigung und schriftliches Angebot mit allen vereinbarten Leistungen abstimmen.'];
    if(value==='yes')tasks.push('Zur Bewertung geeignete Stücke beschreiben. Eigentum und Freigabe klären; eine mögliche Anrechnung separat im Angebot dokumentieren.');
    if(checked('clearance-heavy'))tasks.push('Maße und Besonderheiten der schweren Gegenstände vorab mitteilen.');
    if(checked('clearance-electrical'))tasks.push('Elektrogeräte einzeln nennen und den vorgesehenen Abtransport besprechen.');
    if(checked('clearance-special'))tasks.push('Besondere oder unbekannte Materialien gesondert beschreiben und Handhabung sowie Annahme vorab klären.');
    if(checked('clearance-keeps'))tasks.push('Unterlagen, Erinnerungsstücke und zu behaltende Gegenstände vorab auswählen und eindeutig kennzeichnen.');
    if(checked('clearance-approval'))tasks.push('Vor einer Entfernung klären, wer für den Bestand die erforderliche Freigabe geben kann.');
    if(field('clearance-amount')==='Wege oder Zugänge sind verstellt')tasks.push('Verstellte Wege und besondere Zugangsbedingungen vor der Besichtigung ansprechen.');
    tasks.push('Besenreine Übergabe, zusätzliche Reinigung und eventuelle Demontage als getrennte Leistungen klären.');
    const list=document.getElementById('clearance-check-tasks');list.replaceChildren();tasks.forEach(text=>{const li=document.createElement('li'),label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span');li.className='tool-task';input.type='checkbox';span.className='tool-task-text';span.textContent=text;label.append(input,span);li.append(label);list.append(li);});
    const q=new URLSearchParams({service:'raeumung',tool:'raeumungscheck',from:location.pathname,tool_summary:'Räumungs-Check: '+summary+' Wertanrechnung: '+(value==='yes'?'Bitte persönlich prüfen; kein Betrag bestätigt.':value==='no'?'Derzeit keine Stücke genannt.':'Noch offen.')+' Besondere Punkte: '+tasks.slice(3,-1).join(' ')});document.getElementById('clearance-check-enquiry').href='/angebot/?'+q+'#angebot-form';result.hidden=false;result.focus();
  });
})();
