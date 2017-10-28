/* eslint-env mocha */

import sinon from 'sinon';
import wrapCursor from '../src/wrapCursor';

function eq(a, b) {
  if (a !== b) {
    throw new Error(`"${b}" is expected, but "${a}" is given`);
  }
}

describe('wrapCursor', () => {
  let el, spy;

  beforeEach(() => {
    el = document.createElement('textarea');
    document.body.appendChild(el);
    spy = sinon.spy();
    el.addEventListener('input', spy);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

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
      eq(spy.calledOnce, true);
    });

    it('works with third parameter', () => {
      wrapCursor(el, 'bar ', 'hoge ');
      eq(el.value, 'foo bar hoge baz');
      eq(el.selectionStart, 'foo bar '.length);
      eq(el.selectionEnd, 'foo bar '.length);
      eq(spy.calledOnce, true);
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
      eq(spy.calledOnce, true);
    });

    it('works with third parameter', () => {
      wrapCursor(el, '**', '**');
      eq(el.value, 'foo **bar** baz');
      eq(el.selectionStart, 'foo **'.length);
      eq(el.selectionEnd, 'foo **bar'.length);
      eq(spy.calledOnce, true);
    });
  });
});
