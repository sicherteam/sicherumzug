(() => {
  'use strict';
  const form=document.querySelector('[data-labels-tool]');if(!form)return;
  const result=document.getElementById('labels-result'),container=document.getElementById('labels-cards'),summary=document.getElementById('labels-summary'),status=document.getElementById('labels-status'),error=document.getElementById('labels-error');
  let labels=[],includeSigns=false,nextId=1;
  const clean=(value,max)=>String(value||'').replace(/[\u0000-\u001F\u007F]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
  function distinctRooms(items){return [...new Set(items.map(item=>item.room))];}
  function text(className,value){const node=document.createElement('p');node.className=className;node.textContent=value;return node;}
  function card(item,kind){
    const article=document.createElement('article');article.className='tool-label-card';article.dataset.kind=kind;article.dataset.labelId=item.id||'';
    article.append(text('tool-label-kind',kind==='room'?'Zielraum':'Karton'),text('tool-label-room',item.room));
    if(kind==='carton'){
      article.append(text('tool-label-number','Nr. '+item.number),text('tool-label-content',item.content||'Inhalt: ____________________'));
      const flags=[item.fragile?'Zerbrechlich':'',item.upright?'↑ Diese Seite oben':''].filter(Boolean);article.append(text('tool-label-flags',flags.join(' · ')));
      const remove=document.createElement('button');remove.type='button';remove.className='tool-text-button tool-no-print';remove.textContent='Entfernen';remove.setAttribute('aria-label','Karton '+item.number+' für '+item.room+' entfernen');remove.addEventListener('click',()=>{const removedIndex=labels.findIndex(label=>label.id===item.id);labels=labels.filter(label=>label.id!==item.id);render();status.textContent='Etikett entfernt.';const remaining=container.querySelectorAll('button');const next=remaining[Math.min(removedIndex,remaining.length-1)];(next||form.elements.room).focus();});article.append(remove);
    }else article.append(text('tool-label-flags','Kartons bitte hier abstellen'));
    return article;
  }
  function render(){
    container.replaceChildren();labels.forEach(item=>container.append(card(item,'carton')));
    const rooms=includeSigns?distinctRooms(labels):[];rooms.forEach(room=>container.append(card({room},'room')));
    summary.textContent=labels.length+(labels.length===1?' Kartonetikett':' Kartonetiketten')+(rooms.length?' und '+rooms.length+(rooms.length===1?' Raumschild':' Raumschilder'):'')+'. '+(labels.length+rooms.length)+' von maximal 48 Karten.';
    result.hidden=!labels.length;result.dispatchEvent(new Event('input',{bubbles:true}));
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();error.textContent='';if(!form.reportValidity())return;
    const room=clean(form.elements.room.value,40),content=clean(form.elements.content.value,90),count=Number(form.elements.count.value),start=Number(form.elements.start.value);
    if(!room){error.textContent='Bitte geben Sie einen Zielraum an.';form.elements.room.focus();return;}
    if(!Number.isInteger(count)||count<1||count>48||!Number.isInteger(start)||start<1||start+count-1>9999){error.textContent='Bitte wählen Sie 1 bis 48 Etiketten mit Kartonnummern zwischen 1 und 9999.';return;}
    const signs=form.elements.signs.checked,projected=labels.length+count+(signs?new Set([...distinctRooms(labels),room]).size:0);
    if(projected>48){error.textContent='Dieser Satz würde '+projected+' Karten ergeben. Bitte reduzieren Sie die Anzahl oder drucken und löschen Sie zuerst den bisherigen Satz.';return;}
    for(let i=0;i<count;i++)labels.push({id:'label-'+nextId++,room,number:start+i,content,fragile:form.elements.fragile.checked,upright:form.elements.upright.checked});
    includeSigns=signs;form.elements.start.value=String(Math.min(9999,start+count));render();result.focus();result.scrollIntoView({block:'start',behavior:'auto'});status.textContent='Etiketten ergänzt. Sie können einen weiteren Raum hinzufügen oder das PDF erstellen. Es wird nichts automatisch gespeichert.';
  });
  form.elements.signs.addEventListener('change',()=>{if(!labels.length)return;const wanted=form.elements.signs.checked;if(labels.length+(wanted?distinctRooms(labels).length:0)>48){form.elements.signs.checked=false;error.textContent='Für die Raumschilder ist kein Platz mehr im 48-Karten-Satz. Entfernen Sie einige Etiketten oder erstellen Sie einen zweiten Satz.';return;}includeSigns=wanted;render();});
  document.getElementById('labels-print').addEventListener('click',()=>window.print());
  document.getElementById('labels-reset').addEventListener('click',()=>{labels=[];includeSigns=false;nextId=1;form.reset();error.textContent='';render();status.textContent='Alle Etiketten wurden gelöscht.';form.elements.room.focus();});
})();
