/*
 * @copyright 2016 Sean Connelly (@voidqk), http://syntheti.cc
 * @license MIT
 * @preserve Project Home: https://github.com/voidqk/polybooljs
 */

import BuildLog from './build-log';
import { Epsilon } from './epsilon';
import { Intersecter } from './intersecter';
import { SegmentChainer } from './segment-chainer';
import { SegmentSelector } from './segment-selector';
import { GeoJSON } from './geojson';

var buildLog = false;
var epsilon = Epsilon();

const operate = (poly1, poly2, selector) => {
  const seg1 = PolyBool.segments(poly1);
  const seg2 = PolyBool.segments(poly2);
  const comb = PolyBool.combine(seg1, seg2);
  const seg3 = selector(comb);
  return PolyBool.polygon(seg3);
};

export const PolyBool = {
  // getter/setter for buildLog
  buildLog: (bl) => {
    if (bl === true) {
      buildLog = BuildLog();
    } else if (bl === false) {
      buildLog = false;
    }
    return buildLog === false ? false : buildLog.list;
  },
  // getter/setter for epsilon
  epsilon: (v) => epsilon.epsilon(v),

  // core API
  segments: ({ regions, inverted }) => {
    const i = Intersecter(true, epsilon, buildLog);
    regions.forEach(i.addRegion);
    return {
      segments: i.calculate(inverted),
      inverted,
    };
  },
  combine: (segments1, segments2) => {
    const i3 = Intersecter(false, epsilon, buildLog);
    return {
      combined: i3.calculate(
        segments1.segments,
        segments1.inverted,
        segments2.segments,
        segments2.inverted
      ),
      inverted1: segments1.inverted,
      inverted2: segments2.inverted,
    };
  },
  selectUnion: ({ combined, inverted1, inverted2 }) => ({
    segments: SegmentSelector.union(combined, buildLog),
    inverted: inverted1 || inverted2,
  }),
  selectIntersect: ({ combined, inverted1, inverted2 }) => ({
    segments: SegmentSelector.intersect(combined, buildLog),
    inverted: inverted1 && inverted2,
  }),
  selectDifference: ({ combined, inverted1, inverted2 }) => ({
    segments: SegmentSelector.difference(combined, buildLog),
    inverted: inverted1 && !inverted2,
  }),
  selectDifferenceRev: ({ combined, inverted1, inverted2 }) => ({
    segments: SegmentSelector.differenceRev(combined, buildLog),
    inverted: !inverted1 && inverted2,
  }),
  selectXor: ({ combined, inverted1, inverted2 }) => ({
    segments: SegmentSelector.xor(combined, buildLog),
    inverted: inverted1 !== inverted2,
  }),
  polygon: ({ segments, inverted }) => ({
    regions: SegmentChainer(segments, epsilon, buildLog),
    inverted,
  }),

  // GeoJSON converters
  polygonFromGeoJSON: (geojson) => GeoJSON.toPolygon(PolyBool, geojson),
  polygonToGeoJSON: (poly) => GeoJSON.fromPolygon(PolyBool, epsilon, poly),
  // helper functions for common operations
  union: (poly1, poly2) => operate(poly1, poly2, PolyBool.selectUnion),
  intersect: (poly1, poly2) => operate(poly1, poly2, PolyBool.selectIntersect),
  difference: (poly1, poly2) => operate(poly1, poly2, PolyBool.selectDifference),
  differenceRev: (poly1, poly2) => operate(poly1, poly2, PolyBool.selectDifferenceRev),
  xor: (poly1, poly2) => operate(poly1, poly2, PolyBool.selectXor),
};
