<template>
  <div id="app">
    <Renderer>
      <Scene />
    </Renderer>
  </div>
</template>

<script>
import { Renderer, Scene } from '../../../dist/index.esm';

export default {
  components: {
    Renderer,
    Scene
  },
  name: 'App',
}
</script>
