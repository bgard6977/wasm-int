const notImplemented = () => {
    throw new Error('Not implemented')
};

/*
    i = instruction,
    s = stack,
    l = locals,
    g = globals,
    m = memory
*/
export default {
    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#control-flow-operators-described-here
    'unreachable': notImplemented,
    'nop': notImplemented,
    // 'block' handled in WasmInterpreter
    // 'loop' handled in WasmInterpreter
    // 'if' handled in WasmInterpreter
    // 'else' handled in WasmInterpreter
    // 'end' handled in WasmInterpreter
    // 'br' handled in WasmInterpreter
    'br_if': notImplemented,
    'br_table': notImplemented,
    // 'return' handled in WasmInterpreter

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#call-operators-described-here
    // 'call' handled in WasmInterpreter
    'call_indirect': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#parametric-operators-described-here
    'drop': (i, s, l, g) => s.pop(),
    'select': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#variable-access-described-here
    'get_local': (i, s, l, g) => {
        const a = l[i.localIndex];
        console.log(`get_local $l${i.localIndex} == ${a}`);
        s.push(a);
    },
    'set_local': (i, s, l, g) => {
        const a = s.pop();
        console.log(`set_local $l${i.localIndex}=${a}`);
        l[i.localIndex] = a;
    },
    'tee_local': notImplemented,
    'get_global': (i, s, l, g) => s.push(g[i.globalIndex]),
    'set_global': (i, s, l, g) => {
        const a = s.pop();
        console.log(`set_global $g${i.globalIndex}=${a}`);
        g[i.globalIndex] = a;
    },

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#memory-related-operators-described-here
    'i32.load': (i, s, l, g, m) => {
        const ptr = s.pop() + i.offset; // TODO: align to i.flags
        const val = m.getInt32(ptr);
        console.log(`i32.load ${val} == mem[${ptr}]`);
        s.push(val);
    },
    'i64.load': notImplemented,
    'f32.load': notImplemented,
    'f64.load': notImplemented,
    'i32.load8_s': notImplemented,
    'i32.load8_u': notImplemented,
    'i32.load16_s': notImplemented,
    'i32.load16_u': notImplemented,
    'i64.load8_s': notImplemented,
    'i64.load8_u': notImplemented,
    'i64.load16_s': notImplemented,
    'i64.load16_u': notImplemented,
    'i64.load32_s': notImplemented,
    'i64.load32_u': notImplemented,
    'i32.store': (i, s, l, g, m) => {
        const val = s.pop();
        const ptr = s.pop() + i.offset; // TODO: align to i.flags
        console.log(`i32.store mem[${ptr}] = ${val}`);
        val < 0 ? m.setInt32(ptr, val) : m.setUint32(ptr, val);
    },
    'i64.store': notImplemented,
    'f32.store': notImplemented,
    'f64.store': notImplemented,
    'i32.store8': notImplemented,
    'i32.store16': notImplemented,
    'i64.store8': notImplemented,
    'i64.store16': notImplemented,
    'i64.store32': notImplemented,
    'current_memory': notImplemented,
    'grow_memory': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#constants-described-here
    'i32.const': (i, s, l, g) => s.push(i.value),
    'i64.const': (i, s, l, g) => s.push(i.value),
    'f32.const': (i, s, l, g) => s.push(i.value),
    'f64.const': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#comparison-operators-described-here
    'i32.eqz': (i, s, l, g) => {
        const a = s.pop();
        console.log('i32.eqz', a);
        s.push(a === 0 ? 1 : 0)
    },
    'i32.eq': (i, s, l, g) => s.push(s.pop() === s.pop() ? 1 : 0),
    'i32.ne': (i, s, l, g) => s.push(s.pop() === s.pop() ? 0 : 1),
    'i32.lt_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        console.log('int32.lt_s', a, b, a < b ? 1 : 0);
        s.push(a < b ? 1 : 0)
    },
    'i32.lt_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a < b ? 1 : 0)
    },
    'i32.gt_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a > b ? 1 : 0)
    },
    'i32.gt_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a > b ? 1 : 0)
    },
    'i32.le_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a <= b ? 1 : 0)
    },
    'i32.le_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a <= b ? 1 : 0)
    },
    'i32.ge_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a >= b ? 1 : 0)
    },
    'i32.ge_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a >= b ? 1 : 0)
    },

    'i64.eqz': notImplemented,
    'i64.eq': notImplemented,
    'i64.ne': notImplemented,
    'i64.lt_s': notImplemented,
    'i64.lt_u': notImplemented,
    'i64.gt_s': notImplemented,
    'i64.gt_u': notImplemented,
    'i64.le_s': notImplemented,
    'i64.le_u': notImplemented,
    'i64.ge_s': notImplemented,
    'i64.ge_u': notImplemented,

    'f32.eq': notImplemented,
    'f32.ne': notImplemented,
    'f32.lt': notImplemented,
    'f32.gt': notImplemented,
    'f32.le': notImplemented,
    'f32.ge': notImplemented,

    'f64.eq': notImplemented,
    'f64.ne': notImplemented,
    'f64.lt': notImplemented,
    'f64.gt': notImplemented,
    'f64.le': notImplemented,
    'f64.ge': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#numeric-operators-described-here
    'i32.clz': notImplemented,
    'i32.ctz': notImplemented,
    'i32.popcnt': notImplemented,
    'i32.add': (i, s, l, g) => s.push(s.pop() + s.pop()),
    'i32.sub': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a - b)
    },
    'i32.mul': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        const c = a * b;
        console.log(`i32.mul ${c}=${a}*${b}`);
        s.push(c);
    },
    'i32.div_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a / b)
    },
    'i32.div_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a / b)
    },
    'i32.rem_s': notImplemented,
    'i32.rem_u': notImplemented,
    'i32.and': (i, s, l, g) => s.push(s.pop() & s.pop()),
    'i32.or': (i, s, l, g) => s.push(s.pop() | s.pop()),
    'i32.xor': (i, s, l, g) => s.push(s.pop() ^ s.pop()),
    'i32.shl': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a << b)
    },
    'i32.shr_s': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a >> b)
    },
    'i32.shr_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        s.push(a >> b)
    },
    'i32.rotl': notImplemented,
    'i32.rotr': notImplemented,

    'i64.clz': notImplemented,
    'i64.ctz': notImplemented,
    'i64.popcnt': notImplemented,
    'i64.add': notImplemented,
    'i64.sub': notImplemented,
    'i64.mul': notImplemented,
    'i64.div_s': notImplemented,
    'i64.div_u': notImplemented,
    'i64.rem_s': notImplemented,
    'i64.rem_u': notImplemented,
    'i64.and': notImplemented,
    'i64.or': notImplemented,
    'i64.xor': notImplemented,
    'i64.shl': notImplemented,
    'i64.shr_s': notImplemented,
    'i64.shr_u': (i, s, l, g) => {
        const [b, a] = [s.pop(), s.pop()];
        if (b[0] === 0 && b[1] === 32) {
            s.push([0, a[0]]);
        } else {
            throw new Error('TODO');
        }
    },
    'i64.rotl': notImplemented,
    'i64.rotr': notImplemented,

    'f32.abs': notImplemented,
    'f32.neg': notImplemented,
    'f32.ceil': notImplemented,
    'f32.floor': notImplemented,
    'f32.trunc': notImplemented,
    'f32.nearest': notImplemented,
    'f32.sqrt': notImplemented,
    'f32.add': notImplemented,
    'f32.sub': notImplemented,
    'f32.mul': notImplemented,
    'f32.div': notImplemented,
    'f32.min': notImplemented,
    'f32.max': notImplemented,
    'f32.copysign': notImplemented,

    'f64.abs': notImplemented,
    'f64.neg': notImplemented,
    'f64.ceil': notImplemented,
    'f64.floor': notImplemented,
    'f64.trunc': notImplemented,
    'f64.nearest': notImplemented,
    'f64.sqrt': notImplemented,
    'f64.add': notImplemented,
    'f64.sub': notImplemented,
    'f64.mul': notImplemented,
    'f64.div': notImplemented,
    'f64.min': notImplemented,
    'f64.max': notImplemented,
    'f64.copysign': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#conversions-described-here
    'i32.wrap/i64': (i, s, l, g) => s.push(s.pop()[1]),
    'i32.trunc_s/f32': notImplemented,
    'i32.trunc_u/f32': notImplemented,
    'i32.trunc_s/f64': notImplemented,
    'i32.trunc_u/f64': notImplemented,

    'i64.extend_s/i32': notImplemented,
    'i64.extend_u/i32': notImplemented,
    'i64.trunc_s/f32': notImplemented,
    'i64.trunc_u/f32': notImplemented,
    'i64.trunc_s/f64': notImplemented,
    'i64.trunc_u/f64': notImplemented,

    'f32.convert_s/i32': notImplemented,
    'f32.convert_u/i32': notImplemented,
    'f32.convert_s/i64': notImplemented,
    'f32.convert_u/i64': notImplemented,
    'f32.demote/f64': notImplemented,

    'f64.convert_s/i32': notImplemented,
    'f64.convert_u/i32': notImplemented,
    'f64.convert_s/i64': notImplemented,
    'f64.convert_u/i64': notImplemented,
    'f64.promote/f32': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#reinterpretations-described-here
    'i32.reinterpret/f32': notImplemented,
    'i64.reinterpret/f64': notImplemented,
    'f32.reinterpret/i32': notImplemented,
    'f64.reinterpret/i64': notImplemented,
}