const notImplemented = () => { throw new Error('Not implemented') };

export default {
    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#control-flow-operators-described-here
    '0x00': notImplemented,
    '0x01': r => ({ op: 'nop' }),
    '0x02': r => ({ op: 'block', type: r.readVarUint() }),
    '0x03': notImplemented,
    '0x04': r => ({ op: 'if', type: r.readVarInt() }),
    '0x05': notImplemented,
    '0x0b': r => ({ op: 'end' }),
    '0x0c': notImplemented,
    '0x0d': notImplemented,
    '0x0e': notImplemented,
    '0x0f': r => ({ op: 'return' }),

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#call-operators-described-here
    '0x10': r => ({ op: 'call', functionIndex: r.readVarUint() }),
    '0x11': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#parametric-operators-described-here
    '0x1a': notImplemented,
    '0x1b': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#variable-access-described-here
    '0x20': r => ({ op: 'get_local', localIndex: r.readVarUint() }),
    '0x21': r => ({ op: 'set_local', localIndex: r.readVarUint() }),
    '0x22': notImplemented,
    '0x23': r => ({ op: 'get_global', globalIndex: r.readVarUint() }),
    '0x24': r => ({ op: 'set_global', globalIndex: r.readVarUint() }),

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#memory-related-operators-described-here
    '0x28': notImplemented,
    '0x29': notImplemented,
    '0x2a': notImplemented,
    '0x2b': notImplemented,
    '0x2c': notImplemented,
    '0x2d': notImplemented,
    '0x2e': notImplemented,
    '0x2f': notImplemented,
    '0x30': notImplemented,
    '0x31': notImplemented,
    '0x32': notImplemented,
    '0x33': notImplemented,
    '0x34': notImplemented,
    '0x35': notImplemented,
    '0x36': notImplemented,
    '0x37': notImplemented,
    '0x38': notImplemented,
    '0x39': notImplemented,
    '0x3a': notImplemented,
    '0x3b': notImplemented,
    '0x3c': notImplemented,
    '0x3d': notImplemented,
    '0x3e': notImplemented,
    '0x3f': notImplemented,
    '0x40': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#constants-described-here
    '0x41': r => ({ op: 'i32.const', value: r.readVarInt() }),
    '0x42': notImplemented,
    '0x43': r => ({ op: 'f32.const', value: r.getFloat32() }),
    '0x44': r => ({ op: 'f64.const', value: r.getFloat64() }),

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#comparison-operators-described-here
    '0x45': notImplemented,
    '0x46': notImplemented,
    '0x47': notImplemented,
    '0x48': notImplemented,
    '0x49': notImplemented,
    '0x4a': notImplemented,
    '0x4b': notImplemented,
    '0x4c': notImplemented,
    '0x4d': notImplemented,
    '0x4e': r => ({ op: 'i32.ge_s' }),
    '0x4f': notImplemented,
    '0x50': notImplemented,
    '0x51': notImplemented,
    '0x52': notImplemented,
    '0x53': notImplemented,
    '0x54': notImplemented,
    '0x55': notImplemented,
    '0x56': notImplemented,
    '0x57': notImplemented,
    '0x58': notImplemented,
    '0x59': notImplemented,
    '0x5a': notImplemented,
    '0x5b': notImplemented,
    '0x5c': notImplemented,
    '0x5d': notImplemented,
    '0x5e': notImplemented,
    '0x5f': notImplemented,
    '0x60': notImplemented,
    '0x61': notImplemented,
    '0x62': notImplemented,
    '0x63': notImplemented,
    '0x64': notImplemented,
    '0x65': notImplemented,
    '0x66': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#numeric-operators-described-here
    '0x67': notImplemented,
    '0x68': notImplemented,
    '0x69': notImplemented,
    '0x6a': r => ({ op: 'i32.add' }),
    '0x6b': r => ({ op: 'i32.sub' }),
    '0x6c': r => ({ op: 'i32.mul' }),
    '0x6d': r => ({ op: 'i32.div_s' }),
    '0x6e': r => ({ op: 'i32.div_u' }),
    '0x6f': notImplemented,
    '0x70': notImplemented,
    '0x71': r => ({ op: 'i32.and' }),
    '0x72': notImplemented,
    '0x73': notImplemented,
    '0x74': notImplemented,
    '0x75': notImplemented,
    '0x76': notImplemented,
    '0x77': notImplemented,
    '0x78': notImplemented,
    '0x79': notImplemented,
    '0x7a': notImplemented,
    '0x7b': notImplemented,
    '0x7c': notImplemented,
    '0x7d': notImplemented,
    '0x7e': notImplemented,
    '0x7f': notImplemented,
    '0x80': notImplemented,
    '0x81': notImplemented,
    '0x82': notImplemented,
    '0x83': notImplemented,
    '0x84': notImplemented,
    '0x85': notImplemented,
    '0x86': notImplemented,
    '0x87': notImplemented,
    '0x88': notImplemented,
    '0x89': notImplemented,
    '0x8a': notImplemented,
    '0x8b': notImplemented,
    '0x8c': notImplemented,
    '0x8d': notImplemented,
    '0x8e': notImplemented,
    '0x8f': notImplemented,
    '0x90': notImplemented,
    '0x91': notImplemented,
    '0x92': notImplemented,
    '0x93': notImplemented,
    '0x94': notImplemented,
    '0x95': notImplemented,
    '0x96': notImplemented,
    '0x97': notImplemented,
    '0x98': notImplemented,
    '0x99': notImplemented,
    '0x9a': notImplemented,
    '0x9b': notImplemented,
    '0x9c': notImplemented,
    '0x9d': notImplemented,
    '0x9e': notImplemented,
    '0x9f': notImplemented,
    '0xa0': notImplemented,
    '0xa1': notImplemented,
    '0xa2': notImplemented,
    '0xa3': notImplemented,
    '0xa4': notImplemented,
    '0xa5': notImplemented,
    '0xa6': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#conversions-described-here
    '0xa7': notImplemented,
    '0xa8': notImplemented,
    '0xa9': notImplemented,
    '0xaa': notImplemented,
    '0xab': notImplemented,
    '0xac': notImplemented,
    '0xad': notImplemented,
    '0xae': notImplemented,
    '0xaf': notImplemented,
    '0xb0': notImplemented,
    '0xb1': notImplemented,
    '0xb2': notImplemented,
    '0xb3': notImplemented,
    '0xb4': notImplemented,
    '0xb5': notImplemented,
    '0xb6': notImplemented,
    '0xb7': notImplemented,
    '0xb8': notImplemented,
    '0xb9': notImplemented,
    '0xba': notImplemented,
    '0xbb': notImplemented,

    // https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md#reinterpretations-described-here
    '0xbc': notImplemented,
    '0xbd': notImplemented,
    '0xbe': notImplemented,
    '0xbf': notImplemented
}