<template>
   <div class="flex-row">
     <div class="demo-upload-list" v-for="item in uploadList">
        <div>
            <img :src="item.thumbnailUrl">
            <div v-if="!readonly" class="demo-upload-list-cover">
                <!-- <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon> -->
                <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
            </div>
        </div>
      </div>
      <Upload
        v-if="!readonly&&!exeed"
        ref="upload"
        accept=".jpg,.jpeg,.png"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        v-bind="external"
        style="display: inline-block;width:60px;height: 60px;">
        <div style="width: 60px;height:60px;line-height: 60px;">
            <Icon type="ios-image-outline" size="20"></Icon>
        </div>
      </Upload>
      <span v-if="!!errorTip" class="err-tip">{{errorTip}}</span>
      <!-- <Modal title="View Image" v-model="visible">
          <img :src="'https://dev-file.iviewui.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
      </Modal> -->
   </div>
</template>
<script>
   import upload from './upload'
   import { getToken } from '@/libs/util'
    export default {
      props: {
        fileList: {
          type: Array,
          default: ()=>[]
        },
        readonly: {
          type: Boolean,
          default: ()=>true,
        },
        errorTip: {
          type: String,
          default: ()=>''
        },
        maxLimit: {
          type: Number,
          default: ()=>5
        },
        // 单张图片的大小，单位M
        maxSize: {
          type: Number,
          default: ()=>5
        }
      },
      data () {
          return {
              count: 0,
              imgName: '',
              visible: false,
              uploadList: []
          }
      },
      methods: {
          handleView (name) {
              this.imgName = name;
              this.visible = true;
          },
          handleRemove (file) {
            this.$emit('remove', file)
          },
          handleFormatError (file) {
              this.$Notice.warning({
                  title: 'The file format is incorrect',
                  desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
              });
          },
          handleMaxSize (file) {
              this.$Notice.warning({
                  title: 'Exceeding file size limit',
                  desc: 'File  ' + file.name + ' is too large, no more than 2M.'
              });
          },
          handleBeforeUpload (file) { 
            this.count++
            if (this.count>this.maxLimit) {
                !this.tipSend&&this.$Notice.warning({
                    title: `至多上传${this.maxLimit}张图片.`
                });
                this.tipSend = true
            }else if(file.size>Number(this.maxSize)*1024*1024){
                this.$Notice.warning({
                    title: `单个文件大小不应超过${this.maxSize}M`
                });
            }else{
                this.upload2oss(file)
            }
            return false;
          },

        // 图片上传至OSS
        upload2oss(file){
            this.uploading = true
            upload(file).then(img => {
                this.uploading = false  
                this.$emit('input', [...this.uploadList, img])
                this.$emit('change', img)
            }).catch(err=>{
                this.uploading = false
                this.$Message.warning(err)
            })
        } 
      },
      computed: {
        external(){
            const token = getToken()
            return {
                'action': this.actionUrl,
                'max-size': this.maxSize ,
                // 'name': 'imageBase64',
                // 'with-credentials': true,
                // 'show-upload-list': true,
                // 'headers': _.assign({'Content-Type': 'application/json;charset=UTF-8'}, !!token?{'Authorization': 'Bearer ' +  token}:null)
            }
        },
        exeed(){
            console.log(this.count, this.maxLimit)
            return this.count>=this.maxLimit
        },
        actionUrl(){
          return `${location.origin}/tcm-web/shopping/mall/goods/picture/upload`
        }
      },
      watch: {
          fileList: {
              deep: true,
              immediate: true,
              handler(nv){
                  this.uploadList = _.cloneDeep(nv)
                  this.count = nv.length
              }
          }
      }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        /* box-shadow: 0 1px 1px rgba(0,0,0,.2); */
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .err-tip{
        color: #ed4014;
        margin-left: 10px;
    }
</style>
