/**
 * 点击加密按钮进行加密
 */
$('#playfair_encrypt_btn').click(function() {
 	var key = $('#key').val();//关键词
 	var keyarr = [];//关键词字母数组
 	var a = [];//5*5矩阵

 	keyarr = key.toUpperCase().split('');//将关键词拆分为关键词字母存入关键词数组
 	a = keyMatrix(keyarr);//构造5*5矩阵
 	
 	var p_text = $('#playfair_p_text').val();//明文
 	var p_text_arr = [];//明文字母数组
 	
 	p_text_arr = p_text.replace(/\s/g,'').toUpperCase().split('');//将明文转化为大写 拆分为字母 存入明文字母数组

 	encrypt(p_text_arr,a);//加密
})

/**
 * 加密函数
 */
function encrypt(p_text_arr,a) {

	//判断是否同组中有相同的字母，有则在两者间插入字母K
	for(var i = 0;i < Math.ceil(p_text_arr.length/2);i++){
		if(p_text_arr[2*i]==p_text_arr[2*i+1]){
			p_text_arr.splice(2*i+1,0,'K');
		}
	}
	
	//若明文字母个数为奇数 则在末尾添加字母K
	if (p_text_arr.length % 2 != 0) {
		p_text_arr.push('K');
	}

	//将明文分组存放
	var c =[];//存放明文分组
	var index = 0;//当前到第几个字母
	for (var i = 0;i < Math.ceil(p_text_arr.length/2);i++) {
		c[i] = new Array();
		c[i][0] = p_text_arr[index++];
		c[i][1] = p_text_arr[index++];
	}
	
	//将各分组根据矩阵进行加密 并保存到数组c_text_arr中
	var c_text_arr = [];
	var x1 = 0,//分组第一个字母在矩阵中的横坐标
		y1 = 0,//分组第一个字母在矩阵中的纵坐标
		x2 = 0,//分组第二个字母在矩阵中的横坐标
		y2 = 0;//分组第二个字母在矩阵中的纵坐标

	for (var i = 0;i < Math.ceil(p_text_arr.length/2);i++) {
		for (var j = 0;j < 5;j++) {
			for (var k = 0;k < 5;k++) {
				
				if (a[j][k] == c[i][0]) {
					x1 = j;
					y1 = k;
				}
				if (a[j][k] == c[i][1]) {
					x2 = j;
					y2 = k;
				}

				//若组合中出现Y或Z
				if ((a[j][k] == 'YZ' && c[i][0] == 'Y') ||(a[j][k] == 'YZ' && c[i][0] == 'Z')) {
					x1 = j;
					y1 = k;
				}
				if ((a[j][k] == 'YZ' && c[i][1] == 'Y') ||(a[j][k] == 'YZ' && c[i][1] == 'Z')) {
					x2 = j;
					y2 = k;
				}
			}
		}

		if (x1 == x2) {
			//分组字母同行
			if (y1 == 4) {
				y1 = 0;
			} else {
				y1++;
			}
			if (y2 == 4) {
				y2 = 0;	
			} else {
				y2++;
			}
		} else if (y1 == y2) {
			//同列
			if (x1 == 4) {
				x1 = 0;
			} else {
				x1++;
			}
			if (x2 == 4) {
				x2 = 0;
			} else {
				x2++;
			}
		}
		c_text_arr.push(a[x1][y2],a[x2][y1]);
	}
	
	var c_text = '';
	c_text = c_text_arr.join(' ');	

	$('#playfair_c_text').html(c_text);//将加密结果写回html
	$('#par1').show();//显示加密结果
	$('#playfair_decrypt_btn').show();//显示解密按钮
}

/**
 * 解密
 */
$('#playfair_decrypt_btn').click(function() {

	var key = $('#key').val();//关键词
	var keyarr = [];//关键词字母数组
	var a = [];//5*5矩阵

	keyarr = key.toUpperCase().split('');
	a = keyMatrix(keyarr);
	
	var p_text = $('#playfair_c_text').html();
	var p_text_arr = [];//密文字母数组

	p_text_arr = p_text.replace(/\s/g,'').toUpperCase().split('');

	decrypt(p_text_arr,a);//解密
})

