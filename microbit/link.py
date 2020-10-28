import time
import serial
import serial.tools.list_ports
import mysql.connector

#Opening usb port for microbitdata
serports = {}

ports = [p.device for p in serial.tools.list_ports.comports()]

print(ports)

for value in ports:
    print(value)
    serports[value + "ser"] = serial.Serial()
    serports[value + "ser"].baudrate = 115200
    serports[value + "ser"].port = value
    serports[value + "ser"].open()

# Connecting to mysql database
mydb = mysql.connector.connect(
  host="localhost",
  user="user",
  password="pass",
  database="indproj"
)

mycursor = mydb.cursor()

#Make microbit data to list
def clean(data):
    data = data[2:]
    data = data.replace(" ", "")
    data = data.replace("\\r\\n'", "")
    data = data.split(",")
    return data

#uppdating database
def updateDB(data):
    sql = "UPDATE microbit SET microbitid = %s, temperature = %s, light = %s WHERE microbitid = %s"
    val = (data[0], data[1], data[2], data[0])

    mycursor.execute(sql, val)

    mydb.commit()


while True:
    for port in serports:
        data = str(serports[port].readline())

        data = clean(data)
        updateDB(data)
        print(data)

    time.sleep(2)

for value in ports:
    serports[value].close()
