/* eslint-env mocha */

import assert from 'assert';
import sinon from 'sinon';

import update from '../src/update';

describe('update', () => {
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

  context('when value is empty', () => {
    it('works without third parameter', () => {
      update(el, 'foo');
      assert(el.value === 'foo');
      assert(el.selectionStart === 'foo'.length);
      assert(el.selectionEnd === 'foo'.length);
      assert(spy.calledOnce === true);
    });

    it('works with third parameter', () => {
      update(el, 'bar', 'baz');
      assert(el.value === 'barbaz');
      assert(el.selectionStart === 'bar'.length);
      assert(el.selectionEnd === 'bar'.length);
      assert(spy.calledOnce === true);
    });
  });

  context('when value is present', () => {
    beforeEach(() => {
      el.value = 'hello, world';
    });

    it('works without third parameter', () => {
      update(el, 'hello, world yey');
      assert(el.value === 'hello, world yey');
      assert(el.selectionStart === 'hello, world yey'.length);
      assert(el.selectionEnd === 'hello, world yey'.length);
      assert(spy.calledOnce === true);
    });

    it('works with third parameter', () => {
      update(el, 'hello, wow', ' world');
      assert(el.value === 'hello, wow world');
      assert(el.selectionStart === 'hello, wow'.length);
      assert(el.selectionEnd === 'hello, wow'.length);
      assert(spy.calledOnce === true);
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
      assert(el.value === 'hello, world');
    });

    it('does not change active element', () => {
      assert(document.activeElement === activeElement);
      update(el, 'hello, world');
      assert(document.activeElement === activeElement);
    });
  });

  context('when removing part of heading string', () => {
    beforeEach(() => {
      el.value = '            - markdown list';
    });

    it('works', () => {
      update(el, '        - markdown list');
      assert(el.value === '        - markdown list');
      assert(el.selectionStart === '        - markdown list'.length);
      assert(el.selectionEnd === '        - markdown list'.length);
      assert(spy.calledOnce === true);
    });
  });
});