/**
 * 解密函数
 */
function decrypt(p_text_arr,a) {
	//将密文分组存放
	var c =[];//存放密文分组
	var index = 0;//当前到第几个字母
	for (var i = 0;i < Math.ceil(p_text_arr.length/2);i++) {
		c[i] = new Array();
		c[i][0] = p_text_arr[index++];
		c[i][1] = p_text_arr[index++];
	}
	
	//将各分组根据矩阵进行解密 并保存到数组c_text_arr中
	var c_text_arr = [];
	var x1 = 0,//分组第一个字母在矩阵中的横坐标
		y1 = 0,//分组第一个字母在矩阵中的纵坐标
		x2 = 0,
		y2 = 0;

	for (var i = 0;i < Math.ceil(p_text_arr.length/2);i++) {
		for (var j = 0;j < 5;j++) {
			for (var k = 0;k < 5;k++) {
				
				if (a[j][k] == c[i][0]) {
					x1 = j;
					y1 = k;
				}
				if (a[j][k] == c[i][1]) {
					x2 = j;
					y2 = k;
				}

				//若组合中出现Y或Z
				if ((a[j][k] == 'YZ' && c[i][0] == 'Y') ||(a[j][k] == 'YZ' && c[i][0] == 'Z')) {
					x1 = j;
					y1 = k;
				}
				if ((a[j][k] == 'YZ' && c[i][1] == 'Y') ||(a[j][k] == 'YZ' && c[i][1] == 'Z')) {
					x2 = j;
					y2 = k;
				}
			}
		}

		if (x1 == x2) {
			//分组字母同行
			if (y1 == 0) {
				y1 = 4;
			} else {
				y1--;
			}
			if (y2 == 0) {
				y2 = 4;	
			} else {
				y2--;
			}
		} else if (y1 == y2) {
			//同列
			if (x1 == 0) {
				x1 = 4;
			} else {
				x1--;
			}
			if (x2 == 0) {
				x2 = 4;
			} else {
				x2--;
			}
		}

		c_text_arr.push(a[x1][y2],a[x2][y1]);
	}

	var c_text = '';
	c_text = c_text_arr.join(' ');

	$('#playfair_decrypt_text').html(c_text);//将解密结果写回html
	$('#par2').show();//显示解密结果
}

var is_y = 0;//判断原来明文中是Y还是Z 解密会用到
/**
 * 根据关键字生成5*5矩阵
 */
function keyMatrix(keyarr) {

	var b = [],
		a = [];

	var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','YZ']

	for (var i = 0;i < keyarr.length;i++) {
		for (var j = i+1;j < keyarr.length;j++) {
			if (keyarr[i] == keyarr[j]) {
				keyarr.splice(j,1);//删除关键词中相同的字母
			}
		}
	}
	
	for (var i = 0;i < keyarr.length;i++) {
		for (var j = 0;j < alphabet.length;j++) {
			if (keyarr[i] == alphabet[j]) {
				alphabet.splice(j,1);//在字母表中删除已出现在关键词中的字母
			}
		}
		if (keyarr[i] == 'Y') {
			keyarr[i] = 'YZ';
			alphabet.splice(alphabet.length-1,1);
			is_y = 1;
		}
		if (keyarr[i] == 'Z') {
			keyarr[i] = 'YZ';
			alphabet.splice(alphabet.length-1,1);
			is_y = 0;
		}
	}

	for (var i = 0;i < alphabet.length;i++) {
		keyarr.push(alphabet[i]);
	}

	b = keyarr;
	for (var i = 0;i < 5;i++) {
		a[i] = new Array();
		for (var j = 0;j < 5;j++) {
			a[i][j] = b[i*5+j]
		}
	}

	return a;//返回5*5矩阵
}