from sys import stdout
from time import sleep


while True:
# Count from 1 to 10 with a sleep
#for count in range(0, 10):
  count=10
  while count < 15:
    print('{"root":{"playerCount":"2"},"list":[{"count":"1","name":"bingobangobengo","id":"bingobangobengo","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"0.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"},{"count":"2","name":"Di0","id":"Di0","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"'+str(count)+'.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"}]}')
    stdout.flush()
    sleep(1)
    count=count+1

  
  while count < 20:
    print('{"root":{"playerCount":"1"},"list":[{"count":"1","name":"bingobangobengo","id":"bingobangobengo","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"0.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"}]}')
    stdout.flush()
    sleep(1)
    count=count+1

  
  while count < 25:
    count2=count+20;
    print('{"root":{"playerCount":"1"},"list":[{"count":"1","name":"bingobangobengo","id":"bingobangobengo","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"0.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"},{"count":"2","name":"Maial","id":"Maial","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"'+str(count)+'.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"},{"count":"3","name":"Scav","id":"Scav","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"'+str(count2)+'.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"}]}')
    stdout.flush()
    sleep(1)
    count=count+1