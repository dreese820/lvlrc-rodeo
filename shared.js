// Shared constants and ranking logic — included in admin.html, enter.html, results.html
var RODEOS = [
  {id:'r1',label:'Rodeo 1',date:'May 23'},
  {id:'r2',label:'Rodeo 2',date:'June 13'},
  {id:'r3',label:'Rodeo 3',date:'Aug 29'},
  {id:'r4',label:'Rodeo 4',date:'Sept 7'}
];
var AGS = ['0-5','6-9','10-14','15-18'];
var PTS = [10,9,8,7,6,5,4,3,2,1];

var EVENTS = [
  // ── GIRLS ──────────────────────────────────────────────────────────────────
  {id:'dr_g_05',   label:'Dummy Roping',         gender:'Girls',ag:'0-5',   type:'loops',ll:true},
  {id:'dr_g_69',   label:'Dummy Roping',         gender:'Girls',ag:'6-9',   type:'loops',ll:false},
  {id:'dr_g_1014', label:'Dummy Roping',         gender:'Girls',ag:'10-14', type:'loops',ll:false},
  {id:'dr_g_1518', label:'Dummy Roping',         gender:'Girls',ag:'15-18', type:'loops',ll:false},
  {id:'br_g_05',   label:'Barrel Racing',        gender:'Girls',ag:'0-5',   type:'time', ll:true},
  {id:'br_g_69',   label:'Barrel Racing',        gender:'Girls',ag:'6-9',   type:'time', ll:false},
  {id:'br_g_1014', label:'Barrel Racing',        gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'br_g_1518', label:'Barrel Racing',        gender:'Girls',ag:'15-18', type:'time', ll:false},
  {id:'po_g_05',   label:'Pole Bending',         gender:'Girls',ag:'0-5',   type:'time', ll:true},
  {id:'po_g_69',   label:'Pole Bending',         gender:'Girls',ag:'6-9',   type:'time', ll:false},
  {id:'po_g_1014', label:'Pole Bending',         gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'po_g_1518', label:'Pole Bending',         gender:'Girls',ag:'15-18', type:'time', ll:false},
  {id:'rp_g_05',   label:'Ribbon Pull',          gender:'Girls',ag:'0-5',   type:'time', ll:true},
  {id:'gt_g_05',   label:'Goat Tying',           gender:'Girls',ag:'0-5',   type:'time', ll:true},
  {id:'gt_g_69',   label:'Goat Tying',           gender:'Girls',ag:'6-9',   type:'time', ll:false},
  {id:'gt_g_1014', label:'Goat Tying',           gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'gt_g_1518', label:'Goat Tying',           gender:'Girls',ag:'15-18', type:'time', ll:false},
  {id:'ba_g_1014', label:'Breakaway',            gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'ba_g_1518', label:'Breakaway',            gender:'Girls',ag:'15-18', type:'time', ll:false},
  {id:'trh_g_1014',label:'Team Roping (Header)', gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'tre_g_1014',label:'Team Roping (Heeler)', gender:'Girls',ag:'10-14', type:'time', ll:false},
  {id:'trh_g_1518',label:'Team Roping (Header)', gender:'Girls',ag:'15-18', type:'time', ll:false},
  {id:'tre_g_1518',label:'Team Roping (Heeler)', gender:'Girls',ag:'15-18', type:'time', ll:false},
  // ── BOYS ───────────────────────────────────────────────────────────────────
  {id:'dr_b_05',   label:'Dummy Roping',         gender:'Boys',ag:'0-5',   type:'loops',ll:true},
  {id:'dr_b_69',   label:'Dummy Roping',         gender:'Boys',ag:'6-9',   type:'loops',ll:false},
  {id:'dr_b_1014', label:'Dummy Roping',         gender:'Boys',ag:'10-14', type:'loops',ll:false},
  {id:'dr_b_1518', label:'Dummy Roping',         gender:'Boys',ag:'15-18', type:'loops',ll:false},
  {id:'br_b_05',   label:'Barrel Racing',        gender:'Boys',ag:'0-5',   type:'time', ll:true},
  {id:'br_b_69',   label:'Barrel Racing',        gender:'Boys',ag:'6-9',   type:'time', ll:false},
  {id:'br_b_1014', label:'Barrel Racing',        gender:'Boys',ag:'10-14', type:'time', ll:false},
  {id:'po_b_05',   label:'Pole Bending',         gender:'Boys',ag:'0-5',   type:'time', ll:true},
  {id:'po_b_69',   label:'Pole Bending',         gender:'Boys',ag:'6-9',   type:'time', ll:false},
  {id:'rp_b_05',   label:'Ribbon Pull',          gender:'Boys',ag:'0-5',   type:'time', ll:true},
  {id:'gt_b_05',   label:'Goat Tying',           gender:'Boys',ag:'0-5',   type:'time', ll:true},
  {id:'gt_b_69',   label:'Goat Tying',           gender:'Boys',ag:'6-9',   type:'time', ll:false},
  {id:'gt_b_1014', label:'Goat Tying',           gender:'Boys',ag:'10-14', type:'time', ll:false},
  {id:'gt_b_1518', label:'Goat Tying',           gender:'Boys',ag:'15-18', type:'time', ll:false},
  {id:'ba_b_1014', label:'Breakaway',            gender:'Boys',ag:'10-14', type:'time', ll:false},
  {id:'cr_b_69',   label:'Calf Ride',            gender:'Boys',ag:'6-9',   type:'score',ll:false},
  {id:'sr_b_1014', label:'Steer Riding',         gender:'Boys',ag:'10-14', type:'score',ll:false},
  {id:'bu_b_1518', label:'Bull Riding',          gender:'Boys',ag:'15-18', type:'score',ll:false},
  {id:'cro_b_1518',label:'Calf Roping',          gender:'Boys',ag:'15-18', type:'time', ll:false},
  {id:'trh_b_1014',label:'Team Roping (Header)', gender:'Boys',ag:'10-14', type:'time', ll:false},
  {id:'tre_b_1014',label:'Team Roping (Heeler)', gender:'Boys',ag:'10-14', type:'time', ll:false},
  {id:'trh_b_1518',label:'Team Roping (Header)', gender:'Boys',ag:'15-18', type:'time', ll:false},
  {id:'tre_b_1518',label:'Team Roping (Heeler)', gender:'Boys',ag:'15-18', type:'time', ll:false}
];

