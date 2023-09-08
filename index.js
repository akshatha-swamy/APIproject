require("dotenv").config();

const express=require("express");

var bodyParser=require("body-parser");
//database
const database=require("./database");


//initializing express
const booky=express();

booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());


/*
    route           /
    Description     Get all the books
    Access          PUBLIC
    Parameter       NONE
    Methods         GET
     
*/
booky.get("/",(req,res)=>{
    return res.json({books:database.books})
    });

/*
    route           /is
    Description     Get specific book on ISBN
    Access          PUBLIC
    Parameter       isbn 
    Methods         GET
     
*/

booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json(getSpecificBook); 
});

/*
    route           /c
    Description     Get specific book on category
    Access          PUBLIC
    Parameter       category
    Methods         GET
     
*/

booky.get("/c/:category",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category));

    if(getSpecificBook.length===0){
        return res.json({error:`no book found for the category ${req.params.category}`});

    }
    return res.json({book:getSpecificBook});
});


/*
    route           /l
    Description     Get specific book on language
    Access          PUBLIC
    Parameter       language
    Methods         GET
     
*/

booky.get("/l/:language",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.language.includes(req.params.language));

    if(getSpecificBook.length===0){
        return res.json({error:`no book found for the language ${req.params.language}`});
    }

    return res.json({book:getSpecificBook});
});

/*
    route           /author
    Description     Get all the authors
    Access          PUBLIC
    Parameter       none
    Methods         GET
     
*/

booky.get("/author",(req,res)=>{
    return res.json({publications:database.publication});
    
});

/*
    route           /a
    Description     Get specific book based on author
    Access          PUBLIC
    Parameter       author
    Methods         GET
     
*/

booky.get("/author/:id",(req,res)=>{
    const authorId=parseInt(req.params.id);
    const getSpecificAuthor=database.author.filter((author)=>author.id===authorId);
    
    if(!getSpecificAuthor){
        return res.json({authors:`no book found for the author ${res.params.author}`});
    }

    return res.json({author:getSpecificAuthor})
});

/*
    route           /author/book
    Description     Get list of authors based on books
    Access          PUBLIC
    Parameter       isbn
    Methods         GET
     
*/

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length===0){
        return res.json({error:`no author found for the book of ${req.params.isbn}`});
    }
    return res.json({authors:getSpecificAuthor});
});

/*
    route           /publication
    Description     to get all publication 
    Access          PUBLIC
    Parameter       none
    Methods         GET
     
*/

booky.get("/publication",(req,res)=>{
    
    return res.json({publications:database.publication});
});



//POST

/*
    route           /book/new
    Description     add new books
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
     
*/

booky.post("/book/new",(req,res)=>{
    const newBook=req.body;
    database.books.push(newBook);
    return res.json({updatedBooks:database.books});
});


/*
    route           /author/new
    Description     add new authors
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
     
*/

booky.post("/author/new",(req, res) => {
    const newAuthor = req.body;
    const getSpecificAuthor = database.author.filter((author) => author.id === newAuthor.id);

    if (getSpecificAuthor.length > 0) {
        return res.json({ error: "Author with the same ID already exists" });
    } else {
        database.author.push(newAuthor);
        return res.json(database.author);
    }
});


/*
    route           /author/new
    Description     add new authors
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
     
*/

booky.post("/publication/new",(req,res)=>{
    const newPublication=req.body;
   
    database.publication.push(newPublication);
    return res.json(database.publication);
    
});

/*
    route           /publication/update/book
    Description     update or add new publication
    Access          PUBLIC
    Parameter       isbn
    Methods         PUT
     
*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubId);
        return pub.books.push(req.params.isbn);

    });
    //update the book database
    database.books.forEach((book)=>{
        if(book.isbn===req.params.isbn){
            book.publication=req.body.pubId;
            return
        }
    });
    return res.json({
        books: database.books,
        publications: database.publication,
        message: "successfully updated publications"
    });
});

/*
    route           /book/delete
    Description     delete a book
    Access          PUBLIC
    Parameter       isbn
    Methods         DELETE
     
*/

booky.delete("/book/delete/:isbn",(req,res)=>{
    //which ever book does not match with the isbn ,just send it to an updatedbookdatabase array and rest will be filtered out

    const updatedbookdatabase=database.books.filter((book)=>book.ISBN!==req.params.isbn);
    database.books=updatedbookdatabase;
    return res.json({books:database.books});
});

/*
    route           /book/delete/author
    Description     delete a author from the book and vice versa
    Access          PUBLIC
    Parameter       isbn,authorId
    Methods         DELETE
     
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update the database
    database.books.forEach((book)=>{
        if(book.isbn===req.params.isbn){
            const newAuthorList=book.author.filter((eachAuthor)=>eachAuthor!==parseInt(req.params.authorId));
            book.author=newAuthorList;
            return;
        }
    });

    //update author database
    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id===parseInt(req.params.authorId)){
            const newBookList=eachAuthor.books.filter((book)=>book!==req.params.isbn);
            eachAuthor.books=newBookList;
            return;
        }
    });
    return res.json({
        book:database.books,
        author:database.author,
        message:"author was deleted"
    });


});

booky.listen(3000,()=>{
    console.log("server is up and running");
});


