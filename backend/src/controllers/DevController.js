const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

const { findConnections, sendMessage } = require('../websocket')

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json({ devs })
    },
    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body;

        const devIsExist = await Dev.findOne({ github_username })

        if (!devIsExist) {


            const responseGithub = await axios.get(`https://api.github.com/users/${github_username}`)

            let { name = login, bio, avatar_url } = responseGithub.data;

            const techsArray = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })


            //filtar as conexões que estao há no maximo 10km de distancia 
            // que o novo dev tenha pelo menos 1 das tecnologias filtradas 
            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray)
            console.log(sendSocketMessageTo)
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
            return res.json({ dev })
        } else {
            return res.json({ message: 'O dev já existe!' })
        }
    }
}