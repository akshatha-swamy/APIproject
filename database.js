const books=[
    {
        ISBN:"12345book",
        title:"Tesla",
        pubDate:"2021-08-05",
        language:"en",
        numPage:250,
        authors:[1,2],
        category:["tech","space","education"]

    },
    {
        ISBN:"5463book",
        title:"angles and demons",
        pubDate:"2021-08-05",
        language:"en",
        numPage:250,
        authors:[3],
        category:["tech","spiritual","fiction"]

    }
]

const author=[
    {
        id:1,
        name:"akshatha",
        books:["12345book","secretBook"]
    },
    {
        id:2,
        name:"Elon Musk",
        books:["12345book"]
    },
    {
        id:3,
        name:"Dan Brown",
        books:["5463book"]
    }
]

const publication=[
    {
        id:1,
        name:"writex",
        books:["12345book"]
    },
    {
        id:2,
        name:"writex2",
        books:[]
    }
]

module.exports={books,author,publication};