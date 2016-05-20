//1.数据定义
var data=[
{img:1,h1:'111111',h2:'1111'},
{img:2,h1:'222222',h2:'2222'},
{img:3,h1:'333333',h2:'3333'},
{img:4,h1:'444444',h2:'4444'},
{img:5,h1:'555555',h2:'5555'},
{img:6,h1:'666666',h2:'6666'},
{img:7,h1:'777777',h2:'7777'}
];

//2.通用函数
function g(id){
	if(id.substr(0,1)=='.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

//3.添加幻灯片和对应按钮
function addSliders(){
	//3.1获取所有模板
	var tpl_main=g('temp_main').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');//获取幻灯片，正则表达式是为了去除前后的空格
	var tpl_ctrl=g('temp_ctrl').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');//获取控制按钮
	//3.2定义最终输出的html变量
	var out_main=[];
	var out_ctrl=[];
	//3.3遍历所有的数据，构建最终输出的html
	for(i in data){
		var _html_main=tpl_main.replace(/{{index}}/g,data[i].img).replace(/{{h2}}/g,data[i].h1).replace(/{{h3}}/g,data[i].h2);//定义临时的幻灯片的数据
		var _html_ctrl=tpl_ctrl.replace(/{{index}}/g,data[i].img);//定义临时的按钮的数据
		
		//构建输出的html
		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	}
	
	//3.4把临时的html写回到对应的dom中
	g('temp_main').innerHTML=out_main.join('');
	g('temp_ctrl').innerHTML=out_ctrl.join('');
	
	//7.增加#main_background
	g('temp_main').innerHTML+=tpl_main.replace(/{{index}}/g,'{{index}}').replace(/{{h2}}/g,data[i].h1).replace(/{{h3}}/g,data[i].h2);
	g('main_{{index}}').id='main_background';
	
}
//4.定义何时处理幻灯片输出
window.onload=function(){
	
	addSliders();
	switchSlider(1);
	
	//setTimeout(moveP,100);
}
//5.幻灯片切换
function switchSlider(n){
	//5.1获得要展现的幻灯片和按钮
	var main=g('main_'+n);
	var ctrl=g('ctrl_'+n);
	//5.3清除原本的样式
	var clear_main=g('.main-i');
	var clear_ctrl=g('.ctrl-i');
	for(var i=0;i<clear_ctrl.length;i++){
		clear_main[i].className=clear_main[i].className.replace(' main-i_active','');
		clear_ctrl[i].className=clear_ctrl[i].className.replace(' ctrl-i_active','');
	}
	
	
	//5.2添加样式
	main.className+=' main-i_active';
	ctrl.className+=' ctrl-i_active';
	
	//7.2切换时，复制上一张幻灯片到main_background中
	setTimeout(function(){
		g('main_background').innerHTML=main.innerHTML;
	},500);
	
}
//6.动态调整图片margin-top使图片垂直居中
//function moveP(){
//	var pictures=g('.pcenter');
//	for(var i=0;i<pictures.length;i++){
//		pictures[i].style.marginTop=-(pictures[i].clientHeight/2)+'px';
//	}
//}