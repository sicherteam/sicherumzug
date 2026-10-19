(() => {
  'use strict';
  let resources;
  function loadResources() {
    if (!resources) resources = Promise.all([
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/assets/js/vendor/jspdf.umd.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('PDF library unavailable'));
        document.head.append(script);
      }),
      ...['regular', 'bold'].map(async weight => {
        const response = await fetch('/assets/fonts/dm-sans-' + weight + '.ttf');
        if (!response.ok) throw new Error('PDF font unavailable');
        return btoa(Array.from(new Uint8Array(await response.arrayBuffer()), byte => String.fromCharCode(byte)).join(''));
      })
    ]).catch(error => { resources = null; throw error; });
    return resources;
  }
  const plain = text => String(text).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').replace(/[\u2010-\u2015]/g, '-').trim();
  window.SicherTeamPDF = {
    async download({result, title, text, contact, canonical, tool}) {
      const [, regular, bold] = await loadResources();
      const doc = new window.jspdf.jsPDF({unit:'mm', format:'a4', compress:true});
      doc.addFileToVFS('dm-regular.ttf', regular); doc.addFont('dm-regular.ttf', 'DM', 'normal');
      doc.addFileToVFS('dm-bold.ttf', bold); doc.addFont('dm-bold.ttf', 'DM', 'bold');
      doc.setProperties({title, author:'Sicher Team', subject:'Ihre persönliche Umzugsplanung', creator:'Sicher Team Planungshilfen'});
      const ink = [16,29,60], muted = [79,93,116], red = [203,11,38];
      const left = 18, width = 174, bottom = 270;
      let y = 37;
      function page() { doc.addPage(); y = 37; }
      function block(value, {size=9.5, bold=false, color=ink, gap=2, indent=0, checkbox=null, href=null, keepNext=false}={}) {
        value = plain(value);
        if (!value) return;
        doc.setFont('DM', bold ? 'bold' : 'normal'); doc.setFontSize(size); doc.setTextColor(...color);
        const lines = doc.splitTextToSize(value, width-indent);
        const leading = size * 0.3528 * 1.25;
        const reserve = keepNext ? 12 : 0;
        if (lines.length*leading + y + reserve > bottom && lines.length*leading < bottom-37) page();
        if (checkbox !== null) {
          doc.setDrawColor(...ink);doc.setLineWidth(0.25);doc.rect(left,y-2.7,3.5,3.5);
          if (checkbox) {doc.line(left+0.6,y-1,left+1.4,y-0.2);doc.line(left+1.4,y-0.2,left+3,y-2.1);}
        }
        for (const line of lines) {
          if (y+leading > bottom) page();
          doc.text(line,left+indent,y);
          if (href) doc.link(left+indent,y-size*0.3528,Math.min(width-indent,doc.getTextWidth(line)),leading,{url:href});
          y += leading;
        }
        y += gap;
      }
      block(title,{size:21,bold:true,gap:2});
      block('Erstellt am ' + new Date().toLocaleDateString('de-AT'),{size:8,color:muted,gap:6});
      const planner = result.querySelector('#planner-tasks');
      const labels = [...result.querySelectorAll('.tool-label-card')];
      const handover = result.handoverData;
      if (labels.length) {
        // Six independent cards per A4 page, with real writing/trim space.
        // No contact details are placed inside a customer's carton label.
        const start=57, cardWidth=84, cardHeight=64, gap=6;
        labels.forEach((card,index)=>{
          if(index>0 && index%6===0) page();
          const slot=index%6, x=left+(slot%2)*(cardWidth+gap), top=start+Math.floor(slot/2)*(cardHeight+gap);
          doc.setDrawColor(...ink);doc.setLineWidth(0.3);doc.roundedRect(x,top,cardWidth,cardHeight,1.5,1.5);
          const draw=(value,offset,size,bold=false,maxWidth=cardWidth-10)=>{
            doc.setFont('DM',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...ink);
            doc.text(doc.splitTextToSize(plain(value),maxWidth),x+5,top+offset,{lineHeightFactor:1.15});
          };
          draw(card.dataset.kind==='room'?'ZIELRAUM':'KARTON',7,8);
          draw(card.querySelector('.tool-label-room').textContent,17,14,true);
          if(card.dataset.kind!=='room'){
            draw(card.querySelector('.tool-label-number').textContent,32,11,true);
            draw(card.querySelector('.tool-label-content').textContent,40,9);
          }
          draw(card.querySelector('.tool-label-flags').textContent.replace('↑ ','').replace(' · ',' / '),58,8,true);
        });
        y=270;
      } else if (handover) {
        const empty='________________________________________';
        const date=value=>value?value.split('-').reverse().join('.'):'';
        function heading(value){block(value,{size:12,bold:true,gap:3,keepNext:true});}
        function entry(label,value,lines=1){
          const cleanValue=plain(value||'');doc.setFont('DM','normal');doc.setFontSize(10);
          const needed=cleanValue?doc.splitTextToSize(cleanValue,width).length*4.2+8:8+lines*5;
          if(y+needed>bottom)page();
          block(label,{size:8,bold:true,color:muted,gap:1});
          if(cleanValue)block(cleanValue,{size:10,gap:3});
          else {doc.setDrawColor(175,184,199);doc.setLineWidth(0.2);for(let i=0;i<lines;i++){doc.line(left,y+2,left+width,y+2);y+=5;}y+=3;}
        }
        block(handover.mode==='blank'?'Leere Vorlage zum gemeinsamen Ausfüllen':'Entwurf aus Ihren Angaben. Gemeinsam prüfen und ergänzen.',{size:8,color:muted,gap:4});
        heading('Wohnung und Termin');
        entry('Einzug / Auszug',handover.kind);entry('Adresse, Stiege / Stock / Top',[handover.address,handover.top].filter(Boolean).join(' · '));
        entry('Datum / Uhrzeit',[date(handover.date),handover.time].filter(Boolean).join(' · '));
        heading('Beteiligte Personen');handover.parties.forEach(person=>entry(person.role,person.name));
        heading('Räume und beobachteter Zustand');
        (handover.rooms.length?handover.rooms:[{name:'Raum / Bereich',condition:''}]).forEach((room,index)=>entry((index+1)+'. '+(room.name||'Raum / Bereich'),room.condition,2));
        heading('Zählerstände');
        (handover.meters.length?handover.meters:[{}]).forEach(meter=>{
          const value=[meter.number?'Nummer: '+meter.number:'Nummer: '+empty,meter.reading?'Stand / Einheit: '+meter.reading:'Stand / Einheit: '+empty,meter.date?'Ablesedatum: '+date(meter.date):'Ablesedatum: '+empty].join('\n');
          entry(meter.type||'Zählerart',value);
        });
        heading('Übergebene Schlüssel und Chips');
        (handover.keys.length?handover.keys:[{count:''}]).forEach(key=>entry(key.type||'Schlüsselart','Anzahl: '+(key.count===''?empty:key.count)+'\nBemerkung: '+(key.notes||empty)));
        heading('Weitere Beobachtungen');entry('Festgehalten',handover.observations,2);
        heading('Offene Punkte / abweichende Auffassungen');entry('Was / wer / bis wann',handover.openPoints,3);
        heading('Anlagen und Fotoverweise');entry('Zugehörige Unterlagen',handover.attachments,2);
        if(y+80>bottom)page();
        heading('Prüfung und Unterschriften');
        block('Vor Unterzeichnung gemeinsam prüfen und gegebenenfalls ergänzen. Die rechtliche Wirkung hängt vom Inhalt und den Umständen ab. Eine Kopie mit Anlagen für jede beteiligte Seite vorsehen.',{size:8,color:muted});
        entry('Ort / Datum','');entry('Unterschrift Mieterseite','');entry('Unterschrift Vermieterseite / Vertretung','');entry('Weitere Unterschrift / Funktion','');
      } else if (planner) {
        block(result.querySelector('#planner-summary').textContent,{bold:true});
        block(result.querySelector('.tool-help').textContent,{size:8,color:muted});
        block(result.querySelector('#planner-progress').textContent,{size:9,color:red,gap:4});
        planner.querySelectorAll('.tool-task-group').forEach(group => {
          doc.setFont('DM','normal');doc.setFontSize(9.5);
          const rows=[...group.querySelectorAll('.tool-task')];
          const groupHeight=16+rows.reduce((height,row)=>{const link=row.querySelector('a');return height+doc.splitTextToSize(plain(row.querySelector('.tool-task-text').textContent),width-6).length*9.5*0.3528*1.25+(link?6:2);},0);
          if (groupHeight<bottom-37 && y+groupHeight>bottom) page();
          y += 2;
          block(group.querySelector('h3').textContent,{size:12,bold:true,gap:1,keepNext:true});
          block(group.querySelector('time').textContent,{size:8,color:muted,gap:3,keepNext:true});
          group.querySelectorAll('.tool-task').forEach(row => {
            const input=row.querySelector('input'), link=row.querySelector('a');
            block(row.querySelector('.tool-task-text').textContent,{checkbox:input.checked,indent:6,gap:link?1:2});
            if (link) block(link.textContent,{size:8,color:muted,indent:6,href:link.href,gap:1});
          });
        });
      } else {
        const content=result.cloneNode(true);
        content.querySelectorAll('.tool-actions,.tool-action-row,.tool-no-print,.tool-print-contact,.tool-print-title,.tool-print-header,.tool-print-footer,.tool-print-inventory,button').forEach(node=>node.remove());
        function table(table){
          const caption=table.querySelector('caption');if(caption)block(caption.textContent,{size:10,bold:true,keepNext:true});
          const rows=[...table.querySelectorAll('tr')];
          rows.forEach(row=>{
            const cells=[...row.querySelectorAll('th,td')],columns=cells.length;if(!columns)return;
            const colWidths=columns===3?[width*.4,width*.3,width*.3]:Array(columns).fill(width/columns);
            const header=!!row.querySelector('th');doc.setFont('DM',header?'bold':'normal');doc.setFontSize(8.5);
            const values=cells.map((cell,index)=>doc.splitTextToSize(plain(cell.textContent),colWidths[index]-5));
            const height=Math.max(...values.map(lines=>lines.length))*3.9+6;
            if(y+height>bottom)page();
            let x=left;doc.setDrawColor(189,197,209);doc.setLineWidth(.2);
            cells.forEach((cell,index)=>{if(header){doc.setFillColor(244,245,248);doc.rect(x,y,colWidths[index],height,'FD');}else doc.rect(x,y,colWidths[index],height);doc.setTextColor(...ink);doc.text(values[index],x+2.5,y+4,{lineHeightFactor:1.3});x+=colWidths[index];});
            y+=height;
          });y+=4;
        }
        function renderNode(node){
          if(node.nodeType===3){if(node.textContent.trim())block(node.textContent,{size:9.5});return;}
          if(node.nodeType!==1)return;
          const tag=node.tagName;
          if(['H2','H3','H4'].includes(tag)){block(node.textContent,{size:tag==='H2'?13:11,bold:true,gap:2,keepNext:true});return;}
          if(tag==='TABLE'){table(node);return;}
          if(tag==='LI'){
            const checkbox=node.querySelector('input[type=checkbox]'),copy=node.cloneNode(true);copy.querySelectorAll('a,input').forEach(el=>el.remove());
            block((checkbox?'':'- ')+copy.textContent,{size:9.5,checkbox:checkbox?checkbox.checked:null,indent:checkbox?6:0,gap:2});
            node.querySelectorAll('a').forEach(link=>block(link.textContent,{size:8,color:muted,indent:checkbox?6:0,href:link.href,gap:2}));return;
          }
          if(tag==='P'||tag==='PRE'||tag==='TIME'||node.classList.contains('tool-notice-print')||!node.children.length){block(node.textContent,{size:9.5,gap:3});return;}
          const inline=[...node.children].every(child=>['SPAN','STRONG','B','A','SMALL'].includes(child.tagName));
          if(inline){block(node.textContent,{size:9.5,gap:3});return;}
          [...node.childNodes].forEach(renderNode);
        }
        [...content.childNodes].forEach(renderNode);
      }
      if(!labels.length){
        y += 3;
        block('Ihre Planungshilfe: '+canonical,{size:8,color:muted,href:canonical});
        block(handover?'Vorlage zur Dokumentation. Keine Prüfung des Mietvertrags und keine automatische Freigabe.':'Diese Planungshilfe ist kein verbindliches Angebot. Leistungen, Zugänge und Termine stimmen wir persönlich mit Ihnen ab.',{size:8,color:muted});
      }
      const total=doc.getNumberOfPages();
      for (let number=1;number<=total;number++) {
        doc.setPage(number);
        doc.setDrawColor(...ink);doc.setLineWidth(0.6);
        // The site's existing cube mark, drawn as vectors to stay sharp in print.
        const x=left, top=12, s=0.24;
        const line=(a,b,c,d)=>doc.line(x+a*s,top+b*s,x+c*s,top+d*s);
        [[24,5,41,14.5],[41,14.5,41,33.5],[41,33.5,24,43],[24,43,7,33.5],[7,33.5,7,14.5],[7,14.5,24,5],[7,14.5,24,24],[24,24,41,14.5],[24,24,24,43],[15.5,9.75,32.5,19.25],[32.5,19.25,32.5,29.25]].forEach(points=>line(...points));
        doc.setFont('DM','bold');doc.setFontSize(22);doc.setTextColor(...ink);doc.text('sicher team',left+15,20);
        doc.setFont('DM','normal');doc.setFontSize(8);doc.setTextColor(...muted);doc.text('Ihre Umzugsplanung',left+width,19,{align:'right'});
        doc.setDrawColor(...red);doc.setLineWidth(0.55);doc.line(left,27,left+width,27);
        doc.setDrawColor(189,197,209);doc.setLineWidth(0.2);doc.line(left,279,left+width,279);
        doc.setFontSize(7.5);doc.setTextColor(...muted);
        doc.text('Sicher Team · +43 660 6060775 · office@sicher-umzug.at',left,284);
        doc.text('sicher-umzug.at · Wildgartenallee 1, 1120 Wien',left,289);
        doc.text('Seite '+number+' / '+total,left+width,289,{align:'right'});
      }
      const url=doc.output('datauristring');
      return {url, filename:'sicher-team-'+tool+'-'+new Date().toLocaleDateString('sv-SE')+'.pdf'};
    }
  };
})();
