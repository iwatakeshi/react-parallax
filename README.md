# react-parallax
A parallax component for React

## Usage

```tsx
import { ParallaxContainer, ParallaxElement } from '@iwatakeshi/react-parallax'

const App = () => (
  <div>
    <ParallaxContainer>
      <ParallaxElement>
        { /* ... */}
      </ParallaxElement>
    </ParallaxContainer>
  </div>
)
```

#### TODO
  * Tests
    * The components rely on `window` which is not available in `jsdom`.
  * Documentation
  * Recipes?
