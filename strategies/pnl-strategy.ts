const { Connector } = require('dydx_node_connector')

let connector :any
async function init() {
    console.log("init...")
    connector = await Connector.build(Connector.NetworkID.RopstenTestNet)
}

async function pnlStrategy(openUnder: Number, closeAt: Number) {
    let positions = await connector.getPositions(undefined, Connector.PositionStatus.OPEN)
    if (positions === undefined) return //handle timeout error here at some point. Client needs relog after longer time

    if (positions.length == 0) { //open inital position
        await connector.createOrder(
            Connector.OrderSide.BUY,
            Connector.OrderType.MARKET,
            Connector.TimeInForce.IOC,
            undefined,
            "0.2",
            "10000",
            undefined,
            undefined,
            Connector.DydxMarket.ETH_USD
        )
    }
    else {

        for (const pos of positions) {
            const pnl = connector.getPNLInPercent(pos)
            if (pnl < openUnder) { //add another position
                await connector.createOrder(
                    Connector.OrderSide.BUY,
                    Connector.OrderType.MARKET,
                    Connector.TimeInForce.IOC,
                    undefined,
                    String(Number(pos.size) * 2),
                    "10000",
                    undefined,
                    undefined,
                    Connector.DydxMarket.ETH_USD
                )

            }
            else if (pnl > closeAt) {  //close position with profit
                await connector.createOrder(
                    Connector.OrderSide.SELL,
                    Connector.OrderType.MARKET,
                    Connector.TimeInForce.IOC,
                    undefined,
                    pos.size,
                    '1',
                    undefined,
                    undefined,
                    Connector.DydxMarket.ETH_USD,
                )
            }
        }
    }
}

async function manageOrderForPNLStrat() {

}



init()
setInterval(async () => {
    console.log("Executing strategy")
    await pnlStrategy(-2, 10)
}, 2000)