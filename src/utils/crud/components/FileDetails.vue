<template>
    <span style="display: flex;align-items: center">
        <v-tooltip top>
            <v-btn fab small class="xs white--text" color="secondary" slot="activator" @click="download(field)">
                <v-icon>save</v-icon>
            </v-btn>
            <span>{{ $t('global.details.files.download') }}</span>
        </v-tooltip>
        <v-tooltip top :style="{ visibility: isImage(field.mime) ? 'visible' : 'hidden' }">
            <v-btn fab small class="xs white--text" color="primary" slot="activator" @click="showImage(field)">
                <v-icon>search</v-icon>
            </v-btn>
            <span>{{ $t('global.details.files.show') }}</span>
        </v-tooltip>
        <div style="padding-left:30px;">
            <h4>{{ field.filename }}</h4>
            <p>{{ field.mime }}</p>
            <p>{{ field.size | fileSize }}</p>
        </div>
    </span>
</template>

<script>
import {
    mapState,
    mapMutations
} from "vuex";
import {
    humanFileSize,
    download
} from '../helpers/functions'

export default {
    props: [
        'fieldInfo'
    ],
    filters: {
        fileSize(size) {
            return size != null ? humanFileSize(size) : ''
        }
    },
    computed: {
        ...mapState('crud', [
            "filesPath",
        ]),
        field() {
            return Object.assign({
                filename: '',
                mime: '',
                size: null
            }, this.fieldInfo)
        }
    },
    methods: {
        ...mapMutations("crud", [
            "openImageContainer",
        ]),
        download(item) {
            download(this.filesPath + item.path, item.filename);
        },
        isImage(mime) {
            let supportedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
            return supportedMimeTypes.includes(mime);
        },
        showImage(image) {
            this.openImageContainer(image);
        },
    },
}
</script>