var express = require('express');
var app = express();

var util = require('util');
var neo4j = require("neo4j-driver");

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


const keyIMGs = [{ "name" : "The Fool", 
"hyperlink" : "https://i.imgur.com/9HbJIWG.jpeg"},
{"name" : "The Magus",
"hyperlink" : "https://i.imgur.com/1l69rsc.jpeg"},
{"name" : "The High Priestess", 
"hyperlink" : "https://i.imgur.com/M64zPIJ.jpeg"},
{
  "name" : "The Empress",
  "hyperlink" : "https://i.imgur.com/4iNrohX.jpeg", 
},
{
  "name" : "The Emperor",
  "hyperlink" : "https://i.imgur.com/210ZsYp.jpeg"
},
{
  "name" : "The Hierophant",
  "hyperlink" : "https://i.imgur.com/xXUO4AN.jpeg"
},
{
  "name" : "The Lovers",
  "hyperlink" : "https://i.imgur.com/hOtHDH0.jpeg"
},
{
  "name" : "The Whirring Charioteer",
  "hyperlink" : "https://i.imgur.com/p8n6a7R.jpeg"
}
,
{
  "name" : "Adjustment",
  "hyperlink" : "https://i.imgur.com/7IObmKi.jpeg"
},
{
  "name" : "The Hermit",
  "hyperlink" : "https://i.imgur.com/kqwCU8t.jpeg"
},
{
  "name"  : "The Wheel of Dharma",
  "hyperlink" : "https://i.imgur.com/UKv38gf.jpeg"
},
{
  "name" : "The Fortress",
  "hyperlink" : "https://i.imgur.com/rOWZvci.jpeg"
},
{
  "name" : "The Hanged Man",
  "hyperlink" : "https://i.imgur.com/nvSQgA5.jpeg"
},
{
  "name" : "Death",
  "hyperlink" : "https://i.imgur.com/nSea3nD.jpeg"
}
,
{
  "name" : "Enchantment",
  "hyperlink" : "https://i.imgur.com/fnhlLJZ.jpeg"
},
{
  "name" : "The Kakodaimon",
  "hyperlink" : "https://i.imgur.com/b8pSi9x.jpeg"
},
{
  "name" : "The Towers",
  "hyperlink" : "https://i.imgur.com/QGYZddl.jpeg"
},
{
  "name" : "The Star",
  "hyperlink" : "https://i.imgur.com/qRprJGz.jpeg"
},
{
  "name" : "The Moon",
  "hyperlink" : "https://i.imgur.com/wid9Kon.jpeg"
},
{
  "name" : "The Sun",
  "hyperlink" : "https://i.imgur.com/hh2Q2Qg.jpeg"
},
{
  "name" : "The AEon",
  "hyperlink" : "https://i.imgur.com/N74fLpk.jpeg"
},
{
  "name" : "KOSMOS",
  "hyperlink" : "https://i.imgur.com/SWwMzEO.jpeg"
}
,
{"name" : "Knight of STAVEZ",
"hyperlink" : "https://i.imgur.com/cY3aK6j.jpeg"},
{"name" : "Queen of STAVEZ",
"hyperlink" : "https://i.imgur.com/GCI2jRQ.jpeg"},
{"name" : "Prince of STAVEZ",
"hyperlink" : "https://i.imgur.com/iup8iIf.jpeg"},
{"name" : "Page of STAVEZ",
"hyperlink" : "https://i.imgur.com/00am6lO.jpeg"},
{"name" : "Knight of CUPS",
"hyperlink" : "https://i.imgur.com/fyuDAIL.jpeg"},
{"name" : "Queen of CUPS",
"hyperlink" : "https://i.imgur.com/rZvQyGU.jpeg"},
{"name" : "Prince of CUPS",
"hyperlink" : "https://i.imgur.com/zyakpm2.jpeg"},
{"name" : "Page of CUPS",
"hyperlink" : "https://i.imgur.com/zZ3huWt.jpeg"},
{"name" : "Knight of SWORDZ",
"hyperlink" : "https://i.imgur.com/JFhYDOb.jpeg"},
{"name" : "Queen of SWORDZ",
"hyperlink" : "https://i.imgur.com/ZPuQb6l.jpeg"},
{"name" : "Prince of SWORDZ",
"hyperlink" : "https://i.imgur.com/NwHbC2m.jpeg"},
{"name" : "Page of SWORDZ",
"hyperlink" : "https://i.imgur.com/RcahD4N.jpeg"},
{"name" : "Knight of DiSkS",
"hyperlink" : "https://i.imgur.com/Wts7Oik.jpeg"},
{"name" : "Queen of DiSkS",
"hyperlink" : "https://i.imgur.com/Zvz9isf.jpeg"},
{"name" : "Prince of DiSkS",
"hyperlink" : "https://i.imgur.com/n0IYypp.jpeg"},
{"name" : "Page of DiSkS",
"hyperlink" : "https://i.imgur.com/kKWvB8O.jpeg" }
,
  {"name" : "Ace of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/Sh5N3Z8.jpeg"},
  {"name" : "2 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/emyplB0.jpeg"},
  {"name" : "3 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/d2FJfi4.jpeg"},
  {"name" : "4 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/457eNgw.jpeg"},
  {"name" : "5 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/V4tT2ps.jpeg"},
  {"name" : "6 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/z584mvY.jpeg"},
  {"name" : "7 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/hevPxL3.jpeg"},
  {"name" : "9 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/WdMOXol.jpeg"},
  {"name" : "10 of STAVEZ", 
  "hyperlink" : "https://i.imgur.com/Wp5vtBc.jpeg"},
  {"name" : "Ace of CUPS", 
  "hyperlink" : "https://i.imgur.com/V93XxGI.jpeg"},
  {"name" : "2 of CUPS", 
  "hyperlink" : "https://i.imgur.com/GLnl1w1.jpeg"},
  {"name" : "3 of CUPS", 
  "hyperlink" : "https://i.imgur.com/cxwR15L.jpeg"},
  {"name" : "4 of CUPS", 
  "hyperlink" : "https://i.imgur.com/ZfWgwJn.jpeg"},
  {"name" : "5 of CUPS", 
  "hyperlink" : "https://i.imgur.com/eLsFh8j.jpeg"},
  {"name" : "6 of CUPS", 
  "hyperlink" : "https://i.imgur.com/JAYrErD.jpeg"},
  {"name" : "7 of CUPS", 
  "hyperlink" : "https://i.imgur.com/H42MWrS.jpeg"},
  {"name" : "8 of CUPS", 
  "hyperlink" : "https://i.imgur.com/eNHVN3z.jpeg"},
  {"name" : "9 of CUPS", 
  "hyperlink" : "https://i.imgur.com/jy0ptTr.jpeg"},
  {"name" : "10 of CUPS", 
  "hyperlink" : "https://i.imgur.com/qFvLfbS.jpeg"},
  {"name" : "Ace of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/UosAlM5.jpeg"},
  {"name" : "2 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/iokZgUt.jpeg"},
  {"name" : "3 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/whz1ZTx.jpeg"},
  {"name" : "4 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/OXD5QYz.jpeg"},

  {"name" : "5 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/99SU1TS.jpeg"},
  {"name" : "6 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/GhLVfE6.jpeg"},
  {"name" : "7 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/BRvYIq6.jpeg"},
  {"name" : "8 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/sKe6Yvd.jpeg"},
  {"name" : "9 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/Aua3jtT.jpeg"},
  {"name" : "10 of SWORDZ", 
  "hyperlink" : "https://i.imgur.com/4DctSb5.jpeg"},
  {"name" : "Ace of DiSkS", 
  "hyperlink" : "https://i.imgur.com/pVNxTDe.jpeg"},

  {"name" : "2 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/gIJnfMX.jpeg"},
  {"name" : "3 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/tTkqQ4X.jpeg"},

  {"name" : "4 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/gJtXQid.jpeg"},
  {"name" : "5 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/ndagNvL.jpeg"},
  {"name" : "6 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/SlfS1sQ.jpeg"},
  {"name" : "7 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/0a7045i.jpeg"},
  {"name" : "8 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/oXOgrD1.jpeg"},

  {"name" : "9 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/CPH6OOY.jpeg"},
  {"name" : "10 of DiSkS", 
  "hyperlink" : "https://i.imgur.com/0zpjmfp.jpeg"}

]

