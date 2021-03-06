export default class Reader {
    constructor(buffer, TextDecoder) {
        this.buffer = buffer;
        this.dataView = new DataView(buffer);
        if (TextDecoder) this.textDecoder = new TextDecoder('utf-8');
        this.offset = 0;
    }

    getUint32() {
        const val = this.dataView.getUint32(this.offset, true);
        this.offset += 4;
        return val;
    }

    getFloat32() {
        const val = this.dataView.getFloat32(this.offset, true);
        this.offset += 4;
        return val;
    }

    getFloat64() {
        const val = this.dataView.getFloat64(this.offset, true);
        this.offset += 8;
        return val;
    }

    getUint8() {
        return this.dataView.getUint8(this.offset++, true);
    }

    /*
    For the hex impaired:
    80   40  20  10   8   4   2   1 (hex value)
    128  64  32  16   8   4   2   1 (decimal value)
    8    7   6   5    4   3   2   1 (bit position)
    */

    // https://en.wikipedia.org/wiki/LEB128
    readVarUint() {
        let [val, count, byte] = [0, 0, 0];
        do {
            byte = this.dataView.getUint8(this.offset + count);
            val |= (byte & 0x7F) << (count++ * 7);
        } while (byte & 0x80);
        this.offset += count;
        return parseInt(val);
    }

    readVarInt() {
        let [val, count, byte, mask] = [0, 0, 0, 0];
        do {
            byte = this.dataView.getUint8(this.offset + count);
            const lastByte = !(byte & 0x80);
            const negative = lastByte && !!(byte & 0x40);
            const significant = lastByte ? 0x3F : 0x7F;
            mask |= (0xFF & significant) << (count * 7);
            val |= (byte & significant) << (count * 7);
            if (negative) {
                val = (((val ^ mask) & mask) + 1) * -1;
            }
            count++;
        } while (byte & 0x80);
        this.offset += count;
        return val;
    }

    readVarInt64(acc = [0x00, 0x00], idx = 0) {
        const byte = this.dataView.getUint8(this.offset + idx);
        const more = !!(byte & 0x80);
        const significant = more ? 0x7F : 0x3F;
        const bits = byte & significant;
        if (idx < 4) {
            acc[1] |= bits << (idx * 7);
        }
        if (idx === 4) {
            acc[1] |= (bits & 0x7) << (idx * 7);
            if (bits & 0x8) acc[1] += 0x80000000;
            acc[0] |= (bits >> 4);
        }
        if (idx > 4) {
            acc[0] |= bits << ((idx - 5) * 7 + 4);
        }
        if (more === false) {
            this.offset += idx + 1;
            const negative = !!(byte & 0x40);
            if (negative) throw new Error('TODO!');
            return acc;
        }
        return this.readVarInt64(acc, idx + 1);
    }

    readString(len) {
        const bytes = this.readBytes(len);
        const str = this.textDecoder.decode(bytes);
        return str;
    }

    readBytes(len) {
        const bytes = this.buffer.slice(this.offset, this.offset + len);
        this.offset += len;
        return bytes;
    }

    get available() {
        return this.offset < this.dataView.byteLength;
    }
}