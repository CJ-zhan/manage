/* eslint-disable */
const APP_ENV = process.env.VUE_APP_ENV 
const APP_CONFIG = {
  // prod: {
  //   API_URL: 'http://applog.chumanapp.com',
  //   PULISH_URL:'https://qn-applog.chumanapp.com/'
  // },
  // api2: {
  //   API_URL: 'http://applog-api2.chumanapp.com',
  //   PULISH_URL:'https://qn-applog.chumanapp.com/'
  // },
  // demo: {
  //   API_URL: 'http://applog-demo.chumanapp.com',
  //   PULISH_URL:'http://7u2kln.com2.z0.glb.qiniucdn.com/'
  // },
  // staging: {
  //   API_URL: 'http://applog-dev.chumanapp.com',
  //   PULISH_URL:'http://7u2kln.com2.z0.glb.qiniucdn.com/'
  // },
  dev: {
    API_URL: '',
  }
}
export default {
  ...APP_CONFIG[APP_ENV],
  // 上下架状态
  VISIBILITY: {
    0: {
      status: 'default',
      text: '关闭'
    },
    1: {
      status: 'processing',
      text: '启用'
    }
  }, 
  VALIDATIONS: {
    'trim': { regexp: /^.*$/, text: '' },
    'required': { regexp: /^.+$/, defaultText: '不能为空' },
    'requiredHtml': { regexp: /[\r\n\s]*.+[\r\n\s]*/, text: '不能为空' },
    'number': { regexp: /^(\d*\.)?\d+$/, text: '请输入数值' },
    'allNumber': { regexp: /^-?(\d*\.)?\d+$/, text: '请输入数值' },
    'noZero': { regexp: /[^0\.]+/, text: '不能为零' },
    'nonNegativeNumber': { regexp: /^(([0-9]+[\.]?[0-9]+)|[0-9])$/, text: '请输入大于等于0的数值' },
    'positiveNumber': { regexp: /^(([0-9]+[\.]?[0-9]+)|[1-9])$/, text: '请输入大于0的数值' },
    'percentNumber': { regexp: /^(\d{1,2}|100)$/, text: '只能输入大于等于0小于等于100的整数' },
    'oneToAHundred': { regexp: /^(\d{2}|[1-9]|100)$/, text: '只能输入大于0小于等于100的整数' },
    'zeroToNinetyNine': { regexp: /^(\d{1,2})$/, text: '只能输入大于等于0小于100的整数' },
    'oneToNinetyNine': { regexp: /^(\d{2}|[1-9])$/, text: '只能输入大于0小于100的整数' },
    // 'positiveInteger': { regexp: /^(\d{2,}|[1-9])$/, text: '请输入大于0的整数' },
    // 'positiveInteger': { regexp: /^[1-9]\d*|0$/, text: '请输入正整数' },
    'zeroOrpositiveInteger': { regexp: /^([1-9][0-9]*|0)$/, text: '请输入零或正整数' },
    'positiveInteger': { regexp: /^([1-9][0-9]*)$/, text: '请输入正整数' },
    'integer': { regexp: /^\d+$/, text: '请输入大于等于0的整数' },
    'length': { regexp: '^.{{x},{y}}$', text: '请输入{x}-{y}个字符' },
    'lengthExact': { regexp: '^.{{x}}$', text: '请输入{x}个字符' },
    'minlength': { regexp: '^.{{x},}$', text: '最少{x}个字符' },
    'maxlength': { regexp: '^.{0,{x}}$', text: '最多{x}个字符' },
    'maxlengthSpecial': { regexp: '^[\\s\\S]{0,{x}}$', text: '最多{x}个字符' }, // 包括换行的任意字符最大长度
    'urisnippet': { regexp: /^[a-zA-z0-9_-]+$/, text: '只允许字母、数字、下划线和中横线' },
    'domain': { regexp: /(^\*\.|^[0-9a-zA-Z\u2E80-\uFE4F]+)[0-9a-zA-Z\u2E80-\uFE4F\.-]*\.[0-9a-zA-Z\u2E80-\uFE4F-]{2,}$/, text: '域名格式不正确' },
    'email': { regexp: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/, text: '邮箱格式不正确' },
    'float2': { regexp: /^\d+(\.\d{0,2})?$/, text: '小数点后最多只能保留两位数' },
    'floatNoZero': { regexp: /[^0\.]+/, text: '请输入大于0的数值' },
    'floatZeroToAHundredNoZero': { regexp: /^((([0-9][1-9]|[1-9][0-9])|[1-9])(\.\d+)?|0+\.[0-9]*[1-9][0-9]*|100(\.0+)?)$/, text: '只能输入大于0小于等于100的数值' },
    'maxNumber': { regexp: /^\d(\d{1,6})?(\.\d{1,2})?$/, text: '请输入小于10000000(1千万)的数值' },
    'maxTotal': { regexp: /^\d(\d{1,12})?(\.\d{1,2})?$/, text: '数值过大，请修正' },
    'isIcp': { regexp: /^[京|津|冀|晋|蒙|辽|吉|黑|沪|苏|浙|皖|闽|赣|鲁|豫|鄂|湘|粤|桂|琼|渝|蜀|黔|滇|藏|陕|陇|青|宁|新]ICP备\d{8}号(-\d{1,})?$/, text: '请输入合法的ICP备案号,例如：粤ICP备12043194号' },
    'mobile': { regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, text: '手机号码格式不正确' },
    'zipcode': { regexp: /^[0-9]{0,10}$/, text: '请输入正确邮编' },
    'phone': { regexp: /(^\+*(\d+(-|\s)*\d)*$)|(^\d{11}$)/i, text: '请正确填写联系电话' }, 
    // 'identityCard': { regexp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, text: '身份证号格式不正确' },
    'identityCard': { regexp: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, text: '身份证号格式不正确' },
    'requiredHttp': { regexp: /(^http:\/\/)|(^https:\/\/)/, text: '请输入以 http:// 或 https:// 开头的完整网址' },
    'webOrigin': { regexp: /^((https?:\/\/)?[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[0-9a-zA-Z-]{2,}(:\d{1,5})?\/?(\r?\n)?)*((https?:\/\/)?[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[0-9a-zA-Z-]{2,}(:\d{1,5})?\/?)$/, text: '请输入正确的格式。例如：host.com' },
    'handleCheck': { regexp: /^[A-Za-z0-9\-\u4e00-\u9fa5]{4,200}$/, text: '请输入4~200个字符，可以使用中文、小写字母、数字或中横线。' },
    'redirectCheck': { regexp: /^\/[a-z0-9\-\u4e00-\u9fa5_\/]*$/, text: '请以“/”开头，只可以使用中文、小写字母、数字、中横线、下划线或斜杠。' },
    // 'shipmentNameCheck': { regexp: /^[A-Za-z0-9\-\u4e00-\u9fa5_]*$/, text: '只可以使用中文、字母、数字、中横线、下划线。' },
    'normalNameCheck': { regexp: /^[A-Za-z0-9\u4e00-\u9fa5]*$/, text: '只可以使用中文、字母、数字。' },
    'smsSignCheck': { regexp: /^([A-Za-z0-9]*[\u4e00-\u9fa5]+[A-Za-z0-9]*)+$/, text: '只可以使用汉字、字母、数字，必须包含汉字。' },
    'shopPassword': { regexp: /^.{4,40}$/, text: '网站访问密码需要4~40个字符' },
    'discount': { regexp: /^([1-9](\.\d)?|0\.\d)$/, text: '请输入有效的折扣，如9.5' },
    'url': { regexp: /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- _;./?%&=#:,{}\(\)]*)?$/, text: '请输入正确的网址' },
    'looseurl': { regexp: /^(https?:\/\/|)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=#:,{}\(\)]*)?$/, text: '请输入正确的网址' }, // 允许不以http://和https://开头的url
    'couponCode': { regexp: /^[A-Za-z0-9]*$/, text: '只可以使用英文字母或数字' },
    'multimediaUrl': { regexp: /(^http:\/\/)|(^https:\/\/)|(^\/\/)/, text: '请输入以 http://, https:// 或 // 开头的完整网址' },
    'subdomain': { regexp: /^([a-zA-Z]|-|\d)+$/, text: '只可以使用字母、数字或连字符' },
    'nowww': { regexp: /^(?!(w|W){3}$)/, text: '不能是www' }
  }
}
