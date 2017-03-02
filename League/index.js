exports.saybot = (req, res) => {


    trigger = req.body.trigger_word;
    query = req.body.text;
    command = query.replace(trigger ,'').trim().split(' '); //condense the call to an array of strings
    console.log(command);

    var api = {
        key: process.env.RIOT_API_KEY,
        region: 'na'
    }

    if(command[0].toLowerCase() === "champion" || command[0].toLowerCase() === "champ"){
        var specifiers = {
            "opt": {
                "locale": 'en_US',
                "region": 'na',
                "champData": ['image', 'passive', 'spells', 'partype']
            },
            "name": command[1][0].toUpperCase() + command[1].slice(1).toLowerCase(),
            "skin": '0',
            "version": '5.23.1'
        }
        //setTimeout( (specifiers, res)=>{
            //require('./champAPI').champ(specifiers, res);
            require('./champ').champ(specifiers, res);
        //})
    }
    else if (command[0].toLowerCase() === "monster") {
        console.log("API MONSTERS")
        var saybot = {
            text: "The RITO API has no data on minions or neutral monsters. Go to <forum link> to discuss and let RITO know we care."
        }
        res.json(saybot)
    }
    else if (command[0].toLowerCase() === "map") {

        var saybot = {
            text: "The RITO API has no data on Map resources (turrets, inhibitors). Go to <forum link> to discuss and let RITO know we care."
        }
        res.json(saybot)
    }
    else if (command[0].toLowerCase() === "item") {
        var hold = require('./item');
        var saybot = {
            text: "The RITO API does not serve data on individual Items. Making this a very exhaustive computation. Go to <forum link> to discuss and let RITO know we care." + hold.test
        }
        res.json(saybot)
    }
    else if (command[0].toLowerCase() === "summoner") {
        var summoner = require('./summoner')(command[1]);
        var saybot = {
            "text": "Testing summoner"
        }
        res.json(saybot)
    }
    else {
        var saybot = {
            "text": "Use \"castLoL <desc> <name>\" commands to display information on Champions, Items, Maps, and Monsters.\nKeywords include (desc): champion/champ, item, map, summoner, monster",
            "username": "LoL-botsy",
            "icon_emoji": ":dusty_stick:"
        }
        res.json(saybot)
    }
}
