live-data-graph
====================

 - This is a small POC of changing dependent UI pieces(graphs, reports) as soon as backend data changes
 - Here data source can be a file system or database
 - No need of frequent polling to server for requesting data changes
 - As soon as data changes server will Push data to client
 - To check how does it works steps are,
    - Get this code on local
    - Go to http://localhost:9090/index.html (this will plot one line graph with some data)
    - Now in text editor open "graph-data.txt" file and try to change any data point and save it
    - Your graph will be re-rendered automatically with changed data point 
