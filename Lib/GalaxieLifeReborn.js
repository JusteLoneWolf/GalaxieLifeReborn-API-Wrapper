class GalaxieLifeReborn{
    constructor() {
        this.utils = require('../Utils/utils')
    }

    /**
     * Get Userprofile
     * @param username {String<username>} The username
     * @returns {Promise<Object>}
     */
    getUserProfile(username){
        return new Promise(((resolve, reject) => {
            this.utils.request("https://api.galaxylifereborn.com/modules/botuser?info="+username).then(data => {
                if(data){
                        let buildData = {}
                        let {id, createdAt, username, rankType, friends} = data
                        let parsedFriend = JSON.parse(friends)
                        let newFriendData = []
                        for (const friend of parsedFriend) {
                            newFriendData.push({
                                name: friend.split('/')[1],
                                id: friend.split('/')[0]
                            })
                        }

                        /* For AccountType data
                        *   Banned = 0,
                        *   Locked = 1,
                        *   Member = 2,
                        *   Supporter = 3,
                        *   ContentCreator = 4,
                        *   Tester = 5,
                        *   Moderator = 6,
                        *   GameModerator = 7,
                        *   Administrator = 8,
                        *   Developer = 9
                        *
                        * Source https://github.com/Galaxy-Life-Reborn/GLR.Net/blob/master/src/Entities/Enums/Rank.cs
                         */

                        Object.assign(buildData, {
                            id,
                            createdAt,
                            username,
                            AccountType: rankType,
                            friends: newFriendData
                        })
                        resolve(buildData)
                }else {
                    reject({error: 404, message: "User not found"})
                }
            }).catch((error) =>{
                reject(error)
            })
        }))
    }

    /**
     * Get server status
     * @returns {Promise<Object>}
     */

    getServerStatus(){
        return new Promise(((resolve, reject) => {
            this.utils.request('https://mariflash.galaxylifereborn.com/status').then((data) =>{
                resolve(data)
            }).catch((err) =>{
                reject(err)
            })
        }))
    }

    /**
     * Get alliance data
     * @param name {String<name>} The name of alliance
     * @returns {Promise<Object>}
     */

    getAlliance(name) {
        return new Promise(((resolve, reject) => {
            this.utils.request('https://mariflash.galaxylifereborn.com/alliances/info?name=' + name).then((data) => {
                if (data) {
                    resolve({name: data.name, owner: data.owner, memberCount: data.memberCount})
                } else {
                    reject({error: 404, message: "Alliance not found"})
                }
            }).catch((err) => {
                reject(err)
            })
        }))
    }

    /**
     * Get alliance members
     * @param name {String<name>} The name of alliance
     * @returns {Promise<Array>}
     */
    getAllianceMember(name) {
        return new Promise(((resolve, reject) => {
            this.utils.request('https://mariflash.galaxylifereborn.com/alliances/members?name=' + name).then((data) => {
                if (data) {
                    resolve(data)
                } else {
                    reject({error: 404, message: "Alliance not found"})
                }
            }).catch((err) => {
                reject(err)
            })
        }))
    }
    /**
     * Get leaderboard of the biggest chips players
     * @returns {Promise<Array>}
     */
    getTopChipsPlayers(){
        return new Promise(((resolve, reject) => {
            this.utils.request('https://mariflash.galaxylifereborn.com/leaderboard/chips').then((data) =>{
                resolve(data)
            }).catch((err) =>{
                reject(err)
            })
        }))
    }

    /**
     * Get leaderboard of level players ranking
     * @returns {Promise<Array>}
     */
    getTopLevelPlayers(){
        return new Promise(((resolve, reject) => {
            this.utils.request('https://mariflash.galaxylifereborn.com/leaderboard/levels').then((data) =>{
                resolve(data)
            }).catch((err) =>{
                reject(err)
            })
        }))
    }
}

module.exports = GalaxieLifeReborn
