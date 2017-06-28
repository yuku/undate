/* eslint-env mocha */

import update, {wrapCursor} from './index.js.flow';

function eq(a, b) {
  if (a !== b) {
    throw new Error(`"${b}" is expected, but "${a}" is given`);
  }
}

describe('index', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('textarea');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  describe('module.exports', () => {
    context('when value is empty', () => {
      it('works without third parameter', () => {
        update(el, 'foo');
        eq(el.value, 'foo');
        eq(el.selectionStart, 'foo'.length);
        eq(el.selectionEnd, 'foo'.length);
      });

      it('works with third parameter', () => {
        update(el, 'bar', 'baz');
        eq(el.value, 'barbaz');
        eq(el.selectionStart, 'bar'.length);
        eq(el.selectionEnd, 'bar'.length);
      });
    });

    context('when value is present', () => {
      beforeEach(() => {
        el.value = 'hello, world';
      });

      it('works without third parameter', () => {
        update(el, 'hello, world yey');
        eq(el.value, 'hello, world yey');
        eq(el.selectionStart, 'hello, world yey'.length);
        eq(el.selectionEnd, 'hello, world yey'.length);
      });

      it('works with third parameter', () => {
        update(el, 'hello, wow', ' world');
        eq(el.value, 'hello, wow world');
        eq(el.selectionStart, 'hello, wow'.length);
        eq(el.selectionEnd, 'hello, wow'.length);
      });
    });
  });

  describe('module.exports.wrapCursor', () => {
    context('without selection range', () => {
      beforeEach(() => {
        el.value = 'foo baz';
        el.setSelectionRange('foo '.length, 'foo '.length);
      });

      it('works without third parameter', () => {
        wrapCursor(el, 'bar ');
        eq(el.value, 'foo bar baz');
        eq(el.selectionStart, 'foo bar '.length);
        eq(el.selectionEnd, 'foo bar '.length);
      });

      it('works with third parameter', () => {
        wrapCursor(el, 'bar ', 'hoge ');
        eq(el.value, 'foo bar hoge baz');
        eq(el.selectionStart, 'foo bar '.length);
        eq(el.selectionEnd, 'foo bar '.length);
      });
    });

    context('with selection range', () => {
      beforeEach(() => {
        el.value = 'foo bar baz';
        el.setSelectionRange('foo '.length, 'foo bar'.length);
      });

      it('works without third parameter', () => {
        wrapCursor(el, '@');
        eq(el.value, 'foo @bar baz');
        eq(el.selectionStart, 'foo @'.length);
        eq(el.selectionEnd, 'foo @bar'.length);
      });

      it('works with third parameter', () => {
        wrapCursor(el, '**', '**');
        eq(el.value, 'foo **bar** baz');
        eq(el.selectionStart, 'foo **'.length);
        eq(el.selectionEnd, 'foo **bar'.length);
      });
    });
  });
});