const elIMGs = [
]

const planetIMGs = [
]

const houseIMGs = [
]

app.get('/bookOfThoth', function (req, res) {
   bookOfThoth(function(err, result){
      if(err){
         console.log(err);
      }
      else{
         res.json({d3Graph : result})
      }
   })
})

 const tarot = ['The Fool', 'The Magus', 'The High Priestess', 'The Empress', 'The Emperor',
 'The Hierophant', 'The Lovers', 'The Chariot', 'The Fortress', 'The Hermit', 'The Wheel of Dharma', 'Adjustment', 'The Hanged Man', 'Death',
 'Enchantment', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'The AEon', 'KOSMOS', 'Ace of CUPS', '2 of Cups', '3 of CUPS', 
 '4 of CUPS', '5 of CUPS', '6 of CUPS', '7 of CUPS', '8 of CUPS', '9 of CUPS', '10 of CUPS', 
 'Knight of CUPS', 'Prince of CUPS', 'Page of CUPS', 'Queen of CUPS', 'Ace of DiSkS', '2 of DiSkS', '3 of DiSkS', 
 '4 of DiSkS', '5 of DiSkS', '6 of DiSkS', '7 of DiSkS', '8 of DiSkS', '9 of DiSkS', 
 '10 of DiSkS', 'Knight of DiSkS', 'Knight of DiSkS', 'Page of DiSkS', 'Queen of DiSkS', 'Ace of SWORDZ', 
 '2 of SWORDZ', '3 of SWORDZ', '4 of SWORDZ', '5 of SWORDZ', '6 of SWORDZ', '7 of SWORDZ', 
 '8 of SWORDZ', '9 of SWORDZ', '10 of SWORDZ', 'Knight of SWORDZ', 'Prince of SWORDZ', 'Page of SWORDZ', 'Queen of SWORDZ', 
 'Ace of STAVEZ', '2 of STAVEZ', '3 of STAVEZ', '4 of STAVEZ', '5 of STAVEZ', '6 of STAVEZ', '7 of STAVEZ', 
 '8 of STAVEZ', '9 of STAVEZ', '10 of STAVEZ', 'Knight of STAVEZ', 'Prince of STAVEZ', 'Page of STAVEZ', 'Queen of STAVEZ']
  

