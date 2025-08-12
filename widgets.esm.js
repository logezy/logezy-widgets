/**
* vue v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var In, Dn;
let Rl, Ee, ee, Dt, $t, dn, Yn, hn, mt, el;
function Sn(e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
let te = {}, At = [], Xe = () => {
}, ks = () => !1, Cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || 97 > e.charCodeAt(2)), pl = (e) => e.startsWith("onUpdate:"), re = Object.assign, dl = (e, t) => {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, As = Object.prototype.hasOwnProperty, G = (e, t) => As.call(e, t), F = Array.isArray, Et = (e) => wn(e) === "[object Map]", hr = (e) => wn(e) === "[object Set]", I = (e) => typeof e == "function", oe = (e) => typeof e == "string", dt = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", gr = (e) => (le(e) || I(e)) && I(e.then) && I(e.catch), vr = Object.prototype.toString, wn = (e) => vr.call(e), kn = (e) => wn(e) === "[object Object]", hl = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vt = Sn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), An = (e) => {
  let t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Es = /-(\w)/g, $e = An((e) => e.replace(Es, (t, n) => n ? n.toUpperCase() : "")), Ts = /\B([A-Z])/g, Me = An((e) => e.replace(Ts, "-$1").toLowerCase()), _r = An((e) => e.charAt(0).toUpperCase() + e.slice(1)), $n = An((e) => e ? `on${_r(e)}` : ""), ft = (e, t) => !Object.is(e, t), Vn = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, tl = (e, t, n, l = !1) => {
  Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: l, value: n });
}, Os = (e) => {
  let t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ut = (e) => {
  let t = oe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, En = () => Rl || (Rl = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {}), Ps = Sn("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function gl(e) {
  if (F(e)) {
    let t = {};
    for (let n = 0; n < e.length; n++) {
      let l = e[n], r = oe(l) ? function(i) {
        let o = {};
        return i.replace(Fs, "").split(Ls).forEach((s) => {
          if (s) {
            let a = s.split(Rs);
            a.length > 1 && (o[a[0].trim()] = a[1].trim());
          }
        }), o;
      }(l) : gl(l);
      if (r) for (let i in r) t[i] = r[i];
    }
    return t;
  }
  if (oe(e) || le(e)) return e;
}
let Ls = /;(?![^(]*\))/g, Rs = /:([^]+)/, Fs = /\/\*[^]*?\*\//g;
function vl(e) {
  let t = "";
  if (oe(e)) t = e;
  else if (F(e)) for (let n = 0; n < e.length; n++) {
    let l = vl(e[n]);
    l && (t += l + " ");
  }
  else if (le(e)) for (let n in e) e[n] && (t += n + " ");
  return t.trim();
}
let js = Sn("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"), mr = (e) => !!(e && e.__v_isRef === !0), yt = (e) => oe(e) ? e : e == null ? "" : F(e) || le(e) && (e.toString === vr || !I(e.toString)) ? mr(e) ? yt(e.value) : JSON.stringify(e, yr, 2) : String(e), yr = (e, t) => mr(t) ? yr(e, t.value) : Et(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [l, r], i) => (n[Un(l, i) + " =>"] = r, n), {}) } : hr(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Un(n)) } : dt(t) ? Un(t) : le(t) && !F(t) && !kn(t) ? String(t) : t, Un = (e, t = "") => {
  var n;
  return dt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
class Ms {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ee, !t && Ee && (this.index = (Ee.scopes || (Ee.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      let t, n;
      if (this._isPaused = !0, this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      let t, n;
      if (this._isPaused = !1, this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      let n = Ee;
      try {
        return Ee = this, t();
      } finally {
        Ee = n;
      }
    }
  }
  on() {
    ++this._on == 1 && (this.prevScope = Ee, Ee = this);
  }
  off() {
    this._on > 0 && --this._on == 0 && (Ee = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      let n, l;
      for (n = 0, this._active = !1, l = this.effects.length; n < l; n++) this.effects[n].stop();
      for (n = 0, this.effects.length = 0, l = this.cleanups.length; n < l; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, l = this.scopes.length; n < l; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        let r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ns() {
  return Ee;
}
let Bn = /* @__PURE__ */ new WeakSet();
class br {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ee && Ee.active && Ee.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags && (this.flags &= -65, Bn.has(this) && (Bn.delete(this), this.trigger()));
  }
  notify() {
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || xr(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, Fl(this), Sr(this);
    let t = ee, n = Ve;
    ee = this, Ve = !0;
    try {
      return this.fn();
    } finally {
      Cr(this), ee = t, Ve = n, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let t = this.deps; t; t = t.nextDep) ml(t);
      this.deps = this.depsTail = void 0, Fl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? Bn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    nl(this) && this.run();
  }
  get dirty() {
    return nl(this);
  }
}
let Tn = 0;
function xr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = $t, $t = e;
    return;
  }
  e.next = Dt, Dt = e;
}
function _l() {
  let e;
  if (!(--Tn > 0)) {
    if ($t) {
      let t = $t;
      for ($t = void 0; t; ) {
        let n = t.next;
        t.next = void 0, t.flags &= -9, t = n;
      }
    }
    for (; Dt; ) {
      let t = Dt;
      for (Dt = void 0; t; ) {
        let n = t.next;
        if (t.next = void 0, t.flags &= -9, 1 & t.flags) try {
          t.trigger();
        } catch (l) {
          e || (e = l);
        }
        t = n;
      }
    }
    if (e) throw e;
  }
}
function Sr(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Cr(e) {
  let t, n = e.depsTail, l = n;
  for (; l; ) {
    let r = l.prevDep;
    l.version === -1 ? (l === n && (n = r), ml(l), function(i) {
      let { prevDep: o, nextDep: s } = i;
      o && (o.nextDep = s, i.prevDep = void 0), s && (s.prevDep = o, i.nextDep = void 0);
    }(l)) : t = l, l.dep.activeLink = l.prevActiveLink, l.prevActiveLink = void 0, l = r;
  }
  e.deps = t, e.depsTail = n;
}
function nl(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (wr(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function wr(e) {
  if (4 & e.flags && !(16 & e.flags) || (e.flags &= -17, e.globalVersion === Jt) || (e.globalVersion = Jt, !e.isSSR && 128 & e.flags && (!e.deps && !e._dirty || !nl(e)))) return;
  e.flags |= 2;
  let t = e.dep, n = ee, l = Ve;
  ee = e, Ve = !0;
  try {
    Sr(e);
    let r = e.fn(e._value);
    (t.version === 0 || ft(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ee = n, Ve = l, Cr(e), e.flags &= -3;
  }
}
function ml(e, t = !1) {
  let { dep: n, prevSub: l, nextSub: r } = e;
  if (l && (l.nextSub = r, e.prevSub = void 0), r && (r.prevSub = l, e.nextSub = void 0), n.subs === e && (n.subs = l, !l && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) ml(i, !0);
  }
  t || --n.sc || !n.map || n.map.delete(n.key);
}
let Ve = !0, kr = [];
function et() {
  kr.push(Ve), Ve = !1;
}
function tt() {
  let e = kr.pop();
  Ve = e === void 0 || e;
}
function Fl(e) {
  let { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    let n = ee;
    ee = void 0;
    try {
      t();
    } finally {
      ee = n;
    }
  }
}
let Jt = 0;
class Is {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class yl {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ee || !Ve || ee === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ee) n = this.activeLink = new Is(ee, this), ee.deps ? (n.prevDep = ee.depsTail, ee.depsTail.nextDep = n, ee.depsTail = n) : ee.deps = ee.depsTail = n, function l(r) {
      if (r.dep.sc++, 4 & r.sub.flags) {
        let i = r.dep.computed;
        if (i && !r.dep.subs) {
          i.flags |= 20;
          for (let s = i.deps; s; s = s.nextDep) l(s);
        }
        let o = r.dep.subs;
        o !== r && (r.prevSub = o, o && (o.nextSub = r)), r.dep.subs = r;
      }
    }(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      let l = n.nextDep;
      l.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = l), n.prevDep = ee.depsTail, n.nextDep = void 0, ee.depsTail.nextDep = n, ee.depsTail = n, ee.deps === n && (ee.deps = l);
    }
    return n;
  }
  trigger(t) {
    this.version++, Jt++, this.notify(t);
  }
  notify(t) {
    Tn++;
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      _l();
    }
  }
}
let ll = /* @__PURE__ */ new WeakMap(), xt = Symbol(""), rl = Symbol(""), Gt = Symbol("");
function ve(e, t, n) {
  if (Ve && ee) {
    let l = ll.get(e);
    l || ll.set(e, l = /* @__PURE__ */ new Map());
    let r = l.get(n);
    r || (l.set(n, r = new yl()), r.map = l, r.key = n), r.track();
  }
}
function Ye(e, t, n, l, r, i) {
  let o = ll.get(e);
  if (!o) return void Jt++;
  let s = (a) => {
    a && a.trigger();
  };
  if (Tn++, t === "clear") o.forEach(s);
  else {
    let a = F(e), f = a && hl(n);
    if (a && n === "length") {
      let p = Number(l);
      o.forEach((d, S) => {
        (S === "length" || S === Gt || !dt(S) && S >= p) && s(d);
      });
    } else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), f && s(o.get(Gt)), t) {
      case "add":
        a ? f && s(o.get("length")) : (s(o.get(xt)), Et(e) && s(o.get(rl)));
        break;
      case "delete":
        !a && (s(o.get(xt)), Et(e) && s(o.get(rl)));
        break;
      case "set":
        Et(e) && s(o.get(xt));
    }
  }
  _l();
}
function wt(e) {
  let t = q(e);
  return t === e ? t : (ve(t, "iterate", Gt), Ne(e) ? t : t.map(ge));
}
function On(e) {
  return ve(e = q(e), "iterate", Gt), e;
}
let Ds = { __proto__: null, [Symbol.iterator]() {
  return Wn(this, Symbol.iterator, ge);
}, concat(...e) {
  return wt(this).concat(...e.map((t) => F(t) ? wt(t) : t));
}, entries() {
  return Wn(this, "entries", (e) => (e[1] = ge(e[1]), e));
}, every(e, t) {
  return Ke(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return Ke(this, "filter", e, t, (n) => n.map(ge), arguments);
}, find(e, t) {
  return Ke(this, "find", e, t, ge, arguments);
}, findIndex(e, t) {
  return Ke(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return Ke(this, "findLast", e, t, ge, arguments);
}, findLastIndex(e, t) {
  return Ke(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return Ke(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return zn(this, "includes", e);
}, indexOf(...e) {
  return zn(this, "indexOf", e);
}, join(e) {
  return wt(this).join(e);
}, lastIndexOf(...e) {
  return zn(this, "lastIndexOf", e);
}, map(e, t) {
  return Ke(this, "map", e, t, void 0, arguments);
}, pop() {
  return jt(this, "pop");
}, push(...e) {
  return jt(this, "push", e);
}, reduce(e, ...t) {
  return jl(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return jl(this, "reduceRight", e, t);
}, shift() {
  return jt(this, "shift");
}, some(e, t) {
  return Ke(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return jt(this, "splice", e);
}, toReversed() {
  return wt(this).toReversed();
}, toSorted(e) {
  return wt(this).toSorted(e);
}, toSpliced(...e) {
  return wt(this).toSpliced(...e);
}, unshift(...e) {
  return jt(this, "unshift", e);
}, values() {
  return Wn(this, "values", ge);
} };
function Wn(e, t, n) {
  let l = On(e), r = l[t]();
  return l === e || Ne(e) || (r._next = r.next, r.next = () => {
    let i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
let $s = Array.prototype;
function Ke(e, t, n, l, r, i) {
  let o = On(e), s = o !== e && !Ne(e), a = o[t];
  if (a !== $s[t]) {
    let d = a.apply(e, i);
    return s ? ge(d) : d;
  }
  let f = n;
  o !== e && (s ? f = function(d, S) {
    return n.call(this, ge(d), S, e);
  } : n.length > 2 && (f = function(d, S) {
    return n.call(this, d, S, e);
  }));
  let p = a.call(o, f, l);
  return s && r ? r(p) : p;
}
function jl(e, t, n, l) {
  let r = On(e), i = n;
  return r !== e && (Ne(e) ? n.length > 3 && (i = function(o, s, a) {
    return n.call(this, o, s, a, e);
  }) : i = function(o, s, a) {
    return n.call(this, o, ge(s), a, e);
  }), r[t](i, ...l);
}
function zn(e, t, n) {
  let l = q(e);
  ve(l, "iterate", Gt);
  let r = l[t](...n);
  return (r === -1 || r === !1) && Sl(n[0]) ? (n[0] = q(n[0]), l[t](...n)) : r;
}
function jt(e, t, n = []) {
  et(), Tn++;
  let l = q(e)[t].apply(e, n);
  return _l(), tt(), l;
}
let Vs = Sn("__proto__,__v_isRef,__isVue"), Ar = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(dt));
function Us(e) {
  dt(e) || (e = String(e));
  let t = q(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
class Er {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, l) {
    if (n === "__v_skip") return t.__v_skip;
    let r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw") return l === (r ? i ? Gs : Rr : i ? Lr : Pr).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(l) ? t : void 0;
    let o = F(t);
    if (!r) {
      let a;
      if (o && (a = Ds[n])) return a;
      if (n === "hasOwnProperty") return Us;
    }
    let s = Reflect.get(t, n, _e(t) ? t : l);
    return (dt(n) ? Ar.has(n) : Vs(n)) || (r || ve(t, "get", n), i) ? s : _e(s) ? o && hl(n) ? s : s.value : le(s) ? r ? Fr(s) : bl(s) : s;
  }
}
class Tr extends Er {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, l, r) {
    let i = t[n];
    if (!this._isShallow) {
      let a = ct(i);
      if (Ne(l) || ct(l) || (i = q(i), l = q(l)), !F(t) && _e(i) && !_e(l)) return a ? !1 : (i.value = l, !0);
    }
    let o = F(t) && hl(n) ? Number(n) < t.length : G(t, n), s = Reflect.set(t, n, l, _e(t) ? t : r);
    return t === q(r) && (o ? ft(l, i) && Ye(t, "set", n, l) : Ye(t, "add", n, l)), s;
  }
  deleteProperty(t, n) {
    let l = G(t, n);
    t[n];
    let r = Reflect.deleteProperty(t, n);
    return r && l && Ye(t, "delete", n, void 0), r;
  }
  has(t, n) {
    let l = Reflect.has(t, n);
    return dt(n) && Ar.has(n) || ve(t, "has", n), l;
  }
  ownKeys(t) {
    return ve(t, "iterate", F(t) ? "length" : xt), Reflect.ownKeys(t);
  }
}
class Or extends Er {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
let Bs = new Tr(), Ws = new Or(), zs = new Tr(!0);
new Or(!0);
let Hn = (e) => e, nn = (e) => Reflect.getPrototypeOf(e);
function ln(e) {
  return function() {
    return e !== "delete" && (e === "clear" ? void 0 : this);
  };
}
function Pn(e, t) {
  let n = function(l, r) {
    let i = { get(o) {
      let s = this.__v_raw, a = q(s), f = q(o);
      l || (ft(o, f) && ve(a, "get", o), ve(a, "get", f));
      let { has: p } = nn(a), d = r ? Hn : l ? on : ge;
      return p.call(a, o) ? d(s.get(o)) : p.call(a, f) ? d(s.get(f)) : void (s !== a && s.get(o));
    }, get size() {
      let o = this.__v_raw;
      return l || ve(q(o), "iterate", xt), Reflect.get(o, "size", o);
    }, has(o) {
      let s = this.__v_raw, a = q(s), f = q(o);
      return l || (ft(o, f) && ve(a, "has", o), ve(a, "has", f)), o === f ? s.has(o) : s.has(o) || s.has(f);
    }, forEach(o, s) {
      let a = this, f = a.__v_raw, p = q(f), d = r ? Hn : l ? on : ge;
      return l || ve(p, "iterate", xt), f.forEach((S, b) => o.call(s, d(S), d(b), a));
    } };
    return re(i, l ? { add: ln("add"), set: ln("set"), delete: ln("delete"), clear: ln("clear") } : { add(o) {
      r || Ne(o) || ct(o) || (o = q(o));
      let s = q(this);
      return nn(s).has.call(s, o) || (s.add(o), Ye(s, "add", o, o)), this;
    }, set(o, s) {
      r || Ne(s) || ct(s) || (s = q(s));
      let a = q(this), { has: f, get: p } = nn(a), d = f.call(a, o);
      d || (o = q(o), d = f.call(a, o));
      let S = p.call(a, o);
      return a.set(o, s), d ? ft(s, S) && Ye(a, "set", o, s) : Ye(a, "add", o, s), this;
    }, delete(o) {
      let s = q(this), { has: a, get: f } = nn(s), p = a.call(s, o);
      p || (o = q(o), p = a.call(s, o)), f && f.call(s, o);
      let d = s.delete(o);
      return p && Ye(s, "delete", o, void 0), d;
    }, clear() {
      let o = q(this), s = o.size !== 0, a = o.clear();
      return s && Ye(o, "clear", void 0, void 0), a;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      i[o] = function(...s) {
        let a = this.__v_raw, f = q(a), p = Et(f), d = o === "entries" || o === Symbol.iterator && p, S = a[o](...s), b = r ? Hn : l ? on : ge;
        return l || ve(f, "iterate", o === "keys" && p ? rl : xt), { next() {
          let { value: w, done: R } = S.next();
          return R ? { value: w, done: R } : { value: d ? [b(w[0]), b(w[1])] : b(w), done: R };
        }, [Symbol.iterator]() {
          return this;
        } };
      };
    }), i;
  }(e, t);
  return (l, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? l : Reflect.get(G(n, r) && r in l ? n : l, r, i);
}
let Hs = { get: Pn(!1, !1) }, qs = { get: Pn(!1, !0) }, Js = { get: Pn(!0, !1) };
Pn(!0, !0);
let Pr = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), Rr = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap();
function bl(e) {
  return ct(e) ? e : xl(e, !1, Bs, Hs, Pr);
}
function Xs(e) {
  return xl(e, !1, zs, qs, Lr);
}
function Fr(e) {
  return xl(e, !0, Ws, Js, Rr);
}
function xl(e, t, n, l, r) {
  var i;
  if (!le(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  let o = (i = e).__v_skip || !Object.isExtensible(i) ? 0 : function(f) {
    switch (f) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }(wn(i).slice(8, -1));
  if (o === 0) return e;
  let s = r.get(e);
  if (s) return s;
  let a = new Proxy(e, o === 2 ? l : n);
  return r.set(e, a), a;
}
function Tt(e) {
  return ct(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
function Ne(e) {
  return !!(e && e.__v_isShallow);
}
function Sl(e) {
  return !!e && !!e.__v_raw;
}
function q(e) {
  let t = e && e.__v_raw;
  return t ? q(t) : e;
}
function Zs(e) {
  return !G(e, "__v_skip") && Object.isExtensible(e) && tl(e, "__v_skip", !0), e;
}
let ge = (e) => le(e) ? bl(e) : e, on = (e) => le(e) ? Fr(e) : e;
function _e(e) {
  return !!e && e.__v_isRef === !0;
}
function qn(e) {
  return Ks(e, !1);
}
function Ks(e, t) {
  return _e(e) ? e : new Qs(e, t);
}
class Qs {
  constructor(t, n) {
    this.dep = new yl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : q(t), this._value = n ? t : ge(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    let n = this._rawValue, l = this.__v_isShallow || Ne(t) || ct(t);
    ft(t = l ? t : q(t), n) && (this._rawValue = t, this._value = l ? t : ge(t), this.dep.trigger());
  }
}
function jr(e) {
  return _e(e) ? e.value : e;
}
let Ys = { get: (e, t, n) => t === "__v_raw" ? e : jr(Reflect.get(e, t, n)), set: (e, t, n, l) => {
  let r = e[t];
  return _e(r) && !_e(n) ? (r.value = n, !0) : Reflect.set(e, t, n, l);
} };
function Mr(e) {
  return Tt(e) ? e : new Proxy(e, Ys);
}
class ei {
  constructor(t, n, l) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new yl(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = l;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && ee !== this) return xr(this, !0), !0;
  }
  get value() {
    let t = this.dep.track();
    return wr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
let rn = {}, gn = /* @__PURE__ */ new WeakMap();
function ti(e, t = !1, n = mt) {
  if (n) {
    let l = gn.get(n);
    l || gn.set(n, l = []), l.push(e);
  }
}
function ut(e, t = 1 / 0, n) {
  if (t <= 0 || !le(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set()).has(e)) return e;
  if (n.add(e), t--, _e(e)) ut(e.value, t, n);
  else if (F(e)) for (let l = 0; l < e.length; l++) ut(e[l], t, n);
  else if (hr(e) || Et(e)) e.forEach((l) => {
    ut(l, t, n);
  });
  else if (kn(e)) {
    for (let l in e) ut(e[l], t, n);
    for (let l of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, l) && ut(e[l], t, n);
  }
  return e;
}
function Qt(e, t, n, l) {
  try {
    return l ? e(...l) : e();
  } catch (r) {
    Ln(r, t, n);
  }
}
function Ue(e, t, n, l) {
  if (I(e)) {
    let r = Qt(e, t, n, l);
    return r && gr(r) && r.catch((i) => {
      Ln(i, t, n);
    }), r;
  }
  if (F(e)) {
    let r = [];
    for (let i = 0; i < e.length; i++) r.push(Ue(e[i], t, n, l));
    return r;
  }
}
function Ln(e, t, n, l = !0) {
  t && t.vnode;
  let { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || te;
  if (t) {
    let o = t.parent, s = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      let f = o.ec;
      if (f) {
        for (let p = 0; p < f.length; p++) if (f[p](e, s, a) === !1) return;
      }
      o = o.parent;
    }
    if (r) {
      et(), Qt(r, null, 10, [e, s, a]), tt();
      return;
    }
  }
  (function(o, s, a, f = !0, p = !1) {
    if (p) throw o;
    console.error(o);
  })(e, 0, 0, l, i);
}
let be = [], Je = -1, Ot = [], it = null, kt = 0, Nr = Promise.resolve(), an = null;
function Ir(e) {
  let t = an || Nr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Cl(e) {
  if (!(1 & e.flags)) {
    let t = Bt(e), n = be[be.length - 1];
    !n || !(2 & e.flags) && t >= Bt(n) ? be.push(e) : be.splice(function(l) {
      let r = Je + 1, i = be.length;
      for (; r < i; ) {
        let o = r + i >>> 1, s = be[o], a = Bt(s);
        a < l || a === l && 2 & s.flags ? r = o + 1 : i = o;
      }
      return r;
    }(t), 0, e), e.flags |= 1, Dr();
  }
}
function Dr() {
  an || (an = Nr.then(function e(t) {
    try {
      for (Je = 0; Je < be.length; Je++) {
        let n = be[Je];
        n && !(8 & n.flags) && (4 & n.flags && (n.flags &= -2), Qt(n, n.i, n.i ? 15 : 14), 4 & n.flags || (n.flags &= -2));
      }
    } finally {
      for (; Je < be.length; Je++) {
        let n = be[Je];
        n && (n.flags &= -2);
      }
      Je = -1, be.length = 0, $r(), an = null, (be.length || Ot.length) && e();
    }
  }));
}
function ni(e) {
  F(e) ? Ot.push(...e) : it && e.id === -1 ? it.splice(kt + 1, 0, e) : 1 & e.flags || (Ot.push(e), e.flags |= 1), Dr();
}
function Ml(e, t, n = Je + 1) {
  for (; n < be.length; n++) {
    let l = be[n];
    if (l && 2 & l.flags) {
      if (e && l.id !== e.uid) continue;
      be.splice(n, 1), n--, 4 & l.flags && (l.flags &= -2), l(), 4 & l.flags || (l.flags &= -2);
    }
  }
}
function $r(e) {
  if (Ot.length) {
    let t = [...new Set(Ot)].sort((n, l) => Bt(n) - Bt(l));
    if (Ot.length = 0, it) return void it.push(...t);
    for (kt = 0, it = t; kt < it.length; kt++) {
      let n = it[kt];
      4 & n.flags && (n.flags &= -2), 8 & n.flags || n(), n.flags &= -2;
    }
    it = null, kt = 0;
  }
}
let Bt = (e) => e.id == null ? 2 & e.flags ? -1 : 1 / 0 : e.id, Ze = null, Vr = null;
function vn(e) {
  let t = Ze;
  return Ze = e, Vr = e && e.type.__scopeId || null, t;
}
function li(e, t = Ze, n) {
  if (!t || e._n) return e;
  let l = (...r) => {
    let i;
    l._d && ql(-1);
    let o = vn(t);
    try {
      i = e(...r);
    } finally {
      vn(o), l._d && ql(1);
    }
    return i;
  };
  return l._n = !0, l._c = !0, l._d = !0, l;
}
function gt(e, t, n, l) {
  let r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    let s = r[o];
    i && (s.oldValue = i[o].value);
    let a = s.dir[l];
    a && (et(), Ue(a, n, 8, [e.el, s, e, t]), tt());
  }
}
let ri = Symbol("_vte"), ot = Symbol("_leaveCb"), sn = Symbol("_enterCb");
function Ur() {
  let e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: /* @__PURE__ */ new Map() };
  return kl(() => {
    e.isMounted = !0;
  }), Zr(() => {
    e.isUnmounting = !0;
  }), e;
}
let Re = [Function, Array], Br = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Re, onEnter: Re, onAfterEnter: Re, onEnterCancelled: Re, onBeforeLeave: Re, onLeave: Re, onAfterLeave: Re, onLeaveCancelled: Re, onBeforeAppear: Re, onAppear: Re, onAfterAppear: Re, onAppearCancelled: Re }, Wr = (e) => {
  let t = e.subTree;
  return t.component ? Wr(t.component) : t;
};
function zr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (let n of e) if (n.type !== xe) {
      t = n;
      break;
    }
  }
  return t;
}
let si = { name: "BaseTransition", props: Br, setup(e, { slots: t }) {
  let n = Ol(), l = Ur();
  return () => {
    let r = t.default && wl(t.default(), !0);
    if (!r || !r.length) return;
    let i = zr(r), o = q(e), { mode: s } = o;
    if (l.isLeaving) return Jn(i);
    let a = Nl(i);
    if (!a) return Jn(i);
    let f = Xt(a, o, l, n, (d) => f = d);
    a.type !== xe && St(a, f);
    let p = n.subTree && Nl(n.subTree);
    if (p && p.type !== xe && !bt(a, p) && Wr(n).type !== xe) {
      let d = Xt(p, o, l, n);
      if (St(p, d), s === "out-in" && a.type !== xe) return l.isLeaving = !0, d.afterLeave = () => {
        l.isLeaving = !1, 8 & n.job.flags || n.update(), delete d.afterLeave, p = void 0;
      }, Jn(i);
      s === "in-out" && a.type !== xe ? d.delayLeave = (S, b, w) => {
        Hr(l, p)[String(p.key)] = p, S[ot] = () => {
          b(), S[ot] = void 0, delete f.delayedLeave, p = void 0;
        }, f.delayedLeave = () => {
          w(), delete f.delayedLeave, p = void 0;
        };
      } : p = void 0;
    } else p && (p = void 0);
    return i;
  };
} };
function Hr(e, t) {
  let { leavingVNodes: n } = e, l = n.get(t.type);
  return l || (l = /* @__PURE__ */ Object.create(null), n.set(t.type, l)), l;
}
function Xt(e, t, n, l, r) {
  let { appear: i, mode: o, persisted: s = !1, onBeforeEnter: a, onEnter: f, onAfterEnter: p, onEnterCancelled: d, onBeforeLeave: S, onLeave: b, onAfterLeave: w, onLeaveCancelled: R, onBeforeAppear: j, onAppear: P, onAfterAppear: z, onAppearCancelled: M } = t, B = String(e.key), H = Hr(n, e), Y = (L, $) => {
    L && Ue(L, l, 9, $);
  }, se = (L, $) => {
    let K = $[1];
    Y(L, $), F(L) ? L.every((O) => O.length <= 1) && K() : L.length <= 1 && K();
  }, ne = { mode: o, persisted: s, beforeEnter(L) {
    let $ = a;
    if (!n.isMounted) if (i) $ = j || a;
    else return;
    L[ot] && L[ot](!0);
    let K = H[B];
    K && bt(e, K) && K.el[ot] && K.el[ot](), Y($, [L]);
  }, enter(L) {
    let $ = f, K = p, O = d;
    if (!n.isMounted) if (i) $ = P || f, K = z || p, O = M || d;
    else return;
    let X = !1, J = L[sn] = (ae) => {
      X || (X = !0, ae ? Y(O, [L]) : Y(K, [L]), ne.delayedLeave && ne.delayedLeave(), L[sn] = void 0);
    };
    $ ? se($, [L, J]) : J();
  }, leave(L, $) {
    let K = String(e.key);
    if (L[sn] && L[sn](!0), n.isUnmounting) return $();
    Y(S, [L]);
    let O = !1, X = L[ot] = (J) => {
      O || (O = !0, $(), J ? Y(R, [L]) : Y(w, [L]), L[ot] = void 0, H[K] === e && delete H[K]);
    };
    H[K] = e, b ? se(b, [L, X]) : X();
  }, clone(L) {
    let $ = Xt(L, t, n, l, r);
    return r && r($), $;
  } };
  return ne;
}
function Jn(e) {
  if (Rn(e)) return (e = pt(e)).children = null, e;
}
function Nl(e) {
  if (!Rn(e)) return e.type.__isTeleport && e.children ? zr(e.children) : e;
  if (e.component) return e.component.subTree;
  let { shapeFlag: t, children: n } = e;
  if (n) {
    if (16 & t) return n[0];
    if (32 & t && I(n.default)) return n.default();
  }
}
function St(e, t) {
  6 & e.shapeFlag && e.component ? (e.transition = t, St(e.component.subTree, t)) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function wl(e, t = !1, n) {
  let l = [], r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i], s = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === je ? (128 & o.patchFlag && r++, l = l.concat(wl(o.children, t, s))) : (t || o.type !== xe) && l.push(s != null ? pt(o, { key: s }) : o);
  }
  if (r > 1) for (let i = 0; i < l.length; i++) l[i].patchFlag = -2;
  return l;
}
function qr(e, t) {
  return I(e) ? re({ name: e.name }, t, { setup: e }) : e;
}
function Jr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Wt(e, t, n, l, r = !1) {
  if (F(e)) return void e.forEach((w, R) => Wt(w, t && (F(t) ? t[R] : t), n, l, r));
  if (zt(l) && !r) {
    512 & l.shapeFlag && l.type.__asyncResolved && l.component.subTree.component && Wt(e, t, n, l.component.subTree);
    return;
  }
  let i = 4 & l.shapeFlag ? Pl(l.component) : l.el, o = r ? null : i, { i: s, r: a } = e, f = t && t.r, p = s.refs === te ? s.refs = {} : s.refs, d = s.setupState, S = q(d), b = d === te ? () => !1 : (w) => G(S, w);
  if (f != null && f !== a && (oe(f) ? (p[f] = null, b(f) && (d[f] = null)) : _e(f) && (f.value = null)), I(a)) Qt(a, s, 12, [o, p]);
  else {
    let w = oe(a), R = _e(a);
    if (w || R) {
      let j = () => {
        if (e.f) {
          let P = w ? b(a) ? d[a] : p[a] : a.value;
          r ? F(P) && dl(P, i) : F(P) ? P.includes(i) || P.push(i) : w ? (p[a] = [i], b(a) && (d[a] = p[a])) : (a.value = [i], e.k && (p[e.k] = a.value));
        } else w ? (p[a] = o, b(a) && (d[a] = o)) : R && (a.value = o, e.k && (p[e.k] = o));
      };
      o ? (j.id = -1, Te(j, n)) : j();
    }
  }
}
En().requestIdleCallback;
En().cancelIdleCallback;
let zt = (e) => !!e.type.__asyncLoader, Rn = (e) => e.type.__isKeepAlive;
function ii(e, t) {
  Gr(e, "a", t);
}
function oi(e, t) {
  Gr(e, "da", t);
}
function Gr(e, t, n = Se) {
  let l = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated) return;
      r = r.parent;
    }
    return e();
  });
  if (_n(t, l, n), n) {
    let r = n.parent;
    for (; r && r.parent; ) Rn(r.parent.vnode) && function(i, o, s, a) {
      let f = _n(o, i, a, !0);
      Kr(() => {
        dl(a[o], f);
      }, s);
    }(l, t, n, r), r = r.parent;
  }
}
function _n(e, t, n = Se, l = !1) {
  if (n) {
    let r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      et();
      let s = Yt(n), a = Ue(t, n, e, o);
      return s(), tt(), a;
    });
    return l ? r.unshift(i) : r.push(i), i;
  }
}
let nt = (e) => (t, n = Se) => {
  Kt && e !== "sp" || _n(e, (...l) => t(...l), n);
}, ai = nt("bm"), kl = nt("m"), ui = nt("bu"), Xr = nt("u"), Zr = nt("bum"), Kr = nt("um"), fi = nt("sp"), ci = nt("rtg"), pi = nt("rtc");
function di(e, t = Se) {
  _n("ec", e, t);
}
let hi = Symbol.for("v-ndc");
function gi(e, t, n, l) {
  let r, i = n, o = F(e);
  if (o || oe(e)) {
    let s = o && Tt(e), a = !1, f = !1;
    s && (a = !Ne(e), f = ct(e), e = On(e)), r = Array(e.length);
    for (let p = 0, d = e.length; p < d; p++) r[p] = t(a ? f ? on(ge(e[p])) : ge(e[p]) : e[p], p, void 0, i);
  } else if (typeof e == "number") {
    r = Array(e);
    for (let s = 0; s < e; s++) r[s] = t(s + 1, s, void 0, i);
  } else if (le(e)) if (e[Symbol.iterator]) r = Array.from(e, (s, a) => t(s, a, void 0, i));
  else {
    let s = Object.keys(e);
    r = Array(s.length);
    for (let a = 0, f = s.length; a < f; a++) {
      let p = s[a];
      r[a] = t(e[p], p, a, i);
    }
  }
  else r = [];
  return r;
}
let sl = (e) => e ? ds(e) ? Pl(e) : sl(e.parent) : null, Ht = re(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => sl(e.parent), $root: (e) => sl(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Qr(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Cl(e.update);
}), $nextTick: (e) => e.n || (e.n = Ir.bind(e.proxy)), $watch: (e) => ki.bind(e) }), Gn = (e, t) => e !== te && !e.__isScriptSetup && G(e, t), il = { get({ _: e }, t) {
  let n, l, r;
  if (t === "__v_skip") return !0;
  let { ctx: i, setupState: o, data: s, props: a, accessCache: f, type: p, appContext: d } = e;
  if (t[0] !== "$") {
    let b = f[t];
    if (b !== void 0) switch (b) {
      case 1:
        return o[t];
      case 2:
        return s[t];
      case 4:
        return i[t];
      case 3:
        return a[t];
    }
    else {
      if (Gn(o, t)) return f[t] = 1, o[t];
      if (s !== te && G(s, t)) return f[t] = 2, s[t];
      if ((n = e.propsOptions[0]) && G(n, t)) return f[t] = 3, a[t];
      if (i !== te && G(i, t)) return f[t] = 4, i[t];
      ol && (f[t] = 0);
    }
  }
  let S = Ht[t];
  return S ? (t === "$attrs" && ve(e.attrs, "get", ""), S(e)) : (l = p.__cssModules) && (l = l[t]) ? l : i !== te && G(i, t) ? (f[t] = 4, i[t]) : G(r = d.config.globalProperties, t) ? r[t] : void 0;
}, set({ _: e }, t, n) {
  let { data: l, setupState: r, ctx: i } = e;
  return Gn(r, t) ? (r[t] = n, !0) : l !== te && G(l, t) ? (l[t] = n, !0) : !G(e.props, t) && !(t[0] === "$" && t.slice(1) in e) && (i[t] = n, !0);
}, has({ _: { data: e, setupState: t, accessCache: n, ctx: l, appContext: r, propsOptions: i } }, o) {
  let s;
  return !!n[o] || e !== te && G(e, o) || Gn(t, o) || (s = i[0]) && G(s, o) || G(l, o) || G(Ht, o) || G(r.config.globalProperties, o);
}, defineProperty(e, t, n) {
  return n.get != null ? e._.accessCache[t] = 0 : G(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
} };
re({}, il, { get(e, t) {
  if (t !== Symbol.unscopables) return il.get(e, t, e);
}, has: (e, t) => t[0] !== "_" && !Ps(t) });
function Il(e) {
  return F(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
let ol = !0;
function Dl(e, t, n) {
  Ue(F(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Qr(e) {
  let t, n = e.type, { mixins: l, extends: r } = n, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = e.appContext, a = o.get(n);
  return a ? t = a : i.length || l || r ? (t = {}, i.length && i.forEach((f) => mn(t, f, s, !0)), mn(t, n, s)) : t = n, le(n) && o.set(n, t), t;
}
function mn(e, t, n, l = !1) {
  let { mixins: r, extends: i } = t;
  for (let o in i && mn(e, i, n, !0), r && r.forEach((s) => mn(e, s, n, !0)), t) if (!(l && o === "expose")) {
    let s = vi[o] || n && n[o];
    e[o] = s ? s(e[o], t[o]) : t[o];
  }
  return e;
}
let vi = { data: $l, props: Vl, emits: Vl, methods: Mt, computed: Mt, beforeCreate: ye, created: ye, beforeMount: ye, mounted: ye, beforeUpdate: ye, updated: ye, beforeDestroy: ye, beforeUnmount: ye, destroyed: ye, unmounted: ye, activated: ye, deactivated: ye, errorCaptured: ye, serverPrefetch: ye, components: Mt, directives: Mt, watch: function(e, t) {
  if (!e) return t;
  if (!t) return e;
  let n = re(/* @__PURE__ */ Object.create(null), e);
  for (let l in t) n[l] = ye(e[l], t[l]);
  return n;
}, provide: $l, inject: function(e, t) {
  return Mt(al(e), al(t));
} };
function $l(e, t) {
  return t ? e ? function() {
    return re(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t);
  } : t : e;
}
function al(e) {
  if (F(e)) {
    let t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mt(e, t) {
  return e ? re(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Vl(e, t) {
  return e ? F(e) && F(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : re(/* @__PURE__ */ Object.create(null), Il(e), Il(t != null ? t : {})) : t;
}
function Yr() {
  return { app: null, config: { isNativeTag: ks, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let _i = 0, Pt = null;
function mi(e, t) {
  if (Se) {
    let n = Se.provides, l = Se.parent && Se.parent.provides;
    l === n && (n = Se.provides = Object.create(l)), n[e] = t;
  }
}
function un(e, t, n = !1) {
  let l = Ol();
  if (l || Pt) {
    let r = Pt ? Pt._context.provides : l ? l.parent == null || l.ce ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && I(t) ? t.call(l && l.proxy) : t;
  }
}
let es = {}, Ul = () => Object.create(es), ts = (e) => Object.getPrototypeOf(e) === es;
function ns(e, t, n, l) {
  let r, [i, o] = e.propsOptions, s = !1;
  if (t) for (let a in t) {
    let f;
    if (Vt(a)) continue;
    let p = t[a];
    i && G(i, f = $e(a)) ? o && o.includes(f) ? (r || (r = {}))[f] = p : n[f] = p : yn(e.emitsOptions, a) || a in l && p === l[a] || (l[a] = p, s = !0);
  }
  if (o) {
    let a = q(n), f = r || te;
    for (let p = 0; p < o.length; p++) {
      let d = o[p];
      n[d] = ul(i, a, d, f[d], e, !G(f, d));
    }
  }
  return s;
}
function ul(e, t, n, l, r, i) {
  let o = e[n];
  if (o != null) {
    let s = G(o, "default");
    if (s && l === void 0) {
      let a = o.default;
      if (o.type !== Function && !o.skipFactory && I(a)) {
        let { propsDefaults: f } = r;
        if (n in f) l = f[n];
        else {
          let p = Yt(r);
          l = f[n] = a.call(null, t), p();
        }
      } else l = a;
      r.ce && r.ce._setProp(n, l);
    }
    o[0] && (i && !s ? l = !1 : o[1] && (l === "" || l === Me(n)) && (l = !0));
  }
  return l;
}
let yi = /* @__PURE__ */ new WeakMap();
function Bl(e) {
  return !(e[0] === "$" || Vt(e));
}
let Al = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", El = (e) => F(e) ? e.map(Ge) : [Ge(e)], bi = (e, t, n) => {
  if (t._n) return t;
  let l = li((...r) => El(t(...r)), n);
  return l._c = !1, l;
}, ls = (e, t, n) => {
  let l = e._ctx;
  for (let r in e) {
    if (Al(r)) continue;
    let i = e[r];
    if (I(i)) t[r] = bi(r, i, l);
    else if (i != null) {
      let o = El(i);
      t[r] = () => o;
    }
  }
}, rs = (e, t) => {
  let n = El(t);
  e.slots.default = () => n;
}, ss = (e, t, n) => {
  for (let l in t) (n || !Al(l)) && (e[l] = t[l]);
}, Te = Li;
function is(e) {
  return xi(e);
}
function xi(e, t) {
  var n;
  let l, r;
  En().__VUE__ = !0;
  let { insert: i, remove: o, patchProp: s, createElement: a, createText: f, createComment: p, setText: d, setElementText: S, parentNode: b, nextSibling: w, setScopeId: R = Xe, insertStaticContent: j } = e, P = (u, c, h, C = null, y = null, g = null, x, _ = null, m = !!c.dynamicChildren) => {
    if (u === c) return;
    u && !bt(u, c) && (C = Be(u), U(u, y, g, !0), u = null), c.patchFlag === -2 && (m = !1, c.dynamicChildren = null);
    let { type: v, ref: k, shapeFlag: E } = c;
    switch (v) {
      case Fn:
        z(u, c, h, C);
        break;
      case xe:
        M(u, c, h, C);
        break;
      case Zn:
        u == null && B(c, h, C, x);
        break;
      case je:
        O(u, c, h, C, y, g, x, _, m);
        break;
      default:
        1 & E ? H(u, c, h, C, y, g, x, _, m) : 6 & E ? X(u, c, h, C, y, g, x, _, m) : (64 & E || 128 & E) && v.process(u, c, h, C, y, g, x, _, m, Rt);
    }
    k != null && y ? Wt(k, u && u.ref, g, c || u, !c) : k == null && u && u.ref != null && Wt(u.ref, null, g, u, !0);
  }, z = (u, c, h, C) => {
    if (u == null) i(c.el = f(c.children), h, C);
    else {
      let y = c.el = u.el;
      c.children !== u.children && d(y, c.children);
    }
  }, M = (u, c, h, C) => {
    u == null ? i(c.el = p(c.children || ""), h, C) : c.el = u.el;
  }, B = (u, c, h, C) => {
    [u.el, u.anchor] = j(u.children, c, h, C, u.el, u.anchor);
  }, H = (u, c, h, C, y, g, x, _, m) => {
    c.type === "svg" ? x = "svg" : c.type === "math" && (x = "mathml"), u == null ? Y(c, h, C, y, g, x, _, m) : L(u, c, y, g, x, _, m);
  }, Y = (u, c, h, C, y, g, x, _) => {
    let m, v, { props: k, shapeFlag: E, transition: A, dirs: T } = u;
    if (m = u.el = a(u.type, g, k && k.is, k), 8 & E ? S(m, u.children) : 16 & E && ne(u.children, m, null, C, y, Xn(u, g), x, _), T && gt(u, null, C, "created"), se(m, u, u.scopeId, x, C), k) {
      for (let N in k) N === "value" || Vt(N) || s(m, N, null, k[N], g, C);
      "value" in k && s(m, "value", null, k.value, g), (v = k.onVnodeBeforeMount) && He(v, C, u);
    }
    T && gt(u, null, C, "beforeMount");
    let D = Si(y, A);
    D && A.beforeEnter(m), i(m, c, h), ((v = k && k.onVnodeMounted) || D || T) && Te(() => {
      v && He(v, C, u), D && A.enter(m), T && gt(u, null, C, "mounted");
    }, y);
  }, se = (u, c, h, C, y) => {
    if (h && R(u, h), C) for (let g = 0; g < C.length; g++) R(u, C[g]);
    if (y) {
      let g = y.subTree;
      if (c === g || fs(g.type) && (g.ssContent === c || g.ssFallback === c)) {
        let x = y.vnode;
        se(u, x, x.scopeId, x.slotScopeIds, y.parent);
      }
    }
  }, ne = (u, c, h, C, y, g, x, _, m = 0) => {
    for (let v = m; v < u.length; v++) P(null, u[v] = _ ? at(u[v]) : Ge(u[v]), c, h, C, y, g, x, _);
  }, L = (u, c, h, C, y, g, x) => {
    let _, m = c.el = u.el, { patchFlag: v, dynamicChildren: k, dirs: E } = c;
    v |= 16 & u.patchFlag;
    let A = u.props || te, T = c.props || te;
    if (h && vt(h, !1), (_ = T.onVnodeBeforeUpdate) && He(_, h, c, u), E && gt(c, u, h, "beforeUpdate"), h && vt(h, !0), (A.innerHTML && T.innerHTML == null || A.textContent && T.textContent == null) && S(m, ""), k ? $(u.dynamicChildren, k, m, h, C, Xn(c, y), g) : x || ce(u, c, m, null, h, C, Xn(c, y), g, !1), v > 0) {
      if (16 & v) K(m, A, T, h, y);
      else if (2 & v && A.class !== T.class && s(m, "class", null, T.class, y), 4 & v && s(m, "style", A.style, T.style, y), 8 & v) {
        let D = c.dynamicProps;
        for (let N = 0; N < D.length; N++) {
          let W = D[N], de = A[W], he = T[W];
          (he !== de || W === "value") && s(m, W, de, he, y, h);
        }
      }
      1 & v && u.children !== c.children && S(m, c.children);
    } else x || k != null || K(m, A, T, h, y);
    ((_ = T.onVnodeUpdated) || E) && Te(() => {
      _ && He(_, h, c, u), E && gt(c, u, h, "updated");
    }, C);
  }, $ = (u, c, h, C, y, g, x) => {
    for (let _ = 0; _ < c.length; _++) {
      let m = u[_], v = c[_], k = m.el && (m.type === je || !bt(m, v) || 198 & m.shapeFlag) ? b(m.el) : h;
      P(m, v, k, null, C, y, g, x, !0);
    }
  }, K = (u, c, h, C, y) => {
    if (c !== h) {
      if (c !== te) for (let g in c) Vt(g) || g in h || s(u, g, c[g], null, y, C);
      for (let g in h) {
        if (Vt(g)) continue;
        let x = h[g], _ = c[g];
        x !== _ && g !== "value" && s(u, g, _, x, y, C);
      }
      "value" in h && s(u, "value", c.value, h.value, y);
    }
  }, O = (u, c, h, C, y, g, x, _, m) => {
    let v = c.el = u ? u.el : f(""), k = c.anchor = u ? u.anchor : f(""), { patchFlag: E, dynamicChildren: A, slotScopeIds: T } = c;
    T && (_ = _ ? _.concat(T) : T), u == null ? (i(v, h, C), i(k, h, C), ne(c.children || [], h, k, y, g, x, _, m)) : E > 0 && 64 & E && A && u.dynamicChildren ? ($(u.dynamicChildren, A, h, y, g, x, _), (c.key != null || y && c === y.subTree) && os(u, c, !0)) : ce(u, c, h, k, y, g, x, _, m);
  }, X = (u, c, h, C, y, g, x, _, m) => {
    c.slotScopeIds = _, u == null ? 512 & c.shapeFlag ? y.ctx.activate(c, h, C, x, m) : J(c, h, C, y, g, x, m) : ae(u, c, m);
  }, J = (u, c, h, C, y, g, x) => {
    let _ = u.component = Di(u, C, y);
    if (Rn(u) && (_.ctx.renderer = Rt), $i(_, !1, x), _.asyncDep) {
      if (y && y.registerDep(_, we, x), !u.el) {
        let m = _.subTree = Ce(xe);
        M(null, m, c, h), u.placeholder = m.el;
      }
    } else we(_, u, c, h, y, g, x);
  }, ae = (u, c, h) => {
    let C = c.component = u.component;
    if (function(y, g, x) {
      let { props: _, children: m, component: v } = y, { props: k, children: E, patchFlag: A } = g, T = v.emitsOptions;
      if (g.dirs || g.transition) return !0;
      if (!x || !(A >= 0)) return (!!m || !!E) && (!E || !E.$stable) || _ !== k && (_ ? !k || Hl(_, k, T) : !!k);
      if (1024 & A) return !0;
      if (16 & A) return _ ? Hl(_, k, T) : !!k;
      if (8 & A) {
        let D = g.dynamicProps;
        for (let N = 0; N < D.length; N++) {
          let W = D[N];
          if (k[W] !== _[W] && !yn(T, W)) return !0;
        }
      }
      return !1;
    }(u, c, h)) {
      if (C.asyncDep && !C.asyncResolved) return void V(C, c, h);
      C.next = c, C.update();
    } else c.el = u.el, C.vnode = c;
  }, we = (u, c, h, C, y, g, x) => {
    let _ = () => {
      if (u.isMounted) {
        let E, { next: A, bu: T, u: D, parent: N, vnode: W } = u;
        {
          let ze = function ht(en) {
            let Q = en.subTree.component;
            if (Q) return Q.asyncDep && !Q.asyncResolved ? Q : ht(Q);
          }(u);
          if (ze) {
            A && (A.el = W.el, V(u, A, x)), ze.asyncDep.then(() => {
              u.isUnmounted || _();
            });
            return;
          }
        }
        let de = A;
        vt(u, !1), A ? (A.el = W.el, V(u, A, x)) : A = W, T && Vn(T), (E = A.props && A.props.onVnodeBeforeUpdate) && He(E, N, A, W), vt(u, !0);
        let he = zl(u), We = u.subTree;
        u.subTree = he, P(We, he, b(We.el), Be(We), u, y, g), A.el = he.el, de === null && Pi(u, he.el), D && Te(D, y), (E = A.props && A.props.onVnodeUpdated) && Te(() => He(E, N, A, W), y);
      } else {
        let E, { el: A, props: T } = c, { bm: D, m: N, parent: W, root: de, type: he } = u, We = zt(c);
        if (vt(u, !1), D && Vn(D), !We && (E = T && T.onVnodeBeforeMount) && He(E, W, c), vt(u, !0), !(A && r)) {
          de.ce && de.ce._def.shadowRoot !== !1 && de.ce._injectChildStyle(he);
          let ze = u.subTree = zl(u);
          P(null, ze, h, C, u, y, g), c.el = ze.el;
        }
        if (N && Te(N, y), !We && (E = T && T.onVnodeMounted)) {
          let ze = c;
          Te(() => He(E, W, ze), y);
        }
        (256 & c.shapeFlag || W && zt(W.vnode) && 256 & W.vnode.shapeFlag) && u.a && Te(u.a, y), u.isMounted = !0, c = h = C = null;
      }
    };
    u.scope.on();
    let m = u.effect = new br(_);
    u.scope.off();
    let v = u.update = m.run.bind(m), k = u.job = m.runIfDirty.bind(m);
    k.i = u, k.id = u.uid, m.scheduler = () => Cl(k), vt(u, !0), v();
  }, V = (u, c, h) => {
    c.component = u;
    let C = u.vnode.props;
    u.vnode = c, u.next = null, function(y, g, x, _) {
      let { props: m, attrs: v, vnode: { patchFlag: k } } = y, E = q(m), [A] = y.propsOptions, T = !1;
      if ((_ || k > 0) && !(16 & k)) {
        if (8 & k) {
          let D = y.vnode.dynamicProps;
          for (let N = 0; N < D.length; N++) {
            let W = D[N];
            if (yn(y.emitsOptions, W)) continue;
            let de = g[W];
            if (A) if (G(v, W)) de !== v[W] && (v[W] = de, T = !0);
            else {
              let he = $e(W);
              m[he] = ul(A, E, he, de, y, !1);
            }
            else de !== v[W] && (v[W] = de, T = !0);
          }
        }
      } else {
        let D;
        for (let N in ns(y, g, m, v) && (T = !0), E) g && (G(g, N) || (D = Me(N)) !== N && G(g, D)) || (A ? x && (x[N] !== void 0 || x[D] !== void 0) && (m[N] = ul(A, E, N, void 0, y, !0)) : delete m[N]);
        if (v !== E) for (let N in v) g && G(g, N) || (delete v[N], T = !0);
      }
      T && Ye(y.attrs, "set", "");
    }(u, c.props, C, h), ((y, g, x) => {
      let { vnode: _, slots: m } = y, v = !0, k = te;
      if (32 & _.shapeFlag) {
        let E = g._;
        E ? x && E === 1 ? v = !1 : ss(m, g, x) : (v = !g.$stable, ls(g, m)), k = g;
      } else g && (rs(y, g), k = { default: 1 });
      if (v) for (let E in m) Al(E) || k[E] != null || delete m[E];
    })(u, c.children, h), et(), Ml(u), tt();
  }, ce = (u, c, h, C, y, g, x, _, m = !1) => {
    let v = u && u.children, k = u ? u.shapeFlag : 0, E = c.children, { patchFlag: A, shapeFlag: T } = c;
    if (A > 0) {
      if (128 & A) return void ue(v, E, h, C, y, g, x, _, m);
      if (256 & A) return void Ct(v, E, h, C, y, g, x, _, m);
    }
    8 & T ? (16 & k && pe(v, y, g), E !== v && S(h, E)) : 16 & k ? 16 & T ? ue(v, E, h, C, y, g, x, _, m) : pe(v, y, g, !0) : (8 & k && S(h, ""), 16 & T && ne(E, h, C, y, g, x, _, m));
  }, Ct = (u, c, h, C, y, g, x, _, m) => {
    let v;
    u = u || At, c = c || At;
    let k = u.length, E = c.length, A = Math.min(k, E);
    for (v = 0; v < A; v++) {
      let T = c[v] = m ? at(c[v]) : Ge(c[v]);
      P(u[v], T, h, null, y, g, x, _, m);
    }
    k > E ? pe(u, y, g, !0, !1, A) : ne(c, h, C, y, g, x, _, m, A);
  }, ue = (u, c, h, C, y, g, x, _, m) => {
    let v = 0, k = c.length, E = u.length - 1, A = k - 1;
    for (; v <= E && v <= A; ) {
      let T = u[v], D = c[v] = m ? at(c[v]) : Ge(c[v]);
      if (bt(T, D)) P(T, D, h, null, y, g, x, _, m);
      else break;
      v++;
    }
    for (; v <= E && v <= A; ) {
      let T = u[E], D = c[A] = m ? at(c[A]) : Ge(c[A]);
      if (bt(T, D)) P(T, D, h, null, y, g, x, _, m);
      else break;
      E--, A--;
    }
    if (v > E) {
      if (v <= A) {
        let T = A + 1, D = T < k ? c[T].el : C;
        for (; v <= A; ) P(null, c[v] = m ? at(c[v]) : Ge(c[v]), h, D, y, g, x, _, m), v++;
      }
    } else if (v > A) for (; v <= E; ) U(u[v], y, g, !0), v++;
    else {
      let T, D = v, N = v, W = /* @__PURE__ */ new Map();
      for (v = N; v <= A; v++) {
        let Q = c[v] = m ? at(c[v]) : Ge(c[v]);
        Q.key != null && W.set(Q.key, v);
      }
      let de = 0, he = A - N + 1, We = !1, ze = 0, ht = Array(he);
      for (v = 0; v < he; v++) ht[v] = 0;
      for (v = D; v <= E; v++) {
        let Q, fe = u[v];
        if (de >= he) {
          U(fe, y, g, !0);
          continue;
        }
        if (fe.key != null) Q = W.get(fe.key);
        else for (T = N; T <= A; T++) if (ht[T - N] === 0 && bt(fe, c[T])) {
          Q = T;
          break;
        }
        Q === void 0 ? U(fe, y, g, !0) : (ht[Q - N] = v + 1, Q >= ze ? ze = Q : We = !0, P(fe, c[Q], h, null, y, g, x, _, m), de++);
      }
      let en = We ? function(Q) {
        let fe, Ft, me, lt, Mn, Nn = Q.slice(), Le = [0], ws = Q.length;
        for (fe = 0; fe < ws; fe++) {
          let tn = Q[fe];
          if (tn !== 0) {
            if (Q[Ft = Le[Le.length - 1]] < tn) {
              Nn[fe] = Ft, Le.push(fe);
              continue;
            }
            for (me = 0, lt = Le.length - 1; me < lt; ) Q[Le[Mn = me + lt >> 1]] < tn ? me = Mn + 1 : lt = Mn;
            tn < Q[Le[me]] && (me > 0 && (Nn[fe] = Le[me - 1]), Le[me] = fe);
          }
        }
        for (me = Le.length, lt = Le[me - 1]; me-- > 0; ) Le[me] = lt, lt = Nn[lt];
        return Le;
      }(ht) : At;
      for (T = en.length - 1, v = he - 1; v >= 0; v--) {
        let Q = N + v, fe = c[Q], Ft = c[Q + 1], me = Q + 1 < k ? Ft.el || Ft.placeholder : C;
        ht[v] === 0 ? P(null, fe, h, me, y, g, x, _, m) : We && (T < 0 || v !== en[T] ? Z(fe, h, me, 2) : T--);
      }
    }
  }, Z = (u, c, h, C, y = null) => {
    let { el: g, type: x, transition: _, children: m, shapeFlag: v } = u;
    if (6 & v) return void Z(u.component.subTree, c, h, C);
    if (128 & v) return void u.suspense.move(c, h, C);
    if (64 & v) return void x.move(u, c, h, Rt);
    if (x === je) {
      i(g, c, h);
      for (let k = 0; k < m.length; k++) Z(m[k], c, h, C);
      i(u.anchor, c, h);
      return;
    }
    if (x === Zn) return void (({ el: k, anchor: E }, A, T) => {
      let D;
      for (; k && k !== E; ) D = w(k), i(k, A, T), k = D;
      i(E, A, T);
    })(u, c, h);
    if (C !== 2 && 1 & v && _) if (C === 0) _.beforeEnter(g), i(g, c, h), Te(() => _.enter(g), y);
    else {
      let { leave: k, delayLeave: E, afterLeave: A } = _, T = () => {
        u.ctx.isUnmounted ? o(g) : i(g, c, h);
      }, D = () => {
        k(g, () => {
          T(), A && A();
        });
      };
      E ? E(g, T, D) : D();
    }
    else i(g, c, h);
  }, U = (u, c, h, C = !1, y = !1) => {
    let g, { type: x, props: _, ref: m, children: v, dynamicChildren: k, shapeFlag: E, patchFlag: A, dirs: T, cacheIndex: D } = u;
    if (A === -2 && (y = !1), m != null && (et(), Wt(m, null, h, u, !0), tt()), D != null && (c.renderCache[D] = void 0), 256 & E) return void c.ctx.deactivate(u);
    let N = 1 & E && T, W = !zt(u);
    if (W && (g = _ && _.onVnodeBeforeUnmount) && He(g, c, u), 6 & E) Ae(u.component, h, C);
    else {
      if (128 & E) return void u.suspense.unmount(h, C);
      N && gt(u, null, c, "beforeUnmount"), 64 & E ? u.type.remove(u, c, h, Rt, C) : k && !k.hasOnce && (x !== je || A > 0 && 64 & A) ? pe(k, c, h, !1, !0) : (x === je && 384 & A || !y && 16 & E) && pe(v, c, h), C && ie(u);
    }
    (W && (g = _ && _.onVnodeUnmounted) || N) && Te(() => {
      g && He(g, c, u), N && gt(u, null, c, "unmounted");
    }, h);
  }, ie = (u) => {
    let { type: c, el: h, anchor: C, transition: y } = u;
    if (c === je) return void ke(h, C);
    if (c === Zn) return void (({ el: x, anchor: _ }) => {
      let m;
      for (; x && x !== _; ) m = w(x), o(x), x = m;
      o(_);
    })(u);
    let g = () => {
      o(h), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (1 & u.shapeFlag && y && !y.persisted) {
      let { leave: x, delayLeave: _ } = y, m = () => x(h, g);
      _ ? _(u.el, g, m) : m();
    } else g();
  }, ke = (u, c) => {
    let h;
    for (; u !== c; ) h = w(u), o(u), u = h;
    o(c);
  }, Ae = (u, c, h) => {
    let { bum: C, scope: y, job: g, subTree: x, um: _, m, a: v, parent: k, slots: { __: E } } = u;
    Wl(m), Wl(v), C && Vn(C), k && F(E) && E.forEach((A) => {
      k.renderCache[A] = void 0;
    }), y.stop(), g && (g.flags |= 8, U(x, u, c, h)), _ && Te(_, c), Te(() => {
      u.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, pe = (u, c, h, C = !1, y = !1, g = 0) => {
    for (let x = g; x < u.length; x++) U(u[x], c, h, C, y);
  }, Be = (u) => {
    if (6 & u.shapeFlag) return Be(u.component.subTree);
    if (128 & u.shapeFlag) return u.suspense.next();
    let c = w(u.anchor || u.el), h = c && c[ri];
    return h ? w(h) : c;
  }, Ie = !1, jn = (u, c, h) => {
    u == null ? c._vnode && U(c._vnode, null, null, !0) : P(c._vnode || null, u, c, null, null, null, h), c._vnode = u, Ie || (Ie = !0, Ml(), $r(), Ie = !1);
  }, Rt = { p: P, um: U, m: Z, r: ie, mt: J, mc: ne, pc: ce, pbc: $, n: Be, o: e };
  return { render: jn, hydrate: l, createApp: (n = l, function(u, c = null) {
    I(u) || (u = re({}, u)), c == null || le(c) || (c = null);
    let h = Yr(), C = /* @__PURE__ */ new WeakSet(), y = [], g = !1, x = h.app = { _uid: _i++, _component: u, _props: c, _container: null, _context: h, _instance: null, version: zi, get config() {
      return h.config;
    }, set config(_) {
    }, use: (_, ...m) => (C.has(_) || (_ && I(_.install) ? (C.add(_), _.install(x, ...m)) : I(_) && (C.add(_), _(x, ...m))), x), mixin: (_) => (h.mixins.includes(_) || h.mixins.push(_), x), component: (_, m) => m ? (h.components[_] = m, x) : h.components[_], directive: (_, m) => m ? (h.directives[_] = m, x) : h.directives[_], mount(_, m, v) {
      if (!g) {
        let k = x._ceVNode || Ce(u, c);
        return k.appContext = h, v === !0 ? v = "svg" : v === !1 && (v = void 0), m && n ? n(k, _) : jn(k, _, v), g = !0, x._container = _, _.__vue_app__ = x, Pl(k.component);
      }
    }, onUnmount(_) {
      y.push(_);
    }, unmount() {
      g && (Ue(y, x._instance, 16), jn(null, x._container), delete x._container.__vue_app__);
    }, provide: (_, m) => (h.provides[_] = m, x), runWithContext(_) {
      let m = Pt;
      Pt = x;
      try {
        return _();
      } finally {
        Pt = m;
      }
    } };
    return x;
  }) };
}
function Xn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function vt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Si(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function os(e, t, n = !1) {
  let l = e.children, r = t.children;
  if (F(l) && F(r)) for (let i = 0; i < l.length; i++) {
    let o = l[i], s = r[i];
    1 & s.shapeFlag && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && ((s = r[i] = at(r[i])).el = o.el), n || s.patchFlag === -2 || os(o, s)), s.type === Fn && (s.el = o.el), s.type !== xe || s.el || (s.el = o.el);
  }
}
function Wl(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
let Ci = Symbol.for("v-scx"), wi = () => un(Ci);
function fn(e, t, n) {
  return as(e, t, n);
}
function as(e, t, n = te) {
  let l, { immediate: r, deep: i, flush: o, once: s } = n, a = re({}, n), f = t && r || !t && o !== "post";
  if (Kt) {
    if (o === "sync") {
      let b = wi();
      l = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!f) {
      let b = () => {
      };
      return b.stop = Xe, b.resume = Xe, b.pause = Xe, b;
    }
  }
  let p = Se;
  a.call = (b, w, R) => Ue(b, p, w, R);
  let d = !1;
  o === "post" ? a.scheduler = (b) => {
    Te(b, p && p.suspense);
  } : o !== "sync" && (d = !0, a.scheduler = (b, w) => {
    w ? b() : Cl(b);
  }), a.augmentJob = (b) => {
    t && (b.flags |= 4), d && (b.flags |= 2, p && (b.id = p.uid, b.i = p));
  };
  let S = function(b, w, R = te) {
    let j, P, z, M, { immediate: B, deep: H, once: Y, scheduler: se, augmentJob: ne, call: L } = R, $ = (V) => H ? V : Ne(V) || H === !1 || H === 0 ? ut(V, 1) : ut(V), K = !1, O = !1;
    if (_e(b) ? (P = () => b.value, K = Ne(b)) : Tt(b) ? (P = () => $(b), K = !0) : F(b) ? (O = !0, K = b.some((V) => Tt(V) || Ne(V)), P = () => b.map((V) => _e(V) ? V.value : Tt(V) ? $(V) : I(V) ? L ? L(V, 2) : V() : void 0)) : P = I(b) ? w ? L ? () => L(b, 2) : b : () => {
      if (z) {
        et();
        try {
          z();
        } finally {
          tt();
        }
      }
      let V = mt;
      mt = j;
      try {
        return L ? L(b, 3, [M]) : b(M);
      } finally {
        mt = V;
      }
    } : Xe, w && H) {
      let V = P, ce = H === !0 ? 1 / 0 : H;
      P = () => ut(V(), ce);
    }
    let X = Ns(), J = () => {
      j.stop(), X && X.active && dl(X.effects, j);
    };
    if (Y && w) {
      let V = w;
      w = (...ce) => {
        V(...ce), J();
      };
    }
    let ae = O ? Array(b.length).fill(rn) : rn, we = (V) => {
      if (1 & j.flags && (j.dirty || V)) if (w) {
        let ce = j.run();
        if (H || K || (O ? ce.some((Ct, ue) => ft(Ct, ae[ue])) : ft(ce, ae))) {
          z && z();
          let Ct = mt;
          mt = j;
          try {
            let ue = [ce, ae === rn ? void 0 : O && ae[0] === rn ? [] : ae, M];
            ae = ce, L ? L(w, 3, ue) : w(...ue);
          } finally {
            mt = Ct;
          }
        }
      } else j.run();
    };
    return ne && ne(we), (j = new br(P)).scheduler = se ? () => se(we, !1) : we, M = (V) => ti(V, !1, j), z = j.onStop = () => {
      let V = gn.get(j);
      if (V) {
        if (L) L(V, 4);
        else for (let ce of V) ce();
        gn.delete(j);
      }
    }, w ? B ? we(!0) : ae = j.run() : se ? se(we.bind(null, !0), !0) : j.run(), J.pause = j.pause.bind(j), J.resume = j.resume.bind(j), J.stop = J, J;
  }(e, t, a);
  return Kt && (l ? l.push(S) : f && S()), S;
}
function ki(e, t, n) {
  let l, r = this.proxy, i = oe(e) ? e.includes(".") ? us(r, e) : () => r[e] : e.bind(r, r);
  I(t) ? l = t : (l = t.handler, n = t);
  let o = Yt(this), s = as(i, l.bind(r), n);
  return o(), s;
}
function us(e, t) {
  let n = t.split(".");
  return () => {
    let l = e;
    for (let r = 0; r < n.length && l; r++) l = l[n[r]];
    return l;
  };
}
let Ai = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${$e(t)}Modifiers`] || e[`${Me(t)}Modifiers`];
function Ei(e, t, ...n) {
  let l;
  if (e.isUnmounted) return;
  let r = e.vnode.props || te, i = n, o = t.startsWith("update:"), s = o && Ai(r, t.slice(7));
  s && (s.trim && (i = n.map((p) => oe(p) ? p.trim() : p)), s.number && (i = n.map(Os)));
  let a = r[l = $n(t)] || r[l = $n($e(t))];
  !a && o && (a = r[l = $n(Me(t))]), a && Ue(a, e, 6, i);
  let f = r[l + "Once"];
  if (f) {
    if (e.emitted) {
      if (e.emitted[l]) return;
    } else e.emitted = {};
    e.emitted[l] = !0, Ue(f, e, 6, i);
  }
}
function yn(e, t) {
  return !!e && !!Cn(t) && (G(e, (t = t.slice(2).replace(/Once$/, ""))[0].toLowerCase() + t.slice(1)) || G(e, Me(t)) || G(e, t));
}
function zl(e) {
  let t, n, { type: l, vnode: r, proxy: i, withProxy: o, propsOptions: [s], slots: a, attrs: f, emit: p, render: d, renderCache: S, props: b, data: w, setupState: R, ctx: j, inheritAttrs: P } = e, z = vn(e);
  try {
    if (4 & r.shapeFlag) {
      let B = o || i;
      t = Ge(d.call(B, B, S, b, R, w, j)), n = f;
    } else t = Ge(l.length > 1 ? l(b, { attrs: f, slots: a, emit: p }) : l(b, null)), n = l.props ? f : Ti(f);
  } catch (B) {
    qt.length = 0, Ln(B, e, 1), t = Ce(xe);
  }
  let M = t;
  if (n && P !== !1) {
    let B = Object.keys(n), { shapeFlag: H } = M;
    B.length && 7 & H && (s && B.some(pl) && (n = Oi(n, s)), M = pt(M, n, !1, !0));
  }
  return r.dirs && ((M = pt(M, null, !1, !0)).dirs = M.dirs ? M.dirs.concat(r.dirs) : r.dirs), r.transition && St(M, r.transition), t = M, vn(z), t;
}
let Ti = (e) => {
  let t;
  for (let n in e) (n === "class" || n === "style" || Cn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Oi = (e, t) => {
  let n = {};
  for (let l in e) pl(l) && l.slice(9) in t || (n[l] = e[l]);
  return n;
};
function Hl(e, t, n) {
  let l = Object.keys(t);
  if (l.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < l.length; r++) {
    let i = l[r];
    if (t[i] !== e[i] && !yn(n, i)) return !0;
  }
  return !1;
}
function Pi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    let l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.el = e.el), l === e) (e = t.vnode).el = n, t = t.parent;
    else break;
  }
}
let fs = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : ni(e);
}
let je = Symbol.for("v-fgt"), Fn = Symbol.for("v-txt"), xe = Symbol.for("v-cmt"), Zn = Symbol.for("v-stc"), qt = [], Pe = null;
function Fe(e = !1) {
  qt.push(Pe = e ? null : []);
}
function Ri() {
  qt.pop(), Pe = qt[qt.length - 1] || null;
}
let Zt = 1;
function ql(e, t = !1) {
  Zt += e, e < 0 && Pe && t && (Pe.hasOnce = !0);
}
function cs(e) {
  return e.dynamicChildren = Zt > 0 ? Pe || At : null, Ri(), Zt > 0 && Pe && Pe.push(e), e;
}
function De(e, t, n, l, r, i) {
  return cs(Oe(e, t, n, l, r, i, !0));
}
function Fi(e, t, n, l, r) {
  return cs(Ce(e, t, n, l, r, !0));
}
function bn(e) {
  return !!e && e.__v_isVNode === !0;
}
function bt(e, t) {
  return e.type === t.type && e.key === t.key;
}
let ps = ({ key: e }) => e != null ? e : null, cn = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || _e(e) || I(e) ? { i: Ze, r: e, k: t, f: !!n } : e : null);
function Oe(e, t = null, n = null, l = 0, r = null, i = +(e !== je), o = !1, s = !1) {
  let a = { __v_isVNode: !0, __v_skip: !0, type: e, props: t, key: t && ps(t), ref: t && cn(t), scopeId: Vr, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: l, dynamicProps: r, dynamicChildren: null, appContext: null, ctx: Ze };
  return s ? (Tl(a, n), 128 & i && e.normalize(a)) : n && (a.shapeFlag |= oe(n) ? 8 : 16), Zt > 0 && !o && Pe && (a.patchFlag > 0 || 6 & i) && a.patchFlag !== 32 && Pe.push(a), a;
}
let Ce = function(e, t = null, n = null, l = 0, r = null, i = !1) {
  var o;
  if (e && e !== hi || (e = xe), bn(e)) {
    let a = pt(e, t, !0);
    return n && Tl(a, n), Zt > 0 && !i && Pe && (6 & a.shapeFlag ? Pe[Pe.indexOf(e)] = a : Pe.push(a)), a.patchFlag = -2, a;
  }
  if (I(o = e) && "__vccOpts" in o && (e = e.__vccOpts), t) {
    let { class: a, style: f } = t = ji(t);
    a && !oe(a) && (t.class = vl(a)), le(f) && (Sl(f) && !F(f) && (f = re({}, f)), t.style = gl(f));
  }
  let s = oe(e) ? 1 : fs(e) ? 128 : e.__isTeleport ? 64 : le(e) ? 4 : 2 * !!I(e);
  return Oe(e, t, n, l, r, s, i, !0);
};
function ji(e) {
  return e ? Sl(e) || ts(e) ? re({}, e) : e : null;
}
function pt(e, t, n = !1, l = !1) {
  let { props: r, ref: i, patchFlag: o, children: s, transition: a } = e, f = t ? Mi(r || {}, t) : r, p = { __v_isVNode: !0, __v_skip: !0, type: e.type, props: f, key: f && ps(f), ref: t && t.ref ? n && i ? F(i) ? i.concat(cn(t)) : [i, cn(t)] : cn(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: s, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== je ? o === -1 ? 16 : 16 | o : o, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: a, component: e.component, suspense: e.suspense, ssContent: e.ssContent && pt(e.ssContent), ssFallback: e.ssFallback && pt(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return a && l && St(p, a.clone(p)), p;
}
function fl(e = " ", t = 0) {
  return Ce(Fn, null, e, t);
}
function Nt(e = "", t = !1) {
  return t ? (Fe(), Fi(xe, null, e)) : Ce(xe, null, e);
}
function Ge(e) {
  return e == null || typeof e == "boolean" ? Ce(xe) : F(e) ? Ce(je, null, e.slice()) : bn(e) ? at(e) : Ce(Fn, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : pt(e);
}
function Tl(e, t) {
  let n = 0, { shapeFlag: l } = e;
  if (t == null) t = null;
  else if (F(t)) n = 16;
  else if (typeof t == "object") if (65 & l) {
    let r = t.default;
    r && (r._c && (r._d = !1), Tl(e, r()), r._c && (r._d = !0));
    return;
  } else {
    n = 32;
    let r = t._;
    r || ts(t) ? r === 3 && Ze && (Ze.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Ze;
  }
  else I(t) ? (t = { default: t, _ctx: Ze }, n = 32) : (t = String(t), 64 & l ? (n = 16, t = [fl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Mi(...e) {
  let t = {};
  for (let n = 0; n < e.length; n++) {
    let l = e[n];
    for (let r in l) if (r === "class") t.class !== l.class && (t.class = vl([t.class, l.class]));
    else if (r === "style") t.style = gl([t.style, l.style]);
    else if (Cn(r)) {
      let i = t[r], o = l[r];
      o && i !== o && !(F(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
    } else r !== "" && (t[r] = l[r]);
  }
  return t;
}
function He(e, t, n, l = null) {
  Ue(e, t, 7, [n, l]);
}
let Ni = Yr(), Ii = 0;
function Di(e, t, n) {
  let l = e.type, r = (t ? t.appContext : e.appContext) || Ni, i = { uid: Ii++, vnode: e, type: l, parent: t, appContext: r, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Ms(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(r.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function o(s, a, f = !1) {
    let p = f ? yi : a.propsCache, d = p.get(s);
    if (d) return d;
    let S = s.props, b = {}, w = [], R = !1;
    if (!I(s)) {
      let P = (z) => {
        R = !0;
        let [M, B] = o(z, a, !0);
        re(b, M), B && w.push(...B);
      };
      !f && a.mixins.length && a.mixins.forEach(P), s.extends && P(s.extends), s.mixins && s.mixins.forEach(P);
    }
    if (!S && !R) return le(s) && p.set(s, At), At;
    if (F(S)) for (let P = 0; P < S.length; P++) {
      let z = $e(S[P]);
      Bl(z) && (b[z] = te);
    }
    else if (S) for (let P in S) {
      let z = $e(P);
      if (Bl(z)) {
        let M = S[P], B = b[z] = F(M) || I(M) ? { type: M } : re({}, M), H = B.type, Y = !1, se = !0;
        if (F(H)) for (let ne = 0; ne < H.length; ++ne) {
          let L = H[ne], $ = I(L) && L.name;
          if ($ === "Boolean") {
            Y = !0;
            break;
          }
          $ === "String" && (se = !1);
        }
        else Y = I(H) && H.name === "Boolean";
        B[0] = Y, B[1] = se, (Y || G(B, "default")) && w.push(z);
      }
    }
    let j = [b, w];
    return le(s) && p.set(s, j), j;
  }(l, r), emitsOptions: function o(s, a, f = !1) {
    let p = a.emitsCache, d = p.get(s);
    if (d !== void 0) return d;
    let S = s.emits, b = {}, w = !1;
    if (!I(s)) {
      let R = (j) => {
        let P = o(j, a, !0);
        P && (w = !0, re(b, P));
      };
      !f && a.mixins.length && a.mixins.forEach(R), s.extends && R(s.extends), s.mixins && s.mixins.forEach(R);
    }
    return S || w ? (F(S) ? S.forEach((R) => b[R] = null) : re(b, S), le(s) && p.set(s, b), b) : (le(s) && p.set(s, null), null);
  }(l, r), emit: null, emitted: null, propsDefaults: te, inheritAttrs: l.inheritAttrs, ctx: te, data: te, props: te, attrs: te, slots: te, refs: te, setupState: te, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ei.bind(null, i), e.ce && e.ce(i), i;
}
let Se = null, Ol = () => Se || Ze;
{
  let e = En(), t = (n, l) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(l), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  dn = t("__VUE_INSTANCE_SETTERS__", (n) => Se = n), Yn = t("__VUE_SSR_SETTERS__", (n) => Kt = n);
}
let Yt = (e) => {
  let t = Se;
  return dn(e), e.scope.on(), () => {
    e.scope.off(), dn(t);
  };
}, Jl = () => {
  Se && Se.scope.off(), dn(null);
};
function ds(e) {
  return 4 & e.vnode.shapeFlag;
}
let Kt = !1;
function $i(e, t = !1, n = !1) {
  t && Yn(t);
  let { props: l, children: r } = e.vnode, i = ds(e);
  (function(s, a, f, p = !1) {
    let d = {}, S = Ul();
    for (let b in s.propsDefaults = /* @__PURE__ */ Object.create(null), ns(s, a, d, S), s.propsOptions[0]) b in d || (d[b] = void 0);
    f ? s.props = p ? d : Xs(d) : s.type.props ? s.props = d : s.props = S, s.attrs = S;
  })(e, l, i, t), ((s, a, f) => {
    let p = s.slots = Ul();
    if (32 & s.vnode.shapeFlag) {
      let d = a.__;
      d && tl(p, "__", d, !0);
      let S = a._;
      S ? (ss(p, a, f), f && tl(p, "_", S, !0)) : ls(a, p);
    } else a && rs(s, a);
  })(e, r, n || t);
  let o = i ? function(s, a) {
    let f = s.type;
    s.accessCache = /* @__PURE__ */ Object.create(null), s.proxy = new Proxy(s.ctx, il);
    let { setup: p } = f;
    if (p) {
      et();
      let d = s.setupContext = p.length > 1 ? Ui(s) : null, S = Yt(s), b = Qt(p, s, 0, [s.props, d]), w = gr(b);
      if (tt(), S(), (w || s.sp) && !zt(s) && Jr(s), w) {
        if (b.then(Jl, Jl), a) return b.then((R) => {
          Gl(s, R);
        }).catch((R) => {
          Ln(R, s, 0);
        });
        s.asyncDep = b;
      } else Gl(s, b);
    } else hs(s);
  }(e, t) : void 0;
  return t && Yn(!1), o;
}
function Gl(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) && (e.setupState = Mr(t)), hs(e);
}
function hs(e, t, n) {
  let l = e.type;
  e.render || (e.render = l.render || Xe);
  {
    let r = Yt(e);
    et();
    try {
      (function(i) {
        let o = Qr(i), s = i.proxy, a = i.ctx;
        ol = !1, o.beforeCreate && Dl(o.beforeCreate, i, "bc");
        let { data: f, computed: p, methods: d, watch: S, provide: b, inject: w, created: R, beforeMount: j, mounted: P, beforeUpdate: z, updated: M, activated: B, deactivated: H, beforeDestroy: Y, beforeUnmount: se, destroyed: ne, unmounted: L, render: $, renderTracked: K, renderTriggered: O, errorCaptured: X, serverPrefetch: J, expose: ae, inheritAttrs: we, components: V, directives: ce, filters: Ct } = o;
        if (w && function(Z, U, ie = Xe) {
          for (let ke in F(Z) && (Z = al(Z)), Z) {
            let Ae, pe = Z[ke];
            _e(Ae = le(pe) ? "default" in pe ? un(pe.from || ke, pe.default, !0) : un(pe.from || ke) : un(pe)) ? Object.defineProperty(U, ke, { enumerable: !0, configurable: !0, get: () => Ae.value, set: (Be) => Ae.value = Be }) : U[ke] = Ae;
          }
        }(w, a, null), d) for (let Z in d) {
          let U = d[Z];
          I(U) && (a[Z] = U.bind(s));
        }
        if (f) {
          let Z = f.call(s, s);
          le(Z) && (i.data = bl(Z));
        }
        if (ol = !0, p) for (let Z in p) {
          let U = p[Z], ie = I(U) ? U.bind(s, s) : I(U.get) ? U.get.bind(s, s) : Xe, ke = Bi({ get: ie, set: !I(U) && I(U.set) ? U.set.bind(s) : Xe });
          Object.defineProperty(a, Z, { enumerable: !0, configurable: !0, get: () => ke.value, set: (Ae) => ke.value = Ae });
        }
        if (S) for (let Z in S) (function U(ie, ke, Ae, pe) {
          let Be = pe.includes(".") ? us(Ae, pe) : () => Ae[pe];
          if (oe(ie)) {
            let Ie = ke[ie];
            I(Ie) && fn(Be, Ie);
          } else if (I(ie)) fn(Be, ie.bind(Ae));
          else if (le(ie)) if (F(ie)) ie.forEach((Ie) => U(Ie, ke, Ae, pe));
          else {
            let Ie = I(ie.handler) ? ie.handler.bind(Ae) : ke[ie.handler];
            I(Ie) && fn(Be, Ie, ie);
          }
        })(S[Z], a, s, Z);
        if (b) {
          let Z = I(b) ? b.call(s) : b;
          Reflect.ownKeys(Z).forEach((U) => {
            mi(U, Z[U]);
          });
        }
        function ue(Z, U) {
          F(U) ? U.forEach((ie) => Z(ie.bind(s))) : U && Z(U.bind(s));
        }
        if (R && Dl(R, i, "c"), ue(ai, j), ue(kl, P), ue(ui, z), ue(Xr, M), ue(ii, B), ue(oi, H), ue(di, X), ue(pi, K), ue(ci, O), ue(Zr, se), ue(Kr, L), ue(fi, J), F(ae)) if (ae.length) {
          let Z = i.exposed || (i.exposed = {});
          ae.forEach((U) => {
            Object.defineProperty(Z, U, { get: () => s[U], set: (ie) => s[U] = ie, enumerable: !0 });
          });
        } else i.exposed || (i.exposed = {});
        $ && i.render === Xe && (i.render = $), we != null && (i.inheritAttrs = we), V && (i.components = V), ce && (i.directives = ce), J && Jr(i);
      })(e);
    } finally {
      tt(), r();
    }
  }
}
let Vi = { get: (e, t) => (ve(e, "get", ""), e[t]) };
function Ui(e) {
  return { attrs: new Proxy(e.attrs, Vi), slots: e.slots, emit: e.emit, expose: (t) => {
    e.exposed = t || {};
  } };
}
function Pl(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Mr(Zs(e.exposed)), { get: (t, n) => n in t ? t[n] : n in Ht ? Ht[n](e) : void 0, has: (t, n) => n in t || n in Ht })) : e.proxy;
}
let Bi = (e, t) => function(n, l, r = !1) {
  let i, o;
  return I(n) ? i = n : (i = n.get, o = n.set), new ei(i, o, r);
}(e, 0, Kt);
function Wi(e, t, n) {
  let l = arguments.length;
  return l !== 2 ? (l > 3 ? n = Array.prototype.slice.call(arguments, 2) : l === 3 && bn(n) && (n = [n]), Ce(e, t, n)) : !le(t) || F(t) ? Ce(e, null, t) : bn(t) ? Ce(e, null, [t]) : Ce(e, t);
}
let zi = "3.5.18", Xl = typeof window != "undefined" && window.trustedTypes;
if (Xl) try {
  el = Xl.createPolicy("vue", { createHTML: (e) => e });
} catch (e) {
}
let gs = el ? (e) => el.createHTML(e) : (e) => e, Qe = typeof document != "undefined" ? document : null, Zl = Qe && Qe.createElement("template"), rt = "transition", It = "animation", Lt = Symbol("_vtc"), vs = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, _s = re({}, Br, vs);
(In = (e, { slots: t }) => Wi(si, ms(e), t)).displayName = "Transition", In.props = _s;
let _t = (e, t = []) => {
  F(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Kl = (e) => !!e && (F(e) ? e.some((t) => t.length > 1) : e.length > 1);
function ms(e) {
  let t = {};
  for (let O in e) O in vs || (t[O] = e[O]);
  if (e.css === !1) return t;
  let { name: n = "v", type: l, duration: r, enterFromClass: i = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: a = i, appearActiveClass: f = o, appearToClass: p = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: S = `${n}-leave-active`, leaveToClass: b = `${n}-leave-to` } = e, w = function(O) {
    if (O == null) return null;
    {
      if (le(O)) return [function(J) {
        return Ut(J);
      }(O.enter), function(J) {
        return Ut(J);
      }(O.leave)];
      let X = function(J) {
        return Ut(J);
      }(O);
      return [X, X];
    }
  }(r), R = w && w[0], j = w && w[1], { onBeforeEnter: P, onEnter: z, onEnterCancelled: M, onLeave: B, onLeaveCancelled: H, onBeforeAppear: Y = P, onAppear: se = z, onAppearCancelled: ne = M } = t, L = (O, X, J, ae) => {
    O._enterCancelled = ae, st(O, X ? p : s), st(O, X ? f : o), J && J();
  }, $ = (O, X) => {
    O._isLeaving = !1, st(O, d), st(O, b), st(O, S), X && X();
  }, K = (O) => (X, J) => {
    let ae = O ? se : z, we = () => L(X, O, J);
    _t(ae, [X, we]), Ql(() => {
      st(X, O ? a : i), qe(X, O ? p : s), Kl(ae) || Yl(X, l, R, we);
    });
  };
  return re(t, { onBeforeEnter(O) {
    _t(P, [O]), qe(O, i), qe(O, o);
  }, onBeforeAppear(O) {
    _t(Y, [O]), qe(O, a), qe(O, f);
  }, onEnter: K(!1), onAppear: K(!0), onLeave(O, X) {
    O._isLeaving = !0;
    let J = () => $(O, X);
    qe(O, d), O._enterCancelled ? (qe(O, S), cl()) : (cl(), qe(O, S)), Ql(() => {
      O._isLeaving && (st(O, d), qe(O, b), Kl(B) || Yl(O, l, j, J));
    }), _t(B, [O, J]);
  }, onEnterCancelled(O) {
    L(O, !1, void 0, !0), _t(M, [O]);
  }, onAppearCancelled(O) {
    L(O, !0, void 0, !0), _t(ne, [O]);
  }, onLeaveCancelled(O) {
    $(O), _t(H, [O]);
  } });
}
function qe(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Lt] || (e[Lt] = /* @__PURE__ */ new Set())).add(t);
}
function st(e, t) {
  t.split(/\s+/).forEach((l) => l && e.classList.remove(l));
  let n = e[Lt];
  n && (n.delete(t), n.size || (e[Lt] = void 0));
}
function Ql(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Hi = 0;
function Yl(e, t, n, l) {
  let r = e._endId = ++Hi, i = () => {
    r === e._endId && l();
  };
  if (n != null) return setTimeout(i, n);
  let { type: o, timeout: s, propCount: a } = ys(e, t);
  if (!o) return l();
  let f = o + "end", p = 0, d = () => {
    e.removeEventListener(f, S), i();
  }, S = (b) => {
    b.target === e && ++p >= a && d();
  };
  setTimeout(() => {
    p < a && d();
  }, s + 1), e.addEventListener(f, S);
}
function ys(e, t) {
  let n = window.getComputedStyle(e), l = (w) => (n[w] || "").split(", "), r = l(`${rt}Delay`), i = l(`${rt}Duration`), o = er(r, i), s = l(`${It}Delay`), a = l(`${It}Duration`), f = er(s, a), p = null, d = 0, S = 0;
  t === rt ? o > 0 && (p = rt, d = o, S = i.length) : t === It ? f > 0 && (p = It, d = f, S = a.length) : S = (p = (d = Math.max(o, f)) > 0 ? o > f ? rt : It : null) ? p === rt ? i.length : a.length : 0;
  let b = p === rt && /\b(transform|all)(,|$)/.test(l(`${rt}Property`).toString());
  return { type: p, timeout: d, propCount: S, hasTransform: b };
}
function er(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, l) => tr(n) + tr(e[l])));
}
function tr(e) {
  return e === "auto" ? 0 : 1e3 * Number(e.slice(0, -1).replace(",", "."));
}
function cl() {
  return document.body.offsetHeight;
}
let nr = Symbol("_vod"), qi = Symbol("_vsh"), Ji = Symbol(""), Gi = /(^|;)\s*display\s*:/, lr = /\s*!important$/;
function pn(e, t, n) {
  if (F(n)) n.forEach((l) => pn(e, t, l));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    let l = function(r, i) {
      let o = Kn[i];
      if (o) return o;
      let s = $e(i);
      if (s !== "filter" && s in r) return Kn[i] = s;
      s = _r(s);
      for (let a = 0; a < rr.length; a++) {
        let f = rr[a] + s;
        if (f in r) return Kn[i] = f;
      }
      return i;
    }(e, t);
    lr.test(n) ? e.setProperty(Me(l), n.replace(lr, ""), "important") : e[l] = n;
  }
}
let rr = ["Webkit", "Moz", "ms"], Kn = {}, sr = "http://www.w3.org/1999/xlink";
function ir(e, t, n, l, r, i = js(t)) {
  l && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(sr, t.slice(6, t.length)) : e.setAttributeNS(sr, t, n) : n == null || i && !(n || n === "") ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : dt(n) ? String(n) : n);
}
function or(e, t, n, l, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? gs(n) : n);
    return;
  }
  let i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    let a = i === "OPTION" ? e.getAttribute("value") || "" : e.value, f = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    a === f && "_value" in e || (e.value = f), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    let a = typeof e[t];
    if (a === "boolean") {
      var s;
      n = !!(s = n) || s === "";
    } else n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch (a) {
  }
  o && e.removeAttribute(r || t);
}
function Xi(e, t, n, l) {
  e.addEventListener(t, n, l);
}
let ar = Symbol("_vei"), ur = /(?:Once|Passive|Capture)$/, Qn = 0, Zi = Promise.resolve(), fr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && 123 > e.charCodeAt(2), cr = {};
function Ki(e, t, n) {
  let l = qr(e, t);
  kn(l) && re(l, t);
  class r extends Ll {
    constructor(o) {
      super(l, o, n);
    }
  }
  return r.def = l, r;
}
let Qi = typeof HTMLElement != "undefined" ? HTMLElement : class {
};
class Ll extends Qi {
  constructor(t, n = {}, l = dr) {
    super(), this._def = t, this._props = n, this._createApp = l, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && l !== dr ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._resolved || this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); ) if (t instanceof Ll) {
      this._parent = t;
      break;
    }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(this._app._context.provides, t._instance.provides);
  }
  disconnectedCallback() {
    this._connected = !1, Ir(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  _resolveDef() {
    if (this._pendingResolve) return;
    for (let l = 0; l < this.attributes.length; l++) this._setAttr(this.attributes[l].name);
    this._ob = new MutationObserver((l) => {
      for (let r of l) this._setAttr(r.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    let t = (l, r = !1) => {
      let i;
      this._resolved = !0, this._pendingResolve = void 0;
      let { props: o, styles: s } = l;
      if (o && !F(o)) for (let a in o) {
        let f = o[a];
        (f === Number || f && f.type === Number) && (a in this._props && (this._props[a] = Ut(this._props[a])), (i || (i = /* @__PURE__ */ Object.create(null)))[$e(a)] = !0);
      }
      this._numberProps = i, this._resolveProps(l), this.shadowRoot && this._applyStyles(s), this._mount(l);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((l) => {
      l.configureApp = this._def.configureApp, t(this._def = l, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    let n = this._instance && this._instance.exposed;
    if (n) for (let l in n) G(this, l) || Object.defineProperty(this, l, { get: () => jr(n[l]) });
  }
  _resolveProps(t) {
    let { props: n } = t, l = F(n) ? n : Object.keys(n || {});
    for (let r of Object.keys(this)) r[0] !== "_" && l.includes(r) && this._setProp(r, this[r]);
    for (let r of l.map($e)) Object.defineProperty(this, r, { get() {
      return this._getProp(r);
    }, set(i) {
      this._setProp(r, i, !0, !0);
    } });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    let n = this.hasAttribute(t), l = n ? this.getAttribute(t) : cr, r = $e(t);
    n && this._numberProps && this._numberProps[r] && (l = Ut(l)), this._setProp(r, l, !1, !0);
  }
  _getProp(t) {
    return this._props[t];
  }
  _setProp(t, n, l = !0, r = !1) {
    if (n !== this._props[t] && (n === cr ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), r && this._instance && this._update(), l)) {
      let i = this._ob;
      i && i.disconnect(), n === !0 ? this.setAttribute(Me(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Me(t), n + "") : n || this.removeAttribute(Me(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    let t = this._createVNode();
    this._app && (t.appContext = this._app._context), no(t, this._root);
  }
  _createVNode() {
    let t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    let n = Ce(this._def, re(t, this._props));
    return this._instance || (n.ce = (l) => {
      this._instance = l, l.ce = this, l.isCE = !0;
      let r = (i, o) => {
        this.dispatchEvent(new CustomEvent(i, kn(o[0]) ? re({ detail: o }, o[0]) : { detail: o }));
      };
      l.emit = (i, ...o) => {
        r(i, o), Me(i) !== i && r(Me(i), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n)) return;
      this._styleChildren.add(n);
    }
    let l = this._nonce;
    for (let r = t.length - 1; r >= 0; r--) {
      let i = document.createElement("style");
      l && i.setAttribute("nonce", l), i.textContent = t[r], this.shadowRoot.prepend(i);
    }
  }
  _parseSlots() {
    let t, n = this._slots = {};
    for (; t = this.firstChild; ) {
      let l = t.nodeType === 1 && t.getAttribute("slot") || "default";
      (n[l] || (n[l] = [])).push(t), this.removeChild(t);
    }
  }
  _renderSlots() {
    let t = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let l = 0; l < t.length; l++) {
      let r = t[l], i = r.getAttribute("name") || "default", o = this._slots[i], s = r.parentNode;
      if (o) for (let a of o) {
        if (n && a.nodeType === 1) {
          let f, p = n + "-s", d = document.createTreeWalker(a, 1);
          for (a.setAttribute(p, ""); f = d.nextNode(); ) f.setAttribute(p, "");
        }
        s.insertBefore(a, r);
      }
      else for (; r.firstChild; ) s.insertBefore(r.firstChild, r);
      s.removeChild(r);
    }
  }
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  _removeChildStyle(t) {
  }
}
let bs = /* @__PURE__ */ new WeakMap(), xs = /* @__PURE__ */ new WeakMap(), xn = Symbol("_moveCb"), pr = Symbol("_enterCb");
Dn = { name: "TransitionGroup", props: re({}, _s, { tag: String, moveClass: String }), setup(e, { slots: t }) {
  let n, l, r = Ol(), i = Ur();
  return Xr(() => {
    if (!n.length) return;
    let o = e.moveClass || `${e.name || "v"}-move`;
    if (!function(a, f, p) {
      let d = a.cloneNode(), S = a[Lt];
      S && S.forEach((R) => {
        R.split(/\s+/).forEach((j) => j && d.classList.remove(j));
      }), p.split(/\s+/).forEach((R) => R && d.classList.add(R)), d.style.display = "none";
      let b = f.nodeType === 1 ? f : f.parentNode;
      b.appendChild(d);
      let { hasTransform: w } = ys(d);
      return b.removeChild(d), w;
    }(n[0].el, r.vnode.el, o)) {
      n = [];
      return;
    }
    n.forEach(Yi), n.forEach(eo);
    let s = n.filter(to);
    cl(), s.forEach((a) => {
      let f = a.el, p = f.style;
      qe(f, o), p.transform = p.webkitTransform = p.transitionDuration = "";
      let d = f[xn] = (S) => {
        (!S || S.target === f) && (!S || /transform$/.test(S.propertyName)) && (f.removeEventListener("transitionend", d), f[xn] = null, st(f, o));
      };
      f.addEventListener("transitionend", d);
    }), n = [];
  }), () => {
    let o = q(e), s = ms(o), a = o.tag || je;
    if (n = [], l) for (let f = 0; f < l.length; f++) {
      let p = l[f];
      p.el && p.el instanceof Element && (n.push(p), St(p, Xt(p, s, i, r)), bs.set(p, p.el.getBoundingClientRect()));
    }
    l = t.default ? wl(t.default()) : [];
    for (let f = 0; f < l.length; f++) {
      let p = l[f];
      p.key != null && St(p, Xt(p, s, i, r));
    }
    return Ce(a, null, l);
  };
} }, delete Dn.props.mode;
function Yi(e) {
  let t = e.el;
  t[xn] && t[xn](), t[pr] && t[pr]();
}
function eo(e) {
  xs.set(e, e.el.getBoundingClientRect());
}
function to(e) {
  let t = bs.get(e), n = xs.get(e), l = t.left - n.left, r = t.top - n.top;
  if (l || r) {
    let i = e.el.style;
    return i.transform = i.webkitTransform = `translate(${l}px,${r}px)`, i.transitionDuration = "0s", e;
  }
}
let Ss = re({ patchProp: (e, t, n, l, r, i) => {
  let o = r === "svg";
  if (t === "class") {
    var s = l;
    let a = e[Lt];
    a && (s = (s ? [s, ...a] : [...a]).join(" ")), s == null ? e.removeAttribute("class") : o ? e.setAttribute("class", s) : e.className = s;
  } else t === "style" ? function(a, f, p) {
    let d = a.style, S = oe(p), b = !1;
    if (p && !S) {
      if (f) if (oe(f)) for (let w of f.split(";")) {
        let R = w.slice(0, w.indexOf(":")).trim();
        p[R] == null && pn(d, R, "");
      }
      else for (let w in f) p[w] == null && pn(d, w, "");
      for (let w in p) w === "display" && (b = !0), pn(d, w, p[w]);
    } else if (S) {
      if (f !== p) {
        let w = d[Ji];
        w && (p += ";" + w), d.cssText = p, b = Gi.test(p);
      }
    } else f && a.removeAttribute("style");
    nr in a && (a[nr] = b ? d.display : "", a[qi] && (d.display = "none"));
  }(e, n, l) : Cn(t) ? pl(t) || function(a, f, p, d, S = null) {
    let b = a[ar] || (a[ar] = {}), w = b[f];
    if (d && w) w.value = d;
    else {
      let [R, j] = function(P) {
        let z;
        if (ur.test(P)) {
          let M;
          for (z = {}; M = P.match(ur); ) P = P.slice(0, P.length - M[0].length), z[M[0].toLowerCase()] = !0;
        }
        return [P[2] === ":" ? P.slice(3) : Me(P.slice(2)), z];
      }(f);
      d ? Xi(a, R, b[f] = function(P, z) {
        let M = (B) => {
          if (B._vts) {
            if (B._vts <= M.attached) return;
          } else B._vts = Date.now();
          Ue(function(H, Y) {
            if (!F(Y)) return Y;
            {
              let se = H.stopImmediatePropagation;
              return H.stopImmediatePropagation = () => {
                se.call(H), H._stopped = !0;
              }, Y.map((ne) => (L) => !L._stopped && ne && ne(L));
            }
          }(B, M.value), z, 5, [B]);
        };
        return M.value = P, M.attached = Qn || (Zi.then(() => Qn = 0), Qn = Date.now()), M;
      }(d, S), j) : w && (a.removeEventListener(R, w, j), b[f] = void 0);
    }
  }(e, t, 0, l, i) : (t[0] === "." ? (t = t.slice(1), 0) : t[0] === "^" ? (t = t.slice(1), 1) : !function(a, f, p, d) {
    if (d) return !!(f === "innerHTML" || f === "textContent" || f in a && fr(f) && I(p));
    if (f === "spellcheck" || f === "draggable" || f === "translate" || f === "autocorrect" || f === "form" || f === "list" && a.tagName === "INPUT" || f === "type" && a.tagName === "TEXTAREA") return !1;
    if (f === "width" || f === "height") {
      let S = a.tagName;
      if (S === "IMG" || S === "VIDEO" || S === "CANVAS" || S === "SOURCE") return !1;
    }
    return !(fr(f) && oe(p)) && f in a;
  }(e, t, l, o)) ? e._isVueCE && (/[A-Z]/.test(t) || !oe(l)) ? or(e, $e(t), l, i, t) : (t === "true-value" ? e._trueValue = l : t === "false-value" && (e._falseValue = l), ir(e, t, l, o)) : (or(e, t, l), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || ir(e, t, l, o, i, t !== "value"));
} }, { insert: (e, t, n) => {
  t.insertBefore(e, n || null);
}, remove: (e) => {
  let t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, n, l) => {
  let r = t === "svg" ? Qe.createElementNS("http://www.w3.org/2000/svg", e) : t === "mathml" ? Qe.createElementNS("http://www.w3.org/1998/Math/MathML", e) : n ? Qe.createElement(e, { is: n }) : Qe.createElement(e);
  return e === "select" && l && l.multiple != null && r.setAttribute("multiple", l.multiple), r;
}, createText: (e) => Qe.createTextNode(e), createComment: (e) => Qe.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => Qe.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, n, l, r, i) {
  let o = n ? n.previousSibling : t.lastChild;
  if (r && (r === i || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), r !== i && (r = r.nextSibling); ) ;
  else {
    Zl.innerHTML = gs(l === "svg" ? `<svg>${e}</svg>` : l === "mathml" ? `<math>${e}</math>` : e);
    let s = Zl.content;
    if (l === "svg" || l === "mathml") {
      let a = s.firstChild;
      for (; a.firstChild; ) s.appendChild(a.firstChild);
      s.removeChild(a);
    }
    t.insertBefore(s, n);
  }
  return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
} }), no = (...e) => {
  (hn || (hn = is(Ss))).render(...e);
}, dr = (...e) => {
  let t = (hn || (hn = is(Ss))).createApp(...e), { mount: n } = t;
  return t.mount = (l) => {
    let r = ro(l);
    if (!r) return;
    let i = t._component;
    I(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    let o = n(r, !1, lo(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function lo(e) {
  return e instanceof SVGElement ? "svg" : typeof MathMLElement == "function" && e instanceof MathMLElement ? "mathml" : void 0;
}
function ro(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const so = {
  class: "widget-root",
  part: "root"
}, io = {
  class: "header",
  part: "header"
}, oo = { class: "tenant" }, ao = {
  class: "body",
  part: "body"
}, uo = {
  key: 0,
  class: "status"
}, fo = {
  key: 1,
  class: "status error"
}, co = {
  key: 2,
  class: "list"
}, po = {
  key: 0,
  class: "no-results"
}, ho = { class: "job-row" }, go = { class: "job-title" }, vo = { class: "job-meta" }, _o = {
  key: 0,
  class: "location"
}, mo = {
  key: 1,
  class: "type"
}, yo = {
  key: 0,
  class: "job-excerpt"
}, bo = ["href"], xo = /* @__PURE__ */ qr({
  __name: "RecruitmentOpenings",
  props: {
    apiUrl: { type: String },
    issuer: { type: String },
    tenant: { type: String }
  },
  setup(e) {
    const t = e, n = qn(!1), l = qn(null), r = qn([]), i = [
      {
        id: "demo-1",
        title: "Frontend Engineer (Demo)",
        location: "Remote",
        type: "Full-time",
        excerpt: "Build delightful web experiences. Demo listing.",
        url: "https://example.com/demo-1"
      },
      {
        id: "demo-2",
        title: "Backend Engineer (Demo)",
        location: "Bengaluru, India",
        type: "Full-time",
        excerpt: "Work on APIs and infrastructure. Demo listing.",
        url: "https://example.com/demo-2"
      }
    ];
    async function o(s) {
      n.value = !0, l.value = null, r.value = [];
      try {
        if (!s) {
          await new Promise((d) => setTimeout(d, 300)), r.value = i;
          return;
        }
        const a = `${t.apiUrl}/v1/public/${encodeURIComponent(s)}/openings?limit=10&offset=0`, f = await fetch(a, {
          method: "GET",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
            "X-APPLICATION": "logezy"
          }
        });
        if (!f.ok) {
          const d = await f.text();
          throw new Error(`${f.status} ${f.statusText} — ${d}`);
        }
        const p = await f.json();
        if (!Array.isArray(p.data))
          throw new Error("Unexpected API response format (expected array)");
        r.value = p.data.map((d, S) => {
          var b, w, R, j, P, z, M, B, H, Y, se, ne, L, $;
          return {
            id: (w = (b = d.id) != null ? b : d.jobId) != null ? w : `job-${S}`,
            title: (j = (R = d.title) != null ? R : d.name) != null ? j : "Untitled",
            location: (z = (P = d.location) != null ? P : d.city) != null ? z : "",
            type: (B = (M = d.type) != null ? M : d.employmentType) != null ? B : "",
            excerpt: (ne = (se = (H = d.excerpt) != null ? H : d.summary) != null ? se : (Y = d.description) == null ? void 0 : Y.slice(0, 140)) != null ? ne : "",
            url: ($ = (L = d.url) != null ? L : d.applyUrl) != null ? $ : ""
          };
        });
      } catch (a) {
        console.error("RecruitmentOpenings fetch error:", a), l.value = a && a.message ? a.message : String(a), r.value = [];
      } finally {
        n.value = !1;
      }
    }
    return kl(() => o(t.tenant)), fn(
      () => t.tenant,
      (s) => {
        o(s);
      }
    ), (s, a) => (Fe(), De("div", so, [
      Oe("header", io, [
        a[1] || (a[1] = Oe("h3", { class: "title" }, "Openings", -1)),
        Oe("small", oo, [
          a[0] || (a[0] = fl("Tenant: ", -1)),
          Oe("strong", null, yt(s.tenant || "demo"), 1)
        ])
      ]),
      Oe("main", ao, [
        n.value ? (Fe(), De("div", uo, "Loading openings…")) : l.value ? (Fe(), De("div", fo, "Error: " + yt(l.value), 1)) : (Fe(), De("ul", co, [
          r.value.length === 0 ? (Fe(), De("li", po, "No openings found.")) : Nt("", !0),
          (Fe(!0), De(je, null, gi(r.value, (f) => (Fe(), De("li", {
            key: f.id,
            class: "job"
          }, [
            Oe("div", ho, [
              Oe("div", go, yt(f.title), 1),
              Oe("div", vo, [
                f.location ? (Fe(), De("span", _o, yt(f.location), 1)) : Nt("", !0),
                f.type ? (Fe(), De("span", mo, " — " + yt(f.type), 1)) : Nt("", !0)
              ])
            ]),
            f.excerpt ? (Fe(), De("p", yo, yt(f.excerpt), 1)) : Nt("", !0),
            f.url ? (Fe(), De("a", {
              key: 1,
              href: f.url,
              target: "_blank",
              rel: "noopener noreferrer",
              class: "apply"
            }, " View ", 8, bo)) : Nt("", !0)
          ]))), 128))
        ]))
      ]),
      a[2] || (a[2] = Oe("footer", {
        class: "footer",
        part: "footer"
      }, [
        Oe("small", null, [
          fl("Powered by "),
          Oe("a", {
            href: "https://www.logezy.com",
            target: "_blank",
            rel: "noopener noreferrer"
          }, "Logezy")
        ])
      ], -1))
    ]));
  }
}), So = "[data-v-6db76700]:host{display:block;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial;color:#111827}.widget-root[data-v-6db76700]{border-radius:8px;box-shadow:0 1px 4px #1018280a;padding:12px;background:#fff;border:1px solid rgba(16,24,40,.04);max-width:420px}.header[data-v-6db76700]{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}.title[data-v-6db76700]{margin:0;font-size:16px;font-weight:600}.tenant[data-v-6db76700]{color:#6b7280;font-size:12px}.body[data-v-6db76700]{min-height:40px}.status[data-v-6db76700]{color:#374151;font-size:14px}.status.error[data-v-6db76700]{color:#b91c1c}.list[data-v-6db76700]{list-style:none;padding:0;margin:0}.job[data-v-6db76700]{padding:10px 8px;border-top:1px solid rgba(16,24,40,.03);display:flex;flex-direction:column}.job[data-v-6db76700]:first-of-type{border-top:none}.job-row[data-v-6db76700]{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.job-title[data-v-6db76700]{font-weight:600;font-size:14px}.job-meta[data-v-6db76700]{font-size:12px;color:#6b7280}.job-excerpt[data-v-6db76700]{margin:6px 0 0;font-size:13px;color:#374151}.apply[data-v-6db76700]{margin-top:8px;font-size:13px;text-decoration:none;align-self:flex-start;padding:6px 10px;border-radius:6px;border:1px solid rgba(16,24,40,.06);background:linear-gradient(180deg,#fff,#f8fafc);color:#0f172a}.footer[data-v-6db76700]{margin-top:10px;text-align:right;font-size:11px;color:#9ca3af}.no-results[data-v-6db76700]{padding:10px 8px;color:#6b7280;font-size:13px}", Co = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, r] of t)
    n[l] = r;
  return n;
}, wo = /* @__PURE__ */ Co(xo, [["styles", [So]], ["__scopeId", "data-v-6db76700"]]), Cs = [
  { name: "recruitment-openings", component: wo }
  // Add more widgets here
];
Cs.forEach(({ name: e, component: t }) => {
  typeof customElements.get(e) == "undefined" && customElements.define(e, Ki(t));
});
typeof window == "object" && (window.LogezyWidgets = Cs.reduce(
  (e, { name: t, component: n }) => (e[t] = n, e),
  {}
));
