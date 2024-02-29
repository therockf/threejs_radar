from sys import stdout
from time import sleep

# Count from 1 to 10 with a sleep
#for count in range(0, 10):
count=10
while True:
  print('{"root":{"playerCount":"2"},"list":[{"count":"1","name":"bingobangobengo","id":"bingobangobengo","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"0.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"},{"count":"2","name":"player2","id":"player2","isPlayer":"true","groupId":"0","side":"4","angleVertical":"0.000000","angleHorizontal":"0.000000","playerX":"'+str(count)+'.000000","playerY":"0.000000","playerZ":"0.000000","health":"100.000000"}]}')
  stdout.flush()
  sleep(5)
  count=count+1
  if count > 150:
    count = 10