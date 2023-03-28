import { goodsImgUpload } from '@/api/integral/goods'
export default function(file){
    return new Promise((resolve, reject)=>{
        // 上传文件
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = r => {
            const _file = r.target.result
            goodsImgUpload({imageBase64: _file}).then(res=>{
                if(0==res.data.code){
                    resolve(res.data.data)
                }else{
                    reject(`图片${file.name}上传失败，${res.data.msg}`)
                }
            }).catch(e=>{
                reject(`图片${file.name}上传失败，${e.data.msg}`) 
            })
        }
    })
}