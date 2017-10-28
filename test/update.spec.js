/* eslint-env mocha */

import sinon from 'sinon';
import update from '../src/update';

function eq(a, b) {
  if (a !== b) {
    throw new Error(`"${b}" is expected, but "${a}" is given`);
  }
}

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
      eq(el.value, 'foo');
      eq(el.selectionStart, 'foo'.length);
      eq(el.selectionEnd, 'foo'.length);
      eq(spy.calledOnce, true);
    });

    it('works with third parameter', () => {
      update(el, 'bar', 'baz');
      eq(el.value, 'barbaz');
      eq(el.selectionStart, 'bar'.length);
      eq(el.selectionEnd, 'bar'.length);
      eq(spy.calledOnce, true);
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
      eq(spy.calledOnce, true);
    });

    it('works with third parameter', () => {
      update(el, 'hello, wow', ' world');
      eq(el.value, 'hello, wow world');
      eq(el.selectionStart, 'hello, wow'.length);
      eq(el.selectionEnd, 'hello, wow'.length);
      eq(spy.calledOnce, true);
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
      eq(spy.calledOnce, true);
    });
  });
});
