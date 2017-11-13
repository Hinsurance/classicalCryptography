# classicalCryptography
js实现古典密码学中的caesar算法、playfair算法、hill算法

关于样式：
  使用laiyu框架的样式
  
关于bug：
  playfair算法和hill算法在解密过程中存在bug（playfair算法中5*5密钥矩阵把YZ归在一起，解密时YZ一起输出）
  
待改进问题：
  1.上述bug
  2.encrypt函数、decrypt函数的优化（重复功能写在一个统一的函数里面）
  
