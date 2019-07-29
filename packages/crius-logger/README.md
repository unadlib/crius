# crius-logger
A logger plugin for Crius Test

## Install

```bash
npm install --save-dev crius-logger
```

## Usage

```js
@plugins([logger()])
class TestTodoList extends Step {}
```

## API

### logger(options)

- options <Object> Optional config.
  - path <string> Path to write to log.
