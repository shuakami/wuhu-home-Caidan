import axios from 'axios';
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5秒
const BASE_URL = 'https://music.xn--7ovw36h.love';

/**
 * 获取音乐 URL - 新式方法
 * @param {string} id - 歌曲 ID
 * @param {string} level - 音质等级，默认为 'exhigh'
 * @returns {Promise} - 返回请求的 Promise 对象
 */
const getMusicUrlNewMethod = (id, level = 'exhigh') => {
  const url = `${BASE_URL}/song/url/v1?id=${id}&level=${level}`;
  return axios.get(url);
};

/**
 * 获取音乐 URL - 老式方法
 * @param {string} id - 歌曲 ID
 * @param {string} quality - 请求的音质，默认为 '320000' (320kbps)
 * @returns {Promise} - 返回请求的 Promise 对象
 */
const getMusicUrlOldMethod = (id, quality = '320000') => {
  const url = `${BASE_URL}/song/url?id=${id}&br=${quality}`;
  return axios.get(url);
};

/**
 * 获取音乐 URL - 首选新式方法，失败时尝试老式方法
 * @param {string} id - 歌曲 ID
 * @param {string} quality - 请求的音质
 * @param {string} level - 音质等级
 * @returns {Promise} - 返回请求的 Promise 对象
 */
export const getMusicUrl = async (id, quality = '320000', level = 'exhigh') => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await getMusicUrlNewMethod(id, level);
      if (response.data && response.data.code === 200) {
        return response.data;
      } else if (response.data?.code === -460) {
        // 如果返回特定错误码，则等待并重试
        console.log('网络太拥挤，请稍候再试！（等待 %d 秒后重试第 %d 次）', RETRY_DELAY / 1000, retries + 1);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        // 其他错误直接尝试老式方法
        break;
      }
    } catch (error) {
      console.error('Error fetching music URL with new method', error);
    }

    retries++;
  }

  // 新式方法重试三次失败后尝试老式方法
  try {
    const response = await getMusicUrlOldMethod(id, quality);
    if (response.data && response.data.code === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch music URL using old method');
    }
  } catch (error) {
    console.error('Error fetching music URL with old method', error);
    return null;
  }
};

/**
 * 检查音乐是否可用
 * @param {string} id - 歌曲 ID
 * @returns {Promise} - 返回请求的 Promise 对象
 */
export const checkMusicAvailability = (id) => {
  const url = `${BASE_URL}/check/music?id=${id}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error checking music availability', error);
      return null;
    });
};
