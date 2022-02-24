import { Market, TimeInForce, OrderType, OrderSide, PositionStatus } from "@dydxprotocol/v3-client";
import { DYDXConnector, NetworkID } from 'dydx_nodejs_connector'


let connector: DYDXConnector
async function init() {
    console.log("init...", DYDXConnector)
    connector = await DYDXConnector.build(NetworkID.RopstenTestNet)
}

async function pnlStrategy(openUnder: Number, closeAt: Number) {

    let positions = await connector.getPositions(undefined, PositionStatus.OPEN)
    if (positions === undefined) return //handle timeout error here at some point. Client needs relog after longer time

    if (positions.length == 0) { //open inital position
        await connector.createOrder(
            OrderSide.BUY,
            OrderType.MARKET,
            TimeInForce.IOC,
            undefined,
            "0.2",
            "10000",
            undefined,
            undefined,
            Market.ETH_USD
        )
    }
    else {

        for (const pos of positions) {
            const pnl = connector.getPNLInPercent(pos)
            if (pnl < openUnder) { //add another position
                await connector.createOrder(
                    OrderSide.BUY,
                    OrderType.MARKET,
                    TimeInForce.IOC,
                    undefined,
                    String(Number(pos.size) * 2),
                    "10000",
                    undefined,
                    undefined,
                    Market.ETH_USD
                )

            }
            else if (pnl > closeAt) {  //close position with profit
                await connector.createOrder(
                    OrderSide.SELL,
                    OrderType.MARKET,
                    TimeInForce.IOC,
                    undefined,
                    pos.size,
                    '1',
                    undefined,
                    undefined,
                    Market.ETH_USD,
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