// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// simple linked list implementation that allows you to traverse down nodes and save positions
//

export const LinkedList = {
  create: () => {
    var my = {
      root: { root: true, next: null },
      exists: (node) => ![null, my.root].includes(node),
      isEmpty: () => my.root.next === null,
      getHead: () => my.root.next,
      insertBefore: (node, check) => {
        var last = my.root;
        var here = my.root.next;
        while (here !== null) {
          if (check(here)) {
            node.prev = here.prev;
            node.next = here;
            here.prev.next = node;
            here.prev = node;
            return;
          }
          last = here;
          here = here.next;
        }
        last.next = node;
        node.prev = last;
        node.next = null;
      },
      findTransition: (check) => {
        var prev = my.root;
        var here = my.root.next;
        while (here !== null) {
          if (check(here)) break;
          prev = here;
          here = here.next;
        }
        return {
          before: prev === my.root ? null : prev,
          after: here,
          insert: function (node) {
            node.prev = prev;
            node.next = here;
            prev.next = node;
            if (here !== null) here.prev = node;
            return node;
          },
        };
      },
    };
    return my;
  },
  node: function (data) {
    data.prev = null;
    data.next = null;
    data.remove = function () {
      data.prev.next = data.next;
      if (data.next) data.next.prev = data.prev;
      data.prev = null;
      data.next = null;
    };
    return data;
  },
};

// module.exports = LinkedList;
