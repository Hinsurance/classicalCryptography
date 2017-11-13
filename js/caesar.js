/**
 * 字母表
 */
var alphabet = [
	'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
]

/**
 * Caesar加密函数
 * @param  {[type]} k    密钥
 * @param  {[type]} p_text 明文
 * @return {[type]} c_text     密文
 */
function encryptCaesar(k,p_text) {
	var	p_array = [],//明文数组
		c_array = [],//密文数组
		c_text = '';//密文

	p_array = p_text.split('');//将明文分成一个个字符存入数组
	
	for(var i = 0;i < p_array.length;i++) {
		if (p_array[i] != ' ') {//非空格字符 空格为string
			p_array[i] = p_array[i].toUpperCase();//将字符全部转化为大写
			var encrypt_index = (p_array[i].charCodeAt() - 65 + parseInt(k)) % 26;//计算字符在字母表的索引
			c_array.push(alphabet[encrypt_index]);//将加密得到的密文字母存入密文数组中
		} else {//空格字符
			c_array[i] = ' ';//保存字符串之间的空格符
		}
	}
	
	c_text = c_array.join('');//将密文数组拼接为密文
	
	return c_text;//返回加密的密文
}


/**
 * Caesar解密函数
 * @param  {[type]} k      密钥
 * @param  {[type]} c_text 密文
 * @return {[type]} p_text      明文
 */
function decryptCaesar(k,c_text) {
	var	p_array = [],//明文数组
		c_array = [],//密文数组
		p_text = '';//明文

	c_array = c_text.split('');//将密文分成一个个字符存入数组
	
	for(var i = 0;i < c_array.length;i++) {
		
		if (c_array[i] != ' ') {//非空格字符 空格为string
			c_array[i] = c_array[i].toUpperCase();//将字符全部转化为大写
			var encrypt_index = (c_array[i].charCodeAt() - 65 - parseInt(k)+26) % 26;//计算字符在字母表的索引
			p_array.push(alphabet[encrypt_index]);//将解密得到的明文字母存入明文数组中
		} else {//空格字符
			p_array[i] = ' ';//保存字符串之间的空格符
		}
	}

	p_text = p_array.join('');//将明文数组拼接为明文
	
	return p_text;//返回解密的明文
}

/**
 * 点击加密按钮对明文进行加密
 */
$('#caesar_encrypt_btn').click(function() {
	var key = $('#key').val(),//密钥
		p_text = $('#caesar_p_text').val(),//明文
		c_text = '';//密文
	
	c_text = encryptCaesar(key,p_text);//对明文进行加密
	
	$('#caesar_c_text').html(c_text);//将明文写入html文件中
	$('#par1').show();//显示密文
	$('#caesar_decrypt_btn').show();//显示解密按钮
})

/**
 * 点击解密按钮对密文进行解密
 */
$('#caesar_decrypt_btn').on('click',function() {
	var key = $('#key').val(),//密钥
		c_text = $('#caesar_c_text').html(),//密文
		p_text = '';//明文
	
	p_text = decryptCaesar(key,c_text);//对密文进行解密
	
	$('#caesar_decrypt_text').html(p_text);//将密文写入html文件中
	$('#par2').show();//显示明文
})

