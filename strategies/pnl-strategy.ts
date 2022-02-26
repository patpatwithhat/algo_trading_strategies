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
        console.log("No existing positions found. Creatin new...")
        //For now pretend quote asset is USD
        //Approximate position size based on USD that are wanted to spend (initialQuoteAssetSize)
        let size = await approximateBaseAssetSize(market, initialQuoteAssetSize)
        //open initial position
        openPosition(market, size)
    }
    else {
        //is this always one position?
        for (const pos of positions) {
            const pnl = connector.getPNLInPercent(pos)
            console.log("Market: %s \tPosition-PNL %f", market, pnl)
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

    //size can only be multiple of 0.0001 for BTC_USD (see DYDX API)
    //must be multiple of 0.001 for ETH_USD
    return Number((quoteAssetSize / Number(price)).toFixed(3))
}

async function openPosition(market: Market, size: Number): Promise<OrderResponseObject>{
        console.log("Opening new position for market %s of size %f", market, size)
        return await connector.createOrder(
            OrderSide.BUY,
            OrderType.MARKET,
            TimeInForce.IOC,
            undefined,
            String(size),
            "1000000000", //needed worst price max value (see API)
            undefined,
            undefined,
            market
        )
}

async function closePosition(market: Market, size: Number): Promise<OrderResponseObject>{
        console.log("Reducing position of market %s of size %f", market, size)
        return await connector.createOrder(
            OrderSide.SELL,
            OrderType.MARKET,
            TimeInForce.IOC,
            undefined,
            String(size),
            "0.1", //needed, min sell value (see API)
            undefined,
            undefined,
            market
        )
}


init()

setInterval(async () => {
    await pnlStrategy(Market.BTC_USD, 100, 2, -2, 10)
    await pnlStrategy(Market.ETH_USD, 100, 2, -2, 10)
}, 2000)
