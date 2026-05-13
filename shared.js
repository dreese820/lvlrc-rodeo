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
