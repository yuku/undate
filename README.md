# undate

Undoable update for HTMLTextAreaElement

[![Build Status](https://travis-ci.org/yuku-t/undate.svg?branch=master)](https://travis-ci.org/yuku-t/undate)

## Install

```bash
npm install --save undate
```

## Usage

```js
import update, {wrapCursor} from 'undate';

const textareaElement = document.getElementById('textarea');

textareaElement.value; //=> '|'

// Update whole value
update(textareaElement, 'string before cursor', 'optional string after cursor');

textareaElement.value; //=> 'string before cursor|optional string after cursor'

// Update around the cursor
wrapCursor(textareaElement, ' *', '* ');

textareaElement.value; //=> 'string before cursor *|* optional string after cursor'

// Press cmd-z

textareaElement.value; //=> 'string before cursor|optional string after cursor'

// Press cmd-z

textareaElement.value; //=> '|'
```

## License

The [MIT](https://github.com/yuku-t/undate/blob/master/LICENSE) License
