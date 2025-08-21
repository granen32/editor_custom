import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const CustomIndent = Extension.create({
  name: "indent",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const style = element.style.paddingLeft;
              if (style) {
                return parseInt(style) / 20; // 20px 단위로 들여쓰기
              }
              return 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent === 0) {
                return {};
              }
              return {
                style: `padding-left: ${attributes.indent * 20}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ commands, editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;
          const node = $from.node();

          if (
            node.type.name === "paragraph" ||
            node.type.name === "heading" ||
            node.type.name === "bulletList" ||
            node.type.name === "orderedList"
          ) {
            const currentIndent = node.attrs.indent || 0;
            return commands.updateAttributes(node.type.name, {
              indent: currentIndent + 1,
            });
          }

          return false;
        },
      outdent:
        () =>
        ({ commands, editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;
          const node = $from.node();

          if (
            node.type.name === "paragraph" ||
            node.type.name === "heading" ||
            node.type.name === "bulletList" ||
            node.type.name === "orderedList"
          ) {
            const currentIndent = node.attrs.indent || 0;
            return commands.updateAttributes(node.type.name, {
              indent: Math.max(currentIndent - 1, 0),
            });
          }

          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});
