var http = require('http');

exports.champ = (specifiers, res)=>{
    this.res = res;

    var that = this;

    http.get('http://ddragon.leagueoflegends.com/cdn/' + specifiers.version + '/data/en_US/champion/' + specifiers.name + '.json', function(resChamp){
        saybot = {}
        info = ''
        resChamp.setEncoding('utf8')

        resChamp.on('data', (chunk)=>{
            info += chunk;
        })

        resChamp.on('end', (res)=>{
            champ = JSON.parse(info).data[specifiers.name];

            // CHAMP IMAGES TO USE FOR SLACK
            champ.image.links = {
                "load" : "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champ.name + "_" + specifiers.skin + ".jpg",
                "square" : "http://ddragon.leagueoflegends.com/cdn/" + specifiers.version + "/img/champion/" + champ.image.full ,
                "sprite" : "http://ddragon.leagueoflegends.com/cdn/" + specifiers.version + "/img/sprite/"
            }

            basic = {
                "mrkdwn_in": ["text", "pretext", "fields"],
                "fallback": "Basic champ information",
                "title": "Basic information",
                "text": "Name: *" + champ.name + "* " + champ.title
            }

            image = {
                "mrkdwn_in": ["text", "pretext", "fields"],
                "fallback": "Champ image",
                "image_url": champ.image.links.square
            }

            passive = {
                "mrkdwn_in": ["text", "pretext", "fields"],
                "fallback": "Champ Passive",
                "title": "Passive",
                "text": "*" + champ.passive.name + "*: " + champ.passive.description + ""

            }

            spells = {

                    "mrkdwn_in": ["text", "pretext", "fields"],
                    "fallback": "Champ Spells",
                    "title": "Spells",
                    "fields": [{
                        "title": "Q: " + champ.spells[0].name,
                        "value": champ.spells[0].description,
                        "short": true
                    },
                    {
                        "title": "W: " + champ.spells[1].name,
                        "value": champ.spells[1].description,
                        "short": true
                    },
                    {
                        "title": "R: " + champ.spells[2].name,
                        "value": champ.spells[2].description,
                        "short": true
                    },
                    {
                        "title": "T: " + champ.spells[3].name,
                        "value": champ.spells[3].description,
                        "short": true
                    }
                    ]
            }

            //Assemble the champion data parts in slack format
            saybot = {
                "text": "Champ Info",
                "username": "LoL-champ",
                "icon_emoji": ":champ:",
                "attachments": [basic, image, passive, spells],

                "mrkdwn": true
            }
            setTimeout(function(){
                that.res.json(saybot)
            })

        })
    })
}






//Make attachments for each data set

// {
//     "fallback": "Required plain-text summary of the attachment.",
//     "color": "#36a64f",
//     "pretext": "Optional text that appears above the attachment block",
//     "author_name": "Bobby Tables",
//     "author_link": "http://flickr.com/bobby/",
//     "author_icon": "http://flickr.com/icons/bobby.jpg",
//     "title": "Slack API Documentation",
//     "title_link": "https://api.slack.com/",
//     "text": "Optional text that appears within the attachment",
//     "fields": [
//         {
//             "title": "Priority",
//             "value": "High",
//             "short": false
//         }
//     ],
//     "image_url": "http://my-website.com/path/to/image.jpg",
//     "thumb_url": "http://example.com/path/to/thumb.png"
// }