// ─── Print results document builder ─────────────────────────────────────────
// gCfn is the caller's gC lookup: function(cid) -> {name:...}
function buildResultsPrintDoc(rod, sections, gCfn) {
  function fmtResult(ev, r) {
    if (ev.type === 'time') {
      if (r.noTime) return 'NT';
      var tv = parseFloat(r.time) || 0;
      if (!tv) return '—';
      var pv = parseFloat(r.pen) || 0;
      return (tv + pv).toFixed(3) + (pv > 0 ? ' +' + pv : '');
    }
    if (ev.type === 'loops') {
      if (r.noTime) return 'NT';
      var lc = r.loopCount || 0;
      if (!lc) return '—';
      return lc + ' / ' + (r.loopTotal || '?');
    }
    if (ev.type === 'score') {
      if (r.noTime) return 'NS';
      return (r.score !== undefined && r.score !== '') ? r.score : '—';
    }
    return '—';
  }

  var css = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    'body{font-family:Arial,sans-serif;font-size:10pt;color:#000;background:#fff;}',
    'h1{font-size:13pt;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;text-align:center;}',
    '.sub{font-size:9pt;text-align:center;margin-top:3px;margin-bottom:12px;padding-bottom:10px;border-bottom:1pt solid #000;}',
    '.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;}',
    '.box{border:1pt solid #bbb;border-radius:3pt;padding:7px 9px;break-inside:avoid;}',
    '.etitle{font-weight:bold;font-size:9.5pt;}',
    '.esub{font-size:7.5pt;color:#555;margin-bottom:4px;padding-bottom:3px;border-bottom:1pt solid #ddd;text-transform:uppercase;letter-spacing:.05em;}',
    'table{width:100%;border-collapse:collapse;margin-top:2px;}',
    'th{font-size:7pt;text-transform:uppercase;letter-spacing:.04em;color:#777;padding:2px 3px;border-bottom:1pt solid #ccc;text-align:left;}',
    'th.r,td.r{text-align:right;}',
    'td{font-size:8.5pt;padding:2px 3px;border-bottom:1pt dotted #ebebeb;}',
    'tr:last-child td{border-bottom:none;}',
    '.p1 td{font-weight:bold;}',
    '.p1 td:first-child::before{content:"★ ";}',
    '.nt td{color:#aaa;}',
    '.mono{font-family:monospace;font-size:8pt;}',
    '@media print{body{padding:0;}@page{size:letter;margin:0.35in;}}'
  ].join('');

  var body = '<h1>Long Valley Lions Rodeo Club</h1>';
  body += '<div class="sub">' + rod.label + ' &mdash; ' + rod.date + ' &nbsp;&bull;&nbsp; Event Results</div>';
  body += '<div class="grid">';

  sections.forEach(function(s) {
    body += '<div class="box">';
    body += '<div class="etitle">' + s.ev.label + '</div>';
    body += '<div class="esub">' + s.gender + ' &bull; Age ' + s.ag + '</div>';
    body += '<table><thead><tr><th>Place</th><th>Contestant</th>';
    if (s.ev.type === 'loops') body += '<th class="r">Catches / Time</th>';
    if (s.ev.type === 'time')  body += '<th class="r">Total</th>';
    if (s.ev.type === 'score') body += '<th class="r">Score</th>';
    body += '<th class="r">Pts</th></tr></thead><tbody>';
    s.ranked.forEach(function(r) {
      var isFirst = r.place === 1;
      var isNT    = !r.place && !r.ll;
      var name    = gCfn(r.cid).name;
      var pl      = r.ll ? (r.place ? r.place + ' LL' : 'LL') : (r.place || 'NT');
      body += '<tr class="' + (isFirst ? 'p1' : isNT ? 'nt' : '') + '">';
      body += '<td>' + pl + '</td>';
      body += '<td>' + name + '</td>';
      body += '<td class="r mono">' + fmtResult(s.ev, r) + '</td>';
      body += '<td class="r">' + (r.points > 0 ? r.points : '-') + '</td>';
      body += '</tr>';
    });
    body += '</tbody></table></div>';
  });

  body += '</div>';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Results &mdash; ' + rod.label + '</title>'
    + '<style>' + css + '</style></head><body>' + body
    + '<scr' + 'ipt>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</scr' + 'ipt>'
    + '</body></html>';
}

