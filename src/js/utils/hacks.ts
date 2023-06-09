import probe from 'probe-image-size'
import { MediaBaseTag } from '../types'
import { SIRV_CONFIG } from '../sirv/SirvClient'

/**
 * Use a 3rd-party lib to get image width and height at build time
 * @param tagList
 * @returns media list with width & height
 */
export const getImageDimensionsHack = async (tagList: MediaBaseTag[]): Promise<any[]> => {
  return await Promise.all(tagList.map(async (entry) => {
    try {
      const img = await probe(`${SIRV_CONFIG.baseUrl}${entry.mediaUrl}`)
      return {
        ...entry,
        mediaInfo: {
          meta: {
            width: img.width,
            height: img.height
          }
        }
      }
    } catch (e) {
      return {
        ...entry,
        mediaInfo: null
      }
    }
  }))
}
