#include "OpusContainer.hpp"
#include "emscriptenImport.hpp"
#include <vector>
#include <string>
#include <cstdlib>
#include <cstring>
#include <cassert>

Container::Container()
  : ContainerInterface()
{
  // Nothing to do
}

Container::~Container()
{

}

void Container::init(uint32_t sample_rate, uint8_t channel_count, int serial)
{
  ContainerInterface::init(sample_rate, channel_count, serial);
}
void Container::writeFrame(void *data, std::size_t size, int num_samples)
{
  emscriptenPushBuffer(data,size);
}
