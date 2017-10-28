/* eslint-env mocha */

import assert from 'assert';
import sinon from 'sinon';

import wrapCursor from '../src/wrapCursor';

describe('wrapCursor', () => {
  let el, spy;

  const body: HTMLElement = (document.body: any);

  beforeEach(() => {
    el = document.createElement('textarea');
    body.appendChild(el);
    spy = sinon.spy();
    el.addEventListener('input', spy);
  });

  afterEach(() => {
    body.removeChild(el);
  });

  context('without selection range', () => {
    beforeEach(() => {
      el.value = 'foo baz';
      el.setSelectionRange('foo '.length, 'foo '.length);
    });

    it('works without third parameter', () => {
      wrapCursor(el, 'bar ');
      assert(el.value === 'foo bar baz');
      assert(el.selectionStart === 'foo bar '.length);
      assert(el.selectionEnd === 'foo bar '.length);
      assert(spy.calledOnce === true);
    });

    it('works with third parameter', () => {
      wrapCursor(el, 'bar ', 'hoge ');
      assert(el.value === 'foo bar hoge baz');
      assert(el.selectionStart === 'foo bar '.length);
      assert(el.selectionEnd === 'foo bar '.length);
      assert(spy.calledOnce === true);
    });
  });

  context('with selection range', () => {
    beforeEach(() => {
      el.value = 'foo bar baz';
      el.setSelectionRange('foo '.length, 'foo bar'.length);
    });

    it('works without third parameter', () => {
      wrapCursor(el, '@');
      assert(el.value === 'foo @bar baz');
      assert(el.selectionStart === 'foo @'.length);
      assert(el.selectionEnd === 'foo @bar'.length);
      assert(spy.calledOnce === true);
    });

    it('works with third parameter', () => {
      wrapCursor(el, '**', '**');
      assert(el.value === 'foo **bar** baz');
      assert(el.selectionStart === 'foo **'.length);
      assert(el.selectionEnd === 'foo **bar'.length);
      assert(spy.calledOnce === true);
    });
  });
});
