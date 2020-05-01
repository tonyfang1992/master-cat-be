const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const crypto = require("crypto");
const User = db.User;

const URL = "https://e4378e1f.ngrok.io";
const MerchantID = process.env.MERCHANT_ID;
const HashKey = process.env.HASH_KEY;
const HashIV = process.env.HASH_IV;
const PayGateWay = "https://ccore.spgateway.com/MPG/mpg_gateway";
const ReturnURL = URL + "/api/spgateway/callback";
const NotifyURL = URL + "/api/spgateway/callback";
const ClientBackURL = "https://8ed4a633.ngrok.io" + "/cats";

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
    //重新檢查一次前端傳來資料
    if (
      req.body.name.length == 0 ||
      req.body.address.length == 0 ||
      req.body.phone.length == 0
    ) {
      return callback({ status: "error", message: "所有欄位都是必填" });
    }
    if (isNaN(req.body.phone) || req.body.phone.length !== 10) {
      return callback({
        status: "error",
        message: "電話欄只能輸入長度為10的數字!",
      });
    }
    //將購物車資料轉換成訂單
    return Cart.findOne({
      where: { uuid: req.body.cartId },
      include: "items",
    }).then((cart) => {
      return Order.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        shipping_status: 0,
        payment_status: "尚未付款",
        UserId: req.user.id,
      }).then((order) => {
        var results = [];
        let totalPrice = 0;
        for (var i = 0; i < cart.items.length; i++) {
          //價錢由後端重新計算一次
          totalPrice += cart.items[i].CartItem.quantity * cart.items[i].price;
          results.push(
            OrderItem.create({
              OrderId: order.id,
              ProductId: cart.items[i].id,
              price: cart.items[i].price,
              quantity: cart.items[i].CartItem.quantity,
            })
          );
        }
        //更新訂單價錢
        order.update({
          ...order,
          amount: totalPrice,
        });

        return Promise.all(results).then(() =>
          cart
            .destroy()
            .then(() =>
              callback({ status: "success", message: "成功建立訂單" })
            )
        );
      });
    });
  },
  cancelOrder: (req, res, callback) => {
    Order.findByPk(req.params.id).then((order) => {
      order
        .update({
          shipping_status: "取消訂單",
          payment_status: "取消訂單",
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
      order
        .update({
          ...req.body,
          sn: tradeInfo.MerchantOrderNo,
        })
        .then((order) => {
          return callback({ order, tradeInfo });
        });
    });
  },
  spgatewayCallback: (req, res) => {
    console.log("===== spgatewayCallback: TradeInfo =====");
    console.log(req.body.TradeInfo);

    const data = JSON.parse(create_mpg_aes_decrypt(req.body.TradeInfo));

    console.log("===== spgatewayCallback: create_mpg_aes_decrypt、data =====");
    console.log(data);

    return Order.findAll({
      where: { sn: data["Result"]["MerchantOrderNo"] },
    }).then((orders) => {
      //判斷付款狀態，藍新會重複發送post，以確認伺服器狀態
      if (orders[0].payment_status !== "完成付款") {
        return OrderItem.findAll({
          where: { OrderId: orders[0].id },
        }).then((orderItems) => {
          //扣掉庫存、增加銷售量
          for (let i = 0; i < orderItems.length; i++) {
            Product.findByPk(orderItems[i].ProductId).then((product) => {
              product.update({
                ...product,
                amount: product.amount - orderItems[i].quantity,
                SaleAmount: product.SaleAmount + orderItems[i].quantity,
              });
            });
          }
          //更新消費者的累積消費金額、會員階級
          User.findByPk(orders[0].UserId).then((user) => {
            let NowSpendMoney = (user.spendMoney += orders[0].amount);
            let NowRank = user.rank;
            if (3000 < NowSpendMoney < 6667) {
              NowRank = "白銀會員";
            }
            if (6666 < NowSpendMoney) {
              NowRank = "黃金會員";
            }
            user
              .update({
                spendMoney: NowSpendMoney,
                rank: NowRank,
              })
              .then((user) => {
                orders[0]
                  .update({
                    ...req.body,
                    payment_status: "完成付款",
                  })
                  .then((order) => {
                    return res.redirect("http://localhost:8080/#/");
                  });
              });
          });
        });
      } else {
        return res.redirect("http://localhost:8080/#/");
      }
    });
  },
};

module.exports = OrderService;
