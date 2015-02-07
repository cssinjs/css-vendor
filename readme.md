## CSS vendor prefix detection and property feature testing.

### Vendor prefixes

```javascript
console.log(cssVendor.prefix.js) // e.g. WebkitTransform

console.log(cssVendor.prefix.css) // e.g. -webkit-transform
```

### Property support feature test

`cssVendor.supportedProperty(prop)`

Test if property is supported, returns false if not. Returns string if supported. May add a vendor prefix if needed.

```javascript
console.log(cssVendor.supportedProperty('animation')) // e.g. -webkit-animation
```

### Value support feature test

`cssVendor.supportedValue(prop, value)`

Test if value is supported, returns false if not. Returns string if supported. May add a vendor prefix if needed.

```javascript
console.log(cssVendor.supportedValue('display', 'flex')) // e.g. -webkit-flex
```

## Run tests

### Locally
```bash
npm i
open test/local.html
```
### From github

[Tests](https://jsstyles.github.com/css-vendor/test)

## License

MIT
