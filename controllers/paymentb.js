var braintree = require("braintree");

var gateway =new  braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MerchantID,
  publicKey: process.env.PublicKey,
  privateKey: process.env.PrivateKey
});

exports.getToken = (req, res) => {
  // console.log(req);
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
