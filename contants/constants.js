// 配送方式:1.自取 0.外卖
const DELIVERY_TYPE = {DELIVERY:0,SELF_PICK:1}
// -1" 已取消' 0 已截止'  "1" '预订中';
const MEAL_STATUS = {
    CANCELED: '-1',
    CUTOFF: '0',
    BOOKING: '1',
}
const PAY_TYPE_ENUM = {
    'WECHAT': '1',
    'OFFLINE': '2'
}
//支付方式 1：微信支付,2:线下支付
const PAY_TYPE = {
    [PAY_TYPE_ENUM.WECHAT]: '微信支付',
    [PAY_TYPE_ENUM.OFFLINE]: '线下支付'
}

//订单查询类型 unfinished 待完成 done 已完成 refund 退款
const ORDER_QUERY_TYPE_ENUM = {
    UNFINISHED:'unfinished',
    DONE:'done',
    REFUND:'refund',
}
const ORDER_QUERY_TYPE = {
    [ORDER_QUERY_TYPE_ENUM.unfinished]:'未完成',
    [ORDER_QUERY_TYPE_ENUM.DONE]:'已完成',
    [ORDER_QUERY_TYPE_ENUM.REFUND]:'退款',
}

module.exports = {
    DELIVERY_TYPE,
    MEAL_STATUS,
    PAY_TYPE,
    PAY_TYPE_ENUM,
    ORDER_QUERY_TYPE,
    ORDER_QUERY_TYPE_ENUM
}
