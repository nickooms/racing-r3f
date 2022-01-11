// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// used strictly for logging the processing of the algorithm... only useful if you intend on
// looking under the covers (for pretty UI's or debugging)
//

function BuildLog() {
  var my;
  var nextSegmentId = 0;
  var curVert = false;

  function push(type, data) {
    my.list.push({
      type,
      data: data ? JSON.parse(JSON.stringify(data)) : void 0,
    });
    return my;
  }

  my = {
    list: [],
    segmentId: () => nextSegmentId++,
    checkIntersection: (seg1, seg2) => push('check', { seg1, seg2 }),
    segmentChop: function (seg, end) {
      push('div_seg', { seg, pt: end });
      return push('chop', { seg, pt: end });
    },
    statusRemove: (seg) => push('pop_seg', { seg }),
    segmentUpdate: (seg) => push('seg_update', { seg }),
    segmentNew: (seg, primary) => push('new_seg', { seg, primary }),
    segmentRemove: (seg) => push('rem_seg', { seg }),
    tempStatus: function (seg, above, below) {
      return push('temp_status', { seg, above, below });
    },
    rewind: function (seg) {
      return push('rewind', { seg });
    },
    status: function (seg, above, below) {
      return push('status', { seg, above, below });
    },
    vert: function (x) {
      if (x === curVert) return my;
      curVert = x;
      return push('vert', { x: x });
    },
    log: function (data) {
      if (typeof data !== 'string') data = JSON.stringify(data, false, '  ');
      return push('log', { txt: data });
    },
    reset: function () {
      return push('reset');
    },
    selected: function (segs) {
      return push('selected', { segs });
    },
    chainStart: function (seg) {
      return push('chain_start', { seg });
    },
    chainRemoveHead: function (index, pt) {
      return push('chain_rem_head', { index, pt });
    },
    chainRemoveTail: function (index, pt) {
      return push('chain_rem_tail', { index, pt });
    },
    chainNew: function (pt1, pt2) {
      return push('chain_new', { pt1, pt2 });
    },
    chainMatch: function (index) {
      return push('chain_match', { index });
    },
    chainClose: function (index) {
      return push('chain_close', { index });
    },
    chainAddHead: function (index, pt) {
      return push('chain_add_head', { index, pt });
    },
    chainAddTail: function (index, pt) {
      return push('chain_add_tail', { index, pt });
    },
    chainConnect: function (index1, index2) {
      return push('chain_con', { index1, index2 });
    },
    chainReverse: function (index) {
      return push('chain_rev', { index });
    },
    chainJoin: function (index1, index2) {
      return push('chain_join', { index1, index2 });
    },
    done: function () {
      return push('done');
    },
  };
  return my;
}

module.exports = BuildLog;
