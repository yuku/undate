// @flow

function createInputEvent(): Event {
  if (typeof Event !== "undefined") {
    return new Event("input", { bubbles: true, cancelable: true });
  } else {
    const event = document.createEvent("Event");
    event.initEvent("input", true, true);
    return event;
  }
}

export default function (el: HTMLTextAreaElement, headToCursor: string, cursorToTail: ?string) {
  const curr = el.value,                            // strA + strB1 + strC
        next = headToCursor + (cursorToTail || ''), // strA + strB2 + strC
        activeElement = document.activeElement;

  //  Calculate length of strA and strC
  let aLength = 0,
      cLength = 0;
  while (curr[aLength] === next[aLength]) { aLength++; }
  while (curr[curr.length - cLength - 1] === next[next.length - cLength - 1]) { cLength++; }
  aLength = Math.min(aLength, Math.min(curr.length, next.length) - cLength);

  // Select strB1
  el.setSelectionRange(aLength, curr.length - cLength);

  // Get strB2
  const strB2 = next.substring(aLength, next.length - cLength);

  // Replace strB1 with strB2
  el.focus();
  if (!document.execCommand('insertText', false, strB2)) {
    // Document.execCommand returns false if the command is not supported.
    // Firefox and IE returns false in this case.
    el.value = next;
    el.dispatchEvent(createInputEvent());
  }

  // Move cursor to the end of headToCursor
  el.setSelectionRange(headToCursor.length, headToCursor.length);

  activeElement && activeElement.focus();
  return el;
}
