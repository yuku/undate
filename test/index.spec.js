/* eslint-env mocha */

import {update, wrapCursor} from '../src/index.js';

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

    context('when another element is active', () => {
      let activeElement;

      beforeEach(() => {
        activeElement = document.createElement('textarea');
        document.body.appendChild(activeElement);
        activeElement.focus();
      });

      afterEach(() => {
        document.body.removeChild(activeElement);
      });

      it('works', () => {
        update(el, 'hello, world');
        eq(el.value, 'hello, world');
      });

      it('does not change active element', () => {
        eq(document.activeElement, activeElement);
        update(el, 'hello, world');
        eq(document.activeElement, activeElement);
      });
    });

    context('when removing part of heading string', () => {
      beforeEach(() => {
        el.value = '            - markdown list';
      });

      it('works', () => {
        update(el, '        - markdown list');
        eq(el.value, '        - markdown list');
        eq(el.selectionStart, '        - markdown list'.length);
        eq(el.selectionEnd, '        - markdown list'.length);
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
