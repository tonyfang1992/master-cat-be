const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Order = db.Order;
const OrderItem = db.OrderItem;
const crypto = require("crypto");

const URL = "https://f9bad993.ngrok.io";
const MerchantID = process.env.MERCHANT_ID;
const HashKey = process.env.HASH_KEY;
const HashIV = process.env.HASH_IV;
const PayGateWay = "https://ccore.spgateway.com/MPG/mpg_gateway";
const ReturnURL = URL + "/spgateway/callback?from=ReturnURL";
const NotifyURL = URL + "/spgateway/callback?from=NotifyURL";
const ClientBackURL = URL + "/orders";

function genDataChain(TradeInfo) {
  let results = [];
  for (let kv of Object.entries(TradeInfo)) {
    results.push(`${kv[0]}=${kv[1]}`);
  }
  return results.join("&");
}

function create_mpg_aes_encrypt(TradeInfo) {
  let encrypt = crypto.createCipheriv("aes256", HashKey, HashIV);
  let enc = encrypt.update(genDataChain(TradeInfo), "utf8", "hex");
  return enc + encrypt.final("hex");
}

function create_mpg_aes_decrypt(TradeInfo) {
  let decrypt = crypto.createDecipheriv("aes256", HashKey, HashIV);
  decrypt.setAutoPadding(false);
  let text = decrypt.update(TradeInfo, "hex", "utf8");
  let plainText = text + decrypt.final("utf8");
  let result = plainText.replace(/[\x00-\x20]+/g, "");
  return result;
}

function create_mpg_sha_encrypt(TradeInfo) {
  let sha = crypto.createHash("sha256");
  let plainText = `HashKey=${HashKey}&${TradeInfo}&HashIV=${HashIV}`;

  return sha.update(plainText).digest("hex").toUpperCase();
}

function getTradeInfo(Amt, Desc, email) {
  console.log("===== getTradeInfo =====");
  console.log(Amt, Desc, email);
  console.log("==========");

  data = {
    MerchantID: MerchantID, // 商店代號
    RespondType: "JSON", // 回傳格式
    TimeStamp: Date.now(), // 時間戳記
    Version: 1.5, // 串接程式版本
    MerchantOrderNo: Date.now(), // 商店訂單編號
    LoginType: 0, // 智付通會員
    OrderComment: "OrderComment", // 商店備註
    Amt: Amt, // 訂單金額
    ItemDesc: Desc, // 產品名稱
    Email: email, // 付款人電子信箱
    ReturnURL: ReturnURL, // 支付完成返回商店網址
    NotifyURL: NotifyURL, // 支付通知網址/每期授權結果通知
    ClientBackURL: ClientBackURL, // 支付取消返回商店網址
  };

  console.log("===== getTradeInfo: data =====");
  console.log(data);

  mpg_aes_encrypt = create_mpg_aes_encrypt(data);
  mpg_sha_encrypt = create_mpg_sha_encrypt(mpg_aes_encrypt);

  console.log("===== getTradeInfo: mpg_aes_encrypt, mpg_sha_encrypt =====");
  console.log(mpg_aes_encrypt);
  console.log(mpg_sha_encrypt);

  tradeInfo = {
    MerchantID: MerchantID, // 商店代號
    TradeInfo: mpg_aes_encrypt, // 加密後參數
    TradeSha: mpg_sha_encrypt,
    Version: 1.5, // 串接程式版本
    PayGateWay: PayGateWay,
    MerchantOrderNo: data.MerchantOrderNo,
  };

  console.log("===== getTradeInfo: tradeInfo =====");
  console.log(tradeInfo);

  return tradeInfo;
}

const OrderService = {
  getOrders: (req, res, callback) => {
    Order.findAll({
      where: { UserId: req.params.id },
      include: "items",
    }).then((orders) => {
      let tradeInfo = [];
      for (let i = 0; i < orders.length; i++) {
        tradeInfo.push(
          getTradeInfo(orders[i].amount, orders[i].id, "q710370@gmail.com")
        );
      }
      return callback({ orders, tradeInfo });
    });
  },
  postOrder: (req, res, callback) => {
    return Cart.findOne({
      where: { uuid: req.body.cartId },
      include: "items",
    }).then((cart) => {
      return Order.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        shipping_status: 0,
        payment_status: 0,
        UserId: req.body.userId,
        amount: req.body.amount,
      }).then((order) => {
        var results = [];
        for (var i = 0; i < cart.items.length; i++) {
          results.push(
            OrderItem.create({
              OrderId: order.id,
              ProductId: cart.items[i].id,
              price: cart.items[i].price,
              quantity: cart.items[i].CartItem.quantity,
            })
          );
        }

        return Promise.all(results).then(() =>
          callback({ status: "success", message: "成功建立訂單" })
        );
      });
    });
  },
  cancelOrder: (req, res, callback) => {
    return Order.findByPk(req.params.id).then((order) => {
      order
        .update({
          shipping_status: "-1",
          payment_status: "-1",
        })
        .then((order) => {
          callback({ status: "success", message: "成功取消訂單" });
        });
    });
  },
  getPayment: (req, res, callback) => {
    Order.findByPk(req.params.id, { include: "items" }).then((order) => {
      const tradeInfo = getTradeInfo(
        order.amount,
        order.id,
        "q710370@gmail.com"
      );
      return callback({ order, tradeInfo });
    });
  },
};

module.exports = OrderService;
