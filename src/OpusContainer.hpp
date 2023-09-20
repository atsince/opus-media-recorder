#ifndef OPUSCONTAINER_H_
#define OPUSCONTAINER_H_

#include <cstdint>
#include <cstddef>
#include "ContainerInterface.hpp"


class Container
  : protected ContainerInterface
{
public:
  /**
   * @brief Construct a new Ogg Container object
   *
   * @param sample_rate     Sampling rate of the stream
   * @param channel_count   The number of channels of the stream the maxium is 2.
   * @param serial          Uniqute number of the stream. Usually a random number.
   */
  Container();
  ~Container();

  void init(uint32_t sample_rate, uint8_t channel_count, int serial) override;

  void writeFrame(void *data, std::size_t size, int num_samples) override;

};

#endif /* OPUSCONTAINER_H_ */
