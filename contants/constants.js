// 配送方式:1.自取 0.外卖
const DELIVERY_TYPE = {DELIVERY:0,SELF_PICK:1}
// -1" 已取消' 0 已截止'  "1" '预订中';
const MEAL_STATUS = {
    CANCELED: '-1',
    CUTOFF: '0',
    BOOKING: '1',
}
const PAY_TYPE_ENUM = {
    'WECHAT': '0',
    'OFFLINE': '1',
}
//支付方式
const PAY_TYPE = {}
PAY_TYPE[PAY_TYPE_ENUM.WECHAT] = '微信支付'
PAY_TYPE[PAY_TYPE_ENUM.OFFLINE] = '线下支付'

module.exports = {
    DELIVERY_TYPE, MEAL_STATUS, PAY_TYPE, PAY_TYPE_ENUM
}
