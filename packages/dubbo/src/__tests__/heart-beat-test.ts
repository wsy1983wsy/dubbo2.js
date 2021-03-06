/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2017/12/4
 **/

import HeartBeat from '../heartbeat';

//参考issue http://git.dev.qianmi.com/QMFE/dubbo/issues/2
it('心跳值测试e2', () => {
  const buffer = Buffer.from([
    0xda,
    0xbb,
    0xe2,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x05,
    0x00,
    0x00,
    0x00,
    0x01,
    0x4e,
  ]);
  expect(HeartBeat.isHeartBeat(buffer)).toBe(true);

  //mock数据
  const buffer2 = Buffer.from([
    0xda,
    0xbb,
    0x02,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x05,
    0x00,
    0x00,
    0x00,
    0x01,
    0x4e,
  ]);
  expect(HeartBeat.isHeartBeat(buffer2)).toBe(false);
});


it('心跳值检测',()=>{
    let buffer = HeartBeat.encode();
    expect(buffer).toEqual(Buffer.from([0xda, 0xbb ,0xe2 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x00 ,0x01 ,0x4e]))
});