// ─── Season points sheet builder ────────────────────────────────────────────
// Produces a full HTML document: one section per event, Girls/Boys side by side,
// each age group listed, columns: Name | R1 | R2 | R3 | R4 | Total | Rank (top 10).
function buildSeasonPointsDoc(allEntries, allResults, contestants) {
  var cMap = {};
  (contestants || []).forEach(function(c){ cMap[c.id] = c; });

  var today = new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});

  // Unique event labels in EVENTS definition order
  var evLabels = [], seenL = {};
  EVENTS.forEach(function(ev){
    if (!seenL[ev.label]) { seenL[ev.label] = true; evLabels.push(ev.label); }
  });

  var css = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    'body{font-family:Arial,sans-serif;font-size:9pt;color:#000;background:#fff;}',
    'h1{font-size:13pt;font-weight:bold;text-align:center;text-transform:uppercase;letter-spacing:.06em;}',
    '.sub{font-size:8.5pt;text-align:center;margin:3px 0 12px;padding-bottom:8px;border-bottom:2pt solid #000;}',
    '.ev-section{margin-bottom:14px;}',
    '.ev-title{font-size:10.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:.06em;',
    'border-bottom:1.5pt solid #000;padding-bottom:3px;margin-bottom:6px;}',
    '.ag-block{margin-bottom:8px;break-inside:avoid;}',
    '.ag-label{font-size:7.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#444;margin-bottom:3px;}',
    '.sides{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;}',
    '.sides.solo{grid-template-columns:1fr;}',
    '.side-hdr{font-size:7pt;font-weight:bold;text-transform:uppercase;letter-spacing:.06em;',
    'background:#e8e8e8;padding:2px 4px;margin-bottom:1px;}',
    '.no-ent{font-size:7pt;color:#999;font-style:italic;padding:3px 4px;}',
    'table{width:100%;border-collapse:collapse;}',
    'th{font-size:6pt;text-transform:uppercase;letter-spacing:.04em;color:#555;',
    'border-bottom:1pt solid #ccc;padding:2px 4px;text-align:left;white-space:nowrap;}',
    'th.r,td.r{text-align:right;}',
    'td{font-size:7.5pt;padding:2px 4px;border-bottom:1pt dotted #e0e0e0;}',
    'tr:last-child td{border-bottom:none;}',
    '.t1 td{font-weight:bold;}',
    '.rk{color:#777;font-size:6.5pt;}',
    '@media print{body{padding:0;}@page{size:letter;margin:0.35in;}}'
  ].join('');

  function buildTable(ev) {
    var cidSet = {};
    RODEOS.forEach(function(rod){
      var ents = (allEntries[rod.id] && allEntries[rod.id][ev.id]) || [];
      ents.forEach(function(cid){ cidSet[cid] = true; });
    });
    var cids = Object.keys(cidSet);
    if (!cids.length) return '<div class="no-ent">No entries</div>';

    var cache = {};
    RODEOS.forEach(function(rod, ri){
      var ranked = rankEv(allEntries[rod.id]||{}, allResults[rod.id]||{}, ev.id);
      ranked.forEach(function(r){
        if (!cache[r.cid]) cache[r.cid] = [0,0,0,0];
        cache[r.cid][ri] = r.points || 0;
      });
    });

    var rows = cids.map(function(cid){
      var pts = cache[cid] || [0,0,0,0];
      return {name:(cMap[cid]||{name:'?'}).name, pts:pts, total:pts.reduce(function(a,b){return a+b;},0)};
    });
    rows.sort(function(a,b){ return b.total - a.total; });

    var h = '<table><thead><tr><th>Contestant</th>';
    RODEOS.forEach(function(r){ h += '<th class="r">' + r.date + '</th>'; });
    h += '<th class="r">Total</th><th class="r">Rank</th></tr></thead><tbody>';
    rows.forEach(function(row, i){
      h += '<tr' + (i === 0 ? ' class="t1"' : '') + '>';
      h += '<td>' + row.name + '</td>';
      row.pts.forEach(function(p){ h += '<td class="r">' + (p || '') + '</td>'; });
      h += '<td class="r">' + (row.total || '') + '</td>';
      h += '<td class="r rk">' + (i < 10 ? i + 1 : '') + '</td>';
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  var body = '<h1>Long Valley Lions Rodeo Club</h1>';
  body += '<div class="sub">Season Points Sheet &nbsp;&bull;&nbsp; ' + today + '</div>';

  evLabels.forEach(function(evLabel){
    var agBlocks = '';
    AGS.forEach(function(ag){
      var gEv = EVENTS.find(function(e){ return e.label===evLabel && e.gender==='Girls' && e.ag===ag; });
      var bEv = EVENTS.find(function(e){ return e.label===evLabel && e.gender==='Boys'  && e.ag===ag; });
      if (!gEv && !bEv) return;
      var both = !!(gEv && bEv);
      agBlocks += '<div class="ag-block">';
      agBlocks += '<div class="ag-label">Age ' + ag + '</div>';
      agBlocks += '<div class="sides' + (both ? '' : ' solo') + '">';
      if (gEv) agBlocks += '<div><div class="side-hdr">Girls</div>' + buildTable(gEv) + '</div>';
      if (bEv) agBlocks += '<div><div class="side-hdr">Boys</div>'  + buildTable(bEv) + '</div>';
      agBlocks += '</div></div>';
    });
    if (!agBlocks) return;
    body += '<div class="ev-section"><div class="ev-title">' + evLabel + '</div>' + agBlocks + '</div>';
  });

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Season Points &mdash; Long Valley Lions</title>'
    + '<style>' + css + '</style></head><body>' + body
    + '<scr'+'ipt>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</scr'+'ipt>'
    + '</body></html>';
}

// ─── Event standings document builder ───────────────────────────────────────
// Produces a print-ready HTML document for one event label across all 4 rodeos.
// Same columns/style as buildSeasonPointsDoc but scoped to a single event.
function buildEventStandingsDoc(evLabel, allEntries, allResults, contestants) {
  var cMap = {};
  (contestants || []).forEach(function(c){ cMap[c.id] = c; });
  var today = new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});

  var css = [
    '*{box-sizing:border-box;margin:0;padding:0;}',
    'body{font-family:Arial,sans-serif;font-size:9pt;color:#000;background:#fff;}',
    'h1{font-size:13pt;font-weight:bold;text-align:center;text-transform:uppercase;letter-spacing:.06em;}',
    '.sub{font-size:8.5pt;text-align:center;margin:3px 0 12px;padding-bottom:8px;border-bottom:2pt solid #000;}',
    '.ag-block{margin-bottom:12px;break-inside:avoid;}',
    '.ag-label{font-size:8pt;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#444;margin-bottom:3px;}',
    '.sides{display:grid;grid-template-columns:1fr 1fr;gap:0 14px;}',
    '.sides.solo{grid-template-columns:1fr;}',
    '.side-hdr{font-size:7pt;font-weight:bold;text-transform:uppercase;letter-spacing:.06em;',
    'background:#e8e8e8;padding:2px 4px;margin-bottom:2px;}',
    '.no-ent{font-size:7pt;color:#999;font-style:italic;padding:3px 4px;}',
    'table{width:100%;border-collapse:collapse;}',
    'th{font-size:6pt;text-transform:uppercase;letter-spacing:.04em;color:#555;',
    'border-bottom:1pt solid #ccc;padding:2px 4px;text-align:left;white-space:nowrap;}',
    'th.r,td.r{text-align:right;}',
    'td{font-size:7.5pt;padding:2px 4px;border-bottom:1pt dotted #e0e0e0;}',
    'tr:last-child td{border-bottom:none;}',
    '.t1 td{font-weight:bold;}',
    '.rk{color:#777;font-size:6.5pt;}',
    '@media print{body{padding:0;}@page{size:letter;margin:0.35in;}}'
  ].join('');

  function buildTable(ev) {
    var cidSet = {};
    RODEOS.forEach(function(rod){
      ((allEntries[rod.id] || {})[ev.id] || []).forEach(function(cid){ cidSet[cid] = true; });
    });
    var cids = Object.keys(cidSet);
    if (!cids.length) return '<div class="no-ent">No entries</div>';
    var cache = {};
    RODEOS.forEach(function(rod, ri){
      rankEv(allEntries[rod.id]||{}, allResults[rod.id]||{}, ev.id).forEach(function(r){
        if (!cache[r.cid]) cache[r.cid] = [0,0,0,0];
        cache[r.cid][ri] = r.points || 0;
      });
    });
    var rows = cids.map(function(cid){
      var pts = cache[cid] || [0,0,0,0];
      return {name:(cMap[cid]||{name:'?'}).name, pts:pts, total:pts.reduce(function(a,b){return a+b;},0)};
    }).sort(function(a,b){ return b.total - a.total; });

    var h = '<table><thead><tr><th>Contestant</th>';
    RODEOS.forEach(function(r){ h += '<th class="r">' + r.date + '</th>'; });
    h += '<th class="r">Total</th><th class="r">Rank</th></tr></thead><tbody>';
    rows.forEach(function(row, i){
      h += '<tr' + (i === 0 ? ' class="t1"' : '') + '><td>' + row.name + '</td>';
      row.pts.forEach(function(p){ h += '<td class="r">' + (p || '') + '</td>'; });
      h += '<td class="r">' + (row.total || '') + '</td><td class="r rk">' + (i + 1) + '</td></tr>';
    });
    return h + '</tbody></table>';
  }

  var body = '<h1>Long Valley Lions Rodeo Club</h1>';
  body += '<div class="sub">' + evLabel + ' &mdash; Season Standings &nbsp;&bull;&nbsp; ' + today + '</div>';

  AGS.forEach(function(ag){
    var gEv = EVENTS.find(function(e){ return e.label===evLabel && e.gender==='Girls' && e.ag===ag; });
    var bEv = EVENTS.find(function(e){ return e.label===evLabel && e.gender==='Boys'  && e.ag===ag; });
    if (!gEv && !bEv) return;
    var both = !!(gEv && bEv);
    body += '<div class="ag-block"><div class="ag-label">Age ' + ag + '</div>';
    body += '<div class="sides' + (both ? '' : ' solo') + '">';
    if (gEv) body += '<div><div class="side-hdr">Girls</div>' + buildTable(gEv) + '</div>';
    if (bEv) body += '<div><div class="side-hdr">Boys</div>'  + buildTable(bEv) + '</div>';
    body += '</div></div>';
  });

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + evLabel + ' Standings &mdash; Long Valley Lions</title>'
    + '<style>' + css + '</style></head><body>' + body
    + '<scr'+'ipt>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};</scr'+'ipt>'
    + '</body></html>';
}

