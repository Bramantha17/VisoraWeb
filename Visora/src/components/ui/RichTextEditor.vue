<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'RichTextEditor',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      quill: null,
    }
  },

  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: 'snow',
      placeholder: this.placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'blockquote'],
          ['clean'],
        ],
      },
    })

    this.setEditorHtml(this.modelValue)

    this.quill.on('text-change', () => {
      const html = this.getEditorHtml()
      this.$emit('update:modelValue', html)
    })
  },

  beforeUnmount() {
    this.quill = null
  },

  watch: {
    modelValue(newValue) {
      if (!this.quill) return

      const currentHtml = this.getEditorHtml()
      const nextHtml = this.normalizeHtml(newValue)

      if (currentHtml !== nextHtml) {
        this.setEditorHtml(newValue)
      }
    },
  },

  methods: {
    getEditorHtml() {
      if (!this.quill) return ''

      const html = this.quill.root.innerHTML
      return this.isEditorEmpty(html) ? '' : html
    },

    setEditorHtml(value) {
      if (!this.quill) return

      const html = this.normalizeHtml(value)
      this.quill.root.innerHTML = html
    },

    normalizeHtml(value) {
      return this.isEditorEmpty(value) ? '<p><br></p>' : value
    },

    isEditorEmpty(value) {
      const plainText = String(value || '')
        .replace(/<(.|\n)*?>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()

      return plainText.length === 0
    },
  },
}
</script>

<template>
  <div class="rich-text-editor" :class="{ 'is-error': error }">
    <div ref="editor"></div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  border: 1px solid #d6d9e0;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
}

.rich-text-editor.is-error {
  border-color: #d54c4c;
  box-shadow: 0 0 0 3px rgba(213, 76, 76, 0.12);
}

.rich-text-editor :deep(.ql-toolbar.ql-snow) {
  border: 0;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.rich-text-editor :deep(.ql-container.ql-snow) {
  border: 0;
  font-size: 14px;
  min-height: 180px;
}

.rich-text-editor :deep(.ql-editor) {
  min-height: 180px;
  color: #111827;
  line-height: 1.6;
}
</style>
