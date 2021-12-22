const fs = require( "fs" ) ;

var multer = require( "multer" ) ;
var upload = multer(
  {
    dest: "uploads/"
  }
) ;

const { create } = require( "ipfs-http-client" ) ;
const ipfs = create(
  {
    host: "ipfs.infura.io" ,
    port: 5001 ,
    protocol: "https"
  }
) ;

const express = require( "express" ) ;
const app = express() ;
const PORT = 3000 ;

const config = require( "./config" ) ;
const pinataSDK = require( "@pinata/sdk" ) ;
const pinataApiKey = config.PINATA_API_KEY ;
const pinataApiSecret = config.PINATA_API_SECRET ;
const pinata = pinataSDK( pinataApiKey , pinataApiSecret ) ;

// homepage
app.get( "/" , function( request , response ) {
  response.sendFile( __dirname + "/main.html" ) ;
} )

// upload file to ipfs and return cid as response
app.post( "/uploadfile" , upload.single( "file1" ) , async function( request , response ) {
  console.log( request.file ) ;
  
  var data = Buffer.from( fs.readFileSync( request.file.path ) ) ;
  let upload_details = await ipfs.add( data ) ;
  
  console.log( `File ${ request.file.originalname } successfully uploaded to IPFS server!` ) ;
  console.log( "Upload details: " , upload_details ) ;
  console.log( "IPFS URL: https://ipfs.io/ipfs/" + upload_details.path ) ;
  
  response.send( `File: ${ request.file.originalname }<br/>CID: ${ upload_details.path }` ) ;
} )

// pin file to ipfs by hash using pinata sdk
app.post( "/pinfile/:ID" , async function( request , response ) {
  const options = {
    pinataMetadata: {
      name: "goku"
    }
  } ;

  let hash = request.params.ID ;

  await pinata.pinByHash( hash , options )
    .then( ( result ) => {
      console.log( "File successfully pinned!" ) ;
      console.log( result ) ;
      console.log( "Pinata gateway URL: https://gateway.pinata.cloud/ipfs/" + result.ipfsHash )
    } )
    .catch( ( err ) => {
      console.log( err ) ;
    } )

    response.send( "File pinned successfully to IPFS server!" ) ;
} )

// show uploaded file
app.get( "/deliver/:ID" , function( request , response ) {
  console.log( request.params.ID ) ;
  response.redirect( "https://ipfs.io/ipfs/" + request.params.ID ) ;
} )

// show pinned file
app.get( "/pinfile/:ID" , function( request , response ) {
  console.log( request.params.ID ) ;
  response.redirect( "https://gateway.pinata.cloud/ipfs/" + request.params.ID ) ;
} )

app.listen( PORT , () => {
  console.log( `Listening on port: ${ PORT }` ) ;
  console.log( "http://localhost:" + PORT ) ;
} ) ;