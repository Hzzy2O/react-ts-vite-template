import { getStorageShortName , isProdMode } from '@/utils/env'
import { createStorage as create, CreateStorageParams } from './storageCache'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: isProdMode(),
    storage,
    prefixKey: getStorageShortName(),
    ...options
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: 604800 })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: 604800 })
}
export default WebStorage
