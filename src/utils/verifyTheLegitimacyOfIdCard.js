import { vcity } from './enums'	// 导入enums刚刚加的常量，请按照你自己的项目结构导入

/**
 * 验证身份证合法性
 * @param cardId  身份证号码  String类型
 * @returns  boolean true合法,false不合法
 */
export default function checkTheIdCard (cardId) {
  // 检测身份证是否合法
  return !!((
    isCardNo(cardId) &&
    checkProvince(cardId) &&
    checkBirthday(cardId) &&
    checkParity(cardId)
  ))
}

// 检查基本输入规则
function isCardNo (cardId) {
  const reg = /(^\d{17}(\d|X|x)$)/
  return reg.test(cardId)
}

// 检测前两位是否为省份
function checkProvince (cardId) {
  const province = cardId.substr(0, 2)
  return Boolean(vcity[province])
}

// 检测生日是否正确
function checkBirthday (cardId) {
  const reeighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/
  const arrdata = cardId.match(reeighteen)
  const year = arrdata[2]
  const month = arrdata[3]
  const day = arrdata[4]
  const birthday = new Date(`${year}/${month}/${day}`)
  return (verifyBirthday(year, month, day, birthday))
}

// 检测日期
function verifyBirthday (year, month, day, birthday) {
  const now = new Date()
  const nowyear = now.getFullYear()

  // 判断年月日是否合理
  if (
    birthday.getFullYear() === Number(year) &&
    (birthday.getMonth() + 1) === Number(month) &&
    birthday.getDate() === Number(day)
  ) {
    // 判断年份的范围（3岁到100岁之间)
    const time = nowyear - year
    return (time >= 3 && time <= 100)
  }
  return false
}

// 检测检验位是否正确
function checkParity (cardId) {
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let cardTemp = 0; let i
  for (i = 0; i < 17; i++) {
    cardTemp += cardId.substr(i, 1) * arrInt[i]
  }
  const valnum = arrCh[cardTemp % 11]
  // console.log('身份证检验位应该是: ', valnum)
  return (valnum === cardId.substr(17, 1))
}

// export default function Birthday (cardId) {
//   const reeighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/
//   const arrdata = cardId.match(reeighteen)
//   const year = arrdata[2]
//   const month = arrdata[3]
//   const day = arrdata[4]
//   const birthday = new Date(`${year}/${month}/${day}`)
//   return birthday
// }
