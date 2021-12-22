command:
<b>node app.js</b>

when file is successfully uploaded, an "uploads" folder will be created (if not present already)
and in response we will get the CID which is basically a "hash" of the corresponding file.
Copy the hash and paste it to the text box and when "Show File" button is clicked we will be
redirected to the link where we can see our file. And, when "Pin File" button is clicked we
will be redirected to the gateway link which is basically a pinata cloud link 

An Ajax http request has 5 states as your reference documents:
<b>
0   UNSENT  open() has not been called yet.
1   OPENED  send() has been called.
2   HEADERS_RECEIVED    send() has been called, and headers and status are available.
3   LOADING Downloading; responseText holds partial data.
4   DONE    The operation is complete.
</b>


Buffer() is deprecated due to security and usability issues
<b>
new Buffer(number)            // Old
Buffer.alloc(number)          // New

new Buffer(string)            // Old
Buffer.from(string)           // New

new Buffer(string, encoding)  // Old
Buffer.from(string, encoding) // New

new Buffer(...arguments)      // Old
Buffer.from(...arguments)     // New
</b>
