/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var isPositiveZerof = require( '@stdlib/math-base-assert-is-positive-zerof' );
var Float32Array = require( '@stdlib/array-float32' );
var tryRequire = require( '@stdlib/utils-try-require' );


// VARIABLES //

var snanrange = tryRequire( resolve( __dirname, './../lib/ndarray.native.js' ) );
var opts = {
	'skip': ( snanrange instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof snanrange, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has an arity of 4', opts, function test( t ) {
	t.strictEqual( snanrange.length, 4, 'has expected arity' );
	t.end();
});

tape( 'the function calculates the range of a strided array', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array( [ 1.0, -2.0, -4.0, NaN, 5.0, 0.0, 3.0 ] );
	v = snanrange( x.length, x, 1, 0 );
	t.strictEqual( v, 9.0, 'returns expected value' );

	x = new Float32Array( [ -4.0, NaN, -5.0 ] );
	v = snanrange( x.length, x, 1, 0 );
	t.strictEqual( v, 1.0, 'returns expected value' );

	x = new Float32Array( [ -0.0, 0.0, NaN, -0.0 ] );
	v = snanrange( x.length, x, 1, 0 );
	t.strictEqual( isPositiveZerof( v ), true, 'returns expected value' );

	x = new Float32Array( [ NaN ] );
	v = snanrange( x.length, x, 1, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	x = new Float32Array( [ NaN, NaN ] );
	v = snanrange( x.length, x, 1, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided an `N` parameter less than or equal to `0`, the function returns `NaN`', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = snanrange( 0, x, 1, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	v = snanrange( -1, x, 1, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided an `N` parameter equal to `1`, the function returns `0` or `NaN`', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = snanrange( 1, x, 1, 0 );
	t.strictEqual( v, 0.0, 'returns expected value' );

	x = new Float32Array( [ NaN, -2.0, -4.0, 5.0, 3.0 ] );

	v = snanrange( 1, x, 1, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function supports a `stride` parameter', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array([
		1.0,  // 0
		2.0,
		2.0,  // 1
		-7.0,
		-2.0, // 2
		3.0,
		4.0,  // 3
		2.0,
		NaN,  // 4
		NaN
	]);

	v = snanrange( 5, x, 2, 0 );

	t.strictEqual( v, 6.0, 'returns expected value' );
	t.end();
});

tape( 'the function supports a negative `stride` parameter', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array([
		NaN,  // 4
		NaN,
		1.0,  // 3
		2.0,
		2.0,  // 2
		-7.0,
		-2.0, // 1
		3.0,
		4.0,  // 0
		2.0
	]);

	v = snanrange( 5, x, -2, 8 );

	t.strictEqual( v, 6.0, 'returns expected value' );
	t.end();
});

tape( 'if provided a `stride` parameter equal to `0`, the function returns `0` or `NaN`', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = snanrange( x.length, x, 0, 0 );
	t.strictEqual( v, 0.0, 'returns expected value' );

	x = new Float32Array( [ NaN, -2.0, -4.0, 5.0, 3.0 ] );

	v = snanrange( x.length, x, 0, 0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function supports an `offset` parameter', opts, function test( t ) {
	var x;
	var v;

	x = new Float32Array([
		2.0,
		1.0,  // 0
		2.0,
		-2.0, // 1
		-2.0,
		2.0,  // 2
		3.0,
		4.0,  // 3
		NaN,
		NaN   // 4
	]);

	v = snanrange( 5, x, 2, 1 );
	t.strictEqual( v, 6.0, 'returns expected value' );

	t.end();
});