// ─── Ranking logic (identical to original) ───────────────────────────────────
function rankEv(entries, results, eid) {
  var ev = EVENTS.find(function(e){ return e.id === eid; });
  if (!ev) return [];
  var ents = entries[eid] || [];
  var rows = ents.map(function(cid){
    var r = (results[eid] && results[eid][cid]) || {};
    return {cid:cid, time:r.time, pen:r.pen, loop1:r.loop1, loop2:r.loop2, loop3:r.loop3,
            loopCount:r.loopCount, loopTotal:r.loopTotal, score:r.score, noTime:r.noTime, ll:r.ll};
  });

  function hasScore(e){
    if (ev.type==='loops') return (e.loopCount||0)>0 && !e.noTime;
    if (ev.type==='score') return e.score!==undefined && e.score!=='' && !isNaN(parseFloat(e.score)) && !e.noTime;
    return e.time!==undefined && e.time!=='' && !isNaN(parseFloat(e.time)) && !e.noTime;
  }
  function gV(e){
    if (ev.type==='loops') return {lp:e.loopCount||0, t:parseFloat(e.loopTotal)||999};
    if (ev.type==='score') return parseFloat(e.score)||0;
    return (parseFloat(e.time)||999)+(parseFloat(e.pen)||0);
  }
  function cmp(a,b){
    if (ev.type==='loops'){var av=gV(a),bv=gV(b);if(bv.lp!==av.lp)return bv.lp-av.lp;return av.t-bv.t;}
    if (ev.type==='score') return gV(b)-gV(a);
    return gV(a)-gV(b);
  }
  function tied(a,b){
    if (!hasScore(a)||!hasScore(b)) return false;
    if (ev.type==='loops'){var av=gV(a),bv=gV(b);return av.lp===bv.lp&&av.t===bv.t;}
    return gV(a)===gV(b);
  }

  // Four buckets matching the original app's exact ordering
  var valid=[], noScore=[], llV=[], llNoScore=[];
  rows.forEach(function(e){
    var hs=hasScore(e);
    if(e.ll){ hs ? llV.push(e) : llNoScore.push(e); }
    else     { hs ? valid.push(e) : noScore.push(e); }
  });
  valid.sort(cmp); llV.sort(cmp);

  var out=[];

  // 1) Independent scored — points from PTS[0..]
  var i=0;
  while(i<valid.length){
    var j=i+1;
    while(j<valid.length&&tied(valid[i],valid[j]))j++;
    var sl=PTS.slice(i,j),pts=sl.length?sl.reduce(function(a,b){return a+b;},0)/(j-i):0;
    for(var k=i;k<j;k++){var o=Object.assign({},valid[k]);o.place=i+1;o.points=pts;out.push(o);}
    i=j;
  }

  // 2) Independent NT/TO — no points, no place
  noScore.forEach(function(e){var o=Object.assign({},e);o.place=null;o.points=0;out.push(o);});

  // 3) LL scored — offset by valid + noScore so NT riders consume point slots (matches original)
  var llOffset=valid.length+noScore.length, li=0;
  while(li<llV.length){
    var lj=li+1;
    while(lj<llV.length&&tied(llV[li],llV[lj]))lj++;
    var sl2=PTS.slice(llOffset+li,llOffset+lj),pts2=sl2.length?sl2.reduce(function(a,b){return a+b;},0)/(lj-li):0;
    for(var k=li;k<lj;k++){var o2=Object.assign({},llV[k]);o2.place=llOffset+li+1;o2.points=pts2;out.push(o2);}
    li=lj;
  }

  // 4) LL NT/TO — no points, no place
  llNoScore.forEach(function(e){var o=Object.assign({},e);o.place=null;o.points=0;out.push(o);});

  return out;
}

// allAA returns {contestantId: totalPoints} across all 4 rodeos.
// Pass contestants array to exclude cross-age entries from all-around totals.
function allAA(allEntries, allResults, contestants) {
  var t = {};
  var cMap = {};
  (contestants || []).forEach(function(c){ cMap[c.id] = c; });
  RODEOS.forEach(function(rod){
    EVENTS.forEach(function(ev){
      var ents = (allEntries[rod.id]&&allEntries[rod.id][ev.id])||[];
      if (!ents.length) return;
      var ranked = rankEv(
        (allEntries[rod.id]||{}),
        (allResults[rod.id]||{}),
        ev.id
      );
      ranked.forEach(function(r){
        if (r.points > 0) {
          var c = cMap[r.cid];
          if (c && c.ageGroup !== ev.ag) return; // cross-age: no all-around credit
          t[r.cid] = (t[r.cid]||0) + r.points;
        }
      });
    });
  });
  return t;
}
