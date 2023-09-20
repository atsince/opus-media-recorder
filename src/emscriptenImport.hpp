#ifndef EMSCRIPTEN_IMPORT_H_
#define EMSCRIPTEN_IMPORT_H_

#include <emscripten.h>
#include <cstdint>

EM_JS(void, emscriptenPushBuffer, (const void* buf, int len), {
  // Create a Typed Array
  let array = new Uint8Array(Module.HEAPU8.buffer, buf, len);
  console.log(array);
  //TODO 这里可以减少一次copy？？？
  // Then copy and queue
  Module.encodedBuffers.push(new Uint8Array(array).buffer);
});

#endif /* EMSCRIPTEN_IMPORT_H_ */
