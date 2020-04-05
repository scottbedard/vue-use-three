# vue-use-three

[![Build status](https://img.shields.io/github/workflow/status/scottbedard/vue-use-three/Test)](https://github.com/scottbedard/vue-use-three/actions)
[![Coverage](https://img.shields.io/codecov/c/github/scottbedard/vue-use-three)](https://codecov.io/gh/scottbedard/vue-use-three)
[![Dependencies](https://david-dm.org/scottbedard/vue-use-three/status.svg)](https://david-dm.org/scottbedard/vue-use-three)
[![Dev dependencies](https://david-dm.org/scottbedard/vue-use-three/dev-status.svg)](https://david-dm.org/scottbedard/vue-use-three?type=dev)
[![Peer dependencies](https://david-dm.org/scottbedard/vue-use-three/peer-status.svg)](https://david-dm.org/scottbedard/vue-use-three?type=peer)
[![NPM](https://img.shields.io/npm/v/vue-use-three)](https://www.npmjs.com/package/vue-use-three)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/vue-use-three/blob/master/LICENSE)

## 🚀 Project Goals

The primary goal of this library is to ease the pain in creating apps with [Vue.js](https://vuejs.org/) and [Three.js](https://threejs.org/). Several frameworks have demonstrated that components are great for managing [3D scene graphs](https://threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html), but have a couple of drawbacks.

1. **Components are often too high-level.** This is fine for common things like scenes, lighting, and cameras, but becomes a pain when building custom components. With composition functions, we hope to solve this by providing behaviors that can be spread into components as needed, rather than proving the entire component itself.
2. **It's too easy to make mistakes.** A good example of this is [disposing of 3D objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects). With composition functions, these mental burdens can be abstracted away and managed within component lifecycles.

> **Warning:** This project is _very_ experimental, things may change at any time.

## 📦 Installation

This library is designed to work with Vue 3, or with Vue 2 via the [composition API polyfill](https://github.com/vuejs/composition-api).

```bash
# Vue 3
$ npm install vue-use-three@vue3

# Vue 2
$ npm install vue-use-three@vue2 @vue/composition-api
```

When using with Vue 2, make sure to [register the composition API plugin](https://github.com/vuejs/composition-api#usage) before using Three.js compositions.

Alternatively, the library can be accessed via CDN.

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/vue-use-three@vue3"></script> 

<!-- Vue 2 -->
<script src="https://unpkg.com/vue-use-three@vue2"></script>
```

## ⚡ Compositions

- [`useDisposable`](#usedisposable) — Bind a disposable object to a component's lifecycle
- [`usePosition`](#useposition) — Sync an object's local position with a vector
- [`useRotation`](#userotation) — Sync an object's local rotation using Euler angles

#### `useDisposable`

This function binds [disposable objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects) to the lifecycle of a component. When the component is destroyed, the object will be disposed of.

```js
import { useDisposable } from 'vue-use-three';

export default {
  setup() {
    const geometry = new Geometry();
    const material = new Material();

    useDisposable(geometry, material);
  },
};
```

#### `usePosition`

Sync an object's local position with a vector

```js
import { usePosition } from 'vue-use-three';

export default {
  setup(props) {
    const obj = new Object3D();
    
    usePosition(obj, () => props.position);
  },
  props: {
    position: Object,
  },
};
```

#### `useRotation`

Sync an object's local rotation using Euler angles

```js
import { useRotation } from 'vue-use-three';

export default {
  setup() {
    const obj = new Object3D();

    // radians (default)
    useRotation(obj, () => props.rotation);

    // degrees
    useRotation(obj, () => props.rotation, { unit: 'degrees' });
  },
  props: {
    rotation: Object,
  },
};
```

## 🧩 Components

These components will cover common use cases for working with Three.js, and will primarily be built with the above composition functions.

- [`<Group>`](#group)
- [`<PerspectiveCamera>`](#perspectivecamera)
- [`<Renderer>`](#renderer)
- [`<Scene>`](#scene)

#### `<Group>` _(Planned)_

A component to group child objects.

```vue
<Group>
  <!-- ... -->
</Group>
```

#### `<PerspectiveCamera>` _(Planned)_

Create a [`PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) to render a scene with.

```vue
<Scene>
  <PerspectiveCamera />
</Scene>
```

#### `<Renderer>` _(Planned)_

This component will be responsible for managing the [`WebGLRenderer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) context. It will also be responsible for managing child `Scene` components and all rendering. The renderer will also be responsible for the actual `<canvas>` DOM element.

```vue
<Renderer>
  <!-- ... -->
</Renderer>
```

#### `<Scene>` _(Planned)_

Scenes will mark a line in the sand between the DOM and our canvas. They will be "abstract" components, and will not render any child DOM elements. We'll use the bounding box of an outer `<div>` element to determine where to render out content. If the `<div>` is not within the viewport, the scene will not be rendered. This will allow for many scenes to exist within a single renderer.

```vue
<Renderer>
  <Scene>
    <!-- ... -->
  </Scene>
</Renderer>
```

## 📄 License

[MIT](https://github.com/scottbedard/vue-use-three/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
