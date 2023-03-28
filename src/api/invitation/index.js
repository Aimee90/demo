import {$post} from '@/libs/api.request'
import {invitationService,remindSettingService}  from '@/api/requests/pms'
import {commonInvitationService}  from '@/api/requests/commodule'

const PRE_PARAM = { channel: '01', source: 'HTML', version: '3.5' }
// 用户拉新信息明细
export const detailed = {
  list: params => $post(commonInvitationService.inviteList, _.assign(null, PRE_PARAM, params)),
  detail: params => $post(commonInvitationService.inviteDetail, _.assign(null, PRE_PARAM, params))
}

// 用户设置
export const setting = {
  list: params => $post(invitationService.inviteSettingList, params),
  add: params => $post(invitationService.addSetting, params),
  edit: params => $post(invitationService.editSetting, params),
  rm: params => $post(invitationService.rmSetting, params)
}

// 提醒内容
export const remind = {
  list: params => $post(remindSettingService.queryPrompt, params),
  save: params => $post(remindSettingService.saveRemind, params),
}