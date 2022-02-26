import { Market, TimeInForce, OrderType, OrderSide, PositionStatus, OrderResponseObject, MarketsResponseObject} from "@dydxprotocol/v3-client";
import { DYDXConnector, NetworkID } from 'dydx_nodejs_connector'


let connector: DYDXConnector

async function init(): Promise<void> {
    console.log("init...", DYDXConnector)
    connector = await DYDXConnector.build(NetworkID.RopstenTestNet)
}

async function pnlStrategy(market: Market, initialQuoteAssetSize: number, sizeMultiplier: number, openUnder: Number, closeAt: Number): Promise<void> {
    let positions = await connector.getPositions(market, PositionStatus.OPEN)
    if (positions === undefined) return //handle timeout error here at some point. Client needs relog after longer time

    if (positions.length == 0) {
        //For now pretend quote asset is USD
        //Approximate position size based on USD that are wanted to spend (initialQuoteAssetSize)
        let size = await approximateBaseAssetSize(market, initialQuoteAssetSize)
        console.log(size)
        //open initial position
        openPosition(market, size)
    }
    else {
        //is this always one position?
        for (const pos of positions) {
            const pnl = connector.getPNLInPercent(pos)
            if (pnl < openUnder) {
                //increase position when value drops
                let size = Number(pos.size) * sizeMultiplier
                openPosition(market, size)
            }
            else if (pnl > closeAt) {
                //close with profit
                let size = Number(pos.size)
                closePosition(market, size)
            }
        }
    }
}

async function approximateBaseAssetSize(market: Market, quoteAssetSize: number): Promise<Number> {
    let marketInf: MarketsResponseObject = await connector.getMarkets(market)
    const price = marketInf[market]['indexPrice']

    //size can only be multiple of 0.0001 (see DYDX API)
    return Number((quoteAssetSize / Number(price)).toFixed(4))
}

async function openPosition(market: Market, size: Number): Promise<OrderResponseObject>{
        return await connector.createOrder(
            OrderSide.BUY,
            OrderType.MARKET,
            TimeInForce.IOC,
            undefined,
            String(size), //size
            "1000000000", //worst price
            undefined,
            undefined,
            market
        )
}

async function closePosition(market: Market, size: Number): Promise<OrderResponseObject>{
        return await connector.createOrder(
            OrderSide.SELL,
            OrderType.MARKET,
            TimeInForce.IOC,
            undefined,
            String(size), //size
            "0.1", //cheapest sellpoint
            undefined,
            undefined,
            market
        )
}


init()

setInterval(async () => {
    console.log("Executing strategy")
    await pnlStrategy(Market.BTC_USD, 100, 2, -2, 10)
}, 2000)
