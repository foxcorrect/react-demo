import lodash from 'lodash'

export default {
    ...lodash,
    /**
     * 转化时间戳
     * @param {} timestamp 时间戳
     */
    transformTime(timestamp) {
        // -0强制转化为数字
        let date = new Date(timestamp - 0);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
    },

    /**
     * 对比新集合比旧集合相比移除了哪些元素，添加了哪些元素
     * @param {} oldSets 旧的集合
     * @param {} newSets 新的集合
     */
    diffSets(oldSets, newSets) {
        let addSets = [], removeSets = []

        oldSets.map(ele => {
            if (newSets.indexOf(ele) == -1) {
                removeSets.push(ele)
            }
        })

        newSets.map(ele => {
            if (oldSets.indexOf(ele) == -1) {
                addSets.push(ele)
            }
        })

        return {
            addSets, removeSets
        }
    },

    /**
     * 组合className
     * 
     * @param {any} arr 
     * @returns 
     */
    classNames(arr) {
        let ret = [];
        if (Object.prototype.toString.call(arr) === "[object Array]") {
            arr.map(i => {
                // 确保i不是undefined
                if (i) ret.push(i);
            });
            return ret.join(" ");
        }
        return "";
    },

    /**
     * 在record所有字段中搜索并返回filter数组
     * 
     * @param {object[]} originList 原始的列表
     * @param {string} text 要查询的文字
     * @param {object[]} columnList 要查询字段所在的列
     */
    searchText(originList, text, columnList) {
        let filter = [];

        if (Object.prototype.toString.call(originList) === "[object Array]") {
            let reg = new RegExp(text, 'gi');

            // 遍历所有原始数据
            originList.map((record, index) => {
                let match, passFlag = false, newRecord = {};
                for (let k in record) {
                    if (
                        columnList && columnList.indexOf(k) < 0
                        || !(typeof (record[k]) === "string")
                    ) {

                        newRecord[k] = record[k];
                        continue;
                    }
                    match = record[k].match(reg);
                    if (match) {
                        passFlag = true;
                        newRecord[k] = record[k]
                        // newRecord[k] = (
                        //     <span>
                        //         {
                        //             record[k].split(reg).map((text, i) => (
                        //                 i > 0 ? [<span key={i} className="g-highlight">
                        //                     {match[0]}
                        //                 </span>, text] : text
                        //             ))
                        //         }
                        //     </span>
                        // );
                    } else {
                        newRecord[k] = record[k];
                    }
                }
                if (passFlag) {
                    filter.push(newRecord);
                }
            })
        }
        return filter;
    },

    /**
     * get curr path and resolve as string
     * @param {window.location.pathname if undefined} pathname 
     */
    getCurrPath(pathname) {
        pathname = pathname ? pathname : window.location.pathname;
        let arr = pathname.split("/");
        arr.shift();
        return arr;
    },
}