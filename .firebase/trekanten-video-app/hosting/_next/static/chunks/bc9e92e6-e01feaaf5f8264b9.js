"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[358],{9978:function(e,t,r){r.d(t,{ET:function(){return sW},IO:function(){return sP},JU:function(){return ss},PL:function(){return sj},ad:function(){return so},ar:function(){return sB},hJ:function(){return sn},r7:function(){return sQ}});var n,s,i=r(206),a=r(5538),o=r(6914),l=r(8745),u=r(3468);r(2601);let h="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}c.UNAUTHENTICATED=new c(null),c.GOOGLE_CREDENTIALS=new c("google-credentials-uid"),c.FIRST_PARTY=new c("first-party-uid"),c.MOCK_USER=new c("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let d="9.6.0",f=new o.Yd("@firebase/firestore");function m(){return f.logLevel}function p(e,...t){if(f.logLevel<=o.in.DEBUG){let r=t.map(w);f.debug(`Firestore (${d}): ${e}`,...r)}}function g(e,...t){if(f.logLevel<=o.in.ERROR){let r=t.map(w);f.error(`Firestore (${d}): ${e}`,...r)}}function y(e,...t){if(f.logLevel<=o.in.WARN){let r=t.map(w);f.warn(`Firestore (${d}): ${e}`,...r)}}function w(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e="Unexpected state"){let t=`FIRESTORE (${d}) INTERNAL ASSERTION FAILED: `+e;throw g(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class T extends Error{constructor(e,t){super(t),this.code=e,this.message=t,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class S{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(c.UNAUTHENTICATED))}shutdown(){}}class N{constructor(e){this.t=e,this.currentUser=c.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),s=new I;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new I,e.enqueueRetryable(()=>n(this.currentUser))};let i=()=>{let t=s;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{p("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),i()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(p("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new I)}},0),i()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(p("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||v(),new A(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||v(),new c(e)}}class b{constructor(e,t,r){this.type="FirstParty",this.user=c.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",t);let n=e.auth.getAuthHeaderValueForFirstParty([]);n&&this.headers.set("Authorization",n),r&&this.headers.set("X-Goog-Iam-Authorization-Token",r)}}class k{constructor(e,t,r){this.h=e,this.l=t,this.m=r}getToken(){return Promise.resolve(new b(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(c.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class C{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null}start(e,t){this.o=r=>{e.enqueueRetryable(()=>(null!=r.error&&p("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`),t(r.token)))};let r=e=>{p("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.g.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.g.getImmediate({optional:!0});e?r(e):p("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||v(),new C(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.p(e),this.T=e=>t.writeSequenceNumber(e))}p(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.T&&this.T(e),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */D.I=-1;class R{static A(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}(40);for(let s=0;s<n.length;++s)r.length<20&&n[s]<t&&(r+=e.charAt(n[s]%e.length))}return r}}function L(e,t){return e<t?-1:e>t?1:0}function V(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new T(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new T(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return x.fromMillis(Date.now())}static fromDate(e){return x.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new x(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?L(this.nanoseconds,e.nanoseconds):L(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.timestamp=e}static fromTimestamp(e){return new M(e)}static min(){return new M(new x(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function F(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function O(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e,t,r){void 0===t?t=0:t>e.length&&v(),void 0===r?r=e.length-t:r>e.length-t&&v(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===P.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof P?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.get(n),s=t.get(n);if(r<s)return -1;if(r>s)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class q extends P{construct(e,t,r){return new q(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new T(E.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new q(t)}static emptyPath(){return new q([])}}let B=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class K extends P{construct(e,t,r){return new K(e,t,r)}static isValidIdentifier(e){return B.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),K.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new K(["__name__"])}static fromServerFormat(e){let t=[],r="",n=0,s=()=>{if(0===r.length)throw new T(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},i=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new T(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new T(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?i=!i:"."!==t||i?r+=t:s(),n++}if(s(),i)throw new T(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new K(t)}static emptyPath(){return new K([])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.fields=e,e.sort(K.comparator)}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return V(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.binaryString=e}static fromBase64String(e){return new G(atob(e))}static fromUint8Array(e){return new G(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return L(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}G.EMPTY_BYTE_STRING=new G("");let z=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function j(e){if(e||v(),"string"==typeof e){let t=0,r=z.exec(e);if(r||v(),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:Q(e.seconds),nanos:Q(e.nanos)}}function Q(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function W(e){return"string"==typeof e?G.fromBase64String(e):G.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){var t,r;return"server_timestamp"===(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===r?void 0:r.stringValue)}function Y(e){let t=j(e.mapValue.fields.__local_write_time__.timestampValue);return new x(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e){return null==e}function X(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(q.fromString(e))}static fromName(e){return new Z(q.fromString(e).popFirst(5))}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}isEqual(e){return null!==e&&0===q.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new q(e.slice()))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?H(e)?4:10:v()}function et(e,t){let r=ee(e);if(r!==ee(t))return!1;switch(r){case 0:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Y(e).isEqual(Y(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=j(e.timestampValue),n=j(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return W(e.bytesValue).isEqual(W(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return Q(e.geoPointValue.latitude)===Q(t.geoPointValue.latitude)&&Q(e.geoPointValue.longitude)===Q(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Q(e.integerValue)===Q(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=Q(e.doubleValue),n=Q(t.doubleValue);return r===n?X(r)===X(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return V(e.arrayValue.values||[],t.arrayValue.values||[],et);case 10:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(U(r)!==U(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!et(r[e],n[e])))return!1;return!0}(e,t);default:return v()}}function er(e,t){return void 0!==(e.values||[]).find(e=>et(e,t))}function en(e,t){let r=ee(e),n=ee(t);if(r!==n)return L(r,n);switch(r){case 0:return 0;case 1:return L(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=Q(e.integerValue||e.doubleValue),n=Q(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return es(e.timestampValue,t.timestampValue);case 4:return es(Y(e),Y(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){let r=W(e),n=W(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=L(r[e],n[e]);if(0!==t)return t}return L(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=L(Q(e.latitude),Q(t.latitude));return 0!==r?r:L(Q(e.longitude),Q(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=en(r[e],n[e]);if(t)return t}return L(r.length,n.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){let r=e.fields||{},n=Object.keys(r),s=t.fields||{},i=Object.keys(s);n.sort(),i.sort();for(let e=0;e<n.length&&e<i.length;++e){let t=L(n[e],i[e]);if(0!==t)return t;let a=en(r[n[e]],s[i[e]]);if(0!==a)return a}return L(n.length,i.length)}(e.mapValue,t.mapValue);default:throw v()}}function es(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return L(e,t);let r=j(e),n=j(t),s=L(r.seconds,n.seconds);return 0!==s?s:L(r.nanos,n.nanos)}function ei(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=j(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?W(e.bytesValue).toBase64():"referenceValue"in e?(r=e.referenceValue,Z.fromName(r).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=ei(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let s of t)n?n=!1:r+=",",r+=`${s}:${ei(e.fields[s])}`;return r+"}"}(e.mapValue):v()}function ea(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eo(e){return!!e&&"integerValue"in e}function el(e){return!!e&&"arrayValue"in e}function eu(e){return!!e&&"nullValue"in e}function eh(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ec(e){return!!e&&"mapValue"in e}function ed(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return F(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=ed(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=ed(e.arrayValue.values[r]);return t}return Object.assign({},e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.value=e}static empty(){return new ef({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!ec(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ed(t)}setAll(e){let t=K.emptyPath(),r={},n=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=s.popLast()}e?r[s.lastSegment()]=ed(e):n.push(s.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,n)}delete(e){let t=this.field(e.popLast());ec(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];ec(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(F(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new ef(ed(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t,r,n,s){this.key=e,this.documentType=t,this.version=r,this.data=n,this.documentState=s}static newInvalidDocument(e){return new em(e,0,M.min(),ef.empty(),0)}static newFoundDocument(e,t,r){return new em(e,1,t,r,0)}static newNoDocument(e,t){return new em(e,2,t,ef.empty(),0)}static newUnknownDocument(e,t){return new em(e,3,t,ef.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ef.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ef.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof em&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}clone(){return new em(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t=null,r=[],n=[],s=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=s,this.startAt=i,this.endAt=a,this.R=null}}function eg(e,t=null,r=[],n=[],s=null,i=null,a=null){return new ep(e,t,r,n,s,i,a)}function ey(e){if(null===e.R){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>e.field.canonicalString()+e.op.toString()+ei(e.value)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),J(e.limit)||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+eD(e.startAt)),e.endAt&&(t+="|ub:"+eD(e.endAt)),e.R=t}return e.R}function ew(e,t){var r,n,s,i;if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let r=0;r<e.orderBy.length;r++)if(s=e.orderBy[r],i=t.orderBy[r],!(s.dir===i.dir&&s.field.isEqual(i.field)))return!1;if(e.filters.length!==t.filters.length)return!1;for(let s=0;s<e.filters.length;s++)if(r=e.filters[s],n=t.filters[s],r.op!==n.op||!r.field.isEqual(n.field)||!et(r.value,n.value))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eV(e.startAt,t.startAt)&&eV(e.endAt,t.endAt)}function ev(e){return Z.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}class eE extends class{}{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.P(e,t,r):new eT(e,t,r):"array-contains"===t?new eN(e,r):"in"===t?new eb(e,r):"not-in"===t?new ek(e,r):"array-contains-any"===t?new eC(e,r):new eE(e,t,r)}static P(e,t,r){return"in"===t?new eI(e,r):new eA(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.v(en(t,this.value)):null!==t&&ee(this.value)===ee(t)&&this.v(en(t,this.value))}v(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return v()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class eT extends eE{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){let t=Z.comparator(e.key,this.key);return this.v(t)}}class eI extends eE{constructor(e,t){super(e,"in",t),this.keys=eS("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class eA extends eE{constructor(e,t){super(e,"not-in",t),this.keys=eS("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function eS(e,t){var r;return((null===(r=t.arrayValue)||void 0===r?void 0:r.values)||[]).map(e=>Z.fromName(e.referenceValue))}class eN extends eE{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return el(t)&&er(t.arrayValue,this.value)}}class eb extends eE{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&er(this.value.arrayValue,t)}}class ek extends eE{constructor(e,t){super(e,"not-in",t)}matches(e){if(er(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!er(this.value.arrayValue,t)}}class eC extends eE{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!el(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>er(this.value.arrayValue,e))}}class e_{constructor(e,t){this.position=e,this.before=t}}function eD(e){return`${e.before?"b":"a"}:${e.position.map(e=>ei(e)).join(",")}`}class eR{constructor(e,t="asc"){this.field=e,this.dir=t}}function eL(e,t,r){let n=0;for(let s=0;s<e.position.length;s++){let i=t[s],a=e.position[s];if(n=i.field.isKeyField()?Z.comparator(Z.fromName(a.referenceValue),r.key):en(a,r.data.field(i.field)),"desc"===i.dir&&(n*=-1),0!==n)break}return e.before?n<=0:n<0}function eV(e,t){if(null===e)return null===t;if(null===t||e.before!==t.before||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!et(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(e,t=null,r=[],n=[],s=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=s,this.limitType=i,this.startAt=a,this.endAt=o,this.S=null,this.D=null,this.startAt,this.endAt}}function eM(e){return!J(e.limit)&&"F"===e.limitType}function eU(e){return!J(e.limit)&&"L"===e.limitType}function eF(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function eO(e){for(let t of e.filters)if(t.V())return t.field;return null}function eP(e){return null!==e.collectionGroup}function eq(e){if(null===e.S){e.S=[];let t=eO(e),r=eF(e);if(null!==t&&null===r)t.isKeyField()||e.S.push(new eR(t)),e.S.push(new eR(K.keyField(),"asc"));else{let t=!1;for(let r of e.explicitOrderBy)e.S.push(r),r.field.isKeyField()&&(t=!0);if(!t){let t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.S.push(new eR(K.keyField(),t))}}}return e.S}function eB(e){if(!e.D){if("F"===e.limitType)e.D=eg(e.path,e.collectionGroup,eq(e),e.filters,e.limit,e.startAt,e.endAt);else{let t=[];for(let r of eq(e)){let e="desc"===r.dir?"asc":"desc";t.push(new eR(r.field,e))}let r=e.endAt?new e_(e.endAt.position,!e.endAt.before):null,n=e.startAt?new e_(e.startAt.position,!e.startAt.before):null;e.D=eg(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}return e.D}function eK(e,t){return ew(eB(e),eB(t))&&e.limitType===t.limitType}function e$(e){return`${ey(eB(e))}|lt:${e.limitType}`}function eG(e){var t;let r;return`Query(target=${r=(t=eB(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>`${e.field.canonicalString()} ${e.op} ${ei(e.value)}`).join(", ")}]`),J(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+eD(t.startAt)),t.endAt&&(r+=", endAt: "+eD(t.endAt)),`Target(${r})`}; limitType=${e.limitType})`}function ez(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):Z.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of e.explicitOrderBy)if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&!(e.startAt&&!eL(e.startAt,eq(e),t)||e.endAt&&eL(e.endAt,eq(e),t))}function ej(e){return(t,r)=>{let n=!1;for(let s of eq(e)){let e=function(e,t,r){let n=e.field.isKeyField()?Z.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),s=r.data.field(e);return null!==n&&null!==s?en(n,s):v()}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return v()}}(s,t,r);if(0!==e)return e;n=n||s.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eQ(e,t){if(e.C){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:X(t)?"-0":t}}function eW(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eH{constructor(){this._=void 0}}function eY(e,t){return e instanceof e2?eo(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class eJ extends eH{}class eX extends eH{constructor(e){super(),this.elements=e}}function eZ(e,t){let r=e3(t);for(let t of e.elements)r.some(e=>et(e,t))||r.push(t);return{arrayValue:{values:r}}}class e0 extends eH{constructor(e){super(),this.elements=e}}function e1(e,t){let r=e3(t);for(let t of e.elements)r=r.filter(e=>!et(e,t));return{arrayValue:{values:r}}}class e2 extends eH{constructor(e,t){super(),this.k=e,this.N=t}}function e4(e){return Q(e.integerValue||e.doubleValue)}function e3(e){return el(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class e6{constructor(e,t){this.version=e,this.transformResults=t}}class e8{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new e8}static exists(e){return new e8(void 0,e)}static updateTime(e){return new e8(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function e9(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class e5{}function e7(e,t,r){e instanceof tr?function(e,t,r){if(!e9(e.precondition,t))return;let n=e.value.clone(),s=ta(e.fieldTransforms,r,t);n.setAll(s),t.convertToFoundDocument(tt(t),n).setHasLocalMutations()}(e,t,r):e instanceof tn?function(e,t,r){if(!e9(e.precondition,t))return;let n=ta(e.fieldTransforms,r,t),s=t.data;s.setAll(ts(e)),s.setAll(n),t.convertToFoundDocument(tt(t),s).setHasLocalMutations()}(e,t,r):e9(e.precondition,t)&&t.convertToNoDocument(M.min())}function te(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&V(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof eX&&n instanceof eX||r instanceof e0&&n instanceof e0?V(r.elements,n.elements,et):r instanceof e2&&n instanceof e2?et(r.N,n.N):r instanceof eJ&&n instanceof eJ)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}function tt(e){return e.isFoundDocument()?e.version:M.min()}class tr extends e5{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}}class tn extends e5{constructor(e,t,r,n,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=s,this.type=1}}function ts(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function ti(e,t,r){var n;let s=new Map;e.length===r.length||v();for(let i=0;i<r.length;i++){let a=e[i],o=a.transform,l=t.data.field(a.field);s.set(a.field,(n=r[i],o instanceof eX?eZ(o,l):o instanceof e0?e1(o,l):n))}return s}function ta(e,t,r){let n=new Map;for(let s of e){let e=s.transform,i=r.data.field(s.field);n.set(s.field,e instanceof eJ?function(e,t){let r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(r.fields.__previous_value__=t),{mapValue:r}}(t,i):e instanceof eX?eZ(e,i):e instanceof e0?e1(e,i):function(e,t){let r=eY(e,t),n=e4(r)+e4(e.N);return eo(r)&&eo(e.N)?eW(n):eQ(e.k,n)}(e,i))}return n}class to extends e5{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}}class tl extends e5{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.count=e}}function th(e){if(void 0===e)return g("GRPC error has no .code"),E.UNKNOWN;switch(e){case n.OK:return E.OK;case n.CANCELLED:return E.CANCELLED;case n.UNKNOWN:return E.UNKNOWN;case n.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case n.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case n.INTERNAL:return E.INTERNAL;case n.UNAVAILABLE:return E.UNAVAILABLE;case n.UNAUTHENTICATED:return E.UNAUTHENTICATED;case n.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case n.NOT_FOUND:return E.NOT_FOUND;case n.ALREADY_EXISTS:return E.ALREADY_EXISTS;case n.PERMISSION_DENIED:return E.PERMISSION_DENIED;case n.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case n.ABORTED:return E.ABORTED;case n.OUT_OF_RANGE:return E.OUT_OF_RANGE;case n.UNIMPLEMENTED:return E.UNIMPLEMENTED;case n.DATA_LOSS:return E.DATA_LOSS;default:return v()}}(s=n||(n={}))[s.OK=0]="OK",s[s.CANCELLED=1]="CANCELLED",s[s.UNKNOWN=2]="UNKNOWN",s[s.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",s[s.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",s[s.NOT_FOUND=5]="NOT_FOUND",s[s.ALREADY_EXISTS=6]="ALREADY_EXISTS",s[s.PERMISSION_DENIED=7]="PERMISSION_DENIED",s[s.UNAUTHENTICATED=16]="UNAUTHENTICATED",s[s.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",s[s.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",s[s.ABORTED=10]="ABORTED",s[s.OUT_OF_RANGE=11]="OUT_OF_RANGE",s[s.UNIMPLEMENTED=12]="UNIMPLEMENTED",s[s.INTERNAL=13]="INTERNAL",s[s.UNAVAILABLE=14]="UNAVAILABLE",s[s.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t){this.comparator=e,this.root=t||tf.EMPTY}insert(e,t){return new tc(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,tf.BLACK,null,null))}remove(e){return new tc(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tf.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new td(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new td(this.root,e,this.comparator,!1)}getReverseIterator(){return new td(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new td(this.root,e,this.comparator,!0)}}class td{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,n&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tf{constructor(e,t,r,n,s){this.key=e,this.value=t,this.color=null!=r?r:tf.RED,this.left=null!=n?n:tf.EMPTY,this.right=null!=s?s:tf.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,s){return new tf(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,s=r(e,n.key);return(n=s<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===s?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return tf.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return tf.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,tf.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,tf.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw v();let e=this.left.check();if(e!==this.right.check())throw v();return e+(this.isRed()?0:1)}}tf.EMPTY=null,tf.RED=!0,tf.BLACK=!1,tf.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(e,t,r,n,s){return this}insert(e,t,r){return new tf(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.comparator=e,this.data=new tc(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new tp(this.data.getIterator())}getIteratorFrom(e){return new tp(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof tm)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new tm(this.comparator);return t.data=e,t}}class tp{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tg=new tc(Z.comparator),ty=new tc(Z.comparator),tw=new tc(Z.comparator),tv=new tm(Z.comparator);function tE(...e){let t=tv;for(let r of e)t=t.add(r);return t}let tT=new tm(L);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t,r,n,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t){let r=new Map;return r.set(e,tA.createSynthesizedTargetChangeForCurrentChange(e,t)),new tI(M.min(),r,tT,tg,tE())}}class tA{constructor(e,t,r,n,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t){return new tA(G.EMPTY_BYTE_STRING,t,tE(),tE(),tE())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t,r,n){this.$=e,this.removedTargetIds=t,this.key=r,this.F=n}}class tN{constructor(e,t){this.targetId=e,this.O=t}}class tb{constructor(e,t,r=G.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class tk{constructor(){this.M=0,this.L=tD(),this.B=G.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return 0!==this.M}get j(){return this.q}W(e){e.approximateByteSize()>0&&(this.q=!0,this.B=e)}G(){let e=tE(),t=tE(),r=tE();return this.L.forEach((n,s)=>{switch(s){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:v()}}),new tA(this.B,this.U,e,t,r)}H(){this.q=!1,this.L=tD()}J(e,t){this.q=!0,this.L=this.L.insert(e,t)}Y(e){this.q=!0,this.L=this.L.remove(e)}X(){this.M+=1}Z(){this.M-=1}tt(){this.q=!0,this.U=!0}}class tC{constructor(e){this.et=e,this.nt=new Map,this.st=tg,this.it=t_(),this.rt=new tm(L)}ot(e){for(let t of e.$)e.F&&e.F.isFoundDocument()?this.at(t,e.F):this.ct(t,e.key,e.F);for(let t of e.removedTargetIds)this.ct(t,e.key,e.F)}ut(e){this.forEachTarget(e,t=>{let r=this.ht(t);switch(e.state){case 0:this.lt(t)&&r.W(e.resumeToken);break;case 1:r.Z(),r.K||r.H(),r.W(e.resumeToken);break;case 2:r.Z(),r.K||this.removeTarget(t);break;case 3:this.lt(t)&&(r.tt(),r.W(e.resumeToken));break;case 4:this.lt(t)&&(this.ft(t),r.W(e.resumeToken));break;default:v()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.nt.forEach((e,r)=>{this.lt(r)&&t(r)})}dt(e){let t=e.targetId,r=e.O.count,n=this.wt(t);if(n){let e=n.target;if(ev(e)){if(0===r){let r=new Z(e.path);this.ct(t,r,em.newNoDocument(r,M.min()))}else 1===r||v()}else this._t(t)!==r&&(this.ft(t),this.rt=this.rt.add(t))}}gt(e){let t=new Map;this.nt.forEach((r,n)=>{let s=this.wt(n);if(s){if(r.current&&ev(s.target)){let t=new Z(s.target.path);null!==this.st.get(t)||this.yt(n,t)||this.ct(n,t,em.newNoDocument(t,e))}r.j&&(t.set(n,r.G()),r.H())}});let r=tE();this.it.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.wt(e);return!t||2===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))});let n=new tI(e,t,this.rt,this.st,r);return this.st=tg,this.it=t_(),this.rt=new tm(L),n}at(e,t){if(!this.lt(e))return;let r=this.yt(e,t.key)?2:0;this.ht(e).J(t.key,r),this.st=this.st.insert(t.key,t),this.it=this.it.insert(t.key,this.Tt(t.key).add(e))}ct(e,t,r){if(!this.lt(e))return;let n=this.ht(e);this.yt(e,t)?n.J(t,1):n.Y(t),this.it=this.it.insert(t,this.Tt(t).delete(e)),r&&(this.st=this.st.insert(t,r))}removeTarget(e){this.nt.delete(e)}_t(e){let t=this.ht(e).G();return this.et.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}X(e){this.ht(e).X()}ht(e){let t=this.nt.get(e);return t||(t=new tk,this.nt.set(e,t)),t}Tt(e){let t=this.it.get(e);return t||(t=new tm(L),this.it=this.it.insert(e,t)),t}lt(e){let t=null!==this.wt(e);return t||p("WatchChangeAggregator","Detected inactive target",e),t}wt(e){let t=this.nt.get(e);return t&&t.K?null:this.et.Et(e)}ft(e){this.nt.set(e,new tk),this.et.getRemoteKeysForTarget(e).forEach(t=>{this.ct(e,t,null)})}yt(e,t){return this.et.getRemoteKeysForTarget(e).has(t)}}function t_(){return new tc(Z.comparator)}function tD(){return new tc(Z.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tR={asc:"ASCENDING",desc:"DESCENDING"},tL={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class tV{constructor(e,t){this.databaseId=e,this.C=t}}function tx(e,t){return e.C?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function tM(e,t){return e.C?t.toBase64():t.toUint8Array()}function tU(e){return e||v(),M.fromTimestamp(function(e){let t=j(e);return new x(t.seconds,t.nanos)}(e))}function tF(e,t){return new q(["projects",e.projectId,"databases",e.database]).child("documents").child(t).canonicalString()}function tO(e){let t=q.fromString(e);return tH(t)||v(),t}function tP(e,t){return tF(e.databaseId,t.path)}function tq(e,t){let r=tO(t);if(r.get(1)!==e.databaseId.projectId)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new Z(t$(r))}function tB(e,t){return tF(e.databaseId,t)}function tK(e){return new q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function t$(e){return e.length>4&&"documents"===e.get(4)||v(),e.popFirst(5)}function tG(e,t,r){return{name:tP(e,t),fields:r.value.mapValue.fields}}function tz(e){return{before:e.before,values:e.position}}function tj(e){let t=!!e.before;return new e_(e.values||[],t)}function tQ(e){return{fieldPath:e.canonicalString()}}function tW(e){return K.fromServerFormat(e.fieldPath)}function tH(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tY(e){let t="";for(let r=0;r<e.length;r++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let r=t,n=e.length;for(let t=0;t<n;t++){let n=e.charAt(t);switch(n){case"\x00":r+="\x01\x10";break;case"\x01":r+="\x01\x11";break;default:r+=n}}return r}(e.get(r),t);return t+"\x01\x01"}class tJ{constructor(e,t,r){this.ownerId=e,this.allowTabSynchronization=t,this.leaseTimestampMs=r}}tJ.store="owner",tJ.key="owner";class tX{constructor(e,t,r){this.userId=e,this.lastAcknowledgedBatchId=t,this.lastStreamToken=r}}tX.store="mutationQueues",tX.keyPath="userId";class tZ{constructor(e,t,r,n,s){this.userId=e,this.batchId=t,this.localWriteTimeMs=r,this.baseMutations=n,this.mutations=s}}tZ.store="mutations",tZ.keyPath="batchId",tZ.userMutationsIndex="userMutationsIndex",tZ.userMutationsKeyPath=["userId","batchId"];class t0{constructor(){}static prefixForUser(e){return[e]}static prefixForPath(e,t){return[e,tY(t)]}static key(e,t,r){return[e,tY(t),r]}}t0.store="documentMutations",t0.PLACEHOLDER=new t0;class t1{constructor(e,t,r,n,s,i){this.unknownDocument=e,this.noDocument=t,this.document=r,this.hasCommittedMutations=n,this.readTime=s,this.parentPath=i}}t1.store="remoteDocuments",t1.readTimeIndex="readTimeIndex",t1.readTimeIndexPath="readTime",t1.collectionReadTimeIndex="collectionReadTimeIndex",t1.collectionReadTimeIndexPath=["parentPath","readTime"];class t2{constructor(e){this.byteSize=e}}t2.store="remoteDocumentGlobal",t2.key="remoteDocumentGlobalKey";class t4{constructor(e,t,r,n,s,i,a){this.targetId=e,this.canonicalId=t,this.readTime=r,this.resumeToken=n,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=a}}t4.store="targets",t4.keyPath="targetId",t4.queryTargetsIndexName="queryTargetsIndex",t4.queryTargetsKeyPath=["canonicalId","targetId"];class t3{constructor(e,t,r){this.targetId=e,this.path=t,this.sequenceNumber=r}}t3.store="targetDocuments",t3.keyPath=["targetId","path"],t3.documentTargetsIndex="documentTargetsIndex",t3.documentTargetsKeyPath=["path","targetId"];class t6{constructor(e,t,r,n){this.highestTargetId=e,this.highestListenSequenceNumber=t,this.lastRemoteSnapshotVersion=r,this.targetCount=n}}t6.key="targetGlobalKey",t6.store="targetGlobal";class t8{constructor(e,t){this.collectionId=e,this.parent=t}}t8.store="collectionParents",t8.keyPath=["collectionId","parent"];class t9{constructor(e,t,r,n){this.clientId=e,this.updateTimeMs=t,this.networkEnabled=r,this.inForeground=n}}t9.store="clientMetadata",t9.keyPath="clientId";class t5{constructor(e,t,r){this.bundleId=e,this.createTime=t,this.version=r}}t5.store="bundles",t5.keyPath="bundleId";class t7{constructor(e,t,r){this.name=e,this.readTime=t,this.bundledQuery=r}}t7.store="namedQueries",t7.keyPath="name",tX.store,tZ.store,t0.store,t1.store,t4.store,tJ.store,t6.store,t3.store,t9.store,t2.store,t8.store,t5.store,t7.store;class re{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new rt((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof rt?t:rt.resolve(t)}catch(e){return rt.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):rt.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):rt.reject(t)}static resolve(e){return new rt((t,r)=>{t(e)})}static reject(e){return new rt((t,r)=>{r(e)})}static waitFor(e){return new rt((t,r)=>{let n=0,s=0,i=!1;e.forEach(e=>{++n,e.next(()=>{++s,i&&s===n&&t()},e=>r(e))}),i=!0,s===n&&t()})}static or(e){let t=rt.resolve(!1);for(let r of e)t=t.next(e=>e?rt.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}}function rr(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let s=this.mutations[t];if(s.key.isEqual(e.key)){var n;n=r[t],s instanceof tr?function(e,t,r){let n=e.value.clone(),s=ti(e.fieldTransforms,t,r.transformResults);n.setAll(s),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(s,e,n):s instanceof tn?function(e,t,r){if(!e9(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=ti(e.fieldTransforms,t,r.transformResults),s=t.data;s.setAll(ts(e)),s.setAll(n),t.convertToFoundDocument(r.version,s).setHasCommittedMutations()}(s,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e){for(let t of this.baseMutations)t.key.isEqual(e.key)&&e7(t,e,this.localWriteTime);for(let t of this.mutations)t.key.isEqual(e.key)&&e7(t,e,this.localWriteTime)}applyToLocalDocumentSet(e){this.mutations.forEach(t=>{let r=e.get(t.key);this.applyToLocalView(r),r.isValidDocument()||r.convertToNoDocument(M.min())})}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tE())}isEqual(e){return this.batchId===e.batchId&&V(this.mutations,e.mutations,(e,t)=>te(e,t))&&V(this.baseMutations,e.baseMutations,(e,t)=>te(e,t))}}class rs{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){e.mutations.length===r.length||v();let n=tw,s=e.mutations;for(let e=0;e<s.length;e++)n=n.insert(s[e].key,r[e].version);return new rs(e,t,r,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,r,n,s=M.min(),i=M.min(),a=G.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a}withSequenceNumber(e){return new ri(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new ri(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new ri(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e){this.Gt=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(){this.zt=new rl}addToCollectionParentIndex(e,t){return this.zt.add(t),rt.resolve()}getCollectionParents(e,t){return rt.resolve(this.zt.getEntries(t))}}class rl{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new tm(q.comparator),s=!n.has(r);return this.index[t]=n.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new tm(q.comparator)).toArray()}}class ru{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new ru(e,ru.DEFAULT_COLLECTION_PERCENTILE,ru.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ru.DEFAULT_COLLECTION_PERCENTILE=10,ru.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ru.DEFAULT=new ru(41943040,ru.DEFAULT_COLLECTION_PERCENTILE,ru.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ru.DISABLED=new ru(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e){this.se=e}next(){return this.se+=2,this.se}static ie(){return new rh(0)}static re(){return new rh(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rc(e){if(e.code!==E.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;p("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={}}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0!==n){for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t])}else this.inner[r]=[[e,t]]}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),!0;return!1}forEach(e){F(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return O(this.inner)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(){this.changes=new rd(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}getReadTime(e){let t=this.changes.get(e);return t?t.readTime:M.min()}addEntry(e,t){this.assertNotApplied(),this.changes.set(e.key,{document:e,readTime:t})}removeEntry(e,t=null){this.assertNotApplied(),this.changes.set(e,{document:em.newInvalidDocument(e),readTime:t})}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?rt.resolve(r.document):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e,t,r){this.Je=e,this.An=t,this.Jt=r}Rn(e,t){return this.An.getAllMutationBatchesAffectingDocumentKey(e,t).next(r=>this.Pn(e,t,r))}Pn(e,t,r){return this.Je.getEntry(e,t).next(e=>{for(let t of r)t.applyToLocalView(e);return e})}bn(e,t){e.forEach((e,r)=>{for(let e of t)e.applyToLocalView(r)})}vn(e,t){return this.Je.getEntries(e,t).next(t=>this.Vn(e,t).next(()=>t))}Vn(e,t){return this.An.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>this.bn(t,e))}getDocumentsMatchingQuery(e,t,r){return Z.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.Sn(e,t.path):eP(t)?this.Dn(e,t,r):this.Cn(e,t,r)}Sn(e,t){return this.Rn(e,new Z(t)).next(e=>{let t=ty;return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}Dn(e,t,r){let n=t.collectionGroup,s=ty;return this.Jt.getCollectionParents(e,n).next(i=>rt.forEach(i,i=>{let a=new ex(i.child(n),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.Cn(e,a,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}Cn(e,t,r){let n,s;return this.Je.getDocumentsMatchingQuery(e,t,r).next(r=>(n=r,this.An.getAllMutationBatchesAffectingQuery(e,t))).next(t=>(s=t,this.Nn(e,s,n).next(e=>{for(let t of(n=e,s))for(let e of t.mutations){let r=e.key,s=n.get(r);null==s&&(s=em.newInvalidDocument(r),n=n.insert(r,s)),e7(e,s,t.localWriteTime),s.isFoundDocument()||(n=n.remove(r))}}))).next(()=>(n.forEach((e,r)=>{ez(t,r)||(n=n.remove(e))}),n))}Nn(e,t,r){let n=tE();for(let e of t)for(let t of e.mutations)t instanceof tn&&null===r.get(t.key)&&(n=n.add(t.key));let s=r;return this.Je.getEntries(e,n).next(e=>(e.forEach((e,t)=>{t.isFoundDocument()&&(s=s.insert(e,t))}),s))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.kn=r,this.xn=n}static $n(e,t){let r=tE(),n=tE();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new rp(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{Fn(e){this.On=e}getDocumentsMatchingQuery(e,t,r,n){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())||r.isEqual(M.min())?this.Mn(e,t):this.On.vn(e,n).next(s=>{let i=this.Ln(t,s);return(eM(t)||eU(t))&&this.Bn(t.limitType,i,n,r)?this.Mn(e,t):(m()<=o.in.DEBUG&&p("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),eG(t)),this.On.getDocumentsMatchingQuery(e,t,r).next(e=>(i.forEach(t=>{e=e.insert(t.key,t)}),e)))})}Ln(e,t){let r=new tm(ej(e));return t.forEach((t,n)=>{ez(e,n)&&(r=r.add(n))}),r}Bn(e,t,r,n){if(r.size!==t.size)return!0;let s="F"===e?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(n)>0)}Mn(e,t){return m()<=o.in.DEBUG&&p("QueryEngine","Using full collection scan to execute query:",eG(t)),this.On.getDocumentsMatchingQuery(e,t,M.min())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e,t,r,n){this.persistence=e,this.Un=t,this.k=n,this.qn=new tc(L),this.Kn=new rd(e=>ey(e),ew),this.jn=M.min(),this.An=e.getMutationQueue(r),this.Qn=e.getRemoteDocumentCache(),this.He=e.getTargetCache(),this.Wn=new rm(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=e.getBundleCache(),this.Un.Fn(this.Wn)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.qn))}}async function rw(e,t){let r=e.An,n=e.Wn,s=await e.persistence.runTransaction("Handle user change","readonly",s=>{let i;return e.An.getAllMutationBatches(s).next(a=>(i=a,r=e.persistence.getMutationQueue(t),n=new rm(e.Qn,r,e.persistence.getIndexManager()),r.getAllMutationBatches(s))).next(e=>{let t=[],r=[],a=tE();for(let e of i)for(let r of(t.push(e.batchId),e.mutations))a=a.add(r.key);for(let t of e)for(let e of(r.push(t.batchId),t.mutations))a=a.add(e.key);return n.vn(s,a).next(e=>({Gn:e,removedBatchIds:t,addedBatchIds:r}))})});return e.An=r,e.Wn=n,e.Un.Fn(e.Wn),s}function rv(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.He.getLastRemoteSnapshotVersion(t))}async function rE(e,t,r){let n=e.qn.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!rr(e))throw e;p("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.qn=e.qn.remove(t),e.Kn.delete(n.target)}function rT(e,t,r){let n=M.min(),s=tE();return e.persistence.runTransaction("Execute query","readonly",i=>(function(e,t,r){let n=e.Kn.get(r);return void 0!==n?rt.resolve(e.qn.get(n)):e.He.getTargetData(t,r)})(e,i,eB(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.He.getMatchingKeysForTargetId(i,t.targetId).next(e=>{s=e})}).next(()=>e.Un.getDocumentsMatchingQuery(i,t,r?n:M.min(),r?s:tE())).next(e=>({documents:e,zn:s})))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e){this.k=e,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(e,t){return rt.resolve(this.Xn.get(t))}saveBundleMetadata(e,t){return this.Xn.set(t.id,{id:t.id,version:t.version,createTime:tU(t.createTime)}),rt.resolve()}getNamedQuery(e,t){return rt.resolve(this.Zn.get(t))}saveNamedQuery(e,t){return this.Zn.set(t.name,{name:t.name,query:function(e){var t;let r=function(e){var t;let r,n=function(e){let t=tO(e);return 4===t.length?q.emptyPath():t$(t)}(e.parent),s=e.structuredQuery,i=s.from?s.from.length:0,a=null;if(i>0){1===i||v();let e=s.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];s.where&&(o=function e(t){return t?void 0!==t.unaryFilter?[function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=tW(e.unaryFilter.field);return eE.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=tW(e.unaryFilter.field);return eE.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=tW(e.unaryFilter.field);return eE.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let s=tW(e.unaryFilter.field);return eE.create(s,"!=",{nullValue:"NULL_VALUE"});default:return v()}}(t)]:void 0!==t.fieldFilter?[eE.create(tW(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(t.fieldFilter.op),t.fieldFilter.value)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map(t=>e(t)).reduce((e,t)=>e.concat(t)):v():[]}(s.where));let l=[];s.orderBy&&(l=s.orderBy.map(e=>new eR(tW(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;s.limit&&(u=J(r="object"==typeof(t=s.limit)?t.value:t)?null:r);let h=null;s.startAt&&(h=tj(s.startAt));let c=null;return s.endAt&&(c=tj(s.endAt)),new ex(n,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?(t=r.limit,new ex(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,"L",r.startAt,r.endAt)):r}(t.bundledQuery),readTime:tU(t.readTime)}),rt.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(){this.ts=new tm(rS.es),this.ns=new tm(rS.ss)}isEmpty(){return this.ts.isEmpty()}addReference(e,t){let r=new rS(e,t);this.ts=this.ts.add(r),this.ns=this.ns.add(r)}rs(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.os(new rS(e,t))}cs(e,t){e.forEach(e=>this.removeReference(e,t))}us(e){let t=new Z(new q([])),r=new rS(t,e),n=new rS(t,e+1),s=[];return this.ns.forEachInRange([r,n],e=>{this.os(e),s.push(e.key)}),s}hs(){this.ts.forEach(e=>this.os(e))}os(e){this.ts=this.ts.delete(e),this.ns=this.ns.delete(e)}ls(e){let t=new Z(new q([])),r=new rS(t,e),n=new rS(t,e+1),s=tE();return this.ns.forEachInRange([r,n],e=>{s=s.add(e.key)}),s}containsKey(e){let t=new rS(e,0),r=this.ts.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class rS{constructor(e,t){this.key=e,this.fs=t}static es(e,t){return Z.comparator(e.key,t.key)||L(e.fs,t.fs)}static ss(e,t){return L(e.fs,t.fs)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rN{constructor(e,t){this.Jt=e,this.referenceDelegate=t,this.An=[],this.ds=1,this.ws=new tm(rS.es)}checkEmpty(e){return rt.resolve(0===this.An.length)}addMutationBatch(e,t,r,n){let s=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];let i=new rn(s,t,r,n);for(let t of(this.An.push(i),n))this.ws=this.ws.add(new rS(t.key,s)),this.Jt.addToCollectionParentIndex(e,t.key.path.popLast());return rt.resolve(i)}lookupMutationBatch(e,t){return rt.resolve(this._s(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.gs(t+1),n=r<0?0:r;return rt.resolve(this.An.length>n?this.An[n]:null)}getHighestUnacknowledgedBatchId(){return rt.resolve(0===this.An.length?-1:this.ds-1)}getAllMutationBatches(e){return rt.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new rS(t,0),n=new rS(t,Number.POSITIVE_INFINITY),s=[];return this.ws.forEachInRange([r,n],e=>{let t=this._s(e.fs);s.push(t)}),rt.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new tm(L);return t.forEach(e=>{let t=new rS(e,0),n=new rS(e,Number.POSITIVE_INFINITY);this.ws.forEachInRange([t,n],e=>{r=r.add(e.fs)})}),rt.resolve(this.ys(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,s=r;Z.isDocumentKey(s)||(s=s.child(""));let i=new rS(new Z(s),0),a=new tm(L);return this.ws.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.fs)),!0)},i),rt.resolve(this.ys(a))}ys(e){let t=[];return e.forEach(e=>{let r=this._s(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){0===this.ps(t.batchId,"removed")||v(),this.An.shift();let r=this.ws;return rt.forEach(t.mutations,n=>{let s=new rS(n.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.ws=r})}ee(e){}containsKey(e,t){let r=new rS(t,0),n=this.ws.firstAfterOrEqual(r);return rt.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.An.length,rt.resolve()}ps(e,t){return this.gs(e)}gs(e){return 0===this.An.length?0:e-this.An[0].batchId}_s(e){let t=this.gs(e);return t<0||t>=this.An.length?null:this.An[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e,t){this.Jt=e,this.Ts=t,this.docs=new tc(Z.comparator),this.size=0}addEntry(e,t,r){let n=t.key,s=this.docs.get(n),i=s?s.size:0,a=this.Ts(t);return this.docs=this.docs.insert(n,{document:t.clone(),size:a,readTime:r}),this.size+=a-i,this.Jt.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return rt.resolve(r?r.document.clone():em.newInvalidDocument(t))}getEntries(e,t){let r=tg;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.clone():em.newInvalidDocument(e))}),rt.resolve(r)}getDocumentsMatchingQuery(e,t,r){let n=tg,s=new Z(t.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){let{key:e,value:{document:s,readTime:a}}=i.getNext();if(!t.path.isPrefixOf(e.path))break;0>=a.compareTo(r)||ez(t,s)&&(n=n.insert(s.key,s.clone()))}return rt.resolve(n)}Es(e,t){return rt.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new rk(this)}getSize(e){return rt.resolve(this.size)}}class rk extends rf{constructor(e){super(),this.De=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.document.isValidDocument()?t.push(this.De.addEntry(e,n.document,this.getReadTime(r))):this.De.removeEntry(r)}),rt.waitFor(t)}getFromCache(e,t){return this.De.getEntry(e,t)}getAllFromCache(e,t){return this.De.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e){this.persistence=e,this.Is=new rd(e=>ey(e),ew),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.As=0,this.Rs=new rA,this.targetCount=0,this.Ps=rh.ie()}forEachTarget(e,t){return this.Is.forEach((e,r)=>t(r)),rt.resolve()}getLastRemoteSnapshotVersion(e){return rt.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return rt.resolve(this.As)}allocateTargetId(e){return this.highestTargetId=this.Ps.next(),rt.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.As&&(this.As=t),rt.resolve()}ce(e){this.Is.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Ps=new rh(t),this.highestTargetId=t),e.sequenceNumber>this.As&&(this.As=e.sequenceNumber)}addTargetData(e,t){return this.ce(t),this.targetCount+=1,rt.resolve()}updateTargetData(e,t){return this.ce(t),rt.resolve()}removeTargetData(e,t){return this.Is.delete(t.target),this.Rs.us(t.targetId),this.targetCount-=1,rt.resolve()}removeTargets(e,t,r){let n=0,s=[];return this.Is.forEach((i,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.Is.delete(i),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),rt.waitFor(s).next(()=>n)}getTargetCount(e){return rt.resolve(this.targetCount)}getTargetData(e,t){let r=this.Is.get(t)||null;return rt.resolve(r)}addMatchingKeys(e,t,r){return this.Rs.rs(t,r),rt.resolve()}removeMatchingKeys(e,t,r){this.Rs.cs(t,r);let n=this.persistence.referenceDelegate,s=[];return n&&t.forEach(t=>{s.push(n.markPotentiallyOrphaned(e,t))}),rt.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Rs.us(t),rt.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Rs.ls(t);return rt.resolve(r)}containsKey(e,t){return rt.resolve(this.Rs.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t){this.bs={},this.Be=new D(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=e(this),this.He=new rC(this),this.Jt=new ro,this.Je=new rb(this.Jt,e=>this.referenceDelegate.vs(e)),this.k=new ra(t),this.Ye=new rI(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(e){let t=this.bs[e.toKey()];return t||(t=new rN(this.Jt,this.referenceDelegate),this.bs[e.toKey()]=t),t}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(e,t,r){p("MemoryPersistence","Starting transaction:",e);let n=new rD(this.Be.next());return this.referenceDelegate.Vs(),r(n).next(e=>this.referenceDelegate.Ss(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Ds(e,t){return rt.or(Object.values(this.bs).map(r=>()=>r.containsKey(e,t)))}}class rD extends re{constructor(e){super(),this.currentSequenceNumber=e}}class rR{constructor(e){this.persistence=e,this.Cs=new rA,this.Ns=null}static ks(e){return new rR(e)}get xs(){if(this.Ns)return this.Ns;throw v()}addReference(e,t,r){return this.Cs.addReference(r,t),this.xs.delete(r.toString()),rt.resolve()}removeReference(e,t,r){return this.Cs.removeReference(r,t),this.xs.add(r.toString()),rt.resolve()}markPotentiallyOrphaned(e,t){return this.xs.add(t.toString()),rt.resolve()}removeTarget(e,t){this.Cs.us(t.targetId).forEach(e=>this.xs.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.xs.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Vs(){this.Ns=new Set}Ss(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return rt.forEach(this.xs,r=>{let n=Z.fromPath(r);return this.$s(e,n).next(e=>{e||t.removeEntry(n)})}).next(()=>(this.Ns=null,t.apply(e)))}updateLimboDocument(e,t){return this.$s(e,t).next(e=>{e?this.xs.delete(t.toString()):this.xs.add(t.toString())})}vs(e){return 0}$s(e,t){return rt.or([()=>rt.resolve(this.Cs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ds(e,t)])}}class rL{constructor(){this.activeTargetIds=tT}Ms(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ls(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Os(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class rV{constructor(){this.pi=new rL,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.pi.Ms(e),this.Ti[e]||"not-current"}updateQueryState(e,t,r){this.Ti[e]=t}removeLocalQueryTarget(e){this.pi.Ls(e)}isLocalQueryTarget(e){return this.pi.activeTargetIds.has(e)}clearQueryState(e){delete this.Ti[e]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(e){return this.pi.activeTargetIds.has(e)}start(){return this.pi=new rL,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{Ei(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rM{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.Pi(),this.bi=[],this.vi()}Ei(e){this.bi.push(e)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){for(let e of(p("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.bi))e(0)}Pi(){for(let e of(p("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.bi))e(1)}static bt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rU={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rF{constructor(e){this.Vi=e.Vi,this.Si=e.Si}Di(e){this.Ci=e}Ni(e){this.ki=e}onMessage(e){this.xi=e}close(){this.Si()}send(e){this.Vi(e)}$i(){this.Ci()}Fi(e){this.ki(e)}Oi(e){this.xi(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rO extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.Mi=t+"://"+e.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(e,t,r,n,s){let i=this.Ui(e,t);p("RestConnection","Sending: ",i,r);let a={};return this.qi(a,n,s),this.Ki(e,i,a,r).then(e=>(p("RestConnection","Received: ",e),e),t=>{throw y("RestConnection",`${e} failed with error: `,t,"url: ",i,"request:",r),t})}ji(e,t,r,n,s){return this.Bi(e,t,r,n,s)}qi(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+d,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}Ui(e,t){let r=rU[e];return`${this.Mi}/v1/${t}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}Ki(e,t,r,n){return new Promise((s,i)=>{let a=new u.JJ;a.listenOnce(u.tw.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case u.jK.NO_ERROR:let t=a.getResponseJson();p("Connection","XHR received:",JSON.stringify(t)),s(t);break;case u.jK.TIMEOUT:p("Connection",'RPC "'+e+'" timed out'),i(new T(E.DEADLINE_EXCEEDED,"Request time out"));break;case u.jK.HTTP_ERROR:let r=a.getStatus();if(p("Connection",'RPC "'+e+'" failed with status:',r,"response text:",a.getResponseText()),r>0){let e=a.getResponseJson().error;if(e&&e.status&&e.message){let t=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(E).indexOf(t)>=0?t:E.UNKNOWN}(e.status);i(new T(t,e.message))}else i(new T(E.UNKNOWN,"Server responded with status "+a.getStatus()))}else i(new T(E.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{p("Connection",'RPC "'+e+'" completed.')}});let o=JSON.stringify(n);a.send(t,"POST",o,r,15)})}Qi(e,t,r){let s=[this.Mi,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=(0,u.UE)(),a=(0,u.FJ)(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new u.zI({})),this.qi(o.initMessageHeaders,t,r),(0,l.uI)()||(0,l.b$)()||(0,l.d)()||(0,l.w1)()||(0,l.Mn)()||(0,l.ru)()||(o.httpHeadersOverwriteParam="$httpHeaders");let h=s.join("");p("Connection","Creating WebChannel: "+h,o);let c=i.createWebChannel(h,o),d=!1,f=!1,m=new rF({Vi:e=>{f?p("Connection","Not sending because WebChannel is closed:",e):(d||(p("Connection","Opening WebChannel transport."),c.open(),d=!0),p("Connection","WebChannel sending:",e),c.send(e))},Si:()=>c.close()}),g=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return g(c,u.ii.EventType.OPEN,()=>{f||p("Connection","WebChannel transport opened.")}),g(c,u.ii.EventType.CLOSE,()=>{f||(f=!0,p("Connection","WebChannel transport closed"),m.Fi())}),g(c,u.ii.EventType.ERROR,e=>{f||(f=!0,y("Connection","WebChannel transport errored:",e),m.Fi(new T(E.UNAVAILABLE,"The operation could not be completed")))}),g(c,u.ii.EventType.MESSAGE,e=>{var t;if(!f){let r=e.data[0];r||v();let s=r.error||(null===(t=r[0])||void 0===t?void 0:t.error);if(s){p("Connection","WebChannel received error:",s);let e=s.status,t=function(e){let t=n[e];if(void 0!==t)return th(t)}(e),r=s.message;void 0===t&&(t=E.INTERNAL,r="Unknown error status: "+e+" with message "+s.message),f=!0,m.Fi(new T(t,r)),c.close()}else p("Connection","WebChannel received:",r),m.Oi(r)}}),g(a,u.ju.STAT_EVENT,e=>{e.stat===u.kN.PROXY?p("Connection","Detected buffering proxy"):e.stat===u.kN.NOPROXY&&p("Connection","Detected no buffering proxy")}),setTimeout(()=>{m.$i()},0),m}}function rP(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rq(e){return new tV(e,!0)}class rB{constructor(e,t,r=1e3,n=1.5,s=6e4){this.Oe=e,this.timerId=t,this.Wi=r,this.Gi=n,this.zi=s,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(e){this.cancel();let t=Math.floor(this.Hi+this.tr()),r=Math.max(0,Date.now()-this.Yi),n=Math.max(0,t-r);n>0&&p("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.Hi} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Ji=this.Oe.enqueueAfterDelay(this.timerId,n,()=>(this.Yi=Date.now(),e())),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){null!==this.Ji&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){null!==this.Ji&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rK{constructor(e,t,r,n,s,i,a,o){this.Oe=e,this.nr=r,this.sr=n,this.ir=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.rr=0,this.ar=null,this.cr=null,this.stream=null,this.ur=new rB(e,t)}hr(){return 1===this.state||5===this.state||this.lr()}lr(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&null===this.ar&&(this.ar=this.Oe.enqueueAfterDelay(this.nr,6e4,()=>this.mr()))}gr(e){this.yr(),this.stream.send(e)}async mr(){if(this.lr())return this.close(0)}yr(){this.ar&&(this.ar.cancel(),this.ar=null)}pr(){this.cr&&(this.cr.cancel(),this.cr=null)}async close(e,t){this.yr(),this.pr(),this.ur.cancel(),this.rr++,4!==e?this.ur.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(g(t.toString()),g("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Tr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ni(t)}Tr(){}auth(){this.state=1;let e=this.Er(this.rr),t=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.rr===t&&this.Ir(e,r)},t=>{e(()=>{let e=new T(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Ar(e)})})}Ir(e,t){let r=this.Er(this.rr);this.stream=this.Rr(e,t),this.stream.Di(()=>{r(()=>(this.state=2,this.cr=this.Oe.enqueueAfterDelay(this.sr,1e4,()=>(this.lr()&&(this.state=3),Promise.resolve())),this.listener.Di()))}),this.stream.Ni(e=>{r(()=>this.Ar(e))}),this.stream.onMessage(e=>{r(()=>this.onMessage(e))})}dr(){this.state=5,this.ur.Zi(async()=>{this.state=0,this.start()})}Ar(e){return p("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Er(e){return t=>{this.Oe.enqueueAndForget(()=>this.rr===e?t():(p("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class r$ extends rK{constructor(e,t,r,n,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,i),this.k=s}Rr(e,t){return this.ir.Qi("Listen",e,t)}onMessage(e){this.ur.reset();let t=function(e,t){let r;if("targetChange"in t){var n,s;t.targetChange;let i="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:v(),a=t.targetChange.targetIds||[],o=(s=t.targetChange.resumeToken,e.C?(void 0===s||"string"==typeof s||v(),G.fromBase64String(s||"")):(void 0===s||s instanceof Uint8Array||v(),G.fromUint8Array(s||new Uint8Array))),l=t.targetChange.cause;r=new tb(i,a,o,l&&new T(void 0===l.code?E.UNKNOWN:th(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let s=tq(e,n.document.name),i=tU(n.document.updateTime),a=new ef({mapValue:{fields:n.document.fields}}),o=em.newFoundDocument(s,i,a);r=new tS(n.targetIds||[],n.removedTargetIds||[],o.key,o)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let s=tq(e,n.document),i=n.readTime?tU(n.readTime):M.min(),a=em.newNoDocument(s,i);r=new tS([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let s=tq(e,n.document);r=new tS([],n.removedTargetIds||[],s,null)}else{if(!("filter"in t))return v();{t.filter;let e=t.filter;e.targetId;let n=new tu(e.count||0);r=new tN(e.targetId,n)}}return r}(this.k,e),r=function(e){if(!("targetChange"in e))return M.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?M.min():t.readTime?tU(t.readTime):M.min()}(e);return this.listener.Pr(t,r)}br(e){let t={};t.database=tK(this.k),t.addTarget=function(e,t){let r;let n=t.target;return(r=ev(n)?{documents:{documents:[tB(e,n.path)]}}:{query:function(e,t){var r;let n={structuredQuery:{}},s=t.path;null!==t.collectionGroup?(n.parent=tB(e,s),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=tB(e,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);let i=function(e){if(0===e.length)return;let t=e.map(e=>(function(e){if("=="===e.op){if(eh(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NAN"}};if(eu(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(eh(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NOT_NAN"}};if(eu(e.value))return{unaryFilter:{field:tQ(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:tQ(e.field),op:tL[e.op],value:e.value}}})(e));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);i&&(n.structuredQuery.where=i);let a=function(e){if(0!==e.length)return e.map(e=>({field:tQ(e.field),direction:tR[e.dir]}))}(t.orderBy);a&&(n.structuredQuery.orderBy=a);let o=(r=t.limit,e.C||J(r)?r:{value:r});return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt=tz(t.startAt)),t.endAt&&(n.structuredQuery.endAt=tz(t.endAt)),n}(e,n)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0?r.resumeToken=tM(e,t.resumeToken):t.snapshotVersion.compareTo(M.min())>0&&(r.readTime=tx(e,t.snapshotVersion.toTimestamp())),r}(this.k,e);let r=function(e,t){let r=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return v()}}(0,t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.k,e);r&&(t.labels=r),this.gr(t)}vr(e){let t={};t.database=tK(this.k),t.removeTarget=e,this.gr(t)}}class rG extends rK{constructor(e,t,r,n,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,i),this.k=s,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(e,t){return this.ir.Qi("Write",e,t)}onMessage(e){var t,r;if(e.streamToken||v(),this.lastStreamToken=e.streamToken,this.Vr){this.ur.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(void 0!==r||v(),t.map(e=>{let t;return(t=e.updateTime?tU(e.updateTime):tU(r)).isEqual(M.min())&&(t=tU(r)),new e6(t,e.transformResults||[])})):[]),s=tU(e.commitTime);return this.listener.Cr(s,n)}return e.writeResults&&0!==e.writeResults.length&&v(),this.Vr=!0,this.listener.Nr()}kr(){let e={};e.database=tK(this.k),this.gr(e)}Dr(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof tr)n={update:tG(e,t.key,t.value)};else if(t instanceof to)n={delete:tP(e,t.key)};else if(t instanceof tn)n={update:tG(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof tl))return v();n={verify:tP(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof eJ)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof eX)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof e0)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof e2)return{fieldPath:t.field.canonicalString(),increment:r.N};throw v()})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:tx(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:v()),n})(this.k,e))};this.gr(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rz extends class{}{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.ir=r,this.k=n,this.$r=!1}Fr(){if(this.$r)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(e,t,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([n,s])=>this.ir.Bi(e,t,r,n,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}ji(e,t,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([n,s])=>this.ir.ji(e,t,r,n,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}terminate(){this.$r=!0}}class rj{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Or=0,this.Mr=null,this.Lr=!0}Br(){0===this.Or&&(this.Ur("Unknown"),this.Mr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Mr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve())))}Kr(e){"Online"===this.state?this.Ur("Unknown"):(this.Or++,this.Or>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Ur("Offline")))}set(e){this.jr(),this.Or=0,"Online"===e&&(this.Lr=!1),this.Ur(e)}Ur(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}qr(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(g(t),this.Lr=!1):p("OnlineStateTracker",t)}jr(){null!==this.Mr&&(this.Mr.cancel(),this.Mr=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rQ{constructor(e,t,r,n,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=s,this.Hr.Ei(e=>{r.enqueueAndForget(async()=>{r2(this)&&(p("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.Gr.add(4),await rH(e),e.Jr.set("Unknown"),e.Gr.delete(4),await rW(e)}(this))})}),this.Jr=new rj(r,n)}}async function rW(e){if(r2(e))for(let t of e.zr)await t(!0)}async function rH(e){for(let t of e.zr)await t(!1)}function rY(e,t){e.Wr.has(t.targetId)||(e.Wr.set(t.targetId,t),r1(e)?r0(e):na(e).lr()&&rX(e,t))}function rJ(e,t){let r=na(e);e.Wr.delete(t),r.lr()&&rZ(e,t),0===e.Wr.size&&(r.lr()?r._r():r2(e)&&e.Jr.set("Unknown"))}function rX(e,t){e.Yr.X(t.targetId),na(e).br(t)}function rZ(e,t){e.Yr.X(t),na(e).vr(t)}function r0(e){e.Yr=new tC({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>e.Wr.get(t)||null}),na(e).start(),e.Jr.Br()}function r1(e){return r2(e)&&!na(e).hr()&&e.Wr.size>0}function r2(e){return 0===e.Gr.size}async function r4(e){e.Wr.forEach((t,r)=>{rX(e,t)})}async function r3(e,t){e.Yr=void 0,r1(e)?(e.Jr.Kr(t),r0(e)):e.Jr.set("Unknown")}async function r6(e,t,r){if(e.Jr.set("Online"),t instanceof tb&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.Wr.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.Wr.delete(n),e.Yr.removeTarget(n))}(e,t)}catch(r){p("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await r8(e,r)}else if(t instanceof tS?e.Yr.ot(t):t instanceof tN?e.Yr.dt(t):e.Yr.ut(t),!r.isEqual(M.min()))try{let t=await rv(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.Yr.gt(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let s=e.Wr.get(n);s&&e.Wr.set(n,s.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach(t=>{let r=e.Wr.get(t);if(!r)return;e.Wr.set(t,r.withResumeToken(G.EMPTY_BYTE_STRING,r.snapshotVersion)),rZ(e,t);let n=new ri(r.target,t,1,r.sequenceNumber);rX(e,n)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){p("RemoteStore","Failed to raise snapshot:",t),await r8(e,t)}}async function r8(e,t,r){if(!rr(t))throw t;e.Gr.add(1),await rH(e),e.Jr.set("Offline"),r||(r=()=>rv(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{p("RemoteStore","Retrying IndexedDB access"),await r(),e.Gr.delete(1),await rW(e)})}function r9(e,t){return t().catch(r=>r8(e,r,t))}async function r5(e){let t=no(e),r=e.Qr.length>0?e.Qr[e.Qr.length-1].batchId:-1;for(;r2(e)&&e.Qr.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.An.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.Qr.length&&t._r();break}r=n.batchId,function(e,t){e.Qr.push(t);let r=no(e);r.lr()&&r.Sr&&r.Dr(t.mutations)}(e,n)}catch(t){await r8(e,t)}r7(e)&&ne(e)}function r7(e){return r2(e)&&!no(e).hr()&&e.Qr.length>0}function ne(e){no(e).start()}async function nt(e){no(e).kr()}async function nr(e){let t=no(e);for(let r of e.Qr)t.Dr(r.mutations)}async function nn(e,t,r){let n=e.Qr.shift(),s=rs.from(n,t,r);await r9(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await r5(e)}async function ns(e,t){t&&no(e).Sr&&await async function(e,t){var r;if(function(e){switch(e){default:return v();case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0}}(r=t.code)&&r!==E.ABORTED){let r=e.Qr.shift();no(e).wr(),await r9(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await r5(e)}}(e,t),r7(e)&&ne(e)}async function ni(e,t){t?(e.Gr.delete(2),await rW(e)):t||(e.Gr.add(2),await rH(e),e.Jr.set("Unknown"))}function na(e){var t,r,n;return e.Xr||(e.Xr=(t=e.datastore,r=e.asyncQueue,n={Di:r4.bind(null,e),Ni:r3.bind(null,e),Pr:r6.bind(null,e)},t.Fr(),new r$(r,t.ir,t.authCredentials,t.appCheckCredentials,t.k,n)),e.zr.push(async t=>{t?(e.Xr.wr(),r1(e)?r0(e):e.Jr.set("Unknown")):(await e.Xr.stop(),e.Yr=void 0)})),e.Xr}function no(e){var t,r,n;return e.Zr||(e.Zr=(t=e.datastore,r=e.asyncQueue,n={Di:nt.bind(null,e),Ni:ns.bind(null,e),Nr:nr.bind(null,e),Cr:nn.bind(null,e)},t.Fr(),new rG(r,t.ir,t.authCredentials,t.appCheckCredentials,t.k,n)),e.zr.push(async t=>{t?(e.Zr.wr(),await r5(e)):(await e.Zr.stop(),e.Qr.length>0&&(p("RemoteStore",`Stopping write stream with ${e.Qr.length} pending writes`),e.Qr=[]))})),e.Zr}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t,r,n,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=s,this.deferred=new I,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,r,n,s){let i=new nl(e,t,Date.now()+r,n,s);return i.start(r),i}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new T(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nu(e,t){if(g("AsyncQueue",`${t}: ${e}`),rr(e))return new T(E.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(e,t)=>Z.comparator(e.key,t.key),this.keyedMap=ty,this.sortedSet=new tc(this.comparator)}static emptySet(e){return new nh(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nh)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new nh;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(){this.eo=new tc(Z.comparator)}track(e){let t=e.doc.key,r=this.eo.get(t);r?0!==e.type&&3===r.type?this.eo=this.eo.insert(t,e):3===e.type&&1!==r.type?this.eo=this.eo.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.eo=this.eo.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.eo=this.eo.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.eo=this.eo.remove(t):1===e.type&&2===r.type?this.eo=this.eo.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.eo=this.eo.insert(t,{type:2,doc:e.doc}):v():this.eo=this.eo.insert(t,e)}no(){let e=[];return this.eo.inorderTraversal((t,r)=>{e.push(r)}),e}}class nd{constructor(e,t,r,n,s,i,a,o){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o}static fromInitialDocuments(e,t,r,n){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new nd(e,t,nh.emptySet(t),s,r,n,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&eK(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(){this.so=void 0,this.listeners=[]}}class nm{constructor(){this.queries=new rd(e=>e$(e),eK),this.onlineState="Unknown",this.io=new Set}}async function np(e,t){let r=t.query,n=!1,s=e.queries.get(r);if(s||(n=!0,s=new nf),n)try{s.so=await e.onListen(r)}catch(r){let e=nu(r,`Initialization of query '${eG(t.query)}' failed`);return void t.onError(e)}e.queries.set(r,s),s.listeners.push(t),t.ro(e.onlineState),s.so&&t.oo(s.so)&&nv(e)}async function ng(e,t){let r=t.query,n=!1,s=e.queries.get(r);if(s){let e=s.listeners.indexOf(t);e>=0&&(s.listeners.splice(e,1),n=0===s.listeners.length)}if(n)return e.queries.delete(r),e.onUnlisten(r)}function ny(e,t){let r=!1;for(let n of t){let t=n.query,s=e.queries.get(t);if(s){for(let e of s.listeners)e.oo(n)&&(r=!0);s.so=n}}r&&nv(e)}function nw(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.listeners)e.onError(r);e.queries.delete(t)}function nv(e){e.io.forEach(e=>{e.next()})}class nE{constructor(e,t,r){this.query=e,this.ao=t,this.co=!1,this.uo=null,this.onlineState="Unknown",this.options=r||{}}oo(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new nd(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let t=!1;return this.co?this.ho(e)&&(this.ao.next(e),t=!0):this.lo(e,this.onlineState)&&(this.fo(e),t=!0),this.uo=e,t}onError(e){this.ao.error(e)}ro(e){this.onlineState=e;let t=!1;return this.uo&&!this.co&&this.lo(this.uo,e)&&(this.fo(this.uo),t=!0),t}lo(e,t){return!e.fromCache||(!this.options.wo||!("Offline"!==t))&&(!e.docs.isEmpty()||"Offline"===t)}ho(e){if(e.docChanges.length>0)return!0;let t=this.uo&&this.uo.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}fo(e){e=nd.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.co=!0,this.ao.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e){this.key=e}}class nI{constructor(e){this.key=e}}class nA{constructor(e,t){this.query=e,this.To=t,this.Eo=null,this.current=!1,this.Io=tE(),this.mutatedKeys=tE(),this.Ao=ej(e),this.Ro=new nh(this.Ao)}get Po(){return this.To}bo(e,t){let r=t?t.vo:new nc,n=t?t.Ro:this.Ro,s=t?t.mutatedKeys:this.mutatedKeys,i=n,a=!1,o=eM(this.query)&&n.size===this.query.limit?n.last():null,l=eU(this.query)&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=ez(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.Vo(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.Ao(h,o)>0||l&&0>this.Ao(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(i=i.add(h),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),eM(this.query)||eU(this.query))for(;i.size>this.query.limit;){let e=eM(this.query)?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),r.track({type:1,doc:e})}return{Ro:i,vo:r,Bn:a,mutatedKeys:s}}Vo(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){let n=this.Ro;this.Ro=e.Ro,this.mutatedKeys=e.mutatedKeys;let s=e.vo.no();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return r(e)-r(t)})(e.type,t.type)||this.Ao(e.doc,t.doc)),this.So(r);let i=t?this.Do():[],a=0===this.Io.size&&this.current?1:0,o=a!==this.Eo;return(this.Eo=a,0!==s.length||o)?{snapshot:new nd(this.query,e.Ro,n,s,e.mutatedKeys,0===a,o,!1),Co:i}:{Co:i}}ro(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new nc,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(e){return!this.To.has(e)&&!!this.Ro.has(e)&&!this.Ro.get(e).hasLocalMutations}So(e){e&&(e.addedDocuments.forEach(e=>this.To=this.To.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.To=this.To.delete(e)),this.current=e.current)}Do(){if(!this.current)return[];let e=this.Io;this.Io=tE(),this.Ro.forEach(e=>{this.No(e.key)&&(this.Io=this.Io.add(e.key))});let t=[];return e.forEach(e=>{this.Io.has(e)||t.push(new nI(e))}),this.Io.forEach(r=>{e.has(r)||t.push(new nT(r))}),t}ko(e){this.To=e.zn,this.Io=tE();let t=this.bo(e.documents);return this.applyChanges(t,!0)}xo(){return nd.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,0===this.Eo)}}class nS{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class nN{constructor(e){this.key=e,this.$o=!1}}class nb{constructor(e,t,r,n,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Fo={},this.Oo=new rd(e=>e$(e),eK),this.Mo=new Map,this.Lo=new Set,this.Bo=new tc(Z.comparator),this.Uo=new Map,this.qo=new rA,this.Ko={},this.jo=new Map,this.Qo=rh.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return!0===this.Wo}}async function nk(e,t){var r,n;let s,i;let a=(e.remoteStore.remoteSyncer.applyRemoteEvent=nR.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=nG.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=nV.bind(null,e),e.Fo.Pr=ny.bind(null,e.eventManager),e.Fo.zo=nw.bind(null,e.eventManager),e),o=a.Oo.get(t);if(o)s=o.targetId,a.sharedClientState.addLocalQueryTarget(s),i=o.view.xo();else{let e=await (r=a.localStore,n=eB(t),r.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return r.He.getTargetData(e,n).next(s=>s?(t=s,rt.resolve(t)):r.He.allocateTargetId(e).next(s=>(t=new ri(n,s,0,e.currentSequenceNumber),r.He.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=r.qn.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(r.qn=r.qn.insert(e.targetId,e),r.Kn.set(n,e.targetId)),e})),o=a.sharedClientState.addLocalQueryTarget(e.targetId);s=e.targetId,i=await nC(a,t,s,"current"===o),a.isPrimaryClient&&rY(a.remoteStore,e)}return i}async function nC(e,t,r,n){e.Go=(t,r,n)=>(async function(e,t,r,n){let s=t.view.bo(r);s.Bn&&(s=await rT(e.localStore,t.query,!1).then(({documents:e})=>t.view.bo(e,s)));let i=n&&n.targetChanges.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i);return nq(e,t.targetId,a.Co),a.snapshot})(e,t,r,n);let s=await rT(e.localStore,t,!0),i=new nA(t,s.zn),a=i.bo(s.documents),o=tA.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState),l=i.applyChanges(a,e.isPrimaryClient,o);nq(e,r,l.Co);let u=new nS(t,r,i);return e.Oo.set(t,u),e.Mo.has(r)?e.Mo.get(r).push(t):e.Mo.set(r,[t]),l.snapshot}async function n_(e,t){let r=e.Oo.get(t),n=e.Mo.get(r.targetId);if(n.length>1)return e.Mo.set(r.targetId,n.filter(e=>!eK(e,t))),void e.Oo.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await rE(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),rJ(e.remoteStore,r.targetId),nO(e,r.targetId)}).catch(rc)):(nO(e,r.targetId),await rE(e.localStore,r.targetId,!0))}async function nD(e,t,r){var n;let s=(e.remoteStore.remoteSyncer.applySuccessfulWrite=nx.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=nM.bind(null,e),e);try{let e;let i=await function(e,t){let r;let n=x.now(),s=t.reduce((e,t)=>e.add(t.key),tE());return e.persistence.runTransaction("Locally write mutations","readwrite",i=>e.Wn.vn(i,s).next(s=>{r=s;let a=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),s=eY(n.transform,e||null);null!=s&&(null==r&&(r=ef.empty()),r.set(n.field,s))}return r||null}(e,r.get(e.key));null!=t&&a.push(new tn(e.key,t,function e(t){let r=[];return F(t.fields,(t,n)=>{let s=new K([t]);if(ec(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(s);else for(let e of t)r.push(s.child(e))}else r.push(s)}),new $(r)}(t.value.mapValue),e8.exists(!0)))}return e.An.addMutationBatch(i,n,a,t)})).then(e=>(e.applyToLocalDocumentSet(r),{batchId:e.batchId,changes:r}))}(s.localStore,t);s.sharedClientState.addPendingMutation(i.batchId),n=i.batchId,(e=s.Ko[s.currentUser.toKey()])||(e=new tc(L)),e=e.insert(n,r),s.Ko[s.currentUser.toKey()]=e,await nK(s,i.changes),await r5(s.remoteStore)}catch(t){let e=nu(t,"Failed to persist write");r.reject(e)}}async function nR(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.qn;return e.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{var i,a;let o;let l=e.Qn.newChangeBuffer({trackRemovals:!0});n=e.qn;let u=[];t.targetChanges.forEach((t,i)=>{let a=n.get(i);if(!a)return;u.push(e.He.removeMatchingKeys(s,t.removedDocuments,i).next(()=>e.He.addMatchingKeys(s,t.addedDocuments,i)));let o=t.resumeToken;if(o.approximateByteSize()>0){let l=a.withResumeToken(o,r).withSequenceNumber(s.currentSequenceNumber);n=n.insert(i,l),l.resumeToken.approximateByteSize()>0||v(),(0===a.resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-a.snapshotVersion.toMicroseconds()>=3e8||t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size>0)&&u.push(e.He.updateTargetData(s,l))}});let h=tg;if(t.documentUpdates.forEach((r,n)=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(s,r))}),u.push((i=t.documentUpdates,a=void 0,o=tE(),i.forEach(e=>o=o.add(e)),l.getEntries(s,o).next(e=>{let t=tg;return i.forEach((n,s)=>{let i=e.get(n),o=(null==a?void 0:a.get(n))||r;s.isNoDocument()&&s.version.isEqual(M.min())?(l.removeEntry(n,o),t=t.insert(n,s)):!i.isValidDocument()||s.version.compareTo(i.version)>0||0===s.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(s,o),t=t.insert(n,s)):p("LocalStore","Ignoring outdated watch update for ",n,". Current version:",i.version," Watch version:",s.version)}),t})).next(e=>{h=e})),!r.isEqual(M.min())){let t=e.He.getLastRemoteSnapshotVersion(s).next(t=>e.He.setTargetsMetadata(s,s.currentSequenceNumber,r));u.push(t)}return rt.waitFor(u).next(()=>l.apply(s)).next(()=>e.Wn.Vn(s,h)).next(()=>h)}).then(t=>(e.qn=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Uo.get(r);n&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||v(),t.addedDocuments.size>0?n.$o=!0:t.modifiedDocuments.size>0?n.$o||v():t.removedDocuments.size>0&&(n.$o||v(),n.$o=!1))}),await nK(e,r,t)}catch(e){await rc(e)}}function nL(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let s=[];e.Oo.forEach((e,r)=>{let n=r.view.ro(t);n.snapshot&&s.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.listeners)e.ro(t)&&(r=!0)}),r&&nv(n),s.length&&e.Fo.Pr(s),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function nV(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Uo.get(t),s=n&&n.key;if(s){let r=new tc(Z.comparator);r=r.insert(s,em.newNoDocument(s,M.min()));let n=tE().add(s),i=new tI(M.min(),new Map,new tm(L),r,n);await nR(e,i),e.Bo=e.Bo.remove(s),e.Uo.delete(t),nB(e)}else await rE(e.localStore,t,!1).then(()=>nO(e,t,r)).catch(rc)}async function nx(e,t){var r;let n=t.batch.batchId;try{let s=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),s=r.Qn.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let s=r.batch,i=s.keys(),a=rt.resolve();return i.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let i=r.docVersions.get(e);null!==i||v(),0>t.version.compareTo(i)&&(s.applyToRemoteDocument(t,r),t.isValidDocument()&&n.addEntry(t,r.commitVersion))})}),a.next(()=>e.An.removeMutationBatch(t,s))})(r,e,t,s).next(()=>s.apply(e)).next(()=>r.An.performConsistencyCheck(e)).next(()=>r.Wn.vn(e,n))});nF(e,n,null),nU(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await nK(e,s)}catch(e){await rc(e)}}async function nM(e,t,r){var n;try{let s=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.An.lookupMutationBatch(e,t).next(t=>(null!==t||v(),r=t.keys(),n.An.removeMutationBatch(e,t))).next(()=>n.An.performConsistencyCheck(e)).next(()=>n.Wn.vn(e,r))});nF(e,t,r),nU(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await nK(e,s)}catch(e){await rc(e)}}function nU(e,t){(e.jo.get(t)||[]).forEach(e=>{e.resolve()}),e.jo.delete(t)}function nF(e,t,r){let n=e.Ko[e.currentUser.toKey()];if(n){let s=n.get(t);s&&(r?s.reject(r):s.resolve(),n=n.remove(t)),e.Ko[e.currentUser.toKey()]=n}}function nO(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.Mo.get(t)))e.Oo.delete(n),r&&e.Fo.zo(n,r);e.Mo.delete(t),e.isPrimaryClient&&e.qo.us(t).forEach(t=>{e.qo.containsKey(t)||nP(e,t)})}function nP(e,t){e.Lo.delete(t.path.canonicalString());let r=e.Bo.get(t);null!==r&&(rJ(e.remoteStore,r),e.Bo=e.Bo.remove(t),e.Uo.delete(r),nB(e))}function nq(e,t,r){for(let n of r)n instanceof nT?(e.qo.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.Bo.get(r)||e.Lo.has(n)||(p("SyncEngine","New document in limbo: "+r),e.Lo.add(n),nB(e))}(e,n)):n instanceof nI?(p("SyncEngine","Document no longer in limbo: "+n.key),e.qo.removeReference(n.key,t),e.qo.containsKey(n.key)||nP(e,n.key)):v()}function nB(e){for(;e.Lo.size>0&&e.Bo.size<e.maxConcurrentLimboResolutions;){let t=e.Lo.values().next().value;e.Lo.delete(t);let r=new Z(q.fromString(t)),n=e.Qo.next();e.Uo.set(n,new nN(r)),e.Bo=e.Bo.insert(r,n),rY(e.remoteStore,new ri(eB(new ex(r.path)),n,2,D.I))}}async function nK(e,t,r){let n=[],s=[],i=[];e.Oo.isEmpty()||(e.Oo.forEach((a,o)=>{i.push(e.Go(o,t,r).then(t=>{if(t){e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,t.fromCache?"not-current":"current"),n.push(t);let r=rp.$n(o.targetId,t);s.push(r)}}))}),await Promise.all(i),e.Fo.Pr(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>rt.forEach(t,t=>rt.forEach(t.kn,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>rt.forEach(t.xn,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!rr(e))throw e;p("LocalStore","Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.qn.get(t),n=r.snapshotVersion,s=r.withLastLimboFreeSnapshotVersion(n);e.qn=e.qn.insert(t,s)}}}(e.localStore,s))}async function n$(e,t){if(!e.currentUser.isEqual(t)){p("SyncEngine","User change. New user:",t.toKey());let r=await rw(e.localStore,t);e.currentUser=t,e.jo.forEach(e=>{e.forEach(e=>{e.reject(new T(E.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.jo.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await nK(e,r.Gn)}}function nG(e,t){let r=e.Uo.get(t);if(r&&r.$o)return tE().add(r.key);{let r=tE(),n=e.Mo.get(t);if(!n)return r;for(let t of n){let n=e.Oo.get(t);r=r.unionWith(n.view.Po)}return r}}class nz{constructor(){this.synchronizeTabs=!1}async initialize(e){this.k=rq(e.databaseInfo.databaseId),this.sharedClientState=this.Jo(e),this.persistence=this.Yo(e),await this.persistence.start(),this.gcScheduler=this.Xo(e),this.localStore=this.Zo(e)}Xo(e){return null}Zo(e){var t;return t=this.persistence,new ry(t,new rg,e.initialUser,this.k)}Yo(e){return new r_(rR.ks,this.k)}Jo(e){return new rV}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class nj{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>nL(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=n$.bind(null,this.syncEngine),await ni(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new nm}createDatastore(e){let t=rq(e.databaseInfo.databaseId),r=new rO(e.databaseInfo);return new rz(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new rQ(t,this.datastore,e.asyncQueue,e=>nL(this.syncEngine,e,0),rM.bt()?new rM:new rx)}createSyncEngine(e,t){return function(e,t,r,n,s,i,a){let o=new nb(e,t,r,n,s,i);return a&&(o.Wo=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){p("RemoteStore","RemoteStore shutting down."),e.Gr.add(5),await rH(e),e.Hr.shutdown(),e.Jr.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.ea(this.observer.next,e)}error(e){this.observer.error?this.ea(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}na(){this.muted=!0}ea(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nW{constructor(e,t,r,n){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=c.UNAUTHENTICATED,this.clientId=R.A(),this.authCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async e=>{p("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,()=>Promise.resolve())}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new I;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=nu(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function nH(e,t){e.asyncQueue.verifyOperationInProgress(),p("FirestoreClient","Initializing OfflineComponentProvider");let r=await e.getConfiguration();await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await rw(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function nY(e,t){e.asyncQueue.verifyOperationInProgress();let r=await nJ(e);p("FirestoreClient","Initializing OnlineComponentProvider");let n=await e.getConfiguration();await t.initialize(r,n),e.setCredentialChangeListener(e=>(async function(e,t){e.asyncQueue.verifyOperationInProgress(),p("RemoteStore","RemoteStore received new credentials");let r=r2(e);e.Gr.add(3),await rH(e),r&&e.Jr.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Gr.delete(3),await rW(e)})(t.remoteStore,e)),e.onlineComponents=t}async function nJ(e){return e.offlineComponents||(p("FirestoreClient","Using default OfflineComponentProvider"),await nH(e,new nz)),e.offlineComponents}async function nX(e){return e.onlineComponents||(p("FirestoreClient","Using default OnlineComponentProvider"),await nY(e,new nj)),e.onlineComponents}async function nZ(e){let t=await nX(e),r=t.eventManager;return r.onListen=nk.bind(null,t.syncEngine),r.onUnlisten=n_.bind(null,t.syncEngine),r}class n0{constructor(e,t,r,n,s,i,a,o){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.useFetchStreams=o}}class n1{constructor(e,t){this.projectId=e,this.database=t||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof n1&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n2=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n4(e,t,r){if(!r)throw new T(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function n3(e){if(!Z.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function n6(e){if(Z.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function n8(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":v()}function n9(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new T(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=n8(e);throw new T(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n5{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new T(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new T(E.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,r,n){if(!0===t&&!0===n)throw new T(E.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n7{constructor(e,t,r){this._authCredentials=t,this._appCheckCredentials=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new n5({}),this._settingsFrozen=!1,e instanceof n1?this._databaseId=e:(this._app=e,this._databaseId=function(e){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new T(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new n1(e.options.projectId)}(e))}get app(){if(!this._app)throw new T(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new T(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new n5(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new S;switch(e.type){case"gapi":let t=e.client;return"object"==typeof t&&null!==t&&t.auth&&t.auth.getAuthHeaderValueForFirstParty||v(),new k(t,e.sessionIndex||"0",e.iamToken||null);case"provider":return e.client;default:throw new T(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=n2.get(e);t&&(p("ComponentProvider","Removing Datastore"),n2.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}}class st{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new st(this.firestore,e,this._query)}}class sr extends st{constructor(e,t,r){super(e,t,new ex(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new Z(e))}withConverter(e){return new sr(this.firestore,e,this._path)}}function sn(e,t,...r){if(e=(0,l.m9)(e),n4("collection","path",t),e instanceof n7){let n=q.fromString(t,...r);return n6(n),new sr(e,null,n)}{if(!(e instanceof se||e instanceof sr))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(q.fromString(t,...r));return n6(n),new sr(e.firestore,null,n)}}function ss(e,t,...r){if(e=(0,l.m9)(e),1==arguments.length&&(t=R.A()),n4("doc","path",t),e instanceof n7){let n=q.fromString(t,...r);return n3(n),new se(e,null,new Z(n))}{if(!(e instanceof se||e instanceof sr))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(q.fromString(t,...r));return n3(n),new se(e.firestore,e instanceof sr?e.converter:null,new Z(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(){this.ma=Promise.resolve(),this.ga=[],this.ya=!1,this.pa=[],this.Ta=null,this.Ea=!1,this.Ia=!1,this.Aa=[],this.ur=new rB(this,"async_queue_retry"),this.Ra=()=>{let e=rP();e&&p("AsyncQueue","Visibility state changed to "+e.visibilityState),this.ur.er()};let e=rP();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Ra)}get isShuttingDown(){return this.ya}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pa(),this.ba(e)}enterRestrictedMode(e){if(!this.ya){this.ya=!0,this.Ia=e||!1;let t=rP();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Ra)}}enqueue(e){if(this.Pa(),this.ya)return new Promise(()=>{});let t=new I;return this.ba(()=>this.ya&&this.Ia?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.ga.push(e),this.va()))}async va(){if(0!==this.ga.length){try{await this.ga[0](),this.ga.shift(),this.ur.reset()}catch(e){if(!rr(e))throw e;p("AsyncQueue","Operation failed with retryable error: "+e)}this.ga.length>0&&this.ur.Zi(()=>this.va())}}ba(e){let t=this.ma.then(()=>(this.Ea=!0,e().catch(e=>{let t;throw this.Ta=e,this.Ea=!1,g("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.Ea=!1,e))));return this.ma=t,t}enqueueAfterDelay(e,t,r){this.Pa(),this.Aa.indexOf(e)>-1&&(t=0);let n=nl.createAndSchedule(this,e,t,r,e=>this.Va(e));return this.pa.push(n),n}Pa(){this.Ta&&v()}verifyOperationInProgress(){}async Sa(){let e;do e=this.ma,await e;while(e!==this.ma)}Da(e){for(let t of this.pa)if(t.timerId===e)return!0;return!1}Ca(e){return this.Sa().then(()=>{for(let t of(this.pa.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.pa))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Sa()})}Na(e){this.Aa.push(e)}Va(e){let t=this.pa.indexOf(e);this.pa.splice(t,1)}}class sa extends n7{constructor(e,t,r){super(e,t,r),this.type="firestore",this._queue=new si,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||su(this),this._firestoreClient.terminate()}}function so(e=(0,i.Mq)()){return(0,i.qX)(e,"firestore").getImmediate()}function sl(e){return e._firestoreClient||su(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function su(e){var t,r;let n=e._freezeSettings(),s=(r=e._databaseId,new n0(r,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n.host,n.ssl,n.experimentalForceLongPolling,n.experimentalAutoDetectLongPolling,n.useFetchStreams));e._firestoreClient=new nW(e._authCredentials,e._appCheckCredentials,e._queue,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new T(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new K(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new sc(G.fromBase64String(e))}catch(e){throw new T(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new sc(G.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new T(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new T(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return L(this._lat,e._lat)||L(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sm=/^__.*__$/;class sp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new tn(e,this.data,this.fieldMask,t,this.fieldTransforms):new tr(e,this.data,t,this.fieldTransforms)}}class sg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new tn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sy(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw v()}}class sw{constructor(e,t,r,n,s,i){this.settings=e,this.databaseId=t,this.k=r,this.ignoreUndefinedProperties=n,void 0===s&&this.ka(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get xa(){return this.settings.xa}$a(e){return new sw(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Fa(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.$a({path:r,Oa:!1});return n.Ma(e),n}La(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.$a({path:r,Oa:!1});return n.ka(),n}Ba(e){return this.$a({path:void 0,Oa:!0})}Ua(e){return s_(e,this.settings.methodName,this.settings.qa||!1,this.path,this.settings.Ka)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}ka(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ma(this.path.get(e))}Ma(e){if(0===e.length)throw this.Ua("Document fields must not be empty");if(sy(this.xa)&&sm.test(e))throw this.Ua('Document fields cannot begin and end with "__"')}}class sv{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.k=r||rq(e)}ja(e,t,r,n=!1){return new sw({xa:e,methodName:t,Ka:r,path:K.emptyPath(),Oa:!1,qa:n},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function sE(e){let t=e._freezeSettings(),r=rq(e._databaseId);return new sv(e._databaseId,!!t.ignoreUndefinedProperties,r)}class sT extends sd{_toFieldTransform(e){if(2!==e.xa)throw 1===e.xa?e.Ua(`${this._methodName}() can only appear at the top level of your update data`):e.Ua(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof sT}}function sI(e,t){if(sS(e=(0,l.m9)(e)))return sN("Unsupported field value:",t,e),sA(e,t);if(e instanceof sd)return function(e,t){if(!sy(t.xa))throw t.Ua(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Ua(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.Oa&&4!==t.xa)throw t.Ua("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let s of e){let e=sI(s,t.Ba(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){if(null===(e=(0,l.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var r,n,s;return r=t.k,"number"==typeof(s=n=e)&&Number.isInteger(s)&&!X(s)&&s<=Number.MAX_SAFE_INTEGER&&s>=Number.MIN_SAFE_INTEGER?eW(n):eQ(r,n)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=x.fromDate(e);return{timestampValue:tx(t.k,r)}}if(e instanceof x){let r=new x(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:tx(t.k,r)}}if(e instanceof sf)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof sc)return{bytesValue:tM(t.k,e._byteString)};if(e instanceof se){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Ua(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:tF(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.Ua(`Unsupported field value: ${n8(e)}`)}(e,t)}function sA(e,t){let r={};return O(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):F(e,(e,n)=>{let s=sI(n,t.Fa(e));null!=s&&(r[e]=s)}),{mapValue:{fields:r}}}function sS(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof x||e instanceof sf||e instanceof sc||e instanceof se||e instanceof sd)}function sN(e,t,r){if(!sS(r)||!("object"==typeof r&&null!==r&&(Object.getPrototypeOf(r)===Object.prototype||null===Object.getPrototypeOf(r)))){let n=n8(r);throw"an object"===n?t.Ua(e+" a custom object"):t.Ua(e+" "+n)}}function sb(e,t,r){if((t=(0,l.m9)(t))instanceof sh)return t._internalPath;if("string"==typeof t)return sC(e,t);throw s_("Field path arguments must be of type string or FieldPath.",e,!1,void 0,r)}let sk=RegExp("[~\\*/\\[\\]]");function sC(e,t,r){if(t.search(sk)>=0)throw s_(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new sh(...t.split("."))._internalPath}catch(n){throw s_(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function s_(e,t,r,n,s){let i=n&&!n.isEmpty(),a=void 0!==s,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new T(E.INVALID_ARGUMENT,o+e+l)}function sD(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sR{constructor(e,t,r,n,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new sL(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(sV("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sL extends sR{data(){return super.data()}}function sV(e,t){return"string"==typeof t?sC(e,t):t instanceof sh?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sM extends sR{constructor(e,t,r,n,s,i){super(e,t,r,n,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new sU(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(sV("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sU extends sM{data(e={}){return super.data(e)}}class sF{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new sx(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new sU(this._firestore,this._userDataWriter,r.key,r,new sx(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new T(E.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>({type:"added",doc:new sU(e._firestore,e._userDataWriter,r.doc.key,r.doc,new sx(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter),oldIndex:-1,newIndex:t++}))}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new sU(e._firestore,e._userDataWriter,t.doc.key,t.doc,new sx(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),s=-1,i=-1;return 0!==t.type&&(s=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(i=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}(t.type),doc:n,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}class sO{}function sP(e,...t){for(let r of t)e=r._apply(e);return e}class sq extends sO{constructor(e,t,r){super(),this.Ga=e,this.za=t,this.Ha=r,this.type="where"}_apply(e){let t=sE(e.firestore),r=function(e,t,r,n,s,i,a){let o;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new T(E.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){s$(a,i);let t=[];for(let r of a)t.push(sK(n,e,r));o={arrayValue:{values:t}}}else o=sK(n,e,a)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||s$(a,i),o=function(e,t,r,n=!1){return sI(r,e.ja(n?4:3,t))}(r,t,a,"in"===i||"not-in"===i);let l=eE.create(s,i,o);return function(e,t){if(t.V()){let r=eO(e);if(null!==r&&!r.isEqual(t.field))throw new T(E.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${t.field.toString()}'`);let n=eF(e);null!==n&&function(e,t,r){if(!r.isEqual(t))throw new T(E.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${r.toString()}' instead.`)}(0,t.field,n)}let r=function(e,t){for(let r of e.filters)if(t.indexOf(r.op)>=0)return r.op;return null}(e,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new T(E.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new T(E.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}(e,l),l}(e._query,"where",t,e.firestore._databaseId,this.Ga,this.za,this.Ha);return new st(e.firestore,e.converter,function(e,t){let r=e.filters.concat([t]);return new ex(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}(e._query,r))}}function sB(e,t,r){return new sq(sV("where",e),t,r)}function sK(e,t,r){if("string"==typeof(r=(0,l.m9)(r))){if(""===r)throw new T(E.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!eP(t)&&-1!==r.indexOf("/"))throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(q.fromString(r));if(!Z.isDocumentKey(n))throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ea(e,new Z(n))}if(r instanceof se)return ea(e,r._key);throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${n8(r)}.`)}function s$(e,t){if(!Array.isArray(e)||0===e.length)throw new T(E.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`);if(e.length>10)throw new T(E.INVALID_ARGUMENT,`Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sG{convertValue(e,t="none"){switch(ee(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Q(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(W(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw v()}}convertObject(e,t){let r={};return F(e.fields,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertGeoPoint(e){return new sf(Q(e.latitude),Q(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=function e(t){let r=t.mapValue.fields.__previous_value__;return H(r)?e(r):r}(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Y(e));default:return null}}convertTimestamp(e){let t=j(e);return new x(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=q.fromString(e);tH(r)||v();let n=new n1(r.get(1),r.get(3)),s=new Z(r.popFirst(5));return n.isEqual(t)||g(`Document ${s} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}class sz extends sG{constructor(e){super(),this.firestore=e}convertBytes(e){return new sc(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}function sj(e){e=n9(e,st);let t=n9(e.firestore,sa),r=sl(t),n=new sz(t);return(/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(eU(e)&&0===e.explicitOrderBy.length)throw new T(E.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query),(function(e,t,r={}){let n=new I;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,s){let i=new nE(r,new nQ({next:r=>{t.enqueueAndForget(()=>ng(e,i)),r.fromCache&&"server"===n.source?s.reject(new T(E.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(r)},error:e=>s.reject(e)}),{includeMetadataChanges:!0,wo:!0});return np(e,i)})(await nZ(e),e.asyncQueue,t,r,n)),n.promise})(r,e._query).then(r=>new sF(t,n,e,r)))}function sQ(e,t,r,...n){e=n9(e,se);let s=n9(e.firestore,sa),i=sE(s);return sH(s,[("string"==typeof(t=(0,l.m9)(t))||t instanceof sh?function(e,t,r,n,s,i){let a=e.ja(1,t,r),o=[sb(t,n,r)],u=[s];if(i.length%2!=0)throw new T(E.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)o.push(sb(t,i[e])),u.push(i[e+1]);let h=[],c=ef.empty();for(let e=o.length-1;e>=0;--e)if(!sD(h,o[e])){let t=o[e],r=u[e];r=(0,l.m9)(r);let n=a.La(t);if(r instanceof sT)h.push(t);else{let e=sI(r,n);null!=e&&(h.push(t),c.set(t,e))}}return new sg(c,new $(h),a.fieldTransforms)}(i,"updateDoc",e._key,t,r,n):function(e,t,r,n){let s=e.ja(1,t,r);sN("Data must be an object, but it was:",s,n);let i=[],a=ef.empty();return F(n,(e,n)=>{let o=sC(t,e,r);n=(0,l.m9)(n);let u=s.La(o);if(n instanceof sT)i.push(o);else{let e=sI(n,u);null!=e&&(i.push(o),a.set(o,e))}}),new sg(a,new $(i),s.fieldTransforms)}(i,"updateDoc",e._key,t)).toMutation(e._key,e8.exists(!0))])}function sW(e,t){var r,n;let s=n9(e.firestore,sa),i=ss(e),a=(r=e.converter)?n&&(n.merge||n.mergeFields)?r.toFirestore(t,n):r.toFirestore(t):t;return sH(s,[(function(e,t,r,n,s,i={}){let a,o;let l=e.ja(i.merge||i.mergeFields?2:0,t,r,s);sN("Data must be an object, but it was:",l,n);let u=sA(n,l);if(i.merge)a=new $(l.fieldMask),o=l.fieldTransforms;else if(i.mergeFields){let e=[];for(let n of i.mergeFields){let s=sb(t,n,r);if(!l.contains(s))throw new T(E.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);sD(e,s)||e.push(s)}a=new $(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new sp(new ef(u),a,o)})(sE(e.firestore),"addDoc",i._key,a,null!==e.converter,{}).toMutation(i._key,e8.exists(!1))]).then(()=>i)}function sH(e,t){return function(e,t){let r=new I;return e.asyncQueue.enqueueAndForget(async()=>nD(await nX(e).then(e=>e.syncEngine),t,r)),r.promise}(sl(e),t)}!function(e,t=!0){d=i.Jn,(0,i.Xd)(new a.wA("firestore",(e,{options:r})=>{let n=new sa(e.getProvider("app").getImmediate(),new N(e.getProvider("auth-internal")),new _(e.getProvider("app-check-internal")));return r=Object.assign({useFetchStreams:t},r),n._setSettings(r),n},"PUBLIC")),(0,i.KN)(h,"3.4.0",void 0),(0,i.KN)(h,"3.4.0","esm2017")}()}}]);