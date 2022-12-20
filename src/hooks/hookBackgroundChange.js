import {ref} from 'vue'

export default function hookBackChange() {

    const imgs_path_list = ref([
        {id: 0, img_path: 'WinterNorthFire.jpeg'},
        {id: 1, img_path: 'Ninja.jpeg'},
        {id: 2, img_path: 'RedSpringSpirit.jpeg'},
        {id: 3, img_path: 'Tumblr.jpeg'},
    ])


    const getCookieValueByName = (key) => {
        let match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
        return match ? match[2] : "";
    }

    return {
        imgs_path_list,
        getCookieValueByName,
    }

}