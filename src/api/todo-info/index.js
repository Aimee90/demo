import {$post} from '@/libs/api.request'
import { todoService } from '@/api/requests/member'

export const todoInfoList = param => $post(todoService.todoInfoList, param)
export const todoInfoFinish = param => $post(todoService.todoInfoFinish, param)
export const todoInfoPage = param => $post(todoService.todoInfoPage, param)