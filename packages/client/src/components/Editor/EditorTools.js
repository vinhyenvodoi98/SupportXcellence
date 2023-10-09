import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    shortcut: 'CMD+SHIFT+H',
    config: {
      placeholder: 'Title',
      levels: [1, 2, 3, 4],
      defaultLevel: 3,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'テキストを入力',
      captionPlaceholder: 'キャプションを入力',
    },
  },
  delimiter: Delimiter,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  code: Code,
  paragraph: Paragraph,
};
