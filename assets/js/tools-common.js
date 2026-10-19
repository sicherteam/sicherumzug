(() => {
  'use strict';
  const brand = document.getElementById('tool-export-contact');
  if (!brand) return;
  const title = document.querySelector('.tool-intro h1').textContent.trim();
  const contact = [...brand.children].map(el => el.textContent.trim()).join('\n');
  const canonical = document.querySelector('link[rel=canonical]').href;
  let pdfLoader;
  function loadPDF() {
    if (!pdfLoader) pdfLoader=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/assets/js/tools-pdf.js?v=20261011-tools-24';script.onload=resolve;script.onerror=()=>reject(new Error('PDF unavailable'));document.head.append(script);}).catch(error=>{pdfLoader=null;throw error;});
    return pdfLoader;
  }
  // Saved planning can be restored after a reset without a blocking confirmation.
  let savedUndo;
  function protectSavedReset(key) {
    let previous;
    try { previous = localStorage.getItem(key); } catch (_) { return; }
    if (!previous) return;
    queueMicrotask(() => {
      if (savedUndo) savedUndo.remove();
      const panel = document.createElement('div'); panel.className = 'tool-note tool-no-print';
      const note = document.createElement('p'); note.setAttribute('role','status'); note.textContent = 'Die gespeicherte Planung wurde gelöscht. Sie können sie auf dieser Seite wiederherstellen.';
      const undo = document.createElement('button'); undo.type = 'button'; undo.className = 'tool-secondary'; undo.textContent = 'Gespeicherte Planung wiederherstellen';
      undo.addEventListener('click', () => {
        try { localStorage.setItem(key,previous); location.reload(); }
        catch (_) { note.textContent = 'Ihr Browser erlaubt die Wiederherstellung nicht. Die gespeicherte Planung konnte nicht geladen werden.'; }
      });
      panel.append(note,undo); document.querySelector('.tool-panel').append(panel); savedUndo=panel;
    });
  }
  document.addEventListener('click', event => {
    if (event.target.closest('#volume-reset')) protectSavedReset('sicher-team-volumen-v1');
    if (event.target.closest('#planner-reset')) protectSavedReset('sicher-team-umzugsplaner-v1');
  }, true);
  document.addEventListener('reset', event => {
    if (event.target.id === 'carton-form') protectSavedReset('sicher-team-carton-plan-v1');
  }, true);
  document.addEventListener('change', event => {
    if (event.target.id === 'planner-save' && !event.target.checked) protectSavedReset('sicher-team-umzugsplaner-v1');
  }, true);
  const results = [...document.querySelectorAll('.tool-result')];
  function reportText(result) {
    const clone = result.cloneNode(true);
    clone.querySelectorAll('.tool-actions,.tool-action-row,.tool-no-print,.tool-print-contact,.tool-print-title,.tool-print-header,.tool-print-footer,.tool-print-inventory,button').forEach(el => el.remove());
    clone.querySelectorAll('input[type=checkbox]').forEach(input => input.replaceWith(document.createTextNode(input.checked ? '[✓] ' : '[ ] ')));
    const inventory = document.getElementById('volume-inventory');
    let inventoryText = '';
    if (inventory) inventoryText = '\nMöbelliste:\n' + [...inventory.children].map(row => {
      const name = row.querySelector('label'); const quantity = row.querySelector('input');
      return (quantity ? quantity.value + ' × ' : '') + (name ? name.textContent.trim() : row.textContent.trim());
    }).join('\n');
    clone.querySelectorAll('li a').forEach(link => {link.before(document.createTextNode(' '));link.after(document.createTextNode(' ('+link.href+')'));});
    clone.querySelectorAll('table caption').forEach(caption => caption.append(document.createTextNode('\n')));
    clone.querySelectorAll('table tr').forEach(row => row.append(document.createTextNode('\n')));
    clone.querySelectorAll('table th, table td').forEach(cell => cell.append(document.createTextNode(' | ')));
    clone.querySelectorAll('li,h2,h3,h4,p,dt,dd,time,.tool-value,.tool-result-value,.tool-result-number').forEach(el => el.append(document.createTextNode('\n')));
    return title + '\nErstellt: ' + new Date().toLocaleDateString('de-AT') + '\n\n' + clone.textContent.replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim() + inventoryText + '\n\n' + contact + '\nPlanungshilfe: ' + canonical + '\nOrientierung und Vorbereitung. Kein verbindliches Angebot.\n';
  }
  results.forEach(result => {
    const actions = result.querySelector('.tool-actions:not(.tool-export-actions),.tool-action-row:not(.tool-export-actions)') || document.createElement('div');
    if (!actions.parentNode) { actions.className='tool-actions tool-no-print'; result.append(actions); }
    let exportActions=result.querySelector('.tool-export-actions');
    if (!exportActions) {
      const heading=document.createElement('h3');heading.className='tool-export-heading tool-no-print';heading.textContent='Ergebnis mitnehmen';
      exportActions=document.createElement('div');exportActions.className='tool-export-actions tool-no-print';result.append(heading,exportActions);
    }
    let print=result.querySelector('[id$="print"]');
    if (!print) {print=document.createElement('button');print.type='button';print.textContent='Drucken / PDF';print.addEventListener('click',()=>window.print());}
    print.className='tool-secondary tool-print-result';exportActions.append(print);
    result.querySelectorAll('button[id$="-reset"]').forEach(reset=>{
      if(reset.closest('.tool-reset-row'))return;
      let row=result.querySelector('.tool-reset-row');if(!row){row=document.createElement('div');row.className='tool-reset-row tool-no-print';result.append(row);}
      reset.className='tool-text-button';row.append(reset);
    });
    const inventoryExport=result.querySelector('#volume-export');
    if(inventoryExport){inventoryExport.className='tool-secondary tool-text-download';exportActions.append(inventoryExport);}
    actions.hidden=!actions.children.length;
    const status=document.createElement('p');status.className='tool-note tool-no-print';status.setAttribute('role','status');
    let pdfURL;const pdfFile=document.createElement('a');pdfFile.className='tool-secondary tool-pdf-file';pdfFile.textContent='PDF-Datei speichern';pdfFile.hidden=true;
    const invalidatePDF=()=>{pdfFile.hidden=true;status.textContent='';if(pdfURL){URL.revokeObjectURL(pdfURL);pdfURL=null;}};
    result.closest('.tool-panel').addEventListener('input',invalidatePDF);
    result.closest('.tool-panel').addEventListener('change',invalidatePDF);
    // Generated rows and blank templates also change without an input event.
    result.closest('.tool-panel').addEventListener('click',event=>{if(event.target.closest('button')&&!actions.contains(event.target)&&!exportActions.contains(event.target))invalidatePDF();});
    const pdf=document.createElement('button');pdf.type='button';pdf.className='tool-secondary tool-pdf-download';pdf.textContent='PDF herunterladen';
    pdf.addEventListener('click',async()=>{pdf.disabled=true;status.textContent='Ihr PDF wird erstellt …';try{await loadPDF();const file=await window.SicherTeamPDF.download({result,title,text:reportText(result),contact,canonical,tool:brand.dataset.tool});if(pdfURL)URL.revokeObjectURL(pdfURL);pdfURL=file.url;pdfFile.href=file.url;pdfFile.download=file.filename;pdfFile.hidden=false;pdfFile.click();status.textContent='PDF erstellt. Falls der Download nicht startet, wählen Sie PDF-Datei speichern.';}catch(_){status.textContent='PDF konnte nicht erstellt werden. Nutzen Sie Drucken / PDF oder laden Sie die Textdatei herunter.';}finally{pdf.disabled=false;}});exportActions.prepend(pdf);
    const download=document.createElement('button');download.type='button';download.className='tool-secondary tool-text-download';download.textContent='Ergebnis als Text herunterladen';
    download.addEventListener('click',()=>{const blob=new Blob([reportText(result)],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='sicher-team-'+brand.dataset.tool+'-'+new Date().toLocaleDateString('sv-SE')+'.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Die Textdatei enthält das Ergebnis und die Kontaktdaten von Sicher Team.';});if (!result.querySelector('#volume-export')) exportActions.append(download);
    const copy=document.createElement('button');copy.type='button';copy.className='tool-secondary tool-copy-result';copy.textContent='Liste kopieren';
    copy.addEventListener('click',async()=>{try {await navigator.clipboard.writeText(reportText(result));status.textContent='Liste mit Kontaktdaten kopiert. Sie können sie in Ihre Nachricht einfügen.';}catch(_){status.textContent='Kopieren ist in diesem Browser nicht verfügbar. Laden Sie die Textdatei herunter.';}});exportActions.append(copy,pdfFile);
    const printHeader=document.createElement('div');printHeader.className='tool-print-header';
    const logo=document.createElement('img');logo.src='/assets/images/brand-mark.svg';logo.alt='';logo.width=36;logo.height=36;
    const wordmark=document.createElement('strong');wordmark.textContent='sicher team';
    const documentLabel=document.createElement('span');documentLabel.textContent='Ihre Umzugsplanung';
    printHeader.append(logo,wordmark,documentLabel);
    const printFooter=document.createElement('div');printFooter.className='tool-print-footer';
    const footerContact=document.createElement('p');footerContact.textContent=brand.querySelector('p').textContent;
    const footerNote=document.createElement('p');footerNote.textContent='Planungshilfe · Kein verbindliches Angebot';
    printFooter.append(footerContact,footerNote);
    result.prepend(printHeader);result.append(printFooter);
    const printContact=brand.cloneNode(true);printContact.removeAttribute('id');printContact.hidden=false;printContact.className='tool-print-contact';
    const heading=document.createElement('h2');heading.className='tool-print-title';heading.textContent=title;
    const source=document.createElement('p');source.textContent='Planungshilfe: '+canonical;
    result.insertBefore(heading,printHeader.nextSibling);result.append(status,printContact,source);source.className='tool-print-contact';
    if (!result.hasAttribute('tabindex')) result.tabIndex=-1;
    if (!result.hasAttribute('aria-live')) result.setAttribute('aria-live','polite');
    const inventory = document.getElementById('volume-inventory');
    if (inventory) {
      const printInventory=document.createElement('div');printInventory.className='tool-print-inventory';result.insertBefore(printInventory,actions);
      window.addEventListener('beforeprint',()=>{
        printInventory.replaceChildren();
        const h=document.createElement('h3');h.textContent='Ihre Möbelliste';printInventory.append(h);
        const ul=document.createElement('ul');
        [...inventory.children].forEach(row=>{const name=row.querySelector('label'),qty=row.querySelector('input'),li=document.createElement('li');li.textContent=(qty?qty.value+' × ':'')+(name?name.textContent.trim():row.textContent.trim());ul.append(li);});
        printInventory.append(ul);
      });
    }
  });
})();
