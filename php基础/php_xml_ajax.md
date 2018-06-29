##php实例-ajax,xml

在 PHP 中，AJAX 可用来与 XML 文件进行交互式通信

以下AJAX XML 实例将演示网页如何通过 AJAX 从 XML 文件读取信息：

html文件

```html
<script>
  function showCD(str) {
    if (str=="") {
      document.getElementById("txtHint").innerHTML="";
      return;
    } 
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","getCd.php?info=" + str, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
      }
    }
    xmlhttp.send();
  }
 </script>

<form>
   Select a CD:
   <select name="cds" onchange="showCD(this.value)">
   <option value="">Select a CD:</option>
   <option value="Bob Dylan">Bob Dylan</option>
   <option value="Bonnie Tyler">Bonnie Tyler</option>
   <option value="Dolly Parton">Dolly Parton</option>
   </select>
</form>
<div id="txtHint"><b>CD info will be listed here...</b></div>
```
getCd.php文件
```php
$info = $_GET['info'];
//创建 XML DOM 对象
$xmlDoc = new DOMDocument();
//加载 XML 文档
$xmlDoc->load('./cd_catelog.xml');
// print $xmlDoc->saveXML();  // 打印出xml文件内容
$x = $xmlDoc->getElementsByTagName('ARTIST');
//查询
for ($i=0; $i<$x->length; $i++) {
  if ($x->item($i)->nodeType === 1) {
    if ($x->item($i)->childNodes->item(0)->nodeValue === $info) {
      $y = ($x->item($i)->parentNode);
    }
  }
}
$cd = $y->childNodes;
//返回查询结果
for ($i=0; $i<$cd->length; $i++) {
  if ($cd->item($i)->nodeType==1) {
    echo("<b>" . $cd->item($i)->nodeName . ": </b>");
    echo($cd->item($i)->childNodes->item(0)->nodeValue);
    echo("<br>");
  }
}



/* 返回结果示例
  TITLE: Empire Burlesque
  ARTIST: Bob Dylan
  COUNTRY: USA
  COMPANY: Columbia
  PRICE: 10.90
  YEAR: 1985
*/
```
cd_catelog.xml文件
```xml
<CATALOG>
  <CD>
    <TITLE>Empire Burlesque</TITLE>
    <ARTIST>Bob Dylan</ARTIST>
    <COUNTRY>USA</COUNTRY>
    <COMPANY>Columbia</COMPANY>
    <PRICE>10.90</PRICE>
    <YEAR>1985</YEAR>
  </CD>
  <CD>
    <TITLE>Hide your heart</TITLE>
    <ARTIST>Bonnie Tyler</ARTIST>
    <COUNTRY>UK</COUNTRY>
    <COMPANY>CBS Records</COMPANY>
    <PRICE>9.90</PRICE>
    <YEAR>1988</YEAR>
  </CD>
  ......
  <CD>
    <TITLE>Red</TITLE>
    <ARTIST>Dolly Parton</ARTIST>
    <COUNTRY>UK</COUNTRY>
    <COMPANY>London</COMPANY>
    <PRICE>7.80</PRICE>
    <YEAR>1987</YEAR>
  </CD>
<CATALOG>
```

##xml

可扩展标记语言（e**X**tensible **M**arkup **L**anguage）

XML 被设计用来传输和存储数据。

HTML 被设计用来显示数据。

XML 是可扩展标记语言，HTML 为超文本标记语言。

自行定义标签，具有自我描述性

XML 不会做任何事情。XML 被设计用来结构化、存储以及传输信息

独立于软件和硬件的数据存储方法，以纯文本格式进行存储



5 个预定义的实体引用：

&lt;  &gt;  &amp;  &apos;  &quot;

空格会被保留



xml-dom：

html中通过xmlHttpRequest对象加载xml文档到xml-dom对象中， 通过js操作提取数据信息, 显示在html页面中



php通过两种内置的xml解析器处理xml文件，

基于树的解析器： Dom
```php
$xmlDoc = new DOMDocument();   //初始化
$xmlDoc -> load("xx.xml");   //加载
```


基于事件的解析器： Expat, 访问数据更快

1.  通过 xml_parser_create() 函数初始化 XML 解析器
2.  创建配合不同事件处理程序的的函数
3.  添加 xml_set_element_handler() 函数来定义，当解析器遇到开始和结束标签时执行哪个函数
4.  添加 xml_set_character_data_handler() 函数来定义，当解析器遇到字符数据时执行哪个函数
5.  通过 xml_parse() 函数来解析文件 "test.xml"
6.  万一有错误的话，添加 xml_error_string() 函数把 XML 错误转换为文本说明
7.  调用 xml_parser_free() 函数来释放分配给 xml_parser_create() 函数的内存

   实例：expat 解析note.xml文件
```php
// 初始化解析器
$parser = xml_parser_create();

// start
function start($parser, $element_name, $element_attrs) {
  switch($element_name) {
    case "NOTE":
      echo "-- Note --<br>";
      break;
    case "TO":
      echo "To: ";
      break;
    case "FROM":
      echo "From: ";
      break;
    case "HEADING":
      echo "Heading: ";
      break;
    case "BODY":
      echo "Message: ";
    }
}
// stop
function stop($parser, $element_name) {
  echo "<br>";
}
// char
function char($parser, $data) {
  echo $data;
}

// 解析器遇到开始结束标签的处理
xml_set_element_handler($parser, "start", "stop");
// 解析器遇到数据的处理
xml_set_character_data_handler($parser, "char");

$filename = "note.xml";
$fp = fopen($filename, "r");

while ($data = fread($fp, filesize($filename)))
{
  // 处理错误信息
  xml_parse($parser, $data, feof($fp)) or 
  die (sprintf("XML Error: %s at line %d", xml_error_string(xml_get_error_code($parser)),
  xml_get_current_line_number($parser)));
}

//释放 the XML parser
xml_parser_free($parser);
```


expat解析器将该xml文件解析成三个事件：

<name>李响</name>

开始元素： name

cdata:   李响

结束元素： name