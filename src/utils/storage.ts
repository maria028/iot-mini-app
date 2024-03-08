import Taro from "@tarojs/taro";
export default {
    async getItem(key: string) {
        try {
            const res = await Taro.getStorage({ key });
            return res.data;
        } catch {
            return null;
        }
    },

    setItem(key: string, data: any) {
        return Taro.setStorage({ key, data });
    },

    removeItem(key: string) {
        return Taro.removeStorage({ key });
    },

    clear() {
        return Taro.clearStorage();
    }
};
