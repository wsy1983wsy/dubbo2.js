import * as debug from 'debug';

const log = debug('dubbo:heartbeat');

//dubbo的序列化协议
//com.alibaba.dubbo.remoting.exchange.codec.ExchangeCodec
//encodeRequest

//header length
const DUBBO_HEDER_LENGTH = 16;
// magic header.
const DUBBO_MAGIC_HEADER = 0xdabb;
// message flag.
const FLAG_REQUST = 0x80;
const FLAG_TWOWAY = 0x40;
const FLAG_EVENT = 0x20;

//com.alibaba.dubbo.common.serialize.support.hessian.Hessian2Serialization中定义
const HESSIAN2_SERIALIZATION_CONTENT_ID = 2;

export default class HeartBeat {
  static encode(): Buffer {
    log('encode heartbeat');

    const buffer = Buffer.alloc(DUBBO_HEDER_LENGTH + 1);

    //magic header
    buffer[0] = DUBBO_MAGIC_HEADER >>> 8;
    buffer[1] = DUBBO_MAGIC_HEADER & 0xff;

    // set request and serialization flag.
    buffer[2] =
      FLAG_REQUST |
      HESSIAN2_SERIALIZATION_CONTENT_ID |
      FLAG_TWOWAY |
      FLAG_EVENT;

    //set request id
    //暂时不设置

    //set body length
    buffer[15] = 1;

    //body new Hessian.EncoderV2().write(null);
    buffer[16] = 0x4e;

    return buffer;
  }

  //com.alibaba.dubbo.remoting.exchange.codec.ExchangeCodec.decodeBody
  static isHeartBeat(buf) {
    //获取标记位
    const flag = buf[2];
    return (flag & FLAG_EVENT) !== 0;
  }
}
