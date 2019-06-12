class ByteBuf {
    constructor() {
        this.buffers = [];
    }
    
    push(buf) {
        for (let i = 0; i < buf.length; i++) {
            this.buffers.push(buf[i]);
        }
    }

    toUint8Array() {
        let uint8Array = new Uint8Array(this.buffers.length);
        for (let i = 0; i < this.buffers.length; i++) {
            uint8Array[i] = this.buffers[i];
        }
        return uint8Array;
    }
}