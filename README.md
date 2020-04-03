# vue-use-three

A set of composition functions and utilities to integrate [Vue.js](https://vuejs.org/) with [Three.js](https://threejs.org/).

> **Warning:** This project is very experimental, things may change at any time.

## Project outline

The primary goal of this library is to ease the pain in creating apps with Vue.js and Three.js. Several frameworks have demonstrated that component frameworks are great for organizing [3D scene graphs](https://threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html), but have a couple of drawbacks.

1. **Components are often too high-level.** This is fine for common things like scenes, lighting, and cameras, but becomes a pain when building custom components. With composition functions, we hope to solve this by providing behaviors that can be spread into components as needed, rather than proving the entire component itself.
2. **It's too easy to make mistakes.** A good example of this is [disposing of 3D objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects). With composition functions, these mental burdens can be abstracted away and managed within component lifecycles.

## Behaviors

> **Note:** These composition functions don't exist yet. These are currently in a brainstorming phase.

- [`useDisposable`](#usedisposable) — Bind a disposable object to a component's lifecycle
- [`usePosition`](#useposition) — Sync an object's local position with a vector
- [`useRotation`](#userotation) — Sync an object's local rotation using Euler angles
- Etc...

#### `useDisposable`

This function binds [disposable objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects) to the lifecycle of a component. When the component is destroyed, the object will be disposed of.

```js
import { useDisposable } from `vue-use-three`;

export default {
  setup() {
    const geometry = useDisposable(new Geometry());
  }
}
```

#### `usePosition`

Sync an object's local position with a vector

```js
import { usePosition } from 'vue-use-three';

export default {
  setup() {
    // ...
  }
};
```

#### `useRotation`

Sync an object's local rotation using Euler angles

```js
import { useRotation } from 'vue-use-three';

export default {
  setup() {
    // ...
  }
};
```

## Components

These components will cover common use cases for working with Three.js, and will primarily be built with the above composition functions.

- [`<Group>`](#group)
- [`<PerspectiveCamera>`](#perspectivecamera)
- [`<Renderer>`](#renderer)
- [`<Scene>`](#scene)

#### `<Group>`

A component to group child objects.

```vue
<Group>
  <!-- ... -->
</Group>
```

#### `<PerspectiveCamera>`

Create a [`PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) to render a scene with.

```vue
<Scene>
  <PerspectiveCamera />
</Scene>
```

#### `<Renderer>`

This component will be responsible for managing the [`WebGLRenderer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) context. It will also be responsible for managing child `Scene` components and all rendering. The renderer will also be responsible for the actual `<canvas>` DOM element.

```vue
<Renderer>
  <!-- ... -->
</Renderer>
```

#### `<Scene>`

Scenes will mark a line in the sand between the DOM and our canvas. They will be "abstract" components, and will not render any child DOM elements. We'll use the bounding box of an outer `<div>` element to determine where to render out content. If the `<div>` is not within the viewport, the scene will not be rendered. This will allow for many scenes to exist within a single renderer.

```vue
<Renderer>
  <Scene>
    <!-- ... -->
  </Scene>
</Renderer>
```

## License

[MIT](https://github.com/scottbedard/vue-use-three/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
