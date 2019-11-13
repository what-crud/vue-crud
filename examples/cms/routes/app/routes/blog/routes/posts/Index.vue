<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    :item-elements="itemElements"
    item-details-width="1200"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

const slugify = (text) => {
  const a = 'ąàáäâćęèéëêìíïîłńòóöôśùúüûźżñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaceeeeeiiiilnoooosuuuuzzncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export default {
  data () {
    return {
      prefix: 'crud/blog',
      path: 'posts',
      paths: {
        i: 'blog/posts',
        st: 'blog/posts',
        u: 'blog/posts',
      },
      pageTitle: 'blog.posts',
    }
  },
  computed: {
    itemElements () {
      return {
        postTags: {
          title: this.$t('itemElements.postTags.title'),
          url: 'blog/posts/{id}/tags',
          controller: 'crud/blog/post-tags',
          itemObject: 'tag_posts',
          columns: [
            {
              obj: 'name',
              name: 'tag',
              header: this.$t('itemElements.postTags.headers.tag'),
            },
          ],
          primaryId: 'post_id',
          foreignId: 'tag_id',
          icon: 'local_offer',
          color: 'purple',
          buttonText: this.$t('itemElements.postTags.title'),
        },
      }
    },
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'input',
          column: 'title',
          text: this.$t('fields.title'),
          name: 'title',
          multiedit: false,
          onChange: (value, fields) => {
            fields.find(field => field.name === 'slug').value = slugify(value)
          },
        },
        {
          type: 'input',
          column: 'slug',
          text: this.$t('fields.slugWithDescription'),
          name: 'slug',
          multiedit: false,
          required: false,
          table: false,
        },
        {
          text: this.$t('fields.slug'),
          name: 'slug',
          details: false,
        },
        {
          type: 'select',
          url: 'crud/blog/categories',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'category_id',
          text: this.$t('fields.category'),
          name: 'category_id',
          apiObject: {
            name: 'category.name',
          },
        },
        {
          name: 'tags',
          text: this.$t('fields.tags'),
          details: false,
          apiObject: {
            name: 'post_tags',
            functions: ['listTags'],
          },
          textMode: 'html',
        },
        {
          type: 'textarea',
          column: 'description',
          text: this.$t('fields.description'),
          name: 'description',
          multiedit: false,
        },
        {
          type: 'file',
          column: 'image',
          text: this.$t('fields.image'),
          name: 'image',
          multiedit: false,
          required: false,
          textMode: 'file',
        },
        {
          type: 'file',
          column: 'thumbnail',
          text: this.$t('fields.thumbnail'),
          name: 'thumbnail',
          multiedit: false,
          textMode: 'file',
        },
        {
          type: 'richTextBox',
          richTextBoxOperations: [
            'History',
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Paragraph',
            'ListItem',
            'BulletList',
            'OrderedList',
            {
              name: 'Heading',
              options: {
                levels: [
                  1,
                  2,
                  3,
                ],
              },
            },
            'HardBreak',
            'HorizontalRule',
            'Blockquote',
            'Code',
            'Link',
            'Image',
          ],
          column: 'content',
          text: this.$t('fields.content'),
          name: 'content',
          multiedit: false,
          table: false,
        },
        {
          text: this.$t('fields.user'),
          name: 'user',
          apiObject: {
            name: 'user.name',
          },
          details: false,
        },
        {
          type: 'input',
          column: 'created_at',
          text: this.$t('fields.createdAt'),
          name: 'created_at',
          multiedit: false,
          disabled: true,
          required: false,
        },
        {
          type: 'input',
          column: 'updated_at',
          text: this.$t('fields.updatedAt'),
          name: 'updated_at',
          multiedit: false,
          disabled: true,
          required: false,
        },
      ]
    },
  },
  components: {
    Crud,
  },
  i18n: {
    messages: {
      pl: {
        detailsTitle: 'Post',
        fields: {
          id: 'Id',
          title: 'Tytuł',
          slug: 'Slug',
          slugWithDescription: 'Slug (zostaw puste, jeżeli ma się utworzyć na podstawie tytułu)',
          description: 'Opis',
          category: 'Kategoria',
          image: 'Obraz',
          thumbnail: 'Miniatura',
          content: 'Treść',
          tags: 'Tagi',
          user: 'Autor',
          createdAt: 'Utworzono',
          updatedAt: 'Edytowano',
        },
        itemElements: {
          postTags: {
            title: 'Przypisane tagi',
            headers: {
              tag: 'Tag',
            },
          },
        },
      },
      en: {
        detailsTitle: 'Post',
        fields: {
          id: 'Id',
          title: 'Title',
          slug: 'Slug',
          slugWithDescription: 'Slug (leave if it must be created from title)',
          description: 'Description',
          category: 'Category',
          image: 'Image',
          thumbnail: 'Thumbnail',
          content: 'Content',
          tags: 'Tags',
          user: 'Author',
          createdAt: 'Created at',
          updatedAt: 'Edited at',
        },
        itemElements: {
          postTags: {
            title: 'Tags',
            headers: {
              tag: 'Tag',
            },
          },
        },
      },
    },
  },
}

</script>
