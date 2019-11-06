<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    deleteMode="hard"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/blog',
      path: 'post-tags',
      paths: {
        i: 'blog/post-tags',
      },
      pageTitle: 'blog.postTags',
    }
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'select',
          url: 'crud/blog/posts',
          list: {
            value: 'id',
            text: 'title',
            data: [],
          },
          column: 'post_id',
          text: this.$t('fields.post'),
          name: 'post_id',
          apiObject: {
            name: 'post.title',
          },
        },
        {
          text: this.$t('fields.postCategory'),
          name: 'post_category',
          apiObject: {
            name: 'post.category.name',
          },
          details: false,
        },
        {
          text: this.$t('fields.postDescription'),
          name: 'post_description',
          apiObject: {
            name: 'post.description',
          },
          details: false,
        },
        {
          text: this.$t('fields.postCreatedAt'),
          name: 'post_created_at',
          apiObject: {
            name: 'post.created_at',
          },
          details: false,
        },
        {
          type: 'select',
          url: 'crud/blog/tags',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'tag_id',
          text: this.$t('fields.tag'),
          name: 'tag_id',
          apiObject: {
            name: 'tag.name',
          },
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
        detailsTitle: 'Post - tag',
        fields: {
          id: 'Id',
          post: 'Post',
          postDescription: 'Opis posta',
          postCreatedAt: 'Data utw. posta',
          postCategory: 'Kategoria posta',
          tag: 'Tag',
        },
      },
      en: {
        detailsTitle: 'Post - tag',
        fields: {
          id: 'Id',
          post: 'Post',
          postDescription: 'Post description',
          postCreatedAt: 'Post creation date',
          postCategory: 'Post category',
          tag: 'Tag',
        },
      },
    },
  },
}

</script>
