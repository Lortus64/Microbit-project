# Microbit project


The microbit project is a way to collect data from a microbit and show it on a webpage. It collects temperature and light from the microbit and sends it to a database. That database is later used by a api to display and change data on the webpage.

## Features

### Database
The database stores user information, microbitdata, microbit highs and lows and log all the microbit data. The highs and lows are stored automatically in a historty table. There are two scheduled triggers. The first one updates the history table every eight hour. The second one clears the history table on the first every mounth.

### Link
The microbit link is an easy way to connect your microbit to the database. Connect your microbit with usb to the computer and start the link.

### Api
The api has two main features. The first one is to use ```socket.io``` to send continuous data to live update the website. The secound feature is to create an easy way for the website to connect to the database. 

### Website
The website is used to show all the information stored in the database. You can see the current data from the microbits that updates live. In this view you can get the values of the microbit what room its in and detailed information on location. You can see the history log and see the values during the day. Behind a login system there is a admin site where you can change things in the database. There is a way to add new microbits to the database, update old microbits and to delete old ones. The site is also somewhat mobil friendly.

## How to use

This guide expect that you have a python interpreter, a database environment and a way to run a webpage.
I use anaconda3 python iv VScode, MySQL Workbench and XAMPP.

### Setting up the program
Firstly you want to start the database. Start by running setup.sql to create the database then run ddl.sql to create all the information and tables in the database. When this is done you can start the api. Start the api by using the command below in the api directory.
```bash
npm run start
```
Now you should be able to use the webpage.

### Connect microbit
Firstly you have to install the program on the microbit. There are some options here you can either use one of the premade hex files in the repo or you can use the microbit.py file to customize the light and id of the microbit. The pythonfile has some comments to help you.

After the program is installd on the microbit you can use it. Plug it into a usb port and start link.py it should start sending and displaying data in the console. If you want to use multiple microbit just insert them into the computer and restart the link.

### Add microbit to database
Now with everythin done you can add the microbit to the database. Go to the adminpage by signing in with the username user and the password pass. When that is done you have access to the admin page. Here you go to Add Microbit. In the id slot use the same id you have on the microbit. In the room slot write in which room the microbit is in. Description is for additional information you want to be displayd. Click save and the microbit is added to the database. You can not add the same id multiple times.

### Update and Delete
On the admin page the user can update the database by going to the microbit they want to change and clicking update. This workes like the add microbit. You can not add the same id multiple times. If the you want to delete a microbit go to the admin page select the microbit you want to delete click delete. When clicked you will be sent to a confirmation page. If you want to delete the microbit click delete again and it will be deleted from the database.
