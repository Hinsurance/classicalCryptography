/**
 * 字母表
 */
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
 * 点击加密按钮加密
 */
$('#hill_encrypt_btn').click(function() {
	
	var p_text = $('#hill_p_text').val().replace(/\s/g,'').toUpperCase();//获取待加密的明文并转化为全部大写
	var p_text_arr = p_text.split('');//将明文转化为字母存入明文数组中

	//加密
	encrypt(p_text_arr);
})

/**
 * 加密函数
 */
function encrypt(p_text_arr) {
	//加密密钥
	var k = [[17,17,5],[21,18,21],[2,2,19]];

	//不足三个时补字母X
	var p_text_length = p_text_arr.length;
	if (p_text_length % 3 == 1) {
		p_text_arr.push('X');
		p_text_arr.push('X');
	} else if (p_text_length % 3 == 2) {
		p_text_arr.push('X');
	}

	//得到明文字母在字母表中的索引
	for (var i = 0;i < p_text_arr.length;i++) {
		for (var j = 0;j < 26;j++) {
			if (p_text_arr[i] == alphabet[j]) {
				p_text_arr[i] = j;
			}
		}
	}

	var p = [],//构造该二维数组存放当前分组的明文字母（三个一组）
		p_index = 0,
		a = [];//构造一个二维数组存放运算后得到的各字母索引

		//将明文按三个字母一组进行分组
		for (var i = 0;i < Math.ceil(p_text_arr.length/3);i++) {//共i组
			p[i] = new Array();
			p[i][0] = p_text_arr[p_index++];
			p[i][1] = p_text_arr[p_index++];
			p[i][2] = p_text_arr[p_index++];

			a[i] = new Array();
			a[i][0] = 0;
			a[i][1] = 0;
			a[i][2] = 0;
		}

		//加密矩阵运算后的结果
		for (var i = 0;i < Math.ceil(p_text_arr.length/3);i++) {
			for (var j = 0;j < 3;j++) {
				for (var t = 0;t < 3;t++) {
					a[i][j] += k[j][t]*p[i][t];
				}
				a[i][j] = a[i][j] % 26;
			}
		}
		
		//加密结果
		var c_text_arr = [];//存放密文字母的数组
		var c_text = '';//密文
		for (var i = 0;i < a.length;i++) {
			for (var j = 0;j < 3;j++) {
				c_text_arr.push(alphabet[a[i][j]]);//将密文字母存入密文数组
			}
		}
		
		c_text = c_text_arr.join(' ');//将密文字母拼接成密文

		$('#hill_c_text').html(c_text);//将密文写入html
		$('#par1').show();//现实密文
		$('#hill_decrypt_btn').show();//显示加密按钮
	
}

/**
 * 点击解密按钮解密
 */
 //解密
$('#hill_decrypt_btn').click(function() {
 	//获取密文
 	var c_text = $('#hill_c_text').html();

 	//构造密文数组
 	var c_text_arr = c_text.replace(/\s/g,'').split('');

 	decrypt(c_text_arr);
})

/**
 * 解密函数
 */
function decrypt(c_text_arr) {
	//解密密钥
	var k1 = [[4,9,15],[15,17,6],[24,0,17]];

	//得到密文字母在字母表中的索引
	for (var i = 0;i < c_text_arr.length;i++) {
		for (var j = 0;j < 26;j++) {
			if (c_text_arr[i] == alphabet[j]) {
				c_text_arr[i] = j;
			}
		}
	}
	
	//将密文分组并存放在数组b中
	var b = [],
		b_index = 0,
		a = [];//构造一个二维数组存放运算后得到的各字母索引
	for (var i = 0;i < Math.ceil(c_text_arr.length/3);i++) {
		b[i] = new Array();
		b[i][0] = c_text_arr[b_index++];
		b[i][1] = c_text_arr[b_index++];
		b[i][2] = c_text_arr[b_index++];

		a[i] = new Array();
		a[i][0] = 0;
		a[i][1] = 0;
		a[i][2] = 0;
	}
	
	//解密矩阵运算后的结果
	for (var i = 0;i < Math.ceil(c_text_arr.length/3);i++) {
		for (var j = 0;j < 3;j++) {
			for (var t = 0;t < 3;t++) {
				a[i][j] += k1[j][t]*b[i][t];
			}
			a[i][j] = a[i][j] % 26;
		}
	}

	//解密结果
	var p_text_arr = [];
	var p_text = '';
	for (var i = 0;i < a.length;i++) {
		for (var j = 0;j < 3;j++) {
			p_text_arr.push(alphabet[a[i][j]]);
		}
	}
	
	p_text = p_text_arr.join(' ');//将明文数组拼接为明文

	$('#hill_decrypt_text').html(p_text);//将明文写入html
	$('#par2').show();//显示明文
}
