import { TableCell as TiptapTableCell } from '@tiptap/extension-table-cell'

export const CustomTableVertical = TiptapTableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes.class) {
            return {}
          }

          return {
            class: attributes.class,
          }
        },
      },
      selected: {
        default: false,
        parseHTML: element => element.classList.contains('selectedCell'),
        renderHTML: attributes => {
          if (attributes.selected) {
            return {
              class: 'selectedCell',
            }
          }
          return {}
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCellSelected:
        (selected: boolean) =>
        ({ commands }: { commands: any }) => {
          return commands.updateAttributes(this.name, { selected })
        },
    }
  },
})