async function bookOfThoth(cb){
   const driver = neo4j.driver("neo4j+s://c1421bc8.databases.neo4j.io", neo4j.auth.basic("neo4j", "p1CXUgHWNB6c8ZxcjKcOlHh0p-3yT6luGx0QAI2fIcc"))
   const session = driver.session()

   //it's high technology not divination
   try {
     const result = await session.run(
       'MATCH (n)-[r]-(m) ' + 
       'RETURN n,r,m '
     )

     congealNodesAndLinks(result, function(err, dat){
      if(err){
         cb(err);
      }
      else{
         cb(null, dat);
      }
     })

   } finally {
     await session.close()

     
   }

   // on application exit:
   await driver.close()
}

function congealNodesAndLinks(result, cb){

   var d3Graph = {
      "nodes" : [],
      "links" : []
    }

  var keep = [];
    
  result.records.forEach(function(record){
    //const node0 = singleRecord.get(0)
 
    //put in d3 json format
      record._fields.forEach(function(obj){
        if(obj && obj.hasOwnProperty("start")){
          d3Graph.links.push({"source" : obj.start.low.toString(), "target" : obj.end.low.toString()})
        }
        else{
          if(obj && keep.indexOf(obj.identity.low.toString()) === -1){

            
            var dat = [];
            if(obj.labels[0] === "Key" || obj.labels[0] === "Pip" || obj.labels[0] === "Court" ){ 
              dat = keyIMGs.filter(dat => {
                return dat.name === obj.properties.a;
              })
             
            }

            if(dat.length === 0){
              var dat = [{"hyperlink" : ""}];
            }


            console.log("HERE" + dat[0].hyperlink);

            keep.push(obj.identity.low.toString());
            d3Graph.nodes.push({"id" : obj.identity.low.toString(), "img" : dat[0].hyperlink, "name" : obj.properties.a.toString(), "_id" : obj.properties._id, "group" : obj.labels[0]})
          }
        }
    })
  })
  cb(null, d3Graph)
}

//anti-hack: 
//"I know well not to be on my guard against deceivers"
app.get("/spin_333", function(req,res){
   var cards = [tarot[req.query.index0], tarot[req.query.index1], tarot[req.query.index2]];

   neoGear(cards, function(err,result){
      congealNodesAndLinks(result, function(err,dat){
         console.log("INSPECT " + util.inspect(dat));
         res.json({d3Graph : dat});
      })
   })
})

async function neoGear(cards, cb){
   const driver = neo4j.driver("neo4j+s://c1421bc8.databases.neo4j.io", neo4j.auth.basic("neo4j", "p1CXUgHWNB6c8ZxcjKcOlHh0p-3yT6luGx0QAI2fIcc"))
   const session = driver.session()

   //it's high technology not divination
   //Mi5

   console.log("CARDS " + cards);
   try {
     const result = await session.run(
       'MATCH (n)-[r]-(d) WHERE n.a IN $cards  ' + 
       'RETURN n,r,d ' ,
       {cards : cards}
     )



     console.log(util.inspect(result))
     cb(null,result);
    

   } finally {
     await session.close()

     
   }

   // on application exit:
   await driver.close()
}
app.listen(3000);


app.all('*', (req, res) => {

/*...*/
  res.sendFile(__dirname + '/bookOfThoth.html')
 
})