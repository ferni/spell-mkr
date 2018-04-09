# Spell Mkr

Create spells to be used as proposals in [Chief Explorer](https://chief.makerdao.com/).

## Set up

Install [seth](https://github.com/dapphub/seth) , and [configure the .sethrc file](https://github.com/dapphub/seth#configuration).
Set ETH_GAS to at least 700000.

To install the cli-tool globally as "spell", run:

    npm install -g

Otherwise replace "spell" with "node index" in the usage section.

## Usage

    spell <maker parameter> <value> [--publish]
Example: spell cap 50000000000000000000000000

Maker Parameters:
- cap : Debt ceiling
- mat : Liquidation ratio
- tax : Stability fee
- fee : Governance fee
- axe : Liquidation fee
- tubGap : Join/Exit Spread
- tapGap : Boom/Bust Spread
- way : Rate of change of target price (per second)

If you add --publish at the end, you will get asked for the account password and publish the spell in the blockchain.
