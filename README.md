# paula's website
playing around with ThreeJS in React by paula zhu

https://www.paulazhu.com

### Currently (221229) works with
- node: v16.15.1 (`nvm install 16.15.1`)
- npm: 8.11.0

### requires:
- @react-three/drei
- @react-three/fiber
- gsap

### webpack:
- `npm run serve`
- `npm run build` to look at dist folder

### Amplify
- In Build Settings>amplify.yml
    - change artifacts > baseDirectory from `build` to `dist`
- In Rewrites and Redirects>200 (Rewrite)
    - add `|glb` to the end
    - (</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json|glb)$)([^.]+$)/>)

### With inspiration from:
- https://dev.to/nourdinedev/how-to-use-threejs-and-react-to-render-a-3d-model-of-your-self-4kkf
- https://codesandbox.io/s/2csbr1?file=/src/App.js
