
yarn run build 编译通过。。。
报错：
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
    + 2 hidden modules


ERROR in ./build/OggOpusEncoder.js
Module not found: Error: Can't resolve 'fs' in '/Users/liyong/Downloads/97_ts_project/media_record/build'
 @ ./build/OggOpusEncoder.js 358:15-28
 @ ./build/encoderWorker.js


ERROR in ./build/WebMOpusEncoder.js
Module not found: Error: Can't resolve 'fs' in '/Users/liyong/Downloads/97_ts_project/media_record/build'
 @ ./build/WebMOpusEncoder.js 358:15-28
 @ ./build/encoderWorker.js
make: *** [/Users/liyong/Downloads/97_ts_project/media_record/build/encoderWorker.umd.js] Error 2
error Command failed with exit code 2.

解决：
package.json中添加
"browser": {
  "fs": false,
  "path": false,
  "os": false
}

https://stackoverflow.com/questions/57161839/module-not-found-error-cant-resolve-fs-error-solved

报错：
node:internal/crypto/hash:71
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^


Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:140:10)
    at module.exports (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/liyong/Downloads/97_ts_project/media_record/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/liyong/Downloads/97_ts_project/media_record/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/liyong/Downloads/97_ts_project/media_record/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /Users/liyong/Downloads/97_ts_project/media_record/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at context.callback (/Users/liyong/Downloads/97_ts_project/media_record/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /Users/liyong/Downloads/97_ts_project/media_record/node_modules/babel-loader/lib/index.js:59:71
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}


Node.js v19.7.0
make: *** [/Users/liyong/Downloads/97_ts_project/media_record/build/OpusMediaRecorder.umd.js] Error 1
error Command failed with exit code 2.
解决：
命令行执行
export NODE_OPTIONS=--openssl-legacy-provider
https://stackoverflow.com/questions/75167770/error-error0308010cdigital-envelope-routinesunsupported-node-js-v19-4-0



报错：
error: DISABLE_EXCEPTION_THROWING was set (likely due to -fno-exceptions), which means no C++ exception throwing support code is linked in, but such support is required by symbol '__cxa_throw'. Either do not set DISABLE_EXCEPTION_THROWING (if you do want exception throwing) or compile all source files with -fno-except (so that no exceptions support code is required); also make sure DISABLE_EXCEPTION_CATCHING is set to the right value - if you want exceptions, it should be off, and vice versa.
。。。。。
。。。。。
Error: Aborting compilation due to previous errors
emcc: error: '/Users/liyong/emsdk/node/16.20.0_64bit/bin/node /Users/liyong/emsdk/upstream/emscripten/src/compiler.js /var/folders/wx/32pw1t9959q25440xlzc4vqm0000gn/T/tmp0zfax5w8.json' failed (returned 1)
make: *** [/Users/liyong/Downloads/97_ts_project/media_record/build/WebMOpusEncoder.js] Error 1
error Command failed with exit code 2.


解决：
makefile 中 去掉
-fno-except

--------------------------------------------------------------------------------

Type "make; make install" to compile and install Speex
emmake make -C speexdsp
make: make -C speexdsp
/Applications/Xcode.app/Contents/Developer/usr/bin/make  all-recursive
Making all in libspeexdsp
  CC       preprocess.lo
  CC       jitter.lo
  CC       mdf.lo
  CC       fftwrap.lo
  CC       filterbank.lo
  CC       resample.lo
In file included from resample.c:104:
./resample_neon.h:134:12: error: unknown register name 'q0' in asm
  134 |          : "q0");
      |            ^
./resample_neon.h:195:13: error: invalid output constraint '+l' in asm
  195 |                     [len] "+l" (len), [remainder] "+l" (remainder)
      |                           ^
2 errors generated.

emcc: error: '/Users/liyong/emsdk/upstream/bin/clang -target wasm32-unknown-emscripten -fignore-exceptions -mllvm -combiner-global-alias-analysis=false -mllvm -enable-emscripten-sjlj -mllvm -disable-lsr -DEMSCRIPTEN -Werror=implicit-function-declaration --sysroot=/Users/liyong/emsdk/upstream/emscripten/cache/sysroot -Xclang -iwithsysroot/include/fakesdl -Xclang -iwithsysroot/include/compat -DHAVE_CONFIG_H -I. -I.. -I../include -I../include/speex -I.. -g3 -O2 -fvisibility=hidden -MT resample.lo -MD -MP -MF .deps/resample.Tpo -c -fno-common -DPIC resample.c -o .libs/resample.o' failed (returned 1)
make[4]: *** [resample.lo] Error 1
make[3]: *** [all-recursive] Error 1
make[2]: *** [all] Error 2
emmake: error: 'make -C speexdsp' failed (returned 2)
make[1]: *** [speexdsp/libspeexdsp/.libs/libspeexdsp.a] Error 1
make: *** [/Users/liyong/Downloads/97_ts_project/media_record/build/emscripten/libspeexdsp.a] Error 2
error Command failed with exit code 2.

解决：
./configure  --disable-neon




---------------------------------------
改为python3

 
git submodule sync






------------------------------
libopus编译报错。（以前能编译通过）

checking whether the C compiler works... no 
configure: error: in `/Users/liyong/Downloads/97_ts_project/media_record/lib/opus’: 
configure: error: C compiler cannot create executables

看config.log
发现
node: --openssl-legacy-provider is not allowed in NODE_OPTIONS

搜素发现
导致原因：
export NODE_OPTIONS=--openssl-legacy-provider  
https://stackoverflow.com/questions/72866798/node-openssl-legacy-provider-is-not-allowed-in-node-options

解决：命令行执行
unset NODE_OPTIONS

 
